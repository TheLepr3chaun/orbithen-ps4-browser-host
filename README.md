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


## Raw13G firmware 13.02–13.52 bridge

ORBIT now provides a user-triggered link to the official [Raw13G host](https://raw13g.github.io/), the upstream browser-exploit host documented for PS4 firmware 13.02–13.52. The link opens the upstream site in a separate tab; ORBIT itself does **not** execute the exploit chain, claim kernel access, or verify GoldHEN handoff.

### Source and license boundary

- Upstream project: [raw13g/raw13g.github.io](https://github.com/raw13g/raw13g.github.io)
- Upstream license: [LICENSE](https://github.com/raw13g/raw13g.github.io/blob/main/LICENSE)
- The upstream license says its MIT grant applies to code authored by raw13g, but explicitly excludes bundled third-party components such as `core.js`, `mem.js`, `int64.js`, payload binaries, and kernel patch blobs. ORBIT therefore does not copy or redistribute those excluded components without verifying their separate permissions.
- The link is a bridge to the original upstream host, not a locally integrated or independently verified exploit implementation.

The firmware range and exploit availability can change. Confirm the exact installed firmware and consult the upstream project before use.
