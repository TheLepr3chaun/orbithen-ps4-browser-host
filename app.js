(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const entries = [];
  const logNode = $("log");

  function log(level, message) {
    const entry = { at: new Date().toISOString(), level, message: String(message) };
    entries.push(entry);
    const row = document.createElement("div");
    row.className = "entry";
    for (const [cls, value] of [
      ["time", entry.at.slice(11, 19)],
      ["level " + level, level],
      ["message", entry.message]
    ]) {
      const span = document.createElement("span");
      span.className = cls;
      span.textContent = value;
      row.appendChild(span);
    }
    logNode.appendChild(row);
    logNode.scrollTop = logNode.scrollHeight;
    $("logCount").textContent = `${entries.length} event${entries.length === 1 ? "" : "s"}`;
  }

  $("profileBtn").addEventListener("click", () => {
    log("INFO", "Manual profile confirmed: PS4 firmware 13.52. Firmware was not read from the console.");
  });
  $("checkBtn").addEventListener("click", () => {
    log("INFO", `Browser: ${navigator.userAgent}`);
    log("INFO", `HTTPS secure context: ${window.isSecureContext ? "yes" : "no"}`);
    log("INFO", `Service Worker API: ${"serviceWorker" in navigator ? "available" : "unavailable"}`);
    log("WARN", "Exploit and kernel status cannot be determined by this page.");
    log("WARN", "No exploit or HEN payload was loaded or executed.");
  });
  $("copyBtn").addEventListener("click", async () => {
    const content = entries.map(e => `${e.at} [${e.level}] ${e.message}`).join("\n");
    try {
      await navigator.clipboard.writeText(content);
      log("INFO", "Copied current log snapshot.");
    } catch {
      log("WARN", "Clipboard unavailable; select log text and copy manually.");
    }
  });
  $("clearBtn").addEventListener("click", () => {
    entries.length = 0;
    logNode.replaceChildren();
    $("logCount").textContent = "0 events";
    log("INFO", "Log cleared.");
  });

  log("INFO", "ORBIT browser-host UI initialized.");
  log("INFO", "This Git-hosted build is a frontend only.");
  log("WARN", "Exploit integration is intentionally not included.");
})();
