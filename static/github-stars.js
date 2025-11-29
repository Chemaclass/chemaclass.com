// Fetch and display GitHub star counts for project cards
(function() {
  const CACHE_KEY = 'github-stars-cache';
  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

  function getCache() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const data = JSON.parse(cached);
        if (Date.now() - data.timestamp < CACHE_DURATION) {
          return data.stars;
        }
      }
    } catch (e) {
      // Ignore cache errors
    }
    return null;
  }

  function setCache(stars) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        stars: stars
      }));
    } catch (e) {
      // Ignore cache errors
    }
  }

  function formatStars(count) {
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return count.toString();
  }

  async function fetchStars(repo) {
    try {
      const response = await fetch(`https://api.github.com/repos/${repo}`);
      if (response.ok) {
        const data = await response.json();
        return data.stargazers_count;
      }
    } catch (e) {
      // Ignore fetch errors
    }
    return null;
  }

  async function updateStarCounts() {
    const cards = document.querySelectorAll('.project-card[data-repo]');
    if (cards.length === 0) return;

    const cached = getCache();
    const repos = Array.from(cards).map(card => card.dataset.repo);
    let stars = cached || {};
    let needsFetch = false;

    // Check if we need to fetch any repos
    repos.forEach(repo => {
      if (stars[repo] === undefined) {
        needsFetch = true;
      }
    });

    // Fetch missing stars
    if (needsFetch) {
      await Promise.all(repos.map(async repo => {
        if (stars[repo] === undefined) {
          const count = await fetchStars(repo);
          if (count !== null) {
            stars[repo] = count;
          }
        }
      }));
      setCache(stars);
    }

    // Update DOM
    cards.forEach(card => {
      const repo = card.dataset.repo;
      const countEl = card.querySelector('.star-count');
      if (countEl && stars[repo] !== undefined) {
        countEl.textContent = formatStars(stars[repo]);
      }
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateStarCounts);
  } else {
    updateStarCounts();
  }
})();
