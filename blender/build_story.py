# Deep Auto Electricals — "How we work" 3D story models.
# Run: blender -b -P build_story.py -- <out_dir>
# Builds 6 chapter groups (Z-up, front view = -Y), exports one GLB and renders a still per chapter.
import bpy, bmesh, math, sys, os
from mathutils import Vector, Matrix

OUT = sys.argv[sys.argv.index("--") + 1] if "--" in sys.argv else os.path.dirname(__file__)
os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
col = scene.collection
PI = math.pi

# ---------------------------------------------------------------- materials
def lin(h):
    h = h.lstrip("#")
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]

MATS = {}
def mat(name, color, metal=0.0, rough=0.5, alpha=1.0, double=False, emit=None):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*lin(color), 1)
    b.inputs["Metallic"].default_value = metal
    b.inputs["Roughness"].default_value = rough
    if emit:
        b.inputs["Emission Color"].default_value = (*lin(emit), 1)
        b.inputs["Emission Strength"].default_value = 0.0
    if alpha < 1:
        b.inputs["Alpha"].default_value = alpha
        for attr, val in (("surface_render_method", "BLENDED"), ("blend_method", "BLEND")):
            try: setattr(m, attr, val)
            except Exception: pass
    m.use_backface_culling = not double
    MATS[name] = m
    return m

brass = mat("brass", "#d9a441", 1.0, 0.28)
brass_dark = mat("brass_dark", "#a8772a", 1.0, 0.4)
tin = mat("tin", "#cfd4da", 1.0, 0.22)
copper = mat("copper", "#d07a3c", 1.0, 0.3)
steel = mat("steel", "#8d96a3", 1.0, 0.38)
steel_dark = mat("steel_dark", "#4a5361", 1.0, 0.45)
chrome = mat("chrome", "#e8edf3", 1.0, 0.06, double=True)
nylon = mat("nylon", "#eef0ee", 0.0, 0.48)
nylon_black = mat("nylon_black", "#23272e", 0.0, 0.5)
nylon_grey = mat("nylon_grey", "#8f99a6", 0.0, 0.5)
cavity = mat("cavity", "#0d1117", 0.0, 0.9)
tape = mat("tape", "#14171c", 0.0, 0.85)
clip_mat = mat("clip", "#00a651", 0.0, 0.5)
board = mat("board", "#0b1f3a", 0.0, 0.6)
board_edge = mat("board_edge", "#16345d", 0.2, 0.5)
shell = mat("lamp_shell", "#1a2130", 0.1, 0.55, double=True)
lens = mat("lens", "#dfe9f5", 0.0, 0.02, alpha=0.22, double=True)
bulb = mat("bulb", "#fff6df", 0.0, 0.1, emit="#fff1c9")
WIRE_COLORS = {"red": "#e52e36", "black": "#1d2430", "blue": "#0a6cf1", "green": "#00a651", "yellow": "#f2c230", "white": "#f2f4f7", "orange": "#f37a30"}
wire = {k: mat("wire_" + k, v, 0.0, 0.42, emit=v) for k, v in WIRE_COLORS.items()}
led = [mat(f"led_{i}", "#1a3a2a", 0.0, 0.3, emit="#3dff8a") for i in range(6)]
screen = mat("screen", "#06152b", 0.0, 0.2, emit="#0a6cf1")

# ---------------------------------------------------------------- mesh builder
def T(loc=(0, 0, 0), rot=None, scale=(1, 1, 1)):
    m = Matrix.Translation(Vector(loc))
    if rot:
        for axis, ang in rot:
            m = m @ Matrix.Rotation(ang, 4, axis)
    return m @ Matrix.Diagonal((*scale, 1.0))

AX = {"X": [("Y", PI / 2)], "Y": [("X", PI / 2)], "Z": None}

class Part:
    def __init__(self, name):
        self.name, self.bm, self.mats = name, bmesh.new(), []

    def _apply(self, before, m, smooth):
        if m not in self.mats: self.mats.append(m)
        mi = self.mats.index(m)
        for f in set(self.bm.faces) - before:
            f.material_index = mi
            f.smooth = smooth

    def box(self, size, loc, m, rot=None):
        before = set(self.bm.faces)
        bmesh.ops.create_cube(self.bm, size=1.0, matrix=T(loc, rot, size))
        self._apply(before, m, False)

    def cyl(self, r, depth, loc, m, axis="Z", segs=32, r2=None, rot=None, scale=(1, 1, 1)):
        before = set(self.bm.faces)
        R = (AX[axis] or []) + (rot or [])
        bmesh.ops.create_cone(self.bm, cap_ends=True, cap_tris=False, segments=segs, radius1=r, radius2=r if r2 is None else r2, depth=depth, matrix=T(loc, R or None, scale))
        self._apply(before, m, True)

    def sphere(self, r, loc, m, scale=(1, 1, 1), segs=32, cut=None):
        before = set(self.bm.faces)
        ret = bmesh.ops.create_uvsphere(self.bm, u_segments=segs, v_segments=segs // 2, radius=r, matrix=T(loc, None, scale))
        if cut:  # cut = lambda co: True to delete vertex
            bmesh.ops.delete(self.bm, geom=[v for v in ret["verts"] if v.is_valid and cut(v.co)], context="VERTS")
        self._apply(before, m, True)

    def ring(self, rin, rout, h, loc, m, axis="Y", segs=64, scale=(1, 1, 1)):
        before = set(self.bm.faces)
        M = T(loc, AX[axis], scale)
        vs = []
        for k in range(segs):
            a = 2 * PI * k / segs
            c, s = math.cos(a), math.sin(a)
            vs.append([self.bm.verts.new(M @ Vector((r * c, r * s, z))) for r, z in ((rout, -h / 2), (rout, h / 2), (rin, h / 2), (rin, -h / 2))])
        for k in range(segs):
            a, b = vs[k], vs[(k + 1) % segs]
            for i in range(4):
                j = (i + 1) % 4
                self.bm.faces.new((a[i], b[i], b[j], a[j]))
        self._apply(before, m, True)

    def tube(self, pts, r, m, segs=12, n=10):
        P = [Vector(p) for p in pts]
        S = []
        for i in range(len(P) - 1):
            p0 = P[i - 1] if i > 0 else 2 * P[i] - P[i + 1]
            p1, p2 = P[i], P[i + 1]
            p3 = P[i + 2] if i + 2 < len(P) else 2 * P[i + 1] - P[i]
            for k in range(n):
                t = k / n
                S.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t ** 3))
        S.append(P[-1])
        before = set(self.bm.faces)
        tang = [(S[min(i + 1, len(S) - 1)] - S[max(i - 1, 0)]).normalized() for i in range(len(S))]
        up = Vector((0, 0, 1)) if abs(tang[0].z) < 0.9 else Vector((1, 0, 0))
        nrm = tang[0].cross(up).normalized()
        rings = []
        for i, p in enumerate(S):
            t = tang[i]
            nrm = (nrm - t * nrm.dot(t)).normalized()
            bi = t.cross(nrm)
            rings.append([self.bm.verts.new(p + (nrm * math.cos(2 * PI * k / segs) + bi * math.sin(2 * PI * k / segs)) * r) for k in range(segs)])
        for i in range(len(rings) - 1):
            for k in range(segs):
                self.bm.faces.new((rings[i][k], rings[i][(k + 1) % segs], rings[i + 1][(k + 1) % segs], rings[i + 1][k]))
        self.bm.faces.new(list(reversed(rings[0])))
        self.bm.faces.new(rings[-1])
        self._apply(before, m, True)

    def finish(self, parent, recalc=True):
        bm = self.bm
        if recalc:
            bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
        for e in bm.edges:
            ang = e.calc_face_angle(None)
            if ang is None or ang > 0.65:
                e.smooth = False
        me = bpy.data.meshes.new(self.name)
        bm.to_mesh(me)
        bm.free()
        for m in self.mats:
            me.materials.append(m)
        ob = bpy.data.objects.new(self.name, me)
        col.objects.link(ob)
        ob.parent = parent
        return ob

def group(name, parent=None, loc=(0, 0, 0)):
    e = bpy.data.objects.new(name, None)
    e.empty_display_size = 0.2
    e.location = loc
    col.objects.link(e)
    e.parent = parent
    return e

# ================================================================ CH1 — progressive die: brass strip -> terminals
g1 = group("ch_strip")
p = Part("coil")
p.ring(0.22, 0.78, 0.36, (0, 0, 0), brass, "Y", 96)
for i, r in enumerate([0.32, 0.42, 0.52, 0.62, 0.72]):
    p.ring(r, r + 0.012, 0.362, (0, 0, 0), brass_dark, "Y", 96)
p.cyl(0.22, 0.5, (0, 0, 0), steel_dark, "Y", 32)  # mandrel
p.finish(g1).location = (-1.15, 0, 0.42)

p = Part("strip_feed")
Z = -0.36
p.box((1.9, 0.36, 0.014), (-1.25, 0, Z), brass)          # plain strip (left of die)
p.box((2.9, 0.07, 0.014), (1.05, 0.145, Z), brass)       # carrier band
pitch = 0.22
for i in range(13):
    x = -0.05 + i * pitch
    p.box((0.05, 0.06, 0.014), (x, 0.085, Z), brass)       # neck
    p.box((0.14, 0.15, 0.014), (x, -0.005, Z), brass)      # flag body
    p.cyl(0.028, 0.016, (x, -0.005, Z + 0.001), cavity, "Z", 16)  # stud hole
    for side in (-1, 1):                                     # crimp wings bent up
        p.box((0.11, 0.012, 0.07), (x, -0.105 + side * 0.03, Z + 0.035), brass)
    p.box((0.11, 0.072, 0.014), (x, -0.105, Z), brass)
p.finish(g1)

p = Part("die_bottom")
p.box((0.75, 0.75, 0.22), (0.12, 0, Z - 0.12), steel)
p.box((0.95, 0.95, 0.1), (0.12, 0, Z - 0.28), steel_dark)
for sx in (-1, 1):
    for sy in (-1, 1):
        p.cyl(0.035, 0.95, (0.12 + sx * 0.4, sy * 0.4, Z + 0.22), tin, "Z", 20)
p.finish(g1)
p = Part("die_top")
p.box((0.75, 0.75, 0.24), (0.12, 0, Z + 0.2), steel)
p.box((0.95, 0.95, 0.1), (0.12, 0, Z + 0.37), steel_dark)
p.box((0.1, 0.1, 0.06), (0.12, 0, Z + 0.06), steel_dark)  # punch
p.finish(g1)

# ================================================================ CH2 — cut, strip & crimp
g2 = group("ch_crimp")
p = Part("wire")
p.cyl(0.09, 1.6, (-0.85, 0, 0), wire["red"], "X", 32)
p.cyl(0.091, 0.004, (-0.05, 0, 0), copper, "X", 32)
for k in range(7):
    if k == 0: off = (0, 0)
    else:
        a = 2 * PI * k / 6
        off = (math.cos(a) * 0.056, math.sin(a) * 0.056)
    p.cyl(0.028, 0.38, (0.14, off[0], off[1]), copper, "X", 12)
p.finish(g2)

p = Part("term_body")
p.box((0.62, 0.24, 0.02), (0.65, 0, -0.105), tin)         # base plate
p.box((0.6, 0.24, 0.17), (0.66, 0, -0.01), tin)           # receptacle box
p.box((0.012, 0.18, 0.11), (0.965, 0, -0.01), cavity)     # receptacle opening
p.box((0.3, 0.24, 0.02), (0.12, 0, -0.115), tin)          # crimp floor
p.box((0.2, 0.28, 0.02), (-0.15, 0, -0.125), tin)
p.finish(g2)
p = Part("wings_open")
for x, w, hgt in ((0.13, 0.22, 0.2), (-0.15, 0.2, 0.24)):
    for s in (-1, 1):
        p.box((w, 0.018, hgt), (x, s * (0.105 if x > 0 else 0.125), -0.105 + hgt / 2), tin)
p.finish(g2)
p = Part("wings_closed")
p.cyl(0.105, 0.24, (0.13, 0, 0), tin, "X", 32, scale=(1, 1, 1))
p.cyl(0.115, 0.2, (-0.15, 0, 0), tin, "X", 32)
p.box((0.24, 0.02, 0.012), (0.13, 0, 0.106), steel_dark)  # crimp seam
p.finish(g2)
p = Part("ram")
p.box((0.7, 0.6, 0.5), (0.0, 0, 0.55), steel)
p.box((0.5, 0.35, 0.18), (0.0, 0, 0.21), steel_dark)
p.box((0.95, 0.75, 0.12), (0.0, 0, 0.86), board_edge)
p.finish(g2)
p = Part("anvil")
p.box((0.6, 0.5, 0.3), (0.0, 0, -0.27), steel)
p.box((1.6, 0.9, 0.12), (0.2, 0, -0.48), steel_dark)
p.finish(g2)

# ================================================================ CH3 — injection moulding + terminal insertion
g3 = group("ch_mould")
p = Part("housing")
p.box((0.9, 0.55, 0.44), (0, 0, 0), nylon)
p.box((0.3, 0.2, 0.06), (0, -0.05, 0.25), nylon)          # latch
p.box((0.18, 0.12, 0.05), (0, -0.2, 0.3), nylon)
for i in range(4):
    x = -0.315 + i * 0.21
    p.box((0.12, 0.012, 0.12), (x, -0.276, -0.02), cavity)   # mating face cavities
    p.box((0.14, 0.012, 0.14), (x, 0.276, -0.02), cavity)    # wire entry cavities
p.box((0.94, 0.04, 0.04), (0, -0.27, -0.24), nylon)       # rib
p.finish(g3)
p = Part("pins")
for i, c in enumerate(["red", "black", "blue", "green"]):
    x = -0.315 + i * 0.21
    p.box((0.1, 0.3, 0.08), (x, 0.1, -0.02), tin)
    p.cyl(0.05, 0.12, (x, 0.3, -0.02), tin, "Y", 20)
    p.tube([(x, 0.34, -0.02), (x, 0.8, -0.02), (x * 1.6, 1.3, -0.12), (x * 2.2, 1.9, -0.3)], 0.045, wire[c], 14, 8)
p.finish(g3)
for nm, sx in (("mould_a", -1), ("mould_b", 1)):
    p = Part(nm)
    p.box((0.75, 1.1, 1.0), (sx * 0.375, 0, 0), steel)
    p.box((0.08, 1.12, 1.02), (sx * 0.72, 0, 0), steel_dark)
    for sz in (-1, 1):
        p.cyl(0.05, 0.12, (sx * 0.02, 0.4, sz * 0.38), tin, "X", 20)
    if sx < 0:
        p.cyl(0.08, 0.4, (sx * 0.9, 0, 0), steel_dark, "X", 24)  # sprue / nozzle
    p.finish(g3)

# ================================================================ CH4 — wire harness assembly
g4 = group("ch_harness")
TRUNK = [(-1.55, 0, 0.0), (-0.9, 0, 0.12), (-0.4, 0, 0.05), (0.5, 0, -0.06), (1.0, 0, -0.1), (1.55, 0, 0.0)]
B1 = [(-0.4, 0, 0.05), (-0.5, 0, 0.45), (-0.75, 0, 0.95)]
B2 = [(0.5, 0, -0.06), (0.65, 0, -0.45), (0.95, 0, -0.9)]
def seg(path, a, b):
    """sub-path of a polyline between x positions a..b (path roughly monotonic in x)."""
    return [p for p in path if a - 1e-6 <= p[0] <= b + 1e-6]
def off(path, d):
    return [(p[0] + d[0], p[1] + d[1], p[2] + d[2]) for p in path]
routes = {
    "red":    off(TRUNK, (0, 0.03, 0.025)),
    "black":  off(TRUNK, (0, -0.03, 0.025)),
    "orange": off(TRUNK, (0, 0.0, -0.035)),
    "yellow": off(seg(TRUNK, -1.6, -0.45) + [(-0.42, 0, 0.1)] + B1[1:], (0, 0.03, 0)),
    "green":  off(list(reversed(seg(TRUNK, -0.3, 1.6))) + [(-0.36, 0, 0.12)] + B1[1:], (0, -0.03, 0)),
    "blue":   off(seg(TRUNK, -1.6, 0.45) + [(0.53, 0, -0.12)] + B2[1:], (0, 0.03, 0)),
    "white":  off(seg(TRUNK, -1.6, 0.45) + [(0.55, 0, -0.1)] + B2[1:], (0, -0.03, -0.02)),
}
# green route: right end -> left; re-order its x so it reads right-to-left properly
for c, pts in routes.items():
    p = Part("w_" + c)
    p.tube(pts, 0.024, wire[c], 12, 8)
    p.finish(g4)

p = Part("tape")
def bands(path, a, b, step=0.17, ln=0.08, r=0.075):
    S = []
    P = [Vector(q) for q in path]
    total = sum((P[i + 1] - P[i]).length for i in range(len(P) - 1))
    d = a
    while d < total - b:
        acc = 0
        for i in range(len(P) - 1):
            L = (P[i + 1] - P[i]).length
            if acc + L >= d:
                t = (d - acc) / L
                pos = P[i].lerp(P[i + 1], t)
                dirv = (P[i + 1] - P[i]).normalized()
                S.append((pos, dirv))
                break
            acc += L
        d += step
    for pos, dirv in S:
        rot = dirv.to_track_quat("Z", "Y").to_matrix().to_4x4()
        before = set(p.bm.faces)
        bmesh.ops.create_cone(p.bm, cap_ends=True, cap_tris=False, segments=20, radius1=r, radius2=r, depth=ln, matrix=Matrix.Translation(pos) @ rot)
        p._apply(before, tape, True)
bands(TRUNK, 0.25, 0.25)
bands(B1, 0.15, 0.2, r=0.055)
bands(B2, 0.15, 0.2, r=0.055)
p.finish(g4)

p = Part("clips")
for x, z in ((-1.05, 0.13), (0.95, -0.09)):
    p.cyl(0.085, 0.07, (x, 0, z), clip_mat, "X", 24)
    p.box((0.05, 0.05, 0.22), (x, 0.0, z - 0.18), clip_mat)
    p.cyl(0.06, 0.03, (x, 0, z - 0.3), clip_mat, "Z", 20)
p.cyl(0.1, 0.09, (0.05, 0, 0.0), nylon_black, "X", 28)  # grommet
p.cyl(0.13, 0.03, (0.05, 0, 0.0), nylon_black, "X", 28)
p.finish(g4)

def connector(name, loc, size, m, ways, axis):
    p = Part(name)
    sx, sy, sz = size
    if axis == "X":
        p.box((sx, sy, sz), (0, 0, 0), m)
        p.box((sx * 0.5, sy * 0.4, 0.04), (0, 0, sz / 2 + 0.02), m)  # latch
        for i in range(ways):
            yy = (i - (ways - 1) / 2) * (sy / ways)
            p.box((0.01, sy / ways * 0.6, sz * 0.45), (math.copysign(sx / 2 + 0.003, loc[0]), yy, 0), cavity)
    else:
        p.box((sx, sy, sz), (0, 0, 0), m)
        p.box((0.04, sy * 0.4, sz * 0.5), (sx / 2 + 0.02, 0, 0), m)
        for i in range(ways):
            xx = (i - (ways - 1) / 2) * (sx / ways)
            p.box((sx / ways * 0.6, sy * 0.45, 0.01), (xx, 0, math.copysign(sz / 2 + 0.003, loc[2])), cavity)
    ob = p.finish(g4)
    ob.location = loc
    return ob
connector("conn_main", (-1.68, 0, 0.0), (0.26, 0.3, 0.26), nylon, 4, "X")
connector("conn_meter", (1.68, 0, 0.0), (0.26, 0.2, 0.2), nylon_black, 2, "X")
connector("conn_lamp", (-0.75, 0, 1.07), (0.22, 0.2, 0.24), nylon_grey, 2, "Z")
connector("conn_winker", (0.95, 0, -1.02), (0.22, 0.2, 0.24), nylon_black, 2, "Z")

# ================================================================ CH5 — harness tester board
g5 = group("ch_test")
p = Part("tester")
p.box((4.0, 0.08, 2.7), (0, 0.42, 0.0), board)
p.box((4.1, 0.1, 0.06), (0, 0.42, 1.38), board_edge)
p.box((4.1, 0.1, 0.06), (0, 0.42, -1.38), board_edge)
for x, z, w, h in ((-1.68, 0, 0.36, 0.4), (1.68, 0, 0.36, 0.34), (-0.75, 1.07, 0.34, 0.36), (0.95, -1.02, 0.34, 0.36)):
    p.box((w, 0.28, h), (x, 0.24, z), steel_dark)  # mating fixtures
for x in (-1.2, 0.0, 1.2):
    for z in (1.0, -1.0):
        p.cyl(0.03, 0.02, (x + 0.5, 0.37, z), tin, "Y", 16)  # board pins
p.finish(g5)
for i in range(6):
    p = Part(f"led_{i}")
    p.sphere(0.045, (1.15 + i * 0.13, 0.33, 1.15), led[i], (1, 1, 1), 16)
    p.finish(g5)
p = Part("screen")
p.box((0.75, 0.04, 0.42), (1.5, 0.36, 0.75), steel_dark)
p.box((0.66, 0.02, 0.34), (1.5, 0.335, 0.75), screen)
p.finish(g5)

# ================================================================ CH6 — headlamp: the harness's destination
g6 = group("ch_lamp")
p = Part("lamp_shell")
p.sphere(0.95, (0, 0, 0), shell, (1, 0.72, 0.82), 48, cut=lambda co: co.y < -0.01)
p.cyl(0.26, 0.4, (0, 0.78, 0), shell, "Y", 32)               # bulb socket boss
p.box((0.36, 0.3, 0.26), (0.0, 1.05, -0.05), nylon_black)    # rear socket housing
p.box((0.24, 0.012, 0.14), (0.0, 1.205, -0.05), cavity)
for sx in (-1, 1):
    p.box((0.18, 0.12, 0.08), (sx * 0.98, 0.15, -0.35), shell)  # mounting ears
p.finish(g6, recalc=False)
p = Part("reflector")
p.sphere(0.9, (0, -0.005, 0), chrome, (1, 0.66, 0.78), 48, cut=lambda co: co.y < -0.02)
p.finish(g6, recalc=False)
p = Part("bezel")
p.ring(0.92, 1.02, 0.07, (0, -0.02, 0), steel_dark, "Y", 72, scale=(1, 0.82, 1))
p.finish(g6)
lb = Part("lamp_bulb")
lb.sphere(0.11, (0, 0.38, 0), bulb, (1, 1.3, 1), 24)
lb.cyl(0.06, 0.18, (0, 0.55, 0), tin, "Y", 20)
lb.finish(g6)
p = Part("lens")
p.sphere(0.96, (0, -0.02, 0), lens, (1, 0.2, 0.82), 48, cut=lambda co: co.y > -0.01)
p.finish(g6, recalc=False)
p = Part("lamp_plug")
p.box((0.3, 0.26, 0.2), (0.0, 1.36, -0.05), nylon_grey)
p.box((0.14, 0.08, 0.04), (0.0, 1.36, 0.07), nylon_grey)
for i, c in enumerate(["yellow", "black", "red"]):
    x = (i - 1) * 0.07
    p.tube([(x, 1.48, -0.05), (x, 1.75, -0.05), (x + 0.3, 2.05, -0.25), (x + 0.9, 2.3, -0.6)], 0.022, wire[c], 10, 8)
p.finish(g6)

# ================================================================ export GLB
bpy.ops.object.select_all(action="SELECT")
bpy.ops.export_scene.gltf(
    filepath=os.path.join(OUT, "daepl-story.glb"), export_format="GLB", export_yup=True,
    export_apply=True, export_materials="EXPORT", export_cameras=False, export_lights=False,
    export_extras=False, use_selection=False,
)
print("EXPORTED", os.path.join(OUT, "daepl-story.glb"))

# ================================================================ render stills
scene.render.engine = "BLENDER_EEVEE_NEXT"
try:
    scene.eevee.taa_render_samples = 64
    scene.eevee.use_raytracing = True
except Exception:
    pass
scene.render.resolution_x, scene.render.resolution_y = 1400, 1000
scene.render.film_transparent = True
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
scene.view_settings.view_transform = "AgX"
scene.view_settings.look = "AgX - Medium High Contrast"

world = bpy.data.worlds.new("w")
world.use_nodes = True
bg = world.node_tree.nodes["Background"]
bg.inputs["Color"].default_value = (*lin("#2a3f5f"), 1)
bg.inputs["Strength"].default_value = 0.7
scene.world = world

def area(name, loc, energy, size, color="#ffffff"):
    L = bpy.data.lights.new(name, "AREA")
    L.energy, L.size, L.color = energy, size, lin(color)
    o = bpy.data.objects.new(name, L)
    o.location = loc
    col.objects.link(o)
    c = o.constraints.new("TRACK_TO")
    c.target = target
    return o

target = group("target")
area("key", (3, -4, 4), 900, 3)
area("fill", (-4, -3, 1.5), 350, 4, "#bcd6ff")
area("rim", (0, 4, 3), 600, 3, "#ffd2ad")
cam_data = bpy.data.cameras.new("cam")
cam_data.lens = 50
cam = bpy.data.objects.new("cam", cam_data)
col.objects.link(cam)
cam.constraints.new("TRACK_TO").target = target
scene.camera = cam

chapters = {"ch_strip": g1, "ch_crimp": g2, "ch_mould": g3, "ch_harness": g4, "ch_test": g5, "ch_lamp": g6}
def show(*names):
    for n, g in chapters.items():
        vis = n in names
        for o in [g] + list(g.children_recursive):
            o.hide_render = not vis

def emis(m, s):
    m.node_tree.nodes["Principled BSDF"].inputs["Emission Strength"].default_value = s

shots = [
    ("strip", ["ch_strip"], (1.9, -3.9, 2.5), (0.15, 0, -0.1)),
    ("crimp", ["ch_crimp"], (1.3, -3.2, 1.0), (0.0, 0, 0.1)),
    ("mould", ["ch_mould"], (2.6, 2.9, 1.9), (0.0, 0.3, 0.0)),
    ("harness", ["ch_harness"], (0.0, -5.2, 1.2), (0.0, 0, 0.0)),
    ("test", ["ch_harness", "ch_test"], (1.6, -5.4, 1.6), (0.0, 0, 0.0)),
    ("lamp", ["ch_lamp"], (-2.9, -2.6, 1.0), (0.0, 0.4, 0.0)),
]
O = lambda n: bpy.data.objects[n]
for name, groups, cloc, tloc in shots:
    show(*groups)
    cam.location, target.location = cloc, tloc
    O("wings_open").hide_render = name != "crimp_open"
    if name == "mould":
        O("mould_a").location = (-0.95, 0, 0)
        O("mould_b").location = (0.95, 0, 0)
    for w in wire.values(): emis(w, 0.0)
    for m in led: emis(m, 6.0 if name == "test" else 0.0)
    emis(screen, 3.0 if name == "test" else 0.0)
    emis(bulb, 40.0 if name == "lamp" else 0.0)
    scene.render.filepath = os.path.join(OUT, f"story-{name}.png")
    bpy.ops.render.render(write_still=True)
    print("RENDERED", name)
