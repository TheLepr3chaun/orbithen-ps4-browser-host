# ORBIT // HEN SPACE

Independent PS4 homebrew dashboard focused on firmware 13.52.

## Current status
- Minimal dashboard and local diagnostics.
- Parses an explicit PS4 firmware token from `navigator.userAgent` when available; otherwise displays unknown.
- User-agent detection is advisory only. Confirm the installed firmware in **Settings → System → System Information**.
- Kernel R/W is **not verified**. The dashboard does not probe or write kernel memory.
- No exploit chain or GoldHEN handoff is integrated or verified by ORBIT.

## Why kernel R/W stays unverified
Ordinary page JavaScript cannot establish kernel read/write privileges. A user-agent token identifies browser-reported metadata, not exploit success. ORBIT's preflight is deliberately read-only to reduce risk while testing the UI.

## GoldHEN
GoldHEN is the HEN payload stage, not the browser exploit or kernel stage. Verify firmware compatibility and release details through the [official GoldHEN releases](https://github.com/GoldHEN/GoldHEN/releases) before integration.

## Development plan
1. Validate firmware detection against real PS4 browser user-agent strings.
2. Track source, license, and hashes for each documented 13.52-compatible component.
3. Keep browser-stage, kernel-stage, and GoldHEN handoff results separate.
4. Test components individually on hardware; back up saves before unverified kernel experiments.

## Deploy
Enable GitHub Pages for the repository's configured workflow. The dashboard preflight does not execute an exploit.

## Local preview
Run `python3 -m http.server 8000` in the repository root and open `http://localhost:8000`.


## Slopkit 13.xx host bridge

ORBIT's jailbreak panel now links to [WebKitty](https://github.com/ArabPixel/WebKitty), whose published firmware matrix lists the Slopkit + Relapse flow for PS4 firmware 13.02–13.52. The live host is [webkitty.arabpixel.net](https://webkitty.arabpixel.net/).

This is a **host bridge**, not a local exploit implementation: ORBIT opens the external host and logs that action, but it does not execute Slopkit, access kernel memory, or verify a HEN payload. The external project's own code, payloads, compatibility, and license terms remain separate; no RawGame source or exploit files are copied into ORBIT.

For a true self-hosted integration, review the full upstream source tree, individual third-party licenses, firmware-specific cache manifests, and payload compatibility before importing any files. Keep browser-stage, kernel-stage, and HEN handoff status distinct, and never infer success from the firmware token alone.
