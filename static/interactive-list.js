/**
 * Interactive List Component
 * Handles tab-based navigation for interactive list sections
 */
(function() {
  'use strict';

  /**
   * Initialize a single interactive list component
   * @param {HTMLElement} container - The component container
   */
  function initInteractiveList(container) {
    const tabs = container.querySelectorAll('.interactive-list__tab');
    const panels = container.querySelectorAll('.interactive-list__panel');

    if (!tabs.length || !panels.length) return;

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        const targetId = tab.dataset.target;

        // Update tabs: remove active state from all
        tabs.forEach(function(t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });

        // Set clicked tab as active
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Update panels: hide all, show target
        panels.forEach(function(p) {
          p.classList.remove('active');
        });

        var targetPanel = container.querySelector('#panel-' + targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });

      // Keyboard navigation
      tab.addEventListener('keydown', function(e) {
        var index = Array.prototype.indexOf.call(tabs, tab);
        var newIndex = index;

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          newIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          newIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          newIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          newIndex = tabs.length - 1;
        }

        if (newIndex !== index) {
          tabs[newIndex].focus();
          tabs[newIndex].click();
        }
      });
    });
  }

  /**
   * Initialize all interactive list components on the page
   */
  function init() {
    var containers = document.querySelectorAll('[data-component="interactive-list"]');
    containers.forEach(initInteractiveList);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
