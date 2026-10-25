# ORBIT / WebKitty 13.52 Integration Audit

Audit date: 2026-10-25

## Decision

ORBIT is still a dashboard/preflight and external-host bridge. No exploit chain is imported or verified. The upstream project identified for the 13.52 firmware family is [ArabPixel/WebKitty](https://github.com/ArabPixel/WebKitty), licensed under AGPL-3.0-or-later at the repository level.

The upstream README's published compatibility table lists **Slopkit + Relapse for PS4 firmware 13.02–13.52**. That is an upstream project claim, not a test result for ORBIT.

## Findings from upstream source review

- `package.json` identifies the project as WebKitty and declares Babel build tooling (`@babel/cli`, `@babel/core`, and `@babel/preset-env`). These are development/build dependencies, not the whole runtime chain.
- The firmware map in `includes/js/firmware.js` assigns the `RELAPSE` chain to `src/relapse/jb.js` for firmware 13.02–13.52.
- The `includes/caches/manifest/1302-1352.manifest` includes the Relapse runtime files and firmware patch assets. The relevant entries include:
  - `src/relapse/core.js`
  - `src/relapse/int64.js`
  - `src/relapse/mem.js`
  - `src/relapse/ps4_offsets.js`
  - `src/relapse/rpc_worker.js`
  - `src/relapse/jb.js`
  - `src/relapse/patches/1302.bin`
  - `src/relapse/patches/1350.bin`
  - `src/relapse/patches/1352.bin`
- The firmware manifest also lists the surrounding page, scripts, styles, cache support, and payload assets. Therefore, copying only the Relapse source files would not constitute a complete self-hosted integration.
- Upstream `includes/js/jailbreak.js` selects a handler through `EXPLOIT_HANDLERS`, uses session storage and UI state, and depends on surrounding WebKitty modules. It is not a drop-in standalone function for ORBIT.
- Upstream README credits Raw Game for PS4 ports of Slopkit Lapse, Netctrl, and Slopkit Relapse, alongside other contributors. Preserve upstream notices and the existing `THIRD_PARTY_NOTICES.md` attribution when working with any authorized source import.
- The repository's top-level AGPL license does not by itself prove that every bundled payload or third-party asset has identical terms. Review per-file and payload licenses before redistributing a combined host.

## ORBIT integration gaps

1. ORBIT currently routes its launch action to the external WebKitty host; it does not run the chain locally.
2. ORBIT's current service-worker cache is not the same thing as WebKitty's firmware-specific cache manifest. Offline completeness must be checked against every runtime asset actually used by the selected chain.
3. ORBIT's firmware token detection is advisory and may return unknown. Firmware should be confirmed in PS4 System Information.
4. Browser-stage entry, kernel-stage success, and GoldHEN payload handoff must remain distinct states. UI logs must never infer kernel read/write or payload success merely because a script loaded.
5. GoldHEN should be treated as a separately licensed and versioned payload dependency; compatibility and distribution permissions must be checked before bundling it.

## Proposed next implementation milestone

Create a clean, pinned vendor snapshot in a dedicated branch only after the complete upstream source snapshot and its applicable license notices are available for review. Record the exact upstream commit and hashes, then map the 13.52 runtime dependency graph and cache list. Keep ORBIT's dashboard separate from upstream exploit internals until that inventory is complete.

## Verification status

- Upstream documentation reviewed: yes.
- Firmware mapping and cache-manifest entries reviewed: yes.
- Upstream source imported into ORBIT: **no**.
- ORBIT exploit execution tested on hardware: **no**.
- Kernel read/write verified by ORBIT: **no**.
- GoldHEN handoff verified by ORBIT: **no**.
