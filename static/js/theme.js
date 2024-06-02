const THEME_KEY = 'theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

if (!localStorage.getItem(THEME_KEY)) {
  localStorage.setItem(THEME_KEY, THEME_LIGHT);
}

const currentTheme = localStorage.getItem(THEME_KEY);
const toggleDiv = document.getElementById('theme-toggle');
const bodyClass = document.body.classList;

if (currentTheme === THEME_DARK) {
  bodyClass.add(THEME_DARK);
  bodyClass.remove(THEME_LIGHT);
  toggleDiv.innerHTML = "🌑";
} else {
  bodyClass.add(THEME_LIGHT);
  bodyClass.remove(THEME_DARK);
  toggleDiv.innerHTML = "☀️";
}

function toggleTheme() {
  if (bodyClass.contains(THEME_DARK)) {
    localStorage.setItem(THEME_KEY, THEME_LIGHT);
    bodyClass.add(THEME_LIGHT);
    bodyClass.remove(THEME_DARK);
    toggleDiv.innerHTML = "☀️";
  } else {
    localStorage.setItem(THEME_KEY, THEME_DARK);
    bodyClass.add(THEME_DARK);
    bodyClass.remove(THEME_LIGHT);
    toggleDiv.innerHTML = "🌑";
  }
}

toggleDiv.addEventListener('click', toggleTheme);
