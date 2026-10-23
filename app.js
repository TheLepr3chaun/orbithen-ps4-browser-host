(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const entries = [];
  const logNode = $("log");
  const targetFirmware = "13.52";

  function log(level, message) {
    const entry = { at: new Date().toISOString(), level, message: String(message) };
    entries.push(entry);
    if (!logNode) return;
    const row = document.createElement("div");
    row.className = "entry";
    for (const [cls, value] of [["time", entry.at.slice(11,19)], ["level " + level, level], ["message", entry.message]]) {
      const span = document.createElement("span");
      span.className = cls;
      span.textContent = value;
      row.appendChild(span);
    }
    logNode.appendChild(row);
    logNode.scrollTop = logNode.scrollHeight;
    $("logCount").textContent = entries.length + " event" + (entries.length === 1 ? "" : "s");
  }

  function setStep(index, state, detail) {
    const row = $("chainList")?.children[index];
    if (!row) return;
    row.className = "chain-step " + state.toLowerCase();
    row.querySelector("small").textContent = detail;
    row.querySelector("b").textContent = state;
  }

  function detectBrowser() {
    const ua = navigator.userAgent || "";
    const isPS4 = /PlayStation 4/i.test(ua);
    $("deviceState").textContent = isPS4 ? "PlayStation 4 browser detected" : "Non-PS4 browser detected";
    $("deviceDetail").textContent = "Browser detection is not proof of installed firmware. Confirm 13.52 in Settings > System > System Information.";
    $("uiState").textContent = isPS4 ? "PS4 BROWSER DETECTED" : "DASHBOARD READY";
    log("INFO", "ORBIT target firmware: PS4 13.52.");
    log("INFO", "Environment: " + (isPS4 ? "PS4 browser" : "other browser") + "; online: " + navigator.onLine + ".");
    if ("serviceWorker" in navigator && location.protocol !== "file:") {
      navigator.serviceWorker.register("./sw.js").then(() => log("INFO", "Dashboard offline-shell service worker registered."))
        .catch(() => log("WARN", "Service worker unavailable."));
    }
  }

  $("profileBtn")?.addEventListener("click", () => {
    try { localStorage.setItem("orbit-firmware-profile", targetFirmware); } catch {}
    $("compatTag").textContent = "13.52 PROFILE";
    log("INFO", "Manual firmware profile recorded as 13.52; not independently verified.");
  });

  $("preflightBtn")?.addEventListener("click", () => {
    log("INFO", "Safe ORBIT preflight started; no exploit code executed.");
    setStep(0, "PASS", "ORBIT target profile is 13.52; verify console Settings");
    const isPS4 = /PlayStation 4/i.test(navigator.userAgent) && !/PlayStation 5/i.test(navigator.userAgent);
    setStep(1, isPS4 ? "WARN" : "BLOCKED", isPS4 ? "PS4 browser detected; exploit stage still absent" : "Open on the target PS4 to check browser detection");
    setStep(2, "BLOCKED", "No kernel stage integrated");
    setStep(3, "BLOCKED", "GoldHEN handoff not integrated or verified");
    $("exploitTag").textContent = "PREFLIGHT ONLY";
    $("exploitState").textContent = "Preflight complete; chain unavailable";
    $("exploitDetail").textContent = "The browser and kernel stages are not integrated. No jailbreak was attempted.";
    log("WARN", "Preflight cannot verify kernel access or GoldHEN state.");
  });

  $("saveNotesBtn")?.addEventListener("click", () => {
    try { localStorage.setItem("orbit-game-notes", $("gameNotes").value); log("INFO", "Notes saved locally."); }
    catch { log("WARN", "Local storage unavailable."); }
  });
  $("clearNotesBtn")?.addEventListener("click", () => {
    if (!confirm("Clear saved local notes?")) return;
    $("gameNotes").value = "";
    try { localStorage.removeItem("orbit-game-notes"); } catch {}
    log("INFO", "Local notes cleared.");
  });
  $("copyBtn")?.addEventListener("click", async () => {
    const content = entries.map(e => e.at + " [" + e.level + "] " + e.message).join("\n");
    try { await navigator.clipboard.writeText(content); log("INFO", "Copied log snapshot."); }
    catch { prompt("Copy diagnostics:", content); }
  });
  $("exportBtn")?.addEventListener("click", () => {
    const content = entries.map(e => e.at + " [" + e.level + "] " + e.message).join("\n");
    const url = URL.createObjectURL(new Blob([content + "\n"], {type:"text/plain"}));
    const a = document.createElement("a"); a.href = url; a.download = "orbit-diagnostics.txt"; a.click();
    URL.revokeObjectURL(url);
  });
  $("clearBtn")?.addEventListener("click", () => {
    entries.length = 0;
    if (logNode) logNode.replaceChildren();
    $("logCount").textContent = "0 events";
    log("INFO", "Log cleared.");
  });

  try { $("gameNotes").value = localStorage.getItem("orbit-game-notes") || ""; } catch {}
  detectBrowser();
  log("WARN", "ORBIT is a dashboard/preflight only; no exploit or GoldHEN payload is bundled.");
})();
