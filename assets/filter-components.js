/**
 * VocInsight Filter Components — Interactive Behaviors
 *
 * Handles interactions that CSS alone cannot:
 * - Arrow rotation on dropdown open
 * - Clear button visibility toggle
 * - Dynamic class toggling
 *
 * Styling is handled by filter-figma.css (loaded before React)
 * Figma source: eqZRNIxxbX8axZQthlTAwJ
 */

(function() {
  'use strict';

  var TOKENS = {
    primary: '#00AAA6',
    borderDefault: '#E5E6EB',
    borderHover: '#C9CDD4',
  };

  function enhanceFilterInteractions() {
    // Add arrow rotation toggle to select wrappers
    document.querySelectorAll('select').forEach(function(sel) {
      var wrapper = sel.closest('[class*="rounded"]');
      if (!wrapper || wrapper.dataset.vocEnhanced) return;
      wrapper.dataset.vocEnhanced = '1';

      sel.addEventListener('focus', function() {
        var arrow = wrapper.querySelector('svg');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
      });
      sel.addEventListener('blur', function() {
        var arrow = wrapper.querySelector('svg');
        if (arrow) arrow.style.transform = '';
      });
    });

    // Ensure clear buttons in search are styled
    document.querySelectorAll('[class*="lucide-search"]').forEach(function(icon) {
      var wrapper = icon.closest('[class*="rounded"]');
      if (!wrapper || wrapper.dataset.vocSearchEnhanced) return;
      wrapper.dataset.vocSearchEnhanced = '1';

      // Add transition on wrapper
      wrapper.style.transition = 'border-color 200ms ease-out, box-shadow 200ms ease-out';
    });
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(enhanceFilterInteractions, 800);
      setTimeout(enhanceFilterInteractions, 2000);
    });
  } else {
    setTimeout(enhanceFilterInteractions, 800);
    setTimeout(enhanceFilterInteractions, 2000);
  }

  console.log('[VocInsight] Filter interactions enhanced per Figma spec');
})();
