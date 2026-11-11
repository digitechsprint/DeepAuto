"use client";

import { useState } from "react";

type FormKind = "rfq" | "contact" | "apply";

const details: Record<FormKind, { title: string; intro: string; submit: string }> = {
  rfq: {
    title: "Tell us what you’re building.",
    intro: "Share a few details and our team can understand your requirement. Drawings and specifications are welcome.",
    submit: "Send quote request",
  },
  contact: {
    title: "Start a conversation.",
    intro: "Tell us a little about your enquiry and the right person on our team can get back to you.",
    submit: "Send your enquiry",
  },
  apply: {
    title: "Your next move starts here.",
    intro: "Share your contact details and the role you’re interested in. Our team can follow up when a suitable opening is available.",
    submit: "Send your details",
  },
};

export function EnquiryForm({ kind = "rfq", product = "" }: { kind?: FormKind; product?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const content = details[kind];
  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span className="success-icon">✓</span>
        <span className="eyebrow">MESSAGE READY</span>
        <h3>Thanks for reaching out.</h3>
        <p>This site preview isn’t connected to the enquiry inbox yet. Your form has not been sent. Connect the approved DAEPL email or CRM endpoint before launch.</p>
        <button className="text-button" type="button" onClick={() => setSubmitted(false)}>Back to form <span>↗</span></button>
      </div>
    );
  }
  return (
    <form
      className="enquiry-form"
      onSubmit={(event) => {
        event.preventDefault();
        if ((event.currentTarget as HTMLFormElement).reportValidity()) setSubmitted(true);
      }}
    >
      <div className="form-heading">
        <span className="eyebrow">LET’S MAKE SOMETHING BETTER</span>
        <h2>{content.title}</h2>
        <p>{content.intro}</p>
      </div>
      {kind === "rfq" && (
        <label className="form-field">
          <span>Product or part name <i>*</i></span>
          <input name="product" required defaultValue={product} placeholder="e.g. Automotive wire harness" />
        </label>
      )}
      <div className="form-grid">
        <label className="form-field">
          <span>Your name <i>*</i></span>
          <input name="name" required autoComplete="name" placeholder="Full name" />
        </label>
        {kind !== "apply" && (
          <label className="form-field">
            <span>Company</span>
            <input name="company" autoComplete="organization" placeholder="Company name" />
          </label>
        )}
        <label className="form-field">
          <span>Work email <i>*</i></span>
          <input type="email" name="email" required autoComplete="email" placeholder="name@company.com" />
        </label>
        <label className="form-field">
          <span>Phone number <i>*</i></span>
          <input type="tel" name="phone" required autoComplete="tel" placeholder="+91" />
        </label>
        {kind === "rfq" && (
          <>
            <label className="form-field">
              <span>Estimated quantity</span>
              <input name="quantity" inputMode="numeric" placeholder="e.g. 10,000 pieces" />
            </label>
            <label className="form-field">
              <span>Target date</span>
              <input type="date" name="targetDate" />
            </label>
          </>
        )}
        {kind === "apply" && (
          <label className="form-field">
            <span>Area of interest</span>
            <select name="department" defaultValue="">
              <option value="" disabled>Select a department</option>
              <option>Manufacturing</option>
              <option>Quality</option>
              <option>Engineering</option>
              <option>Other</option>
            </select>
          </label>
        )}
      </div>
      <label className="form-field">
        <span>{kind === "apply" ? "A little about you" : "Tell us more"}{kind === "contact" && <i> *</i>}</span>
        <textarea name="message" rows={4} required={kind === "contact"} placeholder={kind === "apply" ? "Your experience, interests and preferred location…" : "Your application, specifications or any questions…"} />
      </label>
      {(kind === "rfq" || kind === "apply") && (
        <label className="file-upload">
          <input
            type="file"
            accept={kind === "apply" ? ".pdf,.doc,.docx" : ".pdf,.dwg,.dxf,.jpg,.jpeg,.png"}
            multiple={kind === "rfq"}
            onChange={(event) => {
              const files = Array.from(event.target.files ?? []);
              const maxFiles = kind === "rfq" ? 5 : 1;
              const invalidFile = files.find((file) => file.size > 10 * 1024 * 1024);
              if (files.length > maxFiles || invalidFile) {
                setFileError(invalidFile ? `${invalidFile.name} exceeds the 10 MB limit.` : `Choose no more than ${maxFiles} file${maxFiles === 1 ? "" : "s"}.`);
                setFileName("");
                event.target.value = "";
                return;
              }
              setFileError("");
              setFileName(files.map((file) => file.name).join(", "));
            }}
          />
          <span className="upload-icon">↑</span>
          <span><strong>{fileName || "Add a drawing or document"}</strong><small>{kind === "apply" ? "PDF or DOC · up to 10 MB" : "PDF, DWG, DXF or image · up to 5 files, 10 MB each"}</small></span>
          <span className="upload-browse">Browse files</span>
        </label>
      )}
      {fileError && <p className="form-error" role="alert">{fileError}</p>}
      <label className="consent-check">
        <input type="checkbox" required />
        <span>I agree to the <a href="/privacy">privacy policy</a> and understand my information will be used to respond to this enquiry.</span>
      </label>
      <button className="button button-dark form-submit" type="submit">{content.submit}<span>↗</span></button>
      <p className="form-disclaimer">Your details are handled with care and used only to follow up on your enquiry.</p>
    </form>
  );
}
