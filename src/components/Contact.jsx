import { useRef, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { contactDetails, serviceOptions, whatsappUrl } from "../data/content";
export default function Contact() {
  const [status, setStatus] = useState("idle");
  const statusRef = useRef(null);
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!contactDetails.enabled) {
      setStatus("demo");
      return;
    }
    if (status === "sending") return;
    setStatus("sending");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const payload = Object.fromEntries(new FormData(form));
      payload._url = window.location.href;
      const response = await fetch(contactDetails.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Request failed");
      const result = await response.json();
      // An HTTP 200 can still mean the recipient needs to activate the form.
      if (/activat|confirm your email|verify your email/i.test(result.message || "")) {
        setStatus("unavailable");
        return;
      }
      if (result.success !== true && result.success !== "true") throw new Error("Submission rejected");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <section id="contact" className="contact section wrap">
      <div className="contact-intro">
        <span className="eyebrow">
          <i />
          Your next great project
        </span>
        <h2>
          Tell us what
          <br />
          you're <em>creating.</em>
        </h2>
        <p>
          A new channel. A new campaign. A moment worth keeping. Tell us what
          you have in mind.
        </p>
        <div className="contact-details">
          <span>Based in Punjab, Pakistan</span>
          <span>Creating across time zones</span>
          <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
          <a className="contact-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> {contactDetails.whatsappDisplay}
          </a>
        </div>
      </div>
      <form
        name="project-inquiry"
        method="POST"
        onSubmit={submit}
        className="contact-form"
      >
        <input type="hidden" name="_subject" value="New project enquiry — Dream Team Editors" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <p hidden>
          <label>
            Leave this empty
            <input name="_honey" tabIndex="-1" autoComplete="off" />
          </label>
        </p>
        <div className="form-row">
          <label>
            Your name <span>*</span>
            <input
              required
              minLength={2}
              maxLength={100}
              name="name"
              autoComplete="name"
              placeholder="How should we call you?"
            />
          </label>
          <label>
            Email <span>*</span>
            <input
              required
              name="email"
              type="email"
              maxLength={150}
              autoComplete="email"
              placeholder="you@company.com"
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            WhatsApp / Phone
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
              placeholder="Include your country code"
            />
          </label>
          <label>
            Company / Brand
            <input
              name="company"
              autoComplete="organization"
              maxLength={150}
              placeholder="Your brand, channel or business"
            />
          </label>
        </div>
        <label>
          What can we help with? <span>*</span>
          <select required name="service" defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
            <option>Multiple services / Let's discuss</option>
          </select>
        </label>
        <label>
          Tell us about your project <span>*</span>
          <textarea
            required
            minLength={20}
            maxLength={5000}
            rows={4}
            name="details"
            placeholder="The idea, the timeline, the feeling. We'd love to hear it."
          />
        </label>
        <div className="form-bottom">
          <p>
            {contactDetails.enabled
              ? `Your enquiry goes to ${contactDetails.email}.`
              : "Preview form · submissions are not sent yet."}
          </p>
          <button
            className="button blue"
            disabled={status === "sending"}
            type="submit"
          >
            {status === "sending" ? (
              <>
                <LoaderCircle className="spin" size={18} />
                Sending…
              </>
            ) : status === "success" ? (
              <>
                <Check size={18} />
                Sent
              </>
            ) : (
              "Let’s make it happen"
            )}
          </button>
        </div>
        <div
          ref={statusRef}
          role="status"
          aria-live="polite"
          className={`form-status ${status}`}
        >
          {status === "demo" &&
            "Your brief is ready. This preview does not send enquiries yet; the studio’s contact details will be connected before launch."}
          {status === "success" &&
            "Thanks for the brief. Your enquiry has been submitted successfully. We’ll be in touch."}
          {status === "unavailable" &&
            "Online enquiries are temporarily unavailable. Your details are still here; please email us or message us on WhatsApp."}
          {status === "error" &&
            "Your enquiry could not be sent. Your details are still here—please try again."}
          {(status === "error" || status === "unavailable") && (
            <span className="form-fallback-links">
              <a href={`mailto:${contactDetails.email}`}>Email us</a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
            </span>
          )}
        </div>
      </form>
    </section>
  );
}
