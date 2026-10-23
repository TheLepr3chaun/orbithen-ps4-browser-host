# ORBIT // HEN SPACE

GitHub Pages-ready dashboard shell for PS4 homebrew workflows.

## Features
- Controller-friendly dark dashboard UI.
- Manual firmware profile routes listed versions 13.00, 13.02, 13.04, 13.50, and 13.52 to GamerHack's multi-firmware host, which performs its own browser firmware detection.
- A launch link to GamerHack's multi-firmware browser host, which documents auto exploit selection and support through 13.52.
- HEN status disclaimer and homebrew/GoldHEN references.
- PKG installation checklist.
- Local game/cheat compatibility notes saved in browser localStorage.
- Diagnostics log, copy/export controls, and a service-worker cache for the dashboard shell.

## Important limits
This repository does **not** bundle or execute a WebKit exploit, kernel exploit, firmware offsets, kernel patches, GoldHEN/HEN binaries, PKG installer, or cheat payload. A static web page cannot independently verify kernel HEN state, install PKG files, or inject cheats. Those operations require compatible console-side tools and firmware-specific payloads.

The launch link opens the separately maintained host: https://github.com/GamerHack/GamerHack.github.io. Its multi-firmware page routes by PS4 browser user-agent and retains its own offline cache and exploit code. ORBIT is a dashboard/launcher only; it does not bundle or modify upstream exploit scripts and payloads. Do not assume every 13.xx release is supported. Review upstream source, licensing, credits, and instructions before use.

## Deploy
1. Commit the repository contents to the default branch.
2. In GitHub, open **Settings → Pages** and choose **GitHub Actions** if the existing workflow is configured for Pages deployment.
3. Wait for the deployment workflow to finish, then open the Pages URL.
4. Test the dashboard UI in a desktop browser, then test navigation and caching on the console.
5. Open the Relapse host separately; this dashboard does not proxy or replace its firmware-specific cache manifest.

## Local preview
Run `python3 -m http.server 8000` in the project root and open `http://localhost:8000`. Service workers generally require HTTPS or localhost.

## Credits
ORBIT is an independent frontend project. Upstream Relapse/PS4 AIO code remains in its own repository and retains its own license and attribution. No Sony affiliation is implied.
