# Appended after build_story.py: compose a wide "product family" hero shot.
import bpy, os
O = bpy.data.objects
for n in ("ch_strip","ch_crimp","ch_mould","ch_harness","ch_test","ch_lamp"):
    for o in [O[n]] + list(O[n].children_recursive): o.hide_render = n not in ("ch_strip","ch_mould","ch_harness","ch_lamp")
for n in ("mould_a","mould_b"): O[n].hide_render = True
O["ch_harness"].location = (0, 0, 0); O["ch_harness"].rotation_euler = (-1.15, 0, 0.3)
O["ch_lamp"].location = (1.55, 1.9, 0.75); O["ch_lamp"].rotation_euler = (0, 0, 0.35); O["ch_lamp"].scale = (1.15,)*3
O["ch_strip"].location = (-1.9, 2.3, 0.35); O["ch_strip"].scale = (0.62,)*3; O["ch_strip"].rotation_euler = (0, 0, 0.35)
O["ch_mould"].location = (1.0, -1.25, -0.25); O["ch_mould"].scale = (0.75,)*3; O["ch_mould"].rotation_euler = (0, 0, -0.7)
O["pins"].location = (0,0,0)
bpy.data.materials["bulb"].node_tree.nodes["Principled BSDF"].inputs["Emission Strength"].default_value = 40
for m in bpy.data.materials:
    if m.name.startswith("led_"): m.node_tree.nodes["Principled BSDF"].inputs["Emission Strength"].default_value = 0
s = bpy.context.scene
s.render.resolution_x, s.render.resolution_y = 1800, 1400
O["cam"].data.lens = 42
O["cam"].location = (2.4, -6.6, 3.9); O["target"].location = (0.05, 0.35, 0.1)
s.render.filepath = os.path.join(OUT, "story-hero.png")
bpy.ops.render.render(write_still=True)
print("HERO DONE")
