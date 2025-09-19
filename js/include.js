document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach(el => {
    fetch(el.getAttribute("data-include"))
      .then(resp => resp.text())
      .then(data => {
        el.innerHTML = data;

        // Depois que o header/footer for carregado, aplica tradução
        if (typeof applyTranslations === "function") {
          applyTranslations();
        }
      });
  });
});
