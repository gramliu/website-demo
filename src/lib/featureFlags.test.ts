import { describe, expect, it } from "vitest";
import { enabledFlags, isFeatureEnabled } from "./featureFlags";

describe("isFeatureEnabled", () => {
  it("defaults unknown flags to false", () => {
    expect(isFeatureEnabled({}, "dark-mode")).toBe(false);
  });

  it("returns the flag value when present", () => {
    expect(isFeatureEnabled({ "dark-mode": true }, "dark-mode")).toBe(true);
  });
});

describe("enabledFlags", () => {
  it("lists enabled flags sorted", () => {
    expect(enabledFlags({ beta: true, alpha: true, off: false })).toEqual([
      "alpha",
      "beta",
    ]);
  });
});
