const THEME_FOR_FIRST_TIME_USERS = 'dark';

if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', THEME_FOR_FIRST_TIME_USERS);
}

const currentTheme = localStorage.getItem('theme');
const toggleDiv = document.getElementById('theme-toggle');
const bodyClass = document.body.classList;

if (currentTheme === 'dark') {
  bodyClass.add('dark');
  bodyClass.remove('light');
  toggleDiv.innerHTML = "🌑";
} else {
  bodyClass.add('light');
  bodyClass.remove('dark');
  toggleDiv.innerHTML = "☀️";
}

function toggleTheme() {
  if (bodyClass.contains('dark')) {
    localStorage.setItem('theme', 'light');
    bodyClass.add('light');
    bodyClass.remove('dark');
    toggleDiv.innerHTML = "☀️";
  } else {
    localStorage.setItem('theme', 'dark');
    bodyClass.add('dark');
    bodyClass.remove('light');
    toggleDiv.innerHTML = "🌑";
  }
}

toggleDiv.addEventListener('click', toggleTheme);
