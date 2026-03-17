function loadLanguage(lang) {
  if (window.translationData) {
    applyTranslations(lang);  // Use cache se disponível
    return;
  }
  fetch('lang/lang.json')
    .then(response => response.json())
    .then(data => {
      window.translationData = data;  // Cache global
      applyTranslations(lang);
    })
    .catch(err => {
      console.error('Erro ao carregar tradução:', err);
      // Fallback: manter textos originais
    });
}

function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);

  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'light' ? '🌙' : '☀️';
}

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    let keys = el.getAttribute('data-i18n').split('.');
    let text = window.translationData[lang];
    keys.forEach(k => {
      if (text) text = text[k];
    });
    if (text) {
      if (el.tagName === 'TITLE') {
        document.title = text;
      } else {
        el.textContent = text;
      }
    }
  });
  localStorage.setItem('language', lang);  // Persistir idioma
}

// Função para carregar header e footer, e então aplicar tradução e listeners
async function initPage() {
  const defaultLang = localStorage.getItem('language') || 'pt';
  await Promise.allSettled([
    loadHTML('header', 'header.html'),
    loadHTML('footer', 'footer.html')
  ]);
  loadLanguage(defaultLang);

  const switcher = document.getElementById('languageSwitcher');
  if (switcher) {
    switcher.value = defaultLang;  // Setar idioma salvo
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
  initPage();
});
