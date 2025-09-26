function loadLanguage(lang) {
  fetch('lang/lang.json')
    .then(response => response.json())
    .then(data => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        let keys = el.getAttribute('data-i18n').split('.');
        let text = data[lang];
        keys.forEach(k => {
          if (text) text = text[k];
        });
        if (text) {
          if (el.tagName === 'TITLE') {
            document.title = text;  // Tratamento especial para <title>
          } else {
            el.textContent = text;
          }
        }
      });
    })
    .catch(err => console.error('Erro ao carregar tradução:', err));
}

// Função para carregar header e footer, e então aplicar tradução e listeners
async function initPage(defaultLang = 'pt') {
  await Promise.all([
    loadHTML('header', 'header.html'),
    loadHTML('footer', 'footer.html')
  ]);
  loadLanguage(defaultLang);  // Aplica tradução após loads

  // Adiciona listener no switcher após header estar pronto
  const switcher = document.getElementById('languageSwitcher');
  if (switcher) {
    switcher.addEventListener('change', (e) => {
      loadLanguage(e.target.value);
    });
  }
}

async function loadHTML(id, file) {
  let element = document.getElementById(id);
  let response = await fetch(file);
  if (response.ok) {
    element.innerHTML = await response.text();
  } else {
    element.innerHTML = `Erro ao carregar ${file}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initPage('pt');  // Inicia com português
});
