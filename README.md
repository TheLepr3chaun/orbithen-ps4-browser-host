# ORBIT PS4 Browser Host

A GitHub Pages-ready static site for the ORBIT project. It provides a dark dashboard, a manual PS4 13.52 profile, and local diagnostic logs.

## Scope and status

**Included:** HTML/CSS/JavaScript UI, browser diagnostics, copy/clear logs, responsive styling, Pages deployment workflow.

**Not included:** WebKit exploit, kernel exploit, privilege escalation, kernel patches, HEN payload, or a working jailbreak. The firmware profile is a label, not firmware detection. A static GitHub Pages site alone cannot activate HEN.

This project is a frontend foundation. Do not report exploit success or HEN-active status based on the page loading.

## Publish with GitHub Pages

1. Create a new GitHub repository, for example `orbit-ps4-browser-host`.
2. Upload the files from this project to the repository root, including `.github/workflows/pages.yml`.
3. In GitHub, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
4. Push to the default branch. The included workflow deploys the static site.
5. Open the published URL shown under **Settings → Pages** on a desktop browser first; then test the interface on the PS4 browser.

No GitHub token or credentials should be embedded in the source files.

## Local preview

Run in the project root:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Suggested next milestones

1. Confirm the Pages deployment and PS4 browser compatibility.
2. Add a real, documented status adapter for a supported local homebrew service, with explicit timeouts and errors.
3. Keep any firmware-specific exploit research separate from the public frontend and document exact target firmware, source provenance, license, and test evidence.
4. Test on hardware before claiming compatibility.
