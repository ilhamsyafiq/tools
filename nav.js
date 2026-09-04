/*
 * Shared site chrome for CopOnline tools.
 * Injects one consistent nav bar + minimal footer into every page,
 * so all pages share a single source of truth. Include with:
 *   <script src="nav.js" defer></script>
 * Active states are derived from the current filename.
 */
(function () {
  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (!path) path = 'index.html';

  var css = ''
    + '.site-header{background:#fff;border-bottom:1px solid #e8eaee;position:sticky;top:0;z-index:500;box-shadow:0 2px 14px rgba(31,45,61,.04);font-family:"Inter",system-ui,sans-serif;}'
    + '.site-header-inner{max-width:1160px;margin:0 auto;padding:0 1rem;display:flex;align-items:center;height:64px;gap:1rem;flex-wrap:wrap;}'
    + '.site-logo{display:flex;align-items:center;gap:8px;text-decoration:none;color:#1f2d3d;flex-shrink:0;}'
    + '.site-logo img{width:40px;height:40px;}'
    + '.site-logo b{font-weight:600;font-size:1.02rem;display:block;line-height:1.1;}'
    + '.site-logo small{font-size:.6rem;color:#6b7280;}'
    + '.site-nav{display:flex;gap:1rem;align-items:center;margin-left:auto;font-size:.85rem;flex-wrap:wrap;}'
    + '.site-navlink{text-decoration:none;color:#374151;font-weight:500;padding:6px 4px;transition:color .2s;}'
    + '.site-navlink:hover,.site-navlink.active{color:#6366f1;font-weight:600;}'
    + '.site-drop{position:relative;}'
    + '.site-dropbtn{background:none;border:none;font:inherit;color:#374151;font-weight:500;cursor:pointer;padding:6px 4px;display:inline-flex;align-items:center;gap:3px;}'
    + '.site-drop:hover .site-dropbtn,.site-dropbtn.active{color:#6366f1;font-weight:600;}'
    + '.site-dropmenu{position:absolute;top:calc(100% + 4px);left:0;background:#fff;border:1px solid #e8eaee;border-radius:10px;box-shadow:0 8px 24px rgba(31,45,61,.12);min-width:160px;padding:6px;display:none;flex-direction:column;z-index:600;}'
    + '.site-drop:hover .site-dropmenu,.site-drop:focus-within .site-dropmenu{display:flex;}'
    + '.site-dropitem{text-decoration:none;color:#374151;padding:8px 10px;border-radius:6px;font-size:.85rem;white-space:nowrap;}'
    + '.site-dropitem:hover{background:#eef2ff;color:#6366f1;}'
    + '.site-dropitem.active{color:#6366f1;font-weight:600;}'
    + '.site-footer{margin-top:3rem;padding:1.5rem 1rem;text-align:center;font-size:.82rem;color:#6b7280;border-top:1px solid #e8eaee;background:#fff;font-family:"Inter",system-ui,sans-serif;}'
    + '.site-footer b{color:#6366f1;font-weight:600;}'
    + '@media(max-width:768px){.site-header-inner{height:auto;padding:10px 1rem;}.site-nav{font-size:.8rem;gap:.6rem;}}';

  var PDF = ['pdfsign.html', 'pdfmerge.html', 'pdfsplit.html', 'pdf2img.html', 'img2pdf.html'];
  var IMG = ['bgremover.html', 'imgconvert.html'];
  var pdfActive = PDF.indexOf(path) >= 0 ? ' active' : '';
  var imgActive = IMG.indexOf(path) >= 0 ? ' active' : '';

  function top(href, label) {
    return '<a class="site-navlink' + (path === href ? ' active' : '') + '" href="' + href + '">' + label + '</a>';
  }
  function item(href, label) {
    return '<a class="site-dropitem' + (path === href ? ' active' : '') + '" href="' + href + '">' + label + '</a>';
  }

  var header = ''
    + '<header class="site-header"><div class="site-header-inner">'
    + '<a class="site-logo" href="index.html"><img src="amm.png" alt="CopOnline logo" />'
    + '<span><b>fique.my</b><small>Free online tools</small></span></a>'
    + '<nav class="site-nav">'
    + top('index.html', 'Home')
    + top('chop.html', 'Create Chop')
    + '<div class="site-drop"><button type="button" class="site-dropbtn' + pdfActive + '">PDF ▾</button>'
    + '<div class="site-dropmenu">'
    + item('pdfsign.html', 'PDF Sign')
    + item('pdfmerge.html', 'PDF Merge')
    + item('pdfsplit.html', 'PDF Split')
    + item('pdf2img.html', 'PDF → Image')
    + item('img2pdf.html', 'Image → PDF')
    + '</div></div>'
    + '<div class="site-drop"><button type="button" class="site-dropbtn' + imgActive + '">Image ▾</button>'
    + '<div class="site-dropmenu">'
    + item('bgremover.html', 'Background Remover')
    + item('imgconvert.html', 'Image Converter')
    + '</div></div>'
    + '</nav></div></header>';

  var footer = '<footer class="site-footer">Free to use &middot; Created by <b>ilhamsyafiq</b></footer>';

  function mount() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    document.body.insertAdjacentHTML('afterbegin', header);
    document.body.insertAdjacentHTML('beforeend', footer);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
