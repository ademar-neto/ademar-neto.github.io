document.addEventListener("DOMContentLoaded", () => {
  const languageSwitcher = document.getElementById("languageSwitcher");

  async function loadLanguage(lang) {
    try {
      const response = await fetch(`lang/${lang}.json`);
      const translations = await response.json();

      document.querySelectorAll("[data-lang]").forEach(el => {
        const keys = el.getAttribute("data-lang").split(".");
        let text = translations;
        keys.forEach(k => {
          if (text) text = text[k];
        });
        if (text) el.textContent = text;
      });
    } catch (error) {
      console.error("Erro ao carregar idioma:", error);
    }
  }

  // Troca idioma ao selecionar
  if (languageSwitcher) {
    languageSwitcher.addEventListener("change", e => {
      loadLanguage(e.target.value);
      localStorage.setItem("lang", e.target.value);
    });
  }

  // Carrega idioma salvo ou padrão
  const savedLang = localStorage.getItem("lang") || "pt";
  if (languageSwitcher) languageSwitcher.value = savedLang;
  loadLanguage(savedLang);
});
