/*
 * Fique — search.js
 * Client-side tool search for the homepage (and reusable elsewhere).
 * Loads /data/tools.json and filters by name / description / keywords.
 *
 * Usage: place an <input id="tool-search"> and a results container
 *   <div id="search-results" hidden></div> on the page, then this script
 *   wires them up automatically on DOMContentLoaded.
 */
(function () {
  'use strict';

  var input = document.getElementById('tool-search');
  var resultsBox = document.getElementById('search-results');
  if (!input || !resultsBox) return;

  var TOOLS = [];

  fetch('/data/tools.json')
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (data) { TOOLS = Array.isArray(data) ? data : []; })
    .catch(function () { TOOLS = []; });

  function score(tool, q) {
    var name = tool.name.toLowerCase();
    var desc = (tool.description || '').toLowerCase();
    var kw = (tool.keywords || []).join(' ').toLowerCase();
    if (name.indexOf(q) === 0) return 3;
    if (name.indexOf(q) > -1) return 2;
    if (kw.indexOf(q) > -1) return 1.5;
    if (desc.indexOf(q) > -1) return 1;
    return 0;
  }

  function render(matches, q) {
    if (!q) { resultsBox.hidden = true; resultsBox.innerHTML = ''; return; }
    if (!matches.length) {
      resultsBox.hidden = false;
      resultsBox.innerHTML = '<p style="padding:14px;color:#6b7280;font-size:.88rem;">No tools match "' +
        escapeHtml(q) + '". Try "pdf", "image", "invoice" or "qr".</p>';
      return;
    }
    var html = matches.map(function (t) {
      return '<a class="search-item" href="' + escapeHtml(t.path) + '">' +
        '<span class="search-ic">' + escapeHtml(t.icon || '🔧') + '</span>' +
        '<span class="search-txt"><b>' + escapeHtml(t.name) + '</b>' +
        '<small>' + escapeHtml(t.description || '') + '</small></span>' +
        '<span class="search-cat">' + escapeHtml(t.category || '') + '</span></a>';
    }).join('');
    resultsBox.hidden = false;
    resultsBox.innerHTML = html;
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  var timer;
  input.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      var q = input.value.trim().toLowerCase();
      if (!q) { render([], ''); return; }
      var matches = TOOLS
        .map(function (t) { return { t: t, s: score(t, q) }; })
        .filter(function (x) { return x.s > 0; })
        .sort(function (a, b) { return b.s - a.s; })
        .slice(0, 8)
        .map(function (x) { return x.t; });
      render(matches, q);
    }, 120);
  });

  // Enter key jumps to the top match.
  input.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var first = resultsBox.querySelector('.search-item');
    if (first) { window.location.href = first.getAttribute('href'); }
  });
})();
