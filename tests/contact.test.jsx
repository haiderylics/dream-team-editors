// @vitest-environment jsdom
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Contact from "../src/components/Contact.jsx";
import { contactDetails } from "../src/data/content.js";
vi.mock("../src/data/content.js", () => ({
  contactDetails: {
    enabled: true, email: "editors.dreamteam@gmail.com", whatsappDisplay: "+92 334 6364200",
    formEndpoint: "https://formsubmit.co/ajax/editors.dreamteam@gmail.com",
  },
  whatsappUrl: "https://wa.me/923346364200",
  serviceOptions: ["Color Grading", "Photography"],
}));
function fillForm() {
  fireEvent.change(screen.getByPlaceholderText("How should we call you?"), {
    target: { value: "Test Creator" },
  });
  fireEvent.change(screen.getByPlaceholderText("you@company.com"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "Color Grading" },
  });
  fireEvent.change(
    screen.getByRole("textbox", { name: /Tell us about your project/ }),
    { target: { value: "A cinematic color grade for a short brand film." } },
  );
  return screen.getByRole("button", { name: "Let’s make it happen" });
}
beforeEach(() => {
  contactDetails.enabled = true;
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
describe("Project enquiry delivery", () => {
  it("posts the enquiry to the configured email service and shows provider acceptance", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: "true", message: "Form submitted successfully" }) });
    vi.stubGlobal("fetch", fetchMock);
    render(<Contact />);
    fireEvent.click(fillForm());
    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toContain(
        "submitted successfully",
      ),
    );
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://formsubmit.co/ajax/editors.dreamteam@gmail.com");
    const body = JSON.parse(options.body);
    expect(body.name).toBe("Test Creator");
    expect(body.service).toBe("Color Grading");
    expect(body._subject).toContain("Dream Team Editors");
    expect(body).toHaveProperty("_honey", "");
    expect(screen.getByPlaceholderText("you@company.com").value).toBe("");
  });
  it("retains entered data on HTTP failure and supports retry", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ success: "true", message: "Form submitted successfully" }) });
    vi.stubGlobal("fetch", fetchMock);
    render(<Contact />);
    fireEvent.click(fillForm());
    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toContain(
        "could not be sent",
      ),
    );
    expect(screen.getByPlaceholderText("you@company.com").value).toBe(
      "test@example.com",
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Let’s make it happen" }),
    );
    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toContain(
        "submitted successfully",
      ),
    );
  });
  it("does not transmit a demo enquiry or falsely report success", async () => {
    contactDetails.enabled = false;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<Contact />);
    fireEvent.click(fillForm());
    expect(screen.getByRole("status").textContent).toContain(
      "does not send enquiries",
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("blocks an empty form with native validation", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<Contact />);
    fireEvent.click(
      screen.getByRole("button", { name: "Let’s make it happen" }),
    );
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByPlaceholderText("you@company.com").validity.valid).toBe(
      false,
    );
  });
  it("reports a network failure without discarding the brief", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network offline")),
    );
    render(<Contact />);
    fireEvent.click(fillForm());
    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toContain(
        "could not be sent",
      ),
    );
    expect(
      screen.getByRole("textbox", { name: /Tell us about your project/ }).value,
    ).toContain("cinematic color grade");
  });
});

it("does not claim success for a rejected response with HTTP 200", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: "false", message: "Unable to submit" }) }));
  render(<Contact />);
  fireEvent.click(fillForm());
  await waitFor(() => expect(screen.getByRole("status").textContent).toContain("could not be sent"));
  expect(screen.getByPlaceholderText("you@company.com").value).toBe("test@example.com");
});
it("preserves the enquiry and offers direct contact when activation is required", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: "true", message: "Please activate your form" }) }));
  render(<Contact />);
  fireEvent.click(fillForm());
  await waitFor(() => expect(screen.getByRole("status").textContent).toContain("temporarily unavailable"));
  expect(screen.getByPlaceholderText("you@company.com").value).toBe("test@example.com");
  expect(screen.getByRole("link", { name: "Email us" }).getAttribute("href")).toBe("mailto:editors.dreamteam@gmail.com");
});
