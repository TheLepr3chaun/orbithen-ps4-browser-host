# ORBIT 13.52 Local-Host Map

**Status:** Read-only architecture map and learning notes  
**ORBIT repo:** https://github.com/calebflynn06-glitch/orbithen-ps4-browser-host  
**Upstream reference:** ArabPixel/WebKitty at pinned commit `b44d2a2ae56032578ea44c6e7d578d1ad6a555de`  
**Scope:** URL/origin assumptions, asset groups, cache behavior, and truthful UI state. No exploit implementation files or payload binaries are copied by this document.

## Why this map exists

A local host is not achieved merely by changing a button's URL. The page, scripts, worker, firmware-specific assets, cache route, and payload-delivery assumptions must all agree about where files live and which origin serves them. This map documents those relationships before any implementation changes.

## 1. The current ORBIT architecture

ORBIT currently consists of its dashboard files:

- `index.html` — UI and status display.
- `styles.css` — Blue Matrix styling.
- `app.js` — browser/firmware preflight, log, and the external-host link.
- `sw.js` — optional Service Worker cache for the dashboard shell.
- `manifest.webmanifest` — install metadata.

The current `app.js` links to the external WebKitty host. It does not load the upstream chain. The Service Worker only pre-caches the dashboard shell assets. It is not the same mechanism as WebKitty's firmware-specific Application Cache setup.

**Current state:** dashboard and safe preflight only; no exploit chain or GoldHEN handoff is integrated or verified.

## 2. Upstream 13.52 page/asset map

| Area | Upstream reference | Role | ORBIT planning note |
|---|---|---|---|
| Main page | `index.html` | UI and script bootstrap | Do not copy the whole page as a shortcut; it includes unrelated UI and host-specific assumptions. |
| Firmware dispatch | `includes/js/firmware.js` | Firmware ranges, chain IDs, cache-page selection | Treat firmware token as a hint; confirm console firmware separately. |
| Shared browser/UI state | `storage.js`, `initial.js`, `utilities.js`, `checkFw.js`, `events.js`, etc. | Preferences, DOM references, events, UI | Broad dependencies; not an isolated exploit module. |
| Cache routing | `includes/js/cache.js` | Redirects a PS4 browser to a cache page when required | ORBIT's Service Worker does not reproduce this behavior. |
| 13.02–13.52 cache page | `includes/caches/cache1302-1352.html` | Declares a firmware-specific manifest | Legacy Application Cache support needs real-browser validation. |
| Cache relay | `includes/js/iframe_cache.js` | Reports cache events to a parent via `postMessage` | Cache completion is not exploit success. |
| Manifest | `includes/caches/manifest/1302-1352.manifest` | Lists cached scripts/assets/payloads | The existing runtime inventory records 86 manifest references. |
| Relapse runtime | `src/relapse/` | Firmware chain code, shared helpers, worker, patches | Not integrated into ORBIT; not a single-file drop-in. |
| Payload selection/delivery | `includes/js/HENs.js`, `deliverPayload.js`, `payloadsList.js`, related assets | Selects payload and handles delivery | Separate from the browser chain; each payload needs provenance and license review. |

## 3. Origin and URL assumptions

An **origin** is the combination of scheme, hostname, and port—for example, `https://example.test` and `http://example.test` are different origins.

| URL/reference pattern | What it means | Risk for a future local host |
|---|---|---|
| Relative paths such as `./includes/js/...` | Resolve relative to the current page URL | Directory layout and trailing-slash behavior must stay consistent. |
| Query variants such as `core.js?v=10` | Same path with a query string | Caches may treat query variants as distinct keys; preserve or intentionally normalize them. |
| Absolute external host links | Leave ORBIT's origin | Violates a no-external-redirect goal if used for the chain itself. |
| `http://127.0.0.1:9021` in upstream delivery code | Loopback service on the device running the browser | Loopback means the console itself when run on PS4, not the developer's Windows PC. |
| Port 9090 in upstream delivery code | Upstream code uses it for binloader payload delivery | Network service availability is a separate condition from page/asset loading. |
| Worker path such as `./src/relapse/rpc_worker.js` | A separate script loaded by a Web Worker | Workers have their own URL/origin and path requirements; a missing worker can break a chain even if the main page loads. |
| Firmware patch paths under `src/relapse/patches/` | Runtime-selected binary assets | Path correctness and version mapping must be verified; the filename alone proves no compatibility. |

### Important HTTPS lesson

A page loaded over HTTPS may be restricted from making some HTTP requests, depending on browser security rules and the request type. The upstream code explicitly discusses HTTP loader services. This is a compatibility issue to document and test—not a reason to weaken browser security blindly. A local host design must separately establish which browser origin is supported and how payload delivery is intended to work.

## 4. The two cache systems are different

**ORBIT Service Worker**
- Registers `sw.js` when supported and not using `file:`.
- Pre-caches the dashboard shell.
- Intercepts same-origin GET requests.
- Does not include WebKitty assets in its pre-cache list.
- Its current network-failure fallback can return `index.html` for an uncached request; if future JavaScript or binary asset requests are added, that fallback should be reviewed so a missing asset is not mistaken for a valid response.

**WebKitty firmware cache**
- Uses a firmware-specific HTML page with a legacy `manifest` attribute.
- Relays Application Cache events using `postMessage`.
- Lists scripts, workers, patches, and many payload files for that firmware range.
- Requires browser support and URL behavior that should not be assumed from desktop testing.

These systems solve different problems. ORBIT being offline-capable today only means the dashboard shell may be available offline.

## 5. Local URL planning template

Use this table before any code or binary import. “Unresolved” means we have not yet verified the appropriate URL or requirement.

| Asset group | Proposed ORBIT URL | Source/licensing checked? | Runtime need verified? |
|---|---|---|---|
| Dashboard shell | `./index.html`, `./styles.css`, `./app.js` | ORBIT-owned files | Dashboard only |
| Shared upstream UI code | Unresolved | Must review per-file notices and AGPL obligations | Not yet |
| Firmware cache mechanism | Unresolved | Must review source/license | Not tested on PS4 |
| Chain runtime | Not included | Requires separate safety, compatibility, and licensing review | Not verified |
| Worker dependencies | Not included | Requires separate review | Not verified |
| Firmware patch assets | Not included | Requires provenance/license review | Not verified |
| GoldHEN / other payload binaries | Not included | Separate payload license and version checks required | Not verified |
| Local payload receiver services | Not provided by ORBIT | Separate component/source review | Not verified |

This map intentionally does not prescribe exploit execution steps. It identifies the integration surfaces and verification questions.

## 6. A truthful one-button state model

A single user-facing button can still drive distinct internal states. Do not collapse these into one “success” indicator.

1. **Dashboard ready** — the ORBIT page and its own assets loaded.
2. **Firmware hint found** — browser user-agent contains a candidate version; it is not authoritative.
3. **Compatibility reviewed** — documented support range matches the confirmed console firmware.
4. **Required assets available** — every required local resource returns the expected kind of content; an HTTP 200 alone is not enough if a missing file fell back to HTML.
5. **Chain stage attempted** — only if a real, authorized implementation exists; attempting is not succeeding.
6. **Kernel capability verified** — only when there is a reliable, explicit success signal from the implementation.
7. **Payload handoff attempted** — a delivery request was made.
8. **Payload active verified** — only when an independent, trustworthy signal confirms it.

Until a real integration is reviewed and tested, ORBIT should keep the exploit-related states as **not integrated / unverified**. A one-button interface is a UI design choice, not evidence that the underlying stages are working.

## 7. Recommended safe next work

1. Validate the current ORBIT shell and Service Worker behavior on desktop browsers.
2. Improve the asset-failure path so missing scripts are reported as missing assets, not silently served the dashboard HTML.
3. Add a machine-readable, static compatibility/status record for the pinned upstream review; never label this record as a live exploit test.
4. Complete per-file license and payload provenance review before deciding what can be redistributed.
5. Treat any future console validation as a separate, explicit test record with firmware, browser, date, observed result, and evidence.

## Learning glossary

- **Static dependency review:** reading source and metadata without executing the component.
- **Dependency closure:** the full set of files and services a component needs, including dynamically loaded resources and workers.
- **Origin:** scheme + host + port; browser security policies often depend on it.
- **Manifest:** a list of resources a cache mechanism should retain; it is not a guarantee those resources work.
- **Service Worker:** browser-side script that can cache/intercept requests for a web app on supported secure origins.
- **Application Cache:** an obsolete browser caching API used by this upstream cache flow; compatibility is uncertain on modern browsers.
- **Payload handoff:** sending a separate binary to a receiver/service; this is distinct from exploiting the browser or obtaining kernel capabilities.
