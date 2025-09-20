function loadLanguage(lang) {
  fetch('lang.json')
    .then(response => response.json())
    .then(data => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        let keys = el.getAttribute('data-i18n').split('.');
        let text = data[lang];
        keys.forEach(k => {
          if (text) text = text[k];
        });
        if (text) el.textContent = text;
      });
    })
    .catch(err => console.error('Erro ao carregar tradução:', err));
}

// Trocar idioma quando selecionar
document.addEventListener("DOMContentLoaded", () => {
  const switcher = document.getElementById("lang-switcher");

  // Carrega português por padrão
  loadLanguage("pt");

  // Quando troca no seletor
  if (switcher) {
    switcher.addEventListener("change", (e) => {
      loadLanguage(e.target.value);
    });
  }
});
