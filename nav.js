/*
 * Shared site chrome for fique tools.
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
    + '.site-logo-mark{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#6366f1,#a78bfa);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.05rem;}'
    + '.site-logo b{font-weight:700;font-size:1.12rem;letter-spacing:-.01em;}'
    + '.site-nav{display:flex;gap:1rem;align-items:center;margin-left:auto;font-size:.85rem;flex-wrap:wrap;}'
    + '.site-navlink{text-decoration:none;color:#374151;font-weight:500;padding:6px 4px;transition:color .2s;}'
    + '.site-navlink:hover,.site-navlink.active{color:#6366f1;font-weight:600;}'
    + '.site-drop{position:relative;}'
    + '.site-dropbtn{background:none;border:none;font:inherit;color:#374151;font-weight:500;cursor:pointer;padding:6px 4px;display:inline-flex;align-items:center;gap:3px;}'
    + '.site-drop.open .site-dropbtn,.site-dropbtn.active{color:#6366f1;font-weight:600;}'
    + '.site-dropmenu{position:absolute;top:100%;right:0;left:auto;margin-top:6px;background:#fff;border:1px solid #e8eaee;border-radius:10px;box-shadow:0 8px 24px rgba(31,45,61,.12);min-width:180px;padding:6px;display:none;flex-direction:column;z-index:600;}'
    + '.site-drop.open .site-dropmenu{display:flex;}'
    + '.site-dropitem{text-decoration:none;color:#374151;padding:8px 10px;border-radius:6px;font-size:.85rem;white-space:nowrap;}'
    + '.site-dropitem:hover{background:#eef2ff;color:#6366f1;}'
    + '.site-dropitem.active{color:#6366f1;font-weight:600;}'
    + '.site-footer{margin-top:3rem;padding:1.5rem 1rem;text-align:center;font-size:.82rem;color:#6b7280;border-top:1px solid #e8eaee;background:#fff;font-family:"Inter",system-ui,sans-serif;}'
    + '.site-footer b{color:#6366f1;font-weight:600;}'
    + '@media(max-width:768px){.site-header-inner{height:auto;padding:10px 1rem;}.site-nav{font-size:.8rem;gap:.6rem;}}';

  var PDF = ['pdfsign.html', 'pdfeditor.html', 'pdfmerge.html', 'pdfsplit.html', 'pdforganize.html', 'pdfcompress.html', 'pdfwatermark.html', 'pdf2img.html', 'img2pdf.html', 'pdf2text.html'];
  var IMG = ['bgremover.html', 'imgconvert.html', 'imgcompress.html', 'imgresize.html'];
  var TOOL = ['invoice.html', 'qrcode.html', 'wordcounter.html', 'caseconverter.html', 'passwordgen.html', 'loremipsum.html'];
  var pdfActive = PDF.indexOf(path) >= 0 ? ' active' : '';
  var imgActive = IMG.indexOf(path) >= 0 ? ' active' : '';
  var toolActive = TOOL.indexOf(path) >= 0 ? ' active' : '';

  function top(href, label) {
    return '<a class="site-navlink' + (path === href ? ' active' : '') + '" href="' + href + '">' + label + '</a>';
  }
  function item(href, label) {
    return '<a class="site-dropitem' + (path === href ? ' active' : '') + '" href="' + href + '">' + label + '</a>';
  }

  var header = ''
    + '<header class="site-header"><div class="site-header-inner">'
    + '<a class="site-logo" href="index.html"><span class="site-logo-mark">f</span><b>fique.my</b></a>'
    + '<nav class="site-nav">'
    + top('index.html', 'Home')
    + top('chop.html', 'Create Chop')
    + '<div class="site-drop"><button type="button" class="site-dropbtn' + pdfActive + '">PDF ▾</button>'
    + '<div class="site-dropmenu">'
    + item('pdfsign.html', 'PDF Sign')
    + item('pdfeditor.html', 'PDF Editor')
    + item('pdfmerge.html', 'PDF Merge')
    + item('pdfsplit.html', 'PDF Split')
    + item('pdforganize.html', 'PDF Organize')
    + item('pdfcompress.html', 'PDF Compress')
    + item('pdfwatermark.html', 'PDF Watermark')
    + item('pdf2img.html', 'PDF → Image')
    + item('img2pdf.html', 'Image → PDF')
    + item('pdf2text.html', 'PDF → Text')
    + '</div></div>'
    + '<div class="site-drop"><button type="button" class="site-dropbtn' + imgActive + '">Image ▾</button>'
    + '<div class="site-dropmenu">'
    + item('bgremover.html', 'Background Remover')
    + item('imgconvert.html', 'Image Converter')
    + item('imgcompress.html', 'Image Compress')
    + item('imgresize.html', 'Resize & Crop')
    + '</div></div>'
    + '<div class="site-drop"><button type="button" class="site-dropbtn' + toolActive + '">Tools ▾</button>'
    + '<div class="site-dropmenu">'
    + item('invoice.html', 'Invoice / Quotation')
    + item('qrcode.html', 'QR Code')
    + item('wordcounter.html', 'Word Counter')
    + item('caseconverter.html', 'Case Converter')
    + item('passwordgen.html', 'Password Generator')
    + item('loremipsum.html', 'Lorem Ipsum')
    + '</div></div>'
    + '</nav></div></header>';

  var footer = '<footer class="site-footer">Free to use &middot; Created by <b>ilhamsyafiq</b></footer>';

  function mount() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    document.body.insertAdjacentHTML('afterbegin', header);
    document.body.insertAdjacentHTML('beforeend', footer);

    // Click to open a dropdown; click anywhere else (or another button) closes it.
    var drops = document.querySelectorAll('.site-drop');
    document.querySelectorAll('.site-dropbtn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var drop = btn.parentNode;
        var wasOpen = drop.classList.contains('open');
        for (var i = 0; i < drops.length; i++) drops[i].classList.remove('open');
        if (!wasOpen) drop.classList.add('open');
      });
    });
    document.addEventListener('click', function () {
      for (var i = 0; i < drops.length; i++) drops[i].classList.remove('open');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
