// @vitest-environment jsdom
import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { AmbientVideo } from "../src/components/Media.jsx";
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
function environment(reduced = false) {
  let observer;
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(fn) {
        observer = fn;
      }
      observe() {}
      disconnect() {}
    },
  );
  vi.stubGlobal("matchMedia", () => ({
    matches: reduced,
    addEventListener() {},
    removeEventListener() {},
  }));
  const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  const pause = vi
    .spyOn(HTMLMediaElement.prototype, "pause")
    .mockImplementation(() => {});
  vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
  return {
    visible: (state) => observer([{ isIntersecting: state }]),
    play,
    pause,
  };
}
it("defers the video request until visible and pauses when out of view", () => {
  const env = environment();
  const { container } = render(
    <AmbientVideo src="/media/hero.mp4" poster="/media/coast.webp" />,
  );
  const video = container.querySelector("video");
  expect(video.getAttribute("src")).toBe(null);
  env.visible(true);
  expect(video.getAttribute("src")).toBe("/media/hero.mp4");
  expect(env.play).toHaveBeenCalledTimes(1);
  env.visible(false);
  expect(env.pause).toHaveBeenCalled();
});
it("does not load or autoplay video when reduced motion is requested", () => {
  const env = environment(true);
  const { container } = render(
    <AmbientVideo src="/media/hero.mp4" poster="/media/coast.webp" />,
  );
  env.visible(true);
  expect(container.querySelector("video").getAttribute("src")).toBe(null);
  expect(env.play).not.toHaveBeenCalled();
});
it("honors the explicit video pause control", () => {
  const env = environment();
  const { container } = render(
    <AmbientVideo src="/media/hero.mp4" poster="/media/coast.webp" paused />,
  );
  env.visible(true);
  expect(container.querySelector("video").getAttribute("src")).toBe(null);
  expect(env.play).not.toHaveBeenCalled();
});
