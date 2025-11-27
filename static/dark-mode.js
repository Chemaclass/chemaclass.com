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
  const snowOn = document.getElementById("snow-on");
  const snowOff = document.getElementById("snow-off");


  switch (localStorage.theme) {
    case 'dark':
      document.documentElement.classList.add('theme-dark');
      document.documentElement.setAttribute('color-theme', 'dark');

      snowOn.querySelector("svg").setAttribute("fill", "deepskyblue");
      snowOff.querySelector("svg").setAttribute("fill", "#c5c5c5");
      break;

    default:
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.setAttribute('color-theme', 'light');

      snowOn.querySelector("svg").setAttribute("fill", "#444");
      snowOff.querySelector("svg").setAttribute("fill", "#3a5c88");
      break;
  }
}

updateTheme();