(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const entries = [];
  const logNode = $("log");
  const targetFirmware = "13.52";

  function firmwareToken(ua) {
    const patterns = [
      /PlayStation\s*;\s*PlayStation\s*4\/(\d{1,2}\.\d{1,2})/i,
      /PlayStation\s+4[\/ ](\d{1,2}\.\d{1,2})/i
    ];
    for (const pattern of patterns) {
      const match = pattern.exec(ua);
      if (match) return match[1];
    }
    return null;
  }

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

  function detectBrowser() {
    const ua = navigator.userAgent || "";
    const isPS4 = /PlayStation 4/i.test(ua) && !/PlayStation 5/i.test(ua);
    const isPS5 = /PlayStation 5/i.test(ua);
    const fw = firmwareToken(ua);
    $("consoleDetect").textContent = isPS4 ? "PlayStation 4" : isPS5 ? "PlayStation 5" : "Not detected";
    $("firmwareDetect").textContent = fw || "Unknown — verify in Settings";
    $("kernelRWState").textContent = "NOT VERIFIED";
    $("uiState").textContent = isPS4 ? "PS4 BROWSER DETECTED" : "DASHBOARD READY";
    $("firmwareTag").textContent = fw ? "TOKEN FOUND" : "MANUAL CHECK";
    if (fw === targetFirmware) {
      $("firmwareTag").className = "tag";
      log("INFO", "Browser token matches target 13.52; verify in System Information.");
    } else {
      $("firmwareTag").className = "tag warn";
      log("WARN", fw ? "Browser token reports " + fw + "; target is 13.52. Verify in Settings." : "No explicit firmware token found; firmware remains unknown.");
    }
    log("INFO", "Console detection: " + (isPS4 ? "PS4 browser" : isPS5 ? "PS5 browser" : "not identified") + ".");
    log("INFO", "Safe mode only: ORBIT has not executed jailbreak or kernel code.");
    if ("serviceWorker" in navigator && location.protocol !== "file:") {
      navigator.serviceWorker.register("./sw.js")
        .then(() => log("INFO", "Offline dashboard cache registered."))
        .catch(() => log("WARN", "Offline cache unavailable in this browser."));
    }
  }

  $("preflightBtn").addEventListener("click", () => {
    const ua = navigator.userAgent || "";
    const isPS4 = /PlayStation 4/i.test(ua) && !/PlayStation 5/i.test(ua);
    const fw = firmwareToken(ua);
    log("INFO", "Safe firmware check started; no exploit code executed.");
    $("firmwareTag").textContent = fw === targetFirmware ? "TOKEN MATCH" : "CHECK SETTINGS";
    $("firmwareTag").className = fw === targetFirmware ? "tag" : "tag warn";
    $("exploitTag").textContent = "PREFLIGHT ONLY";
    $("exploitState").textContent = "Safe check complete";
    $("exploitDetail").textContent = "No jailbreak was attempted. ORBIT's exploit stage is not integrated.";
    $("browserStage").textContent = isPS4 ? "DETECTED ONLY" : "NOT DETECTED";
    $("kernelStage").textContent = "UNVERIFIED";
    $("goldhenStage").textContent = "NOT TESTED";
    $("kernelRWState").textContent = "NOT VERIFIED";
    $("stageProgress").style.width = "0%";
    log(isPS4 ? "INFO" : "WARN", isPS4 ? "PS4 browser identified; this does not confirm firmware or exploit compatibility." : "This browser did not identify itself as a PS4 browser.");
    log(fw === targetFirmware ? "INFO" : "WARN", fw === targetFirmware ? "Firmware token equals 13.52; still verify in Settings." : "Installed firmware is not confirmed as 13.52.");
    log("WARN", "Kernel R/W remains unverified. No kernel memory was read or written.");
    log("WARN", "GoldHEN handoff is not integrated or verified.");
  });

  function logText() {
    return entries.map(e => e.at + " [" + e.level + "] " + e.message).join("\n");
  }
  $("copyBtn").addEventListener("click", async () => {
    const content = logText();
    try {
      await navigator.clipboard.writeText(content);
      log("INFO", "Copied current diagnostics snapshot.");
    } catch {
      window.prompt("Copy diagnostics log:", content);
    }
  });
  $("exportBtn").addEventListener("click", () => {
    const blob = new Blob([logText() + "\n"], {type:"text/plain;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orbit-diagnostics.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    log("INFO", "Exported diagnostics text file.");
  });
  $("clearBtn").addEventListener("click", () => {
    entries.length = 0;
    logNode.replaceChildren();
    $("logCount").textContent = "0 events";
    log("INFO", "Log cleared.");
  });

  function startMatrix() {
    const canvas = $("matrixBg");
    const ctx = canvas && canvas.getContext("2d");
    if (!ctx || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const chars = "01アイウエオカキクケコサシスセソ";
    let drops = [];
    let width = 0, height = 0, frame = 0;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = Array.from({length: Math.ceil(width / 20)}, () => Math.random() * (height / 18));
    }
    function draw() {
      frame++;
      if (frame % 2 === 0) {
        ctx.fillStyle = "rgba(2, 9, 20, 0.13)";
        ctx.fillRect(0, 0, width, height);
        ctx.font = "12px monospace";
        for (let i = 0; i < drops.length; i++) {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          const y = drops[i] * 18;
          ctx.fillStyle = i % 5 === 0 ? "#65dfff" : "#168cff";
          ctx.fillText(ch, i * 20, y);
          if (y > height && Math.random() > .978) drops[i] = 0;
          drops[i] += .38;
        }
      }
      requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener("resize", resize, {passive:true});
    draw();
  }

  detectBrowser();
  log("INFO", "ORBIT dashboard ready. Firmware check, jailbreak status, and log are available.");
  startMatrix();
})();
