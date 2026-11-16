"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type FormKind = "rfq" | "contact" | "apply";

const details: Record<FormKind, { eyebrow: string; title: string; intro: string; submit: string }> = {
  rfq: { eyebrow: "REQUEST FOR QUOTE", title: "Tell us what you need.", intro: "Share the part details, expected quantity and your drawing. Our NPD and sales team will review it and respond with feasibility and a quotation.", submit: "Submit quote request" },
  contact: { eyebrow: "SEND AN ENQUIRY", title: "How can we help?", intro: "Tell us a little about your enquiry and the right person on our team will get back to you.", submit: "Send enquiry" },
  apply: { eyebrow: "APPLY NOW", title: "Apply to join DAEPL.", intro: "Share your details and CV. Our HR team reviews every application and will contact shortlisted candidates.", submit: "Submit application" },
};

const MAX = 10 * 1024 * 1024;

export function EnquiryForm({ kind = "rfq", product = "", role = "" }: { kind?: FormKind; product?: string; role?: string }) {
  const router = useRouter();
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const content = details[kind];

  return (
    <form
      className="enquiry-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (fileError) return;
        // TODO(before launch): POST to the enquiry / careers API (admin panel + email notification).
        if (event.currentTarget.reportValidity()) router.push(`/thank-you?type=${kind}`);
      }}
    >
      <div className="form-heading">
        <span className="eyebrow">{content.eyebrow}</span>
        <h2>{content.title}</h2>
        <p>{content.intro}</p>
      </div>

      {kind === "rfq" && (
        <label className="form-field">
          <span>Part name / description <i>*</i></span>
          <input name="product" required defaultValue={product} placeholder="e.g. Head lamp assembly wire harness" />
        </label>
      )}
      {kind === "apply" && (
        <label className="form-field">
          <span>Position applying for <i>*</i></span>
          <input name="role" required defaultValue={role} placeholder="e.g. Quality Inspector" />
        </label>
      )}

      <div className="form-grid">
        <label className="form-field"><span>Full name <i>*</i></span><input name="name" required autoComplete="name" placeholder="Your name" /></label>
        {kind !== "apply" ? (
          <label className="form-field"><span>Company <i>{kind === "rfq" ? "*" : ""}</i></span><input name="company" required={kind === "rfq"} autoComplete="organization" placeholder="Company name" /></label>
        ) : (
          <label className="form-field"><span>Total experience <i>*</i></span><input name="experience" required placeholder="e.g. 3 years" /></label>
        )}
        <label className="form-field"><span>Email <i>*</i></span><input type="email" name="email" required autoComplete="email" placeholder="name@company.com" /></label>
        <label className="form-field"><span>Mobile number <i>*</i></span><input type="tel" name="phone" required autoComplete="tel" inputMode="tel" pattern="[0-9+\s\-]{10,15}" placeholder="+91 98xxx xxxxx" /></label>

        {kind === "rfq" && (
          <>
            <label className="form-field"><span>Expected quantity <i>*</i></span><input name="quantity" required placeholder="e.g. 10,000 pcs / month" /></label>
            <label className="form-field">
              <span>Product category</span>
              <select name="category" defaultValue="">
                <option value="" disabled>Select a category</option>
                <option>Wire harness</option><option>Electrical terminals</option><option>Sheet metal components</option><option>Plastic moulded parts</option><option>Other / not sure</option>
              </select>
            </label>
            <label className="form-field"><span>Application / vehicle</span><input name="application" placeholder="e.g. Two-wheeler head lamp" /></label>
            <label className="form-field"><span>Target date</span><input type="date" name="targetDate" /></label>
          </>
        )}

        {kind === "contact" && (
          <label className="form-field form-field-wide">
            <span>Enquiry about</span>
            <select name="topic" defaultValue="">
              <option value="" disabled>Select a topic</option>
              <option>New business / quotation</option><option>Quality & certification</option><option>Production & dispatch</option><option>Careers</option><option>Vendor registration</option><option>Other</option>
            </select>
          </label>
        )}

        {kind === "apply" && (
          <>
            <label className="form-field"><span>Current CTC (per annum)</span><input name="currentCtc" placeholder="₹" /></label>
            <label className="form-field"><span>Expected CTC (per annum)</span><input name="expectedCtc" placeholder="₹" /></label>
            <label className="form-field"><span>Notice period</span><input name="notice" placeholder="e.g. 30 days" /></label>
            <label className="form-field">
              <span>Preferred plant</span>
              <select name="plant" defaultValue="">
                <option value="" disabled>Select a plant</option>
                <option>Samaypur, Delhi</option><option>Bawana, Delhi</option><option>IMT Manesar, Haryana (upcoming)</option><option>Any</option>
              </select>
            </label>
          </>
        )}
      </div>

      <label className="form-field">
        <span>{kind === "apply" ? "Anything else you'd like us to know?" : kind === "rfq" ? "Specifications & notes" : "Your message"}{kind === "contact" && <i> *</i>}</span>
        <textarea name="message" rows={4} required={kind === "contact"} placeholder={kind === "apply" ? "Skills, machines you have worked on, certifications…" : kind === "rfq" ? "Material, wire size, terminal type, packaging, special requirements…" : "How can we help?"} />
      </label>

      {(kind === "rfq" || kind === "apply") && (
        <label className="file-upload">
          <input
            type="file"
            name={kind === "apply" ? "cv" : "drawings"}
            required={kind === "apply"}
            accept={kind === "apply" ? ".pdf,.doc,.docx" : ".pdf,.dwg,.dxf,.jpg,.jpeg,.png"}
            multiple={kind === "rfq"}
            onChange={(event) => {
              const files = Array.from(event.target.files ?? []);
              const limit = kind === "rfq" ? 5 : 1;
              const big = files.find((f) => f.size > MAX);
              if (files.length > limit || big) {
                setFileError(big ? `${big.name} is larger than 10 MB.` : `Please choose up to ${limit} files.`);
                setFileName("");
                event.target.value = "";
                return;
              }
              setFileError("");
              setFileName(files.map((f) => f.name).join(", "));
            }}
          />
          <span className="upload-icon">↑</span>
          <span>
            <strong>{fileName || (kind === "apply" ? "Upload your CV *" : "Upload drawings")}</strong>
            <small>{kind === "apply" ? "PDF or Word · up to 10 MB" : "PDF, DWG, DXF or image · up to 5 files, 10 MB each"}</small>
          </span>
          <span className="upload-browse">Browse</span>
        </label>
      )}
      {fileError && <p className="form-error" role="alert">{fileError}</p>}

      <label className="consent-check">
        <input type="checkbox" required />
        <span>I agree to the <a href="/privacy">privacy policy</a> and consent to DAEPL using these details to respond to my {kind === "apply" ? "application" : "enquiry"}.</span>
      </label>
      <button className="button button-dark form-submit" type="submit">{content.submit}<span aria-hidden="true">→</span></button>
      <p className="form-disclaimer">We usually respond within one working day.</p>
    </form>
  );
}
