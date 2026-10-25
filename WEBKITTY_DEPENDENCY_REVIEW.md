# WebKitty 13.52 Dependency Review

**Status:** Static/read-only review; no exploit code imported or executed  
**Upstream:** [ArabPixel/WebKitty](https://github.com/ArabPixel/WebKitty)  
**Pinned upstream commit:** `b44d2a2ae56032578ea44c6e7d578d1ad6a555de`  
**Review scope:** Main page wiring, firmware dispatch, 13.02–13.52 cache manifest, cache relay, Relapse loader references, payload delivery, and licensing signals.

## Executive result

The 13.52 path is not a single self-contained JavaScript file. WebKitty's page initializes shared browser/storage/UI code, selects the firmware chain, uses a firmware-specific application-cache manifest, loads Relapse and its supporting scripts/worker/patch assets, then separately handles payload selection and GoldHEN delivery. ORBIT cannot become a reliable local one-button host by copying only `src/relapse/jb.js` or only the files named in the manifest.

This review is an inventory and integration map only. It does not import, package, or execute exploit code, and it does not establish that ORBIT can obtain kernel read/write or deliver GoldHEN on a PS4.

## 1. Main-page initialization and dispatch

At the pinned commit, `index.html` loads shared scripts including:

- `includes/js/storage.js`
- `includes/js/testMode.js`
- `includes/js/firmware.js`
- `includes/js/utilities.js`
- `includes/js/HENs.js`
- `includes/js/checkFw.js`
- `includes/js/initial.js`
- `includes/js/cache.js`
- `includes/js/deliverPayload.js`
- `includes/js/payloadsList.js`
- `includes/js/design.js`
- `includes/js/language.js`
- `includes/js/autoJbRetry.js`
- `includes/js/events.js`
- `includes/js/payloadsHandler.js`

A main-logic loader also chooses a legacy or current jailbreak script, so the script order and generated/selected filename matter. The firmware dispatcher maps Relapse to chain ID 7 and lists its supported range as 13.02–13.52. The firmware-specific cache route maps this range to `includes/caches/cache1302-1352.html`.

**Host behavior to account for:** `index.html` contains a redirect to `http://webkitty.arabpixel.net` in its initial protocol/host checks. A local ORBIT design must deliberately replace that behavior rather than assuming the upstream page is already a self-contained local host.

## 2. Firmware-specific cache behavior

The 13.02–13.52 cache page declares `manifest/1302-1352.manifest` and loads `../js/iframe_cache.js`. The cache page and relay use the legacy HTML Application Cache API and `postMessage` status events. This is not equivalent to a modern Service Worker cache.

Integration implications:

- Every required local asset must resolve to a correct same-host URL and be represented in the appropriate offline/cache plan.
- Query-string variants are present in the manifest, including versioned Relapse script URLs. These need to be preserved or intentionally normalized; accidental URL changes can cause cache misses.
- Cache completion means assets were cached, not that the exploit ran successfully.
- Application Cache is deprecated and browser support must be verified on the actual PS4 browser/firmware; do not assume desktop behavior matches the console.

The previously committed `WEBKITTY_1352_RUNTIME_INVENTORY.md` records the manifest's 86 normalized references, with pinned hashes and sizes where available.

## 3. Relapse runtime dependency map

Static references in `src/relapse/jb.js` include:

- `src/relapse/core.js?v=10`
- `src/relapse/mem.js`
- `src/relapse/int64.js`
- `src/relapse/ps4_offsets.js`
- `src/relapse/rpc_worker.js` (created as a Web Worker)
- Firmware-selected patch assets under `src/relapse/patches/`, including manifest entries for `1302.bin`, `1350.bin`, and `1352.bin`

The source also contains runtime `fetch()` calls for patch/payload-like assets and worker creation. That means a complete dependency closure must include runtime-selected assets, query-string aliases, and worker dependencies—not just static `script src` references.

The current evidence establishes the presence of these references, not the correctness of a proposed ORBIT copy or compatibility of the resulting chain.

## 4. Payload and GoldHEN are a separate handoff

The upstream payload-delivery code distinguishes ELF delivery through an elf loader on port 9021 from binary payload delivery through the GoldHEN/nexHEN binloader on port 9090. The code includes probes, fallback paths, and firmware-dependent choices. GoldHEN selection/version handling lives in separate shared code and binary assets.

Consequences for ORBIT's status panel:

- “Assets cached” must not be displayed as “jailbreak complete.”
- “Chain started” must not be displayed as “kernel access confirmed.”
- A GoldHEN send attempt is not proof that GoldHEN started.
- Each stage needs its own observable success/failure condition; if a condition cannot be verified, show “unverified” rather than a success state.

GoldHEN and other payload binaries need their own provenance, version pin, license/redistribution review, and compatibility validation. Do not treat the upstream host's license as proof that every bundled payload has the same license.

## 5. Licensing and attribution gate

The pinned WebKitty README identifies the project as **AGPL-3.0-or-later** and credits upstream contributors, including Raw Game for the PS4 Slopkit Lapse/Netctrl ports and Slopkit Relapse, and Jordy and Sonic-Iso for the original Slopkit project. The existing ORBIT `THIRD_PARTY_NOTICES.md` contains the broader attribution notes.

Before any code import or network-accessible modified deployment, review the AGPL obligations for the whole covered work, including source availability and notices. Also check file-level notices and the separate licenses for payloads, patches, and other third-party components. This document is not legal advice.

## 6. Proposed next implementation sequence

1. **Finish the dependency closure on paper:** inspect all manifest paths and every dynamic load/fetch/worker reference at the pinned commit; mark each as required, optional UI, payload, or firmware-specific.
2. **Make an ORBIT host map:** map each required asset to a proposed local URL and note any upstream absolute URL, query-string, or origin assumptions. Do not copy exploit implementation files as part of this audit.
3. **Define a truthful 13.52 adapter contract:** states such as `ready`, `running`, `failed`, `complete`, and `unverified`; keep browser readiness, chain execution, kernel access, and GoldHEN handoff as separate stages.
4. **Review redistribution terms:** resolve AGPL/source-distribution requirements and separate payload licenses before deciding what may be included.
5. **Only then plan controlled validation:** test ordinary page loading and local asset resolution separately from any exploit claims. Any exploit-stage success needs explicit evidence and console testing; it must not be inferred from UI state.

## 7. Evidence limits

- Source inspected at the pinned upstream commit listed above.
- Static references were inspected; no PS4 console was used in this review.
- No exploit was executed and no kernel read/write, patch application, or GoldHEN handoff was verified.
- The inventory is not yet a formal proof of complete dependency closure; more dynamic paths may exist.
- No exploit code was added to ORBIT by this review.
