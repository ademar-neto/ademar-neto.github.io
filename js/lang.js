async function loadLanguage(lang) {
  const response = await fetch(`../lang/${lang}.json`);
  const translations = await response.json();

  document.querySelectorAll("[data-lang]").forEach(el => {
    const keys = el.getAttribute("data-lang").split(".");
    let text = translations;
    keys.forEach(k => text = text[k]);
    el.innerHTML = text;
  });
}

document.getElementById("languageSwitcher").addEventListener("change", (e) => {
  loadLanguage(e.target.value);
  localStorage.setItem("preferredLang", e.target.value);
});

// Carrega a última língua usada ou padrão "pt"
loadLanguage(localStorage.getItem("preferredLang") || "pt");
