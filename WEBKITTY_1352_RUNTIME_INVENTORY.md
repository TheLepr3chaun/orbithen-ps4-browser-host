# WebKitty 13.02–13.52 Runtime Inventory (ORBIT Review)

Audit date: 2026-10-25

## Purpose and status

This is a **read-only dependency inventory** for assessing a possible local host integration. It does not import, package, or execute exploit code. It is not a claim that ORBIT can jailbreak a console.

## Pinned upstream snapshot

- Project: [ArabPixel/WebKitty](https://github.com/ArabPixel/WebKitty)
- Upstream commit audited: `b44d2a2ae56032578ea44c6e7d578d1ad6a555de`
- Upstream tree API snapshot: [pinned tree](https://api.github.com/repos/ArabPixel/WebKitty/git/trees/b44d2a2ae56032578ea44c6e7d578d1ad6a555de?recursive=1)
- Firmware cache manifest: [1302-1352.manifest](https://github.com/ArabPixel/WebKitty/blob/main/includes/caches/manifest/1302-1352.manifest)
- Manifest blob SHA: `17b7eb9c5db922ef87ce6337017f65b4abfedbc1`
- Manifest references: 86; paths matched to pinned tree: 86; unmatched references: 0 (see notes below).

The upstream firmware map assigns the Relapse chain to firmware 13.02–13.52. This documents upstream's intended compatibility range only; ORBIT has not tested it on hardware.

## Manifest inventory

The table below records every non-comment file path referenced by the upstream 13.02–13.52 cache manifest, with its Git blob SHA and byte size from the pinned tree where available. Query-string variants point to the same underlying file and are kept as written in the manifest.

| Manifest path | Git blob SHA | Bytes |
|---|---|---:|
| `index.html` | `4f333e1e2c618ccd206d668c881d37aa3b79fd88` | 54413 |
| `exploit.html` | `9262196333eb669930e8cd991c918b2e3a1d2dce` | 5668 |
| `includes/assets/icons/cat-paw-btns.svg` | `b440591804e66919223bbc095dc7ca968e14b1b9` | 271 |
| `includes/assets/icons/cat-paw.svg` | `5c39fe4fbba015a8fe8404da9baa8238ef112567` | 279 |
| `includes/assets/icons/favicon.ico` | `67defe5928594907aae7bdccef9c817f20514fe1` | 15406 |
| `includes/assets/icons/peeking-cat.svg` | `9c3e0445782090976b32b44c3351f72b7c7c73cf` | 476 |
| `includes/assets/icons/webkitty.svg` | `727b70b29bd3f800b58b112b746c796ef7e47036` | 17821 |
| `includes/assets/icons/cat-face.svg` | `84005a766b5d7fb3a96e2bf2d6086b75d9501655` | 638 |
| `includes/css/colors/default.css` | `a38724b53c1cf18728f3ac52fdc89a2d7cb4a8a8` | 4267 |
| `includes/css/colors/vibrant.css` | `54732bb935c5e9de6f444bb954b25bdfe021867e` | 4415 |
| `includes/css/colors/catppuccino.css` | `f08c0d6971d9a4aa6c460b8cf6f020f9e1001a69` | 6000 |
| `includes/css/layouts/compact.css` | `bb60b1ed41d5336c4a682f1761b8b08c1ee7aa26` | 20426 |
| `includes/css/layouts/index.css` | `8604a2cd41a94f0eb14906bf7b7dd61e47a911b9` | 13624 |
| `includes/js/HENs.js` | `278784751c4a1ca28389ffaefb1a311f27a69e70` | 4740 |
| `includes/js/autoJbRetry.js` | `802a456ebc457a80597ba1235e9a1a40260162af` | 2010 |
| `includes/js/cache.js` | `1729ada8fc023cca70ac232ada8b18a4e3d18966` | 1258 |
| `includes/js/design.js` | `b21fd8ecfce1bf30c2c143de9d68401dff3419a3` | 2560 |
| `includes/js/events.js` | `957fede13b1536f34478efd6320a07300bb73c9f` | 7046 |
| `includes/js/storage.js` | `1cbdeea4dfbbb04cf25e96d8968d1e11d38f64e8` | 3912 |
| `includes/js/testMode.js` | `4b6ea3deba35b8fd5726fdbe6e1ab12652902fd6` | 2300 |
| `includes/js/firmware.js` | `60a575a853d87c87d7b3f4430e53a589670a2b23` | 7232 |
| `includes/js/goldhenScanner.js` | `15887f2a82d287fc612e8f5a20ff3e50112a3dff` | 4399 |
| `includes/js/initial.js` | `d25fe87646ba2a70558d7022c32db7f54e190bd4` | 4300 |
| `includes/js/payloadsHandler.js` | `0da5d6e9685fae4e90ed58f2702a3f5b59a6e245` | 8500 |
| `includes/js/payloadsList.js` | `3c590b4f5e6b52a99e22eb45a8f0bcac0eb9ff3e` | 10935 |
| `includes/js/utilities.js` | `6584d5e04f06e823d6d711abac6bfc98df17cc85` | 4817 |
| `includes/js/checkFw.js` | `9161a65c6ee00c5eb7b08df15888681f252a1ee4` | 8671 |
| `includes/js/jailbreak.js` | `d8ea0e71650b61856acab91f126d664349717ed4` | 7936 |
| `includes/js/language.js` | `185614b29eb0114979c4b0726855eda55afe0950` | 9442 |
| `includes/js/languages/es.js` | `17211cea12c69d383ea1c320ca783b1f04b625a0` | 4961 |
| `includes/js/languages/fa.js` | `26664c040ff5a0bdfbf30ccf94deb9b64d22dac3` | 6320 |
| `includes/js/languages/ru.js` | `a5d1ed4e9e444c34cc4cba4fa84dca4873133d4d` | 6346 |
| `includes/js/languages/tr.js` | `dcba8b74dcb85349f2bad1514f370e8e3287af13` | 4957 |
| `includes/js/languages/zh-cn.js` | `11c562a842750d505cc54bb3f4bdb4ea6536a360` | 9613 |
| `includes/js/languages/ar.js` | `c44582dc5e25505e617a236f2d7590691418a55a` | 6001 |
| `includes/js/languages/en.js` | `d2a6bd6548221c52804e77340d091af1e0d45bf7` | 4937 |
| `includes/js/deliverPayload.js` | `6cec17a781ff421c741888a31889ecc858950ee9` | 12636 |
| `includes/payloads/Bins/WebRTE.bin` | `98b14344db9c56c78b1b8607376206cd20c33656` | 72520 |
| `includes/payloads/Bins/elfldr.bin` | `91858a996e920f9a23d6243d011ad8b4e9337dd3` | 265748 |
| `includes/payloads/Bins/elfldr.elf` | `d67e13a7f976f19c0249586431745df8ab371c28` | 263360 |
| `includes/payloads/Bins/np-fake-signin-ps4.elf` | `24a9b4acc339f2051c3f2cd398b36f2cfb8876f9` | 118272 |
| `includes/payloads/Bins/ps4-app-dumper.bin` | `99a585fc1c6e7963b08aad0dd39fd2ef71e896b8` | 26528 |
| `includes/payloads/Bins/ps4-app2usb.bin` | `6d140c74669fd89132ad2fbce633a501283bf72b` | 25988 |
| `includes/payloads/Bins/ps4-backup.bin` | `469de4b709eb6fd1d7df124205d1cf9225d463c2` | 15548 |
| `includes/payloads/Bins/ps4-disable-aslr.bin` | `7f2a0508eb5fb94f99cbef141c716040ace434a8` | 10780 |
| `includes/payloads/Bins/ps4-disable-updates.bin` | `6017a28aaf47b93ff58c38100a0ea8683c330d18` | 8764 |
| `includes/payloads/Bins/ps4-enable-updates.bin` | `4e4186faec23f3751d1222d0aaca8098b7d4059b` | 8732 |
| `includes/payloads/Bins/ps4-exit-idu.bin` | `b2e24680d13054cd5dbb8b678af2a18ee3e35ec9` | 10796 |
| `includes/payloads/Bins/ps4-ftp.bin` | `fb0224a680c7fd4fd94d12dd00842f57172a8574` | 28700 |
| `includes/payloads/Bins/ps4-history-blocker.bin` | `80407fa8a895cd1fc08d349bbb49d263b061b6ce` | 11036 |
| `includes/payloads/Bins/ps4-kernel-dumper.bin` | `c12c9b233d2f5d2a1f78928bd14572ab526217ef` | 19060 |
| `includes/payloads/Bins/ps4-module-dumper.bin` | `97e7ebee2c23a0d9704d25db429015259958ffbe` | 18404 |
| `includes/payloads/Bins/ps4-permanent-uart.bin` | `032f5078c39dd520684ef2889c240c7cb59da1d5` | 10668 |
| `includes/payloads/Bins/ps4-pup-decrypt.bin` | `3e452bcc0f46a98da36cfb5988d64295ed147afc` | 27068 |
| `includes/payloads/Bins/ps4-restore.bin` | `b02c785da7125de278bee2f236583b21478b8d47` | 11196 |
| `includes/payloads/Bins/db-rebuilder-v0.2.bin` | `fb42fc7033d18eb4f0a7e9c70ab0972a8a8a4b37` | 653884 |
| `includes/payloads/Bins/ps4-rif-renamer.bin` | `7cf1417ef684755e96e60ebe83f20c83353306ca` | 9500 |
| `includes/payloads/Bins/ps4-websrv.bin` | `d92ae81da95d40c40e7cac361a7a42652ff24f7e` | 31524 |
| `includes/payloads/Bins/ps4-southbridge-detector.bin` | `6bcc580143a0f316f33f0579a334a20cf588466a` | 9212 |
| `includes/payloads/Bins/ps4debug-ng_v1.3.2.bin` | `0252d4e084c2e66b6d5fe8b3e967539f4f4f016a` | 3171952 |
| `includes/payloads/Bins/fan-thresholds/ps4-fan-threshold60.bin` | `93175665cadcfc6387e9068fe469b4e67391df9f` | 8992 |
| `includes/payloads/Bins/fan-thresholds/ps4-fan-threshold70.bin` | `3ab45e973ae8e786316bfd5560cb337e91cebda7` | 8992 |
| `includes/payloads/Bins/fan-thresholds/ps4-fan-threshold80.bin` | `8b86465eed112acab721969c15d86d2eac895151` | 8992 |
| `includes/payloads/Bins/fan-thresholds/ps4-fan-threshold85.bin` | `098626c23e2d5e0409298bc6f48dc2d6500b9330` | 8992 |
| `includes/payloads/HEN/goldhen_v2.4b18.12.bin` | `b9c254cb5171f82d8824794c184b968e5c604b24` | 293120 |
| `includes/payloads/HEN/PS4HEN.bin` | `637d9bdab4841f3d3cc7fe4bec1be839484fb61e` | 500448 |
| `includes/payloads/Linux/linux-1024mb.elf` | `3d3c8cdc719486dc3e87881d6964c718916a3166` | 337456 |
| `includes/payloads/Linux/linux-128mb.elf` | `c0916fb3adaa015bc911f830f7f40c77033a2709` | 337456 |
| `includes/payloads/Linux/linux-2048mb.elf` | `59aec36fc15fb8b2ae0907965386cf8270b1f656` | 337456 |
| `includes/payloads/Linux/linux-256mb.elf` | `35053f20a39631d8ad8baa9c71117405822641d7` | 337456 |
| `includes/payloads/Linux/linux-3072mb.elf` | `ef291ecffcd1606cc60e793b8f88d7cd80c11885` | 337456 |
| `includes/payloads/Linux/linux-32mb.elf` | `2115d36c7eca3a142ca8193e0caee7af89e69421` | 337456 |
| `includes/payloads/Linux/linux-4096mb.elf` | `569d6f8107d1fb7d60597fb47163e9261d9f999f` | 337456 |
| `includes/payloads/Linux/linux-512mb.elf` | `d5a03168d2a7e256c962cb79db18767a151efbb3` | 337456 |
| `includes/payloads/Linux/linux-64mb.elf` | `c1449364647209efaf9257d604d18042f868b0bd` | 337456 |
| `src/relapse/core.js` | `e606e5462e2d64cca48dbbc68b1055c18429c339` | 40946 |
| `src/relapse/core.js?v=10` | `e606e5462e2d64cca48dbbc68b1055c18429c339` | 40946 |
| `src/relapse/int64.js` | `ee8d9e6c7e8d4538449fb5eec02062c4fc64e0ef` | 2548 |
| `src/relapse/mem.js` | `727a043de4effb46d4cfe2a4984d44161b7ff84a` | 26858 |
| `src/relapse/ps4_offsets.js` | `9a9733a47eb1c7c7cee82765f890d642c245d3ed` | 17676 |
| `src/relapse/rpc_worker.js` | `16bf91741e43931586f6050bee6727cbb41319f7` | 6490 |
| `src/relapse/jb.js` | `461c8764c2fe83fe7811cc68447fc18b4b6dbf1c` | 151256 |
| `src/relapse/jb.js?v=10` | `461c8764c2fe83fe7811cc68447fc18b4b6dbf1c` | 151256 |
| `src/relapse/patches/1302.bin` | `6a3870d35b37684c39ad7049e17c3eee08f7d821` | 632 |
| `src/relapse/patches/1350.bin` | `4ff57da79d2b85483b6d27ca513aa95e53d9d299` | 632 |
| `src/relapse/patches/1352.bin` | `cb07a2b2340e054f1b823245ccf74cfe47d36839` | 632 |

## Unmatched / special manifest entries

- `../../../` is the manifest's root-directory cache entry; it is not a file blob.
- `../../../src/relapse/core.js?v=10` maps to `src/relapse/core.js` in the pinned tree.
- `../../../src/relapse/jb.js?v=10` maps to `src/relapse/jb.js` in the pinned tree.

The manifest itself is a cache list, not a complete dependency or license report. Runtime code can construct paths dynamically, select payloads based on settings, or depend on files beyond the first visible entry points. Before any local integration, the cache list must be reconciled against script imports, dynamic loaders, HTML references, worker creation, payload selection, and all relevant upstream modules.

## Relapse core files (reference only)

| Path | Git blob SHA | Bytes |
|---|---|---:|
| `src/relapse/core.js` | `e606e5462e2d64cca48dbbc68b1055c18429c339` | 40946 |
| `src/relapse/core.js` | `e606e5462e2d64cca48dbbc68b1055c18429c339` | 40946 |
| `src/relapse/int64.js` | `ee8d9e6c7e8d4538449fb5eec02062c4fc64e0ef` | 2548 |
| `src/relapse/mem.js` | `727a043de4effb46d4cfe2a4984d44161b7ff84a` | 26858 |
| `src/relapse/ps4_offsets.js` | `9a9733a47eb1c7c7cee82765f890d642c245d3ed` | 17676 |
| `src/relapse/rpc_worker.js` | `16bf91741e43931586f6050bee6727cbb41319f7` | 6490 |
| `src/relapse/jb.js` | `461c8764c2fe83fe7811cc68447fc18b4b6dbf1c` | 151256 |
| `src/relapse/jb.js` | `461c8764c2fe83fe7811cc68447fc18b4b6dbf1c` | 151256 |
| `src/relapse/patches/1302.bin` | `6a3870d35b37684c39ad7049e17c3eee08f7d821` | 632 |
| `src/relapse/patches/1350.bin` | `4ff57da79d2b85483b6d27ca513aa95e53d9d299` | 632 |
| `src/relapse/patches/1352.bin` | `cb07a2b2340e054f1b823245ccf74cfe47d36839` | 632 |

## License and redistribution checks

- WebKitty's top-level [LICENSE](https://github.com/ArabPixel/WebKitty/blob/main/LICENSE) is GNU AGPL version 3; read it in full before redistribution or network deployment.
- The top-level license does **not** establish that every binary payload, icon, font, or third-party component in the repository is under identical terms. Track each such component's origin and license separately.
- Preserve upstream notices and the Raw Game credit already documented in `THIRD_PARTY_NOTICES.md`. The WebKitty README credits Raw Game for PS4 ports of Slopkit Lapse, Netctrl, and Slopkit Relapse, and credits other upstream contributors.
- GoldHEN is a separate payload project. Do not assume it is included, or that its binaries may be redistributed, without checking its official release terms and the exact binary provenance.
- No upstream exploit source, patch binary, or payload has been copied into ORBIT as part of this inventory.

## Integration gates still open

1. **Dependency closure:** Resolve all static and dynamic runtime dependencies for the 13.52 path; reconcile them with the manifest and the pinned commit.
2. **Per-component license review:** Record license/provenance for third-party scripts, binary payloads, assets, and build tools.
3. **Local-host architecture:** Plan relative URLs, worker paths, caching, MIME types, and offline behavior without external-host redirects.
4. **Status integrity:** Keep browser entry, kernel stage, and payload handoff as separate statuses; never mark kernel R/W or GoldHEN as successful based only on a file load.
5. **Hardware validation:** Any execution claims require careful testing on the target hardware. ORBIT currently has no verified exploit execution, kernel read/write, or GoldHEN handoff.

## Current ORBIT status

- Runtime inventory documented: **yes, initial manifest-level inventory**.
- Complete dependency graph established: **no**.
- Exploit source imported into ORBIT: **no**.
- ORBIT exploit execution tested: **no**.
- Kernel R/W verified: **no**.
- GoldHEN handoff verified: **no**.
