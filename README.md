# ORBIT // HEN SPACE

Independent PS4 homebrew dashboard focused on firmware 13.52.

## Current status
- Lightweight dashboard and local diagnostics.
- Target firmware: **13.52 only**.
- GoldHEN is treated as the HEN payload stage, not as the browser exploit.
- No exploit chain is currently integrated or verified by ORBIT.

## GoldHEN compatibility note
Public community documentation reports GoldHEN v2.4b18.11 as the build used for PS4 firmware 13.52. Treat this as a compatibility lead to verify against the official GoldHEN project and the specific host implementation, not as proof that ORBIT can load it. See [GoldHEN releases](https://github.com/GoldHEN/GoldHEN/releases) and [PS4 AIO compatibility notes](https://github.com/eddieygaming/ps4aio).

## Development plan
1. Keep the site focused on 13.52 and remove external exploit-host redirects.
2. Implement clear preflight and stage reporting before integrating any chain.
3. Track the source, license, hashes, and firmware evidence for each component.
4. Verify each stage on hardware and only report GoldHEN as loaded when the console confirms it.

## Safety and scope
This repository does not currently include a WebKit exploit, kernel exploit, firmware offsets, kernel patches, or a GoldHEN binary. A static dashboard cannot independently prove kernel access or HEN state. Kernel experiments can crash a console; back up saves before testing unverified components.

## Deploy
Enable GitHub Pages for the repository's configured workflow, then test the deployed dashboard in a desktop browser and on the target console.

## Local preview
Run `python3 -m http.server 8000` in the repository root and open `http://localhost:8000`.
