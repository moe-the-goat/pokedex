import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  test("adds and gets item from cache", () => {
    const cache = new Cache(1000);
    cache.add("https://example.com", "val1");
    const actual = cache.get("https://example.com");
    expect(actual).toBe("val1");
    cache.stopReapLoop();
  });

  test("reaps old entries after interval", async () => {
    const interval = 50;
    const cache = new Cache(interval);
    cache.add("https://example.com", "val1");

    await new Promise((resolve) => setTimeout(resolve, interval * 2 + 10));

    const actual = cache.get("https://example.com");
    expect(actual).toBeUndefined();
    cache.stopReapLoop();
  });
});
