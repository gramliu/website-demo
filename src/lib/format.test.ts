import { describe, expect, it } from "vitest";
import { formatDate, truncate } from "./format";

describe("truncate", () => {
  it("leaves short strings unchanged", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("cuts long strings with an ellipsis", () => {
    expect(truncate("hello world", 5)).toBe("hell…");
  });
});

describe("formatDate", () => {
  it("formats as YYYY-MM-DD", () => {
    expect(formatDate(new Date("2026-08-24T12:00:00Z"))).toBe("2026-08-24");
  });
});
