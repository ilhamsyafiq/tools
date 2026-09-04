/*
 * Shared site chrome for Fique tools.
 * Injects one consistent header (logo + category nav + search) and footer into
 * every page, so all pages share a single source of truth. Include with:
 *   <script src="nav.js" defer></script>
 * Active states are derived from the current filename. Category groups mirror
 * data/categories.json; search reads data/tools.json.
 */
(function () {
  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (!path) path = 'index.html';

  var css = ''
    + '.site-header{background:#fff;border-bottom:1px solid #e8eaee;position:sticky;top:0;z-index:500;box-shadow:0 2px 14px rgba(31,45,61,.04);font-family:"Inter",system-ui,sans-serif;}'
    + '.site-header-inner{max-width:1160px;margin:0 auto;padding:0 1rem;display:flex;align-items:center;height:64px;gap:1rem;}'
    + '.site-logo{display:flex;align-items:center;gap:8px;text-decoration:none;color:#1f2d3d;flex-shrink:0;}'
    + '.site-logo-mark{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#6366f1,#a78bfa);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.05rem;}'
    + '.site-logo b{font-weight:700;font-size:1.12rem;letter-spacing:-.01em;}'
    + '.site-nav{display:flex;gap:1rem;align-items:center;margin-left:auto;font-size:.85rem;}'
    + '.site-navlink{text-decoration:none;color:#374151;font-weight:500;padding:6px 4px;transition:color .2s;}'
    + '.site-navlink:hover,.site-navlink.active{color:#6366f1;font-weight:600;}'
    + '.site-drop{position:relative;}'
    + '.site-dropbtn{background:none;border:none;font:inherit;color:#374151;font-weight:500;cursor:pointer;padding:6px 4px;display:inline-flex;align-items:center;gap:3px;}'
    + '.site-drop.open .site-dropbtn,.site-dropbtn.active{color:#6366f1;font-weight:600;}'
    + '.site-dropmenu{position:absolute;top:100%;right:0;left:auto;margin-top:6px;background:#fff;border:1px solid #e8eaee;border-radius:10px;box-shadow:0 8px 24px rgba(31,45,61,.12);min-width:190px;padding:6px;display:none;flex-direction:column;z-index:600;}'
    + '.site-drop.open .site-dropmenu{display:flex;}'
    + '.site-dropitem{text-decoration:none;color:#374151;padding:8px 10px;border-radius:6px;font-size:.85rem;white-space:nowrap;}'
    + '.site-dropitem:hover{background:#eef2ff;color:#6366f1;}'
    + '.site-dropitem.active{color:#6366f1;font-weight:600;}'
    // search
    + '.site-search{position:relative;flex-shrink:0;}'
    + '.site-search input{width:170px;max-width:40vw;font:inherit;font-size:.82rem;padding:7px 12px;border:1px solid #e8eaee;border-radius:999px;background:#f8fafc;color:#1f2d3d;outline:none;transition:border-color .2s,width .2s,background .2s;}'
    + '.site-search input:focus{border-color:#6366f1;background:#fff;}'
    + '.site-searchout{position:absolute;top:100%;right:0;margin-top:6px;background:#fff;border:1px solid #e8eaee;border-radius:10px;box-shadow:0 8px 24px rgba(31,45,61,.14);min-width:280px;max-width:88vw;padding:6px;display:none;z-index:650;max-height:70vh;overflow:auto;}'
    + '.site-searchout.show{display:block;}'
    + '.site-sr{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;text-decoration:none;color:#1f2d3d;}'
    + '.site-sr:hover,.site-sr.sel{background:#eef2ff;}'
    + '.site-sr .em{font-size:1.1rem;}'
    + '.site-sr b{font-size:.86rem;font-weight:600;display:block;}'
    + '.site-sr small{font-size:.76rem;color:#6b7280;}'
    + '.site-sr .cat{margin-left:auto;font-size:.66rem;color:#6366f1;background:#eef2ff;padding:2px 7px;border-radius:999px;white-space:nowrap;}'
    + '.site-noresult{padding:12px 10px;font-size:.82rem;color:#6b7280;}'
    // hamburger
    + '.site-burger{display:none;margin-left:auto;background:none;border:1px solid #e8eaee;border-radius:8px;padding:7px 9px;cursor:pointer;color:#374151;}'
    + '.site-burger svg{display:block;}'
    // footer
    + '.site-footer{margin-top:3rem;padding:1.75rem 1rem;text-align:center;font-size:.82rem;color:#6b7280;border-top:1px solid #e8eaee;background:#fff;font-family:"Inter",system-ui,sans-serif;}'
    + '.site-footer a{color:#6b7280;text-decoration:none;margin:0 8px;}'
    + '.site-footer a:hover{color:#6366f1;}'
    + '.site-footer .made{margin-top:8px;}'
    + '.site-footer b{color:#6366f1;font-weight:600;}'
    // mobile
    + '@media(max-width:860px){'
    + '.site-burger{display:inline-flex;}'
    + '.site-search{order:3;margin-left:auto;}.site-search input{width:130px;}'
    + '.site-nav{display:none;position:absolute;top:64px;left:0;right:0;background:#fff;border-bottom:1px solid #e8eaee;box-shadow:0 8px 24px rgba(31,45,61,.10);flex-direction:column;align-items:stretch;gap:0;padding:8px;margin:0;}'
    + '.site-nav.open{display:flex;}'
    + '.site-nav>.site-navlink,.site-drop{width:100%;}'
    + '.site-navlink{padding:12px 10px;border-radius:8px;}'
    + '.site-navlink:hover{background:#eef2ff;}'
    + '.site-dropbtn{width:100%;justify-content:space-between;padding:12px 10px;border-radius:8px;}'
    + '.site-dropmenu{position:static;box-shadow:none;border:none;border-radius:0;margin:0 0 4px;padding:0 0 0 12px;min-width:0;}'
    + '.site-drop.open .site-dropmenu{display:flex;}'
    + '.site-searchout{right:auto;left:0;}'
    + '}';

  // Category groups (label + [file, label] items). Order mirrors categories.json.
  var PDF = [
    ['pdfmerge.html', 'Merge PDF'], ['pdfsplit.html', 'Split PDF'],
    ['pdforganize.html', 'Organize PDF'], ['pdfcompress.html', 'Compress PDF'],
    ['pdfsign.html', 'Sign PDF + Chop'], ['pdfeditor.html', 'PDF Editor'],
    ['pdfwatermark.html', 'Watermark PDF'], ['pdf2img.html', 'PDF → Image'],
    ['img2pdf.html', 'Image → PDF'], ['pdf2text.html', 'PDF → Text']
  ];
  var IMG = [
    ['bgremover.html', 'Background Remover'], ['imgconvert.html', 'Image Converter'],
    ['imgcompress.html', 'Image Compressor'], ['imgresize.html', 'Resize & Crop']
  ];
  var BIZ = [['invoice.html', 'Invoice / Quotation']];
  var MYS = [['chop.html', 'Company Chop']];
  var UTIL = [
    ['qrcode.html', 'QR Code'], ['wordcounter.html', 'Word Counter'],
    ['caseconverter.html', 'Case Converter'], ['passwordgen.html', 'Password Generator'],
    ['loremipsum.html', 'Lorem Ipsum']
  ];

  function has(list) { for (var i = 0; i < list.length; i++) if (list[i][0] === path) return true; return false; }
  function top(href, label) {
    return '<a class="site-navlink' + (path === href ? ' active' : '') + '" href="' + href + '">' + label + '</a>';
  }
  function group(label, list) {
    var active = has(list) ? ' active' : '';
    var items = '';
    for (var i = 0; i < list.length; i++) {
      items += '<a class="site-dropitem' + (path === list[i][0] ? ' active' : '') + '" href="' + list[i][0] + '">' + list[i][1] + '</a>';
    }
    return '<div class="site-drop"><button type="button" class="site-dropbtn' + active + '" aria-expanded="false">'
      + label + ' ▾</button><div class="site-dropmenu">' + items + '</div></div>';
  }

  var header = ''
    + '<header class="site-header"><div class="site-header-inner">'
    + '<a class="site-logo" href="index.html"><span class="site-logo-mark">f</span><b>fique.my</b></a>'
    + '<button type="button" class="site-burger" aria-label="Menu" aria-expanded="false">'
    + '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>'
    + '<nav class="site-nav" aria-label="Main">'
    + top('index.html', 'Home')
    + group('PDF', PDF)
    + group('Image', IMG)
    + group('Business', BIZ)
    + group('Malaysia', MYS)
    + group('Utilities', UTIL)
    + '</nav>'
    + '<div class="site-search"><input type="search" id="site-search-input" placeholder="Search tools…" '
    + 'aria-label="Search tools" autocomplete="off"><div class="site-searchout" id="site-search-out" role="listbox"></div></div>'
    + '</div></header>';

  var footer = ''
    + '<footer class="site-footer"><nav aria-label="Footer">'
    + '<a href="index.html">Home</a><a href="pdfmerge.html">PDF Tools</a>'
    + '<a href="imgconvert.html">Image Tools</a><a href="invoice.html">Invoice</a>'
    + '<a href="chop.html">Company Chop</a></nav>'
    + '<div class="made">Free to use &middot; Made in Malaysia by <b>ilhamsyafiq</b></div></footer>';

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function mount() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    document.body.insertAdjacentHTML('afterbegin', header);
    document.body.insertAdjacentHTML('beforeend', footer);

    var nav = document.querySelector('.site-nav');
    var burger = document.querySelector('.site-burger');
    var drops = document.querySelectorAll('.site-drop');

    // Mobile hamburger toggle.
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Dropdowns: click to open, others close.
    document.querySelectorAll('.site-dropbtn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var drop = btn.parentNode;
        var wasOpen = drop.classList.contains('open');
        for (var i = 0; i < drops.length; i++) {
          drops[i].classList.remove('open');
          drops[i].querySelector('.site-dropbtn').setAttribute('aria-expanded', 'false');
        }
        if (!wasOpen) { drop.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
      });
    });
    document.addEventListener('click', function () {
      for (var i = 0; i < drops.length; i++) drops[i].classList.remove('open');
    });

    setupSearch();
  }

  // Site-wide search powered by data/tools.json.
  function setupSearch() {
    var input = document.getElementById('site-search-input');
    var out = document.getElementById('site-search-out');
    if (!input || !out) return;
    var TOOLS = [], loaded = false;

    input.addEventListener('focus', load);
    function load() {
      if (loaded) return; loaded = true;
      fetch('data/tools.json').then(function (r) { return r.ok ? r.json() : []; })
        .then(function (d) { TOOLS = Array.isArray(d) ? d : []; })
        .catch(function () { TOOLS = []; });
    }

    function score(t, q) {
      var n = t.name.toLowerCase(), kw = (t.keywords || []).join(' ').toLowerCase(),
          d = (t.description || '').toLowerCase();
      if (n.indexOf(q) === 0) return 4; if (n.indexOf(q) > -1) return 3;
      if (kw.indexOf(q) > -1) return 2; if (d.indexOf(q) > -1) return 1; return 0;
    }

    function draw(q) {
      if (!q) { out.classList.remove('show'); out.textContent = ''; return; }
      var matches = TOOLS.map(function (t) { return { t: t, s: score(t, q) }; })
        .filter(function (x) { return x.s > 0; })
        .sort(function (a, b) { return b.s - a.s; }).slice(0, 8)
        .map(function (x) { return x.t; });
      out.textContent = '';
      if (!matches.length) {
        var no = document.createElement('div');
        no.className = 'site-noresult';
        no.textContent = 'No tools found for “' + q + '”';
        out.appendChild(no); out.classList.add('show'); return;
      }
      matches.forEach(function (t) {
        var a = document.createElement('a');
        a.className = 'site-sr'; a.href = (t.path || '').replace(/^\//, '');
        a.setAttribute('role', 'option');
        a.innerHTML = '<span class="em">' + esc(t.icon || '🔧') + '</span>'
          + '<span><b>' + esc(t.name) + '</b><small>' + esc(t.description || '') + '</small></span>'
          + '<span class="cat">' + esc(t.category || '') + '</span>';
        out.appendChild(a);
      });
      out.classList.add('show');
    }

    var timer;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { draw(input.value.trim().toLowerCase()); }, 110);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var first = out.querySelector('.site-sr');
        if (first) window.location.href = first.getAttribute('href');
      } else if (e.key === 'Escape') { out.classList.remove('show'); }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.site-search')) out.classList.remove('show');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
