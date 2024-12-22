window.toDarkMode = function () {
  localStorage.theme = "dark";
  localStorage.setItem('preference-theme', "theme-dark");
  window.updateTheme();
}

window.toLightMode = function () {
  localStorage.theme = "light";
  localStorage.setItem('preference-theme', "theme-light");
  window.updateTheme();
}

function updateTheme() {
  switch (localStorage.theme) {
    case 'dark':
      document.documentElement.classList.add('theme-dark');
      document.documentElement.setAttribute('color-theme', 'dark');
      break;

    default:
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.setAttribute('color-theme', 'light');
      break;
  }
}

updateTheme();