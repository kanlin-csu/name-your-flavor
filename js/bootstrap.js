(() => {
  function showNotice(message) {
    const notice = document.getElementById("runtime-notice");
    if (!notice) return;
    notice.textContent = message;
    notice.hidden = false;
  }

  if (window.location.protocol === "file:") {
    document.addEventListener("DOMContentLoaded", () => {
      showNotice("瀏覽器無法在直接開啟的檔案中載入配對模組。請在專案資料夾執行 start-local.bat，或依 README 使用本機伺服器後再開啟。");
    });
  }

  window.addEventListener("error", (event) => {
    if (event.target instanceof HTMLScriptElement && event.target.type === "module") {
      showNotice("配對程式載入失敗，請確認網站透過本機伺服器或靜態網站網址開啟，並重新整理頁面。");
    }
  }, true);
})();
