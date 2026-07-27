/**
 * VocInsight Filter — Figma Design DOM Transformation
 *
 * Restructures the filter section to match Figma component spec.
 * Figma: eqZRNIxxbX8axZQthlTAwJ
 */

(function() {
  'use strict';

  function apply() {
    // ============================================================
    // 1. Global CSS via injected style (most reliable method)
    // ============================================================
    if (!document.getElementById('voc-figma-core')) {
      var style = document.createElement('style');
      style.id = 'voc-figma-core';
      style.textContent = [
        ':root {',
        '--voc-p:#00AAA6;--voc-ph:#008C89;--voc-bd:#E5E6EB;',
        '--voc-bdh:#C9CDD4;--voc-tph:#86909C;--voc-tp:#1D2129;',
        '--voc-fr:#6B60EC;--voc-bgf:#F7F8FA;',
        '--voc-font:"PingFang SC",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;',
        '}',
        /* Filter bar container */
        '.voc-filter-bar{display:inline-flex;align-items:center;}',
        '.voc-filter-item{display:inline-flex;align-items:center;height:32px;',
        'background:#fff;border:1px solid #E5E6EB;padding:3px 12px;gap:4px;',
        'font-family:var(--voc-font);font-size:14px;line-height:22px;',
        'transition:border-color .2s;white-space:nowrap;}',
        '.voc-filter-item:hover{border-color:#C9CDD4;}',
        '.voc-filter-item:first-child{border-radius:4px 0 0 4px;}',
        '.voc-filter-item:last-child{border-radius:0 4px 4px 0;}',
        '.voc-filter-item:only-child{border-radius:4px;}',
        '.voc-filter-item+.voc-filter-item{margin-left:-1px;}',
        /* Select */
        '.voc-select{display:inline-flex;align-items:center;gap:4px;height:32px;',
        'padding:3px 12px;background:#fff;border:1px solid #E5E6EB;border-radius:4px;',
        'font-family:var(--voc-font);font-size:14px;line-height:22px;',
        'cursor:pointer;transition:border-color .2s,box-shadow .2s;min-width:80px;}',
        '.voc-select:hover{border-color:#C9CDD4;}',
        '.voc-select:focus,.voc-select:focus-within{border-color:#00AAA6;',
        'box-shadow:0 0 0 2px rgba(0,170,166,.3);outline:none;}',
        '.voc-select-text{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}',
        '.voc-select-text.placeholder{color:#86909C;}',
        '.voc-select-arrow{display:inline-flex;flex-shrink:0;transition:transform .2s;}',
        '.voc-select-arrow.open{transform:rotate(180deg);}',
        /* Input */
        '.voc-input-wrap{display:inline-flex;align-items:center;gap:4px;height:32px;',
        'padding:0 12px;background:#fff;border:1px solid #E5E6EB;border-radius:4px;',
        'font-family:var(--voc-font);font-size:14px;transition:border-color .2s,box-shadow .2s;}',
        '.voc-input-wrap:hover{border-color:#C9CDD4;}',
        '.voc-input-wrap:focus-within{border-color:#00AAA6;',
        'box-shadow:0 0 0 2px rgba(107,96,236,.3);}',
        '.voc-input-wrap input{flex:1;min-width:0;border:none;outline:none;',
        'background:transparent;color:#1D2129;font-family:var(--voc-font);font-size:14px;line-height:22px;}',
        '.voc-input-wrap input::placeholder{color:#86909C;}',
        /* Dropdown trigger */
        '.voc-dropdown{display:inline-flex;align-items:stretch;border-radius:2px;',
        'overflow:hidden;cursor:pointer;height:32px;}',
        '.voc-dropdown.primary{background:#00AAA6;color:#fff;}',
        '.voc-dropdown-text{display:inline-flex;align-items:center;padding:5px 16px;',
        'font-size:14px;line-height:22px;}',
        '.voc-dropdown-icon{display:inline-flex;align-items:center;justify-content:center;',
        'width:32px;border-left:1px solid #22BBB3;}',
        '.voc-dropdown-icon svg{transition:transform .2s;}',
        '.voc-dropdown-icon.open svg{transform:rotate(180deg);}',
        /* DatePicker */
        '.voc-datepicker{display:inline-flex;align-items:center;gap:8px;height:32px;',
        'padding:0 12px;background:#fff;border:1px solid #E5E6EB;border-radius:4px;',
        'font-family:var(--voc-font);font-size:14px;line-height:22px;',
        'cursor:pointer;transition:border-color .2s,box-shadow .2s;}',
        '.voc-datepicker:hover{border-color:#C9CDD4;}',
        /* InputTag */
        '.voc-inputtag{display:flex;flex-wrap:wrap;align-items:center;gap:4px;',
        'min-height:32px;padding:4px 12px;background:#fff;',
        'border:1px solid #C9CDD4;border-radius:4px;',
        'font-family:var(--voc-font);font-size:14px;cursor:text;transition:border-color .2s;}',
        '.voc-inputtag:hover,.voc-inputtag:focus-within{border-color:#00AAA6;}',
        '.voc-tag{display:inline-flex;align-items:center;gap:2px;',
        'background:#E5F6F6;color:#00AAA6;font-size:12px;',
        'border-radius:2px;padding:2px 6px;white-space:nowrap;}',
        '.voc-tag-close{cursor:pointer;transition:color .15s;}',
        '.voc-tag-close:hover{color:#F53F3F;}',
      ].join('\n');
      document.head.appendChild(style);
    }

    // ============================================================
    // 2. Enhance existing DOM elements with Figma classes
    // ============================================================
    var allDivs = document.querySelectorAll('div, span, input, select, button');

    for (var i = 0; i < allDivs.length; i++) {
      var el = allDivs[i];
      var cls = el.className || '';
      if (typeof cls !== 'string') continue;

      // Add transition to bordered elements
      if (cls.indexOf('border-[#e5e6eb]') > -1 || cls.indexOf('border-[#E5E6EB]') > -1) {
        el.style.transition = 'border-color 0.2s ease-out, box-shadow 0.2s ease-out';
      }

      // Style text placeholders
      if (cls.indexOf('text-[#86909c]') > -1 || cls.indexOf('text-[#86909C]') > -1) {
        el.style.fontFamily = '"PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      }
    }

    // ============================================================
    // 3. Enhance sticky filter bar
    // ============================================================
    var stickyBars = document.querySelectorAll('[class*="sticky"]');
    for (var s = 0; s < stickyBars.length; s++) {
      var bar = stickyBars[s];
      if (bar.className.indexOf('z-30') > -1 || bar.className.indexOf('z-40') > -1) {
        bar.style.boxShadow = '0 1px 2px 0 rgba(0,0,0,0.07), 0 0.5px 1px 0 rgba(0,0,0,0.05)';
        bar.style.fontFamily = '"PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      }
    }

    // ============================================================
    // 4. Fix segmented button groups
    // ============================================================
    var groups = document.querySelectorAll('[class*="bg-[#f7f8fa]"], [class*="bg-\\[\\#f7f8fa\\]"]');
    for (var g = 0; g < groups.length; g++) {
      var grp = groups[g];
      if (grp.className.indexOf('rounded') > -1) {
        grp.style.padding = '3px';
        grp.style.gap = '3px';
        var children = grp.children;
        for (var c = 0; c < children.length; c++) {
          children[c].style.borderRadius = '2px';
          children[c].style.padding = '2px 12px';
          children[c].style.transition = 'all 0.15s ease-out';
        }
      }
    }

    // ============================================================
    // 5. Add hover behaviors to search/select wrappers
    // ============================================================
    var searchWrappers = document.querySelectorAll('[class*="h-[32px]"]');
    for (var w = 0; w < searchWrappers.length; w++) {
      var wrap = searchWrappers[w];
      if (wrap.dataset.vocHover) continue;
      wrap.dataset.vocHover = '1';

      wrap.addEventListener('mouseenter', function() {
        if (!this.matches(':focus-within')) this.style.borderColor = '#C9CDD4';
      });
      wrap.addEventListener('mouseleave', function() {
        if (!this.matches(':focus-within')) this.style.borderColor = '#E5E6EB';
      });
      wrap.addEventListener('focusin', function() {
        this.style.borderColor = '#00AAA6';
        this.style.boxShadow = '0 0 0 2px rgba(107,96,236,0.3)';
      });
      wrap.addEventListener('focusout', function() {
        this.style.borderColor = '#E5E6EB';
        this.style.boxShadow = 'none';
      });
    }
  }

  // Run multiple times to catch React renders
  var runs = [300, 800, 1500, 3000, 5000];
  for (var r = 0; r < runs.length; r++) {
    setTimeout(apply, runs[r]);
  }

  // Also on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(apply, 300); });
  }

  console.log('[VocInsight] Figma filter components loaded');
})();
