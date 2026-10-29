// @vitest-environment jsdom
import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Achievements, MeetUs, Testimonials } from "../src/components/StudioSections.jsx";
import { testimonials } from "../src/data/content.js";
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
it("lets visitors select and cycle through testimonials with buttons and keys", () => {
  render(<Testimonials />);
  expect(screen.getByRole("blockquote").textContent).toBe(testimonials[0].quote);
  fireEvent.click(screen.getByRole("button", { name: "Next testimonial" }));
  expect(screen.getByRole("blockquote").textContent).toBe(testimonials[1].quote);
  fireEvent.keyDown(screen.getByRole("region", { name: "Testimonials" }), { key: "ArrowLeft" });
  expect(screen.getByRole("blockquote").textContent).toBe(testimonials[0].quote);
  fireEvent.click(screen.getByRole("button", { name: "Previous testimonial" }));
  expect(screen.getByRole("blockquote").textContent).toBe(testimonials[2].quote);
  fireEvent.click(screen.getByRole("button", { name: "Show testimonial 1" }));
  expect(screen.getByRole("blockquote").textContent).toBe(testimonials[0].quote);
});
it("exposes four keyboard-operable profiles with collapsible details", () => {
  render(<MeetUs />);
  expect(screen.getAllByRole("article")).toHaveLength(4);
  const toggle = screen.getByRole("button", { name: "View profile for Team member 01" });
  const bio = document.getElementById(toggle.getAttribute("aria-controls"));
  expect(bio.hidden).toBe(true);
  fireEvent.click(toggle);
  expect(bio.hidden).toBe(false);
  expect(toggle.getAttribute("aria-expanded")).toBe("true");
  fireEvent.click(toggle);
  expect(bio.hidden).toBe(true);
});
it("shows the final achievement values when reduced motion disables animation", () => {
  vi.stubGlobal("matchMedia", () => ({ matches: false, addListener() {}, removeListener() {} }));
  const { container } = render(<Achievements />);
  expect([...container.querySelectorAll("[data-count]")].map((el) => el.textContent)).toEqual(["10", "750", "160"]);
  expect(screen.getByText("Worldwide")).toBeTruthy();
});
