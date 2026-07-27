/**
 * VocInsight Filter Components — DOM Transformation
 *
 * Transforms the existing filter section to match Figma design specs.
 * Runs after React renders the page.
 *
 * Figma source: eqZRNIxxbX8axZQthlTAwJ (VOC_PC端组件)
 * Components: FilterItem(3320-11160), Select(3046-55643), Input(3030-54078),
 *             Dropdown(3263-32448), DatePicker(187-4087), InputTag(3030-54079)
 */

(function() {
  'use strict';

  // ============================================================
  // Design Tokens
  // ============================================================
  const TOKENS = {
    primary: '#00AAA6',
    primaryHover: '#008C89',
    primaryLight: '#22BBB3',
    focusRing: '#6B60EC',
    textPrimary: '#1D2129',
    textPlaceholder: '#86909C',
    textSecondary: '#4E5969',
    bgWhite: '#FFFFFF',
    bgFilled: '#F7F8FA',
    borderDefault: '#E5E6EB',
    borderHover: '#C9CDD4',
    error: '#F53F3F',
    errorBg: '#FFECE8',
    radiusSm: '2px',
    radiusMd: '4px',
    fontFamily: '"PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  // ============================================================
  // Style Injection
  // ============================================================
  function injectStyles() {
    const css = /* css */ `
      /* ---- FilterItem border merging ---- */
      .voc-filter-bar {
        display: inline-flex;
        align-items: center;
      }
      .voc-filter-item {
        display: inline-flex;
        align-items: center;
        height: 32px;
        background: ${TOKENS.bgWhite};
        border-top: 1px solid ${TOKENS.borderDefault};
        border-bottom: 1px solid ${TOKENS.borderDefault};
        border-left: 1px solid ${TOKENS.borderDefault};
        padding: 3px 12px;
        gap: 4px;
        font-family: ${TOKENS.fontFamily};
        font-size: 14px;
        line-height: 22px;
        transition: border-color 200ms ease-out;
      }
      .voc-filter-item:first-child {
        border-radius: ${TOKENS.radiusMd} 0 0 ${TOKENS.radiusMd};
      }
      .voc-filter-item:last-child {
        border-radius: 0 ${TOKENS.radiusMd} ${TOKENS.radiusMd} 0;
        border-right: 1px solid ${TOKENS.borderDefault};
      }
      .voc-filter-item:only-child {
        border-radius: ${TOKENS.radiusMd};
        border: 1px solid ${TOKENS.borderDefault};
      }
      .voc-filter-item:hover {
        border-color: ${TOKENS.borderHover};
      }
      .voc-filter-label {
        color: ${TOKENS.textPrimary};
        font-weight: 400;
        white-space: nowrap;
      }

      /* ---- Select ---- */
      .voc-select {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        height: 32px;
        padding: 3px 12px;
        background: ${TOKENS.bgWhite};
        border: 1px solid ${TOKENS.borderDefault};
        border-radius: ${TOKENS.radiusMd};
        font-family: ${TOKENS.fontFamily};
        font-size: 14px;
        line-height: 22px;
        cursor: pointer;
        user-select: none;
        transition: border-color 200ms ease-out, box-shadow 200ms ease-out;
        min-width: 80px;
      }
      .voc-select:hover { border-color: ${TOKENS.borderHover}; }
      .voc-select:focus, .voc-select:focus-within {
        border-color: ${TOKENS.primary};
        box-shadow: 0 0 0 2px rgba(0, 170, 166, 0.3);
        outline: none;
      }
      .voc-select-text {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .voc-select-text.placeholder { color: ${TOKENS.textPlaceholder}; }
      .voc-select-arrow {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 10px;
        height: 10px;
        transition: transform 200ms ease-out;
      }
      .voc-select-arrow.open { transform: rotate(180deg); }

      /* ---- Input ---- */
      .voc-input-wrapper {
        display: inline-flex;
        align-items: center;
        height: 32px;
        padding: 0 12px;
        background: ${TOKENS.bgWhite};
        border: 1px solid ${TOKENS.borderDefault};
        border-radius: ${TOKENS.radiusMd};
        font-family: ${TOKENS.fontFamily};
        font-size: 14px;
        line-height: 22px;
        transition: border-color 200ms ease-out, box-shadow 200ms ease-out;
        gap: 4px;
      }
      .voc-input-wrapper:hover { border-color: ${TOKENS.borderHover}; }
      .voc-input-wrapper:focus-within {
        border-color: ${TOKENS.primary};
        box-shadow: 0 0 0 2px rgba(107, 96, 236, 0.3);
      }
      .voc-input {
        flex: 1;
        min-width: 0;
        border: none;
        outline: none;
        background: transparent;
        color: ${TOKENS.textPrimary};
        font-family: ${TOKENS.fontFamily};
        font-size: 14px;
        line-height: 22px;
      }
      .voc-input::placeholder { color: ${TOKENS.textPlaceholder}; }
      .voc-input-clear {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 14px;
        height: 14px;
        flex-shrink: 0;
        cursor: pointer;
        color: ${TOKENS.textPlaceholder};
        border-radius: 50%;
        font-size: 12px;
        line-height: 1;
        transition: color 150ms;
      }
      .voc-input-clear:hover { color: ${TOKENS.error}; }

      /* ---- Dropdown Trigger ---- */
      .voc-dropdown-trigger {
        display: inline-flex;
        align-items: stretch;
        border-radius: ${TOKENS.radiusSm};
        overflow: hidden;
        transition: opacity 200ms ease-out;
        cursor: pointer;
        user-select: none;
        height: 32px;
      }
      .voc-dropdown-trigger.primary {
        background: ${TOKENS.primary};
        color: white;
      }
      .voc-dropdown-trigger.primary:hover { background: ${TOKENS.primaryHover}; }
      .voc-dropdown-trigger-text {
        display: inline-flex;
        align-items: center;
        padding: 5px 16px;
        font-size: 14px;
        line-height: 22px;
        font-weight: 400;
      }
      .voc-dropdown-trigger-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        flex-shrink: 0;
        border-left: 1px solid ${TOKENS.primaryLight};
      }
      .voc-dropdown-trigger-icon svg {
        transition: transform 200ms ease-out;
      }
      .voc-dropdown-trigger-icon.open svg { transform: rotate(180deg); }

      /* ---- DatePicker ---- */
      .voc-datepicker {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        height: 32px;
        padding: 0 12px;
        background: ${TOKENS.bgWhite};
        border: 1px solid ${TOKENS.borderDefault};
        border-radius: ${TOKENS.radiusMd};
        font-family: ${TOKENS.fontFamily};
        font-size: 14px;
        line-height: 22px;
        cursor: pointer;
        user-select: none;
        transition: border-color 200ms ease-out, box-shadow 200ms ease-out;
      }
      .voc-datepicker:hover { border-color: ${TOKENS.borderHover}; }
      .voc-datepicker:focus, .voc-datepicker:focus-within {
        border-color: ${TOKENS.primary};
        box-shadow: 0 0 0 2px rgba(0, 170, 166, 0.3);
        outline: none;
      }
      .voc-datepicker-sep {
        color: ${TOKENS.textPlaceholder};
        font-family: 'Roboto', sans-serif;
      }

      /* ---- InputTag ---- */
      .voc-inputtag {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px;
        min-height: 32px;
        padding: 4px 12px;
        background: ${TOKENS.bgWhite};
        border: 1px solid ${TOKENS.borderHover};
        border-radius: ${TOKENS.radiusMd};
        font-family: ${TOKENS.fontFamily};
        font-size: 14px;
        line-height: 22px;
        cursor: text;
        transition: border-color 200ms ease-out;
      }
      .voc-inputtag:hover { border-color: ${TOKENS.primary}; }
      .voc-inputtag:focus-within { border-color: ${TOKENS.primary}; }
      .voc-tag {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        background: #E5F6F6;
        color: ${TOKENS.primary};
        font-size: 12px;
        line-height: 20px;
        border-radius: 2px;
        padding: 2px 6px;
        white-space: nowrap;
      }
      .voc-tag-remove {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 10px;
        height: 10px;
        cursor: pointer;
        transition: color 150ms;
      }
      .voc-tag-remove:hover { color: ${TOKENS.error}; }

      /* ---- Segmented Button (existing pattern, enhanced) ---- */
      .voc-segmented-btn {
        display: inline-flex;
        align-items: center;
        background: ${TOKENS.bgFilled};
        border-radius: ${TOKENS.radiusMd};
        padding: 3px;
        gap: 3px;
      }
      .voc-segmented-btn-item {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 2px 12px;
        font-size: 13px;
        line-height: 22px;
        color: ${TOKENS.textPlaceholder};
        border-radius: ${TOKENS.radiusSm};
        cursor: pointer;
        transition: all 150ms ease-out;
        white-space: nowrap;
      }
      .voc-segmented-btn-item:hover { color: ${TOKENS.textPrimary}; }
      .voc-segmented-btn-item.active {
        background: ${TOKENS.bgWhite};
        color: ${TOKENS.primary};
        box-shadow: 0 1px 2px rgba(0,0,0,0.07), 0 0.5px 1px rgba(0,0,0,0.05), 0 0 0 0.5px rgba(213,219,227,0.7);
      }
    `;

    const style = document.createElement('style');
    style.id = 'voc-filter-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ============================================================
  // DOM Transformation
  // ============================================================
  function transformFilterDOM() {
    // ---- 1. Transform the sticky tab bar into a unified filter bar ----
    const tabBars = document.querySelectorAll('[class*="sticky"][class*="top-"][class*="z-30"]');
    tabBars.forEach(bar => {
      // Add filter bar class
      bar.classList.add('voc-filter-bar-enhanced');

      // Transform tab items to have proper select styling
      const tabItems = bar.querySelectorAll('[class*="cursor-pointer"]');
      tabItems.forEach((tab, idx) => {
        tab.style.fontFamily = TOKENS.fontFamily;
        tab.style.fontSize = '14px';

        // Find the teal underline indicator
        const indicator = tab.querySelector('[class*="bg-\\[\\#00aaa6\\]"]');
        if (indicator) {
          indicator.style.height = '2px';
          indicator.style.borderRadius = '4px 4px 0 0';
        }
      });
    });

    // ---- 2. Transform select elements to match Figma Select component ----
    const selectEls = document.querySelectorAll('select');
    selectEls.forEach(sel => {
      const wrapper = sel.closest('[class*="rounded"]') || sel.parentElement;
      if (wrapper) {
        wrapper.style.fontFamily = TOKENS.fontFamily;
        wrapper.style.borderColor = TOKENS.borderDefault;
        wrapper.style.borderRadius = TOKENS.radiusMd;
        wrapper.style.fontSize = '14px';
        wrapper.style.lineHeight = '22px';
        wrapper.style.transition = 'border-color 200ms ease-out, box-shadow 200ms ease-out';

        wrapper.addEventListener('mouseenter', () => {
          if (!wrapper.matches(':focus-within')) wrapper.style.borderColor = TOKENS.borderHover;
        });
        wrapper.addEventListener('mouseleave', () => {
          if (!wrapper.matches(':focus-within')) wrapper.style.borderColor = TOKENS.borderDefault;
        });
        wrapper.addEventListener('focusin', () => {
          wrapper.style.borderColor = TOKENS.primary;
          wrapper.style.boxShadow = '0 0 0 2px rgba(0, 170, 166, 0.3)';
        });
        wrapper.addEventListener('focusout', () => {
          wrapper.style.borderColor = TOKENS.borderDefault;
          wrapper.style.boxShadow = 'none';
        });
      }
      sel.style.fontFamily = TOKENS.fontFamily;
      sel.style.fontSize = '14px';
    });

    // ---- 3. Transform search input ----
    const searchInputs = document.querySelectorAll('[class*="lucide-search"]');
    searchInputs.forEach(icon => {
      const wrapper = icon.closest('[class*="rounded"]') || icon.parentElement?.parentElement;
      if (wrapper) {
        wrapper.style.fontFamily = TOKENS.fontFamily;
        wrapper.style.borderColor = TOKENS.borderDefault;
        wrapper.style.borderRadius = TOKENS.radiusMd;
        wrapper.style.height = '32px';
        wrapper.style.transition = 'border-color 200ms ease-out, box-shadow 200ms ease-out';

        wrapper.addEventListener('mouseenter', () => {
          if (!wrapper.matches(':focus-within')) wrapper.style.borderColor = TOKENS.borderHover;
        });
        wrapper.addEventListener('mouseleave', () => {
          if (!wrapper.matches(':focus-within')) wrapper.style.borderColor = TOKENS.borderDefault;
        });
        wrapper.addEventListener('focusin', () => {
          wrapper.style.borderColor = TOKENS.primary;
          wrapper.style.boxShadow = '0 0 0 2px rgba(107, 96, 236, 0.3)';
        });
        wrapper.addEventListener('focusout', () => {
          wrapper.style.borderColor = TOKENS.borderDefault;
          wrapper.style.boxShadow = 'none';
        });
      }

      // Style the input itself
      const input = icon.parentElement?.querySelector('input');
      if (input) {
        input.style.fontFamily = TOKENS.fontFamily;
        input.style.fontSize = '14px';
        input.style.color = TOKENS.textPrimary;
        input.style.setProperty('--placeholder-color', TOKENS.textPlaceholder);
      }
    });

    // ---- 4. Transform the segmented button groups (filter type toggles) ----
    const segmentedGroups = document.querySelectorAll('[class*="bg-\\[\\#f7f8fa\\]"][class*="rounded"]');
    segmentedGroups.forEach(group => {
      group.style.padding = '3px';
      group.style.gap = '3px';

      const items = group.querySelectorAll('[class*="cursor-pointer"], button, [role="button"]');
      items.forEach(item => {
        item.style.fontFamily = TOKENS.fontFamily;
        item.style.fontSize = '13px';
        item.style.lineHeight = '22px';
        item.style.borderRadius = TOKENS.radiusSm;
        item.style.padding = '2px 12px';
        item.style.transition = 'all 150ms ease-out';
      });
    });

    // ---- 5. Fix the overall filter container ----
    const filterContainer = document.querySelector('[class*="sticky"][class*="top-\\[36px\\]"]');
    if (filterContainer) {
      filterContainer.style.boxShadow = '0px 1px 2px 0px rgba(0, 0, 0, 0.07), 0px 0.5px 1px 0px rgba(0, 0, 0, 0.05), 0px 0px 0px 0.5px rgba(213, 219, 227, 0.7)';
    }

    // ---- 6. Add hover/focus transitions to all filter-like bordered containers ----
    const borderedContainers = document.querySelectorAll('[class*="border"]');
    borderedContainers.forEach(el => {
      if (el.querySelector('select, input') && !el.style.transition) {
        el.style.transition = 'border-color 200ms ease-out, box-shadow 200ms ease-out';
      }
    });
  }

  // ============================================================
  // MutationObserver — watch for React rendering
  // ============================================================
  function observeAndTransform() {
    // First attempt: try immediately
    transformFilterDOM();

    // Second attempt: watch for DOM changes
    const observer = new MutationObserver((mutations) => {
      let shouldTransform = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          shouldTransform = true;
          break;
        }
      }
      if (shouldTransform) {
        transformFilterDOM();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Third attempt: after a delay to let React finish
    setTimeout(transformFilterDOM, 500);
    setTimeout(transformFilterDOM, 1500);
    setTimeout(transformFilterDOM, 3000);

    // Clean up observer after 5 seconds (page should be fully rendered)
    setTimeout(() => observer.disconnect(), 5000);
  }

  // ============================================================
  // Init
  // ============================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectStyles();
      observeAndTransform();
    });
  } else {
    injectStyles();
    observeAndTransform();
  }

  console.log('[VocInsight] Filter component styles injected — matching Figma design spec');
})();
