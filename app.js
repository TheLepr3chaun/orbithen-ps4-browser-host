(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const entries = [];
  const logNode = $("log");
  const supported = new Set(["13.00", "13.02", "13.04", "13.50", "13.52"]);
  const hosts = {
    "13.00": "https://eddieygaming.github.io/ps4aio/slopkit/version-selector.html",
    "13.02": "https://eddieygaming.github.io/ps4aio/relapse/version-selector.html",
    "13.04": "https://eddieygaming.github.io/ps4aio/relapse/version-selector.html",
    "13.50": "https://eddieygaming.github.io/ps4aio/relapse/version-selector.html",
    "13.52": "https://eddieygaming.github.io/ps4aio/relapse/version-selector.html"
  };

  function log(level, message) {
    const entry = { at: new Date().toISOString(), level, message: String(message) };
    entries.push(entry);
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

  function detectBrowser() {
    const ua = navigator.userAgent || "";
    const isPS4 = /PlayStation 4/i.test(ua);
    const isPS5 = /PlayStation 5/i.test(ua);
    $("deviceState").textContent = isPS4 ? "PlayStation 4 browser detected" : (isPS5 ? "PlayStation 5 detected" : "Non-PS4 browser detected");
    $("deviceDetail").textContent = "User-agent firmware tokens are not reliable proof of the installed system version. Verify in Settings > System > System Information.";
    $("uiState").textContent = isPS4 ? "PS4 BROWSER DETECTED" : "DASHBOARD READY";
    log("INFO", "Environment: " + (isPS4 ? "PS4 browser" : isPS5 ? "PS5 browser" : "desktop/mobile browser") + ".");
    log("INFO", "Secure context: " + (window.isSecureContext ? "yes" : "no") + "; online: " + navigator.onLine + ".");
    if ("serviceWorker" in navigator && location.protocol !== "file:") {
      navigator.serviceWorker.register("./sw.js").then(() => log("INFO", "Dashboard offline-shell service worker registered."))
        .catch(() => log("WARN", "Service worker unavailable; online dashboard still works."));
    } else {
      log("WARN", "Service worker not supported in this browser/context.");
    }
  }

  function updateCompatibility() {
    const fw = $("firmwareSelect").value;
    const valid = supported.has(fw);
    $("relapseBtn").href = hosts[fw] || "https://github.com/eddieygaming/ps4aio";
    $("compatTag").textContent = valid ? "LISTED VERSION" : (fw === "other" ? "NOT LISTED" : "MANUAL CHECK");
    $("compatTag").className = "tag" + (valid ? "" : " warn");
    $("exploitTag").textContent = valid ? "READY TO OPEN" : "CHECK FIRMWARE";
    $("exploitDetail").textContent = valid
      ? "You selected FW " + fw + ". Confirm the same version on the external host before launching."
      : "Choose a listed version to record your profile. The external host must independently confirm compatibility.";
    $("firmwareHelp").textContent = valid
      ? "Selected FW " + fw + ". This is a manual selection, not automatic verification or a guarantee of exploit success."
      : "13.00 routes to Slopkit; 13.02, 13.04, 13.50, and 13.52 route to Relapse. Intermediate versions are not assumed compatible.";
  }

  $("firmwareSelect").addEventListener("change", updateCompatibility);
  $("profileBtn").addEventListener("click", () => {
    const fw = $("firmwareSelect").value;
    if (!supported.has(fw)) {
      log("WARN", "No supported firmware profile confirmed. Check the exact version in PS4 Settings.");
      return;
    }
    try { localStorage.setItem("orbit-firmware-profile", fw); } catch {}
    log("INFO", "Manual profile recorded: PS4 FW " + fw + ". Not independently verified by the browser.");
    updateCompatibility();
  });

  $("relapseBtn").addEventListener("click", event => {
    const fw = $("firmwareSelect").value;
    if (!supported.has(fw)) {
      const proceed = window.confirm("No listed firmware profile is selected. Open the external Relapse selector anyway so you can review its own compatibility information?");
      if (!proceed) event.preventDefault();
      else log("WARN", "Opened upstream selector without a confirmed ORBIT firmware profile.");
    } else {
      log("INFO", "Opening upstream " + (fw === "13.00" ? "Slopkit" : "Relapse") + " selector for manual FW " + fw + ". The upstream host will perform its own checks.");
    }
  });

  $("saveNotesBtn").addEventListener("click", () => {
    try {
      localStorage.setItem("orbit-game-notes", $("gameNotes").value);
      log("INFO", "Game compatibility notes saved locally.");
    } catch {
      log("WARN", "Local storage unavailable; notes could not be saved.");
    }
  });
  $("clearNotesBtn").addEventListener("click", () => {
    if (!window.confirm("Clear the saved local game notes?")) return;
    $("gameNotes").value = "";
    try { localStorage.removeItem("orbit-game-notes"); } catch {}
    log("INFO", "Local game notes cleared.");
  });

  $("copyBtn").addEventListener("click", async () => {
    const content = entries.map(e => e.at + " [" + e.level + "] " + e.message).join("\n");
    try {
      await navigator.clipboard.writeText(content);
      log("INFO", "Copied current log snapshot.");
    } catch {
      window.prompt("Copy diagnostics:", content);
      log("WARN", "Clipboard API unavailable; opened manual copy dialog.");
    }
  });
  $("exportBtn").addEventListener("click", () => {
    const content = entries.map(e => e.at + " [" + e.level + "] " + e.message).join("\n");
    const url = URL.createObjectURL(new Blob([content + "\n"], {type:"text/plain"}));
    const a = document.createElement("a");
    a.href = url; a.download = "orbit-diagnostics.txt"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
    log("INFO", "Diagnostic log export requested.");
  });
  $("clearBtn").addEventListener("click", () => {
    entries.length = 0;
    logNode.replaceChildren();
    $("logCount").textContent = "0 events";
    log("INFO", "Log cleared.");
  });

  try {
    $("gameNotes").value = localStorage.getItem("orbit-game-notes") || "";
    const savedFw = localStorage.getItem("orbit-firmware-profile");
    if (savedFw && supported.has(savedFw)) $("firmwareSelect").value = savedFw;
  } catch {}
  detectBrowser();
  updateCompatibility();
  log("WARN", "ORBIT does not execute Relapse, load HEN, install PKGs, or inject cheats. These require compatible upstream/console-side tools.");
})();