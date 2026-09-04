/*
 * Fique — common.js
 * Small, framework-free helpers shared across tool pages.
 * Tool-specific processing (PDF, image, etc.) stays in each tool — this file
 * only holds generic UI/format/download utilities.
 */
(function (global) {
  'use strict';

  var Fique = global.Fique || {};

  /* Trigger a browser download for a Blob or object URL. */
  Fique.download = function (blobOrUrl, filename) {
    var url = (blobOrUrl instanceof Blob) ? URL.createObjectURL(blobOrUrl) : blobOrUrl;
    var a = document.createElement('a');
    a.href = url;
    a.download = filename || 'download';
    document.body.appendChild(a);
    a.click();
    a.remove();
    if (blobOrUrl instanceof Blob) setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  };

  /* Human-readable file size. */
  Fique.formatBytes = function (bytes) {
    if (!bytes && bytes !== 0) return '';
    if (bytes < 1024) return bytes + ' B';
    var units = ['KB', 'MB', 'GB'];
    var i = -1, n = bytes;
    do { n /= 1024; i++; } while (n >= 1024 && i < units.length - 1);
    return n.toFixed(n < 10 ? 1 : 0) + ' ' + units[i];
  };

  /* Escape text for safe insertion into HTML (prefer textContent when you can). */
  Fique.escapeHtml = function (str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  /* Lightweight toast notification (auto-dismiss). */
  Fique.notify = function (message, type) {
    var host = document.getElementById('fique-toasts');
    if (!host) {
      host = document.createElement('div');
      host.id = 'fique-toasts';
      host.setAttribute('role', 'status');
      host.setAttribute('aria-live', 'polite');
      host.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:8px;align-items:center;';
      document.body.appendChild(host);
    }
    var t = document.createElement('div');
    var bg = type === 'error' ? '#b91c1c' : (type === 'success' ? '#047857' : '#1f2d3d');
    t.style.cssText = 'background:' + bg + ';color:#fff;padding:10px 16px;border-radius:10px;font:500 .86rem "Inter",system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.18);max-width:90vw;';
    t.textContent = message;
    host.appendChild(t);
    setTimeout(function () {
      t.style.transition = 'opacity .3s'; t.style.opacity = '0';
      setTimeout(function () { t.remove(); }, 300);
    }, 2600);
  };

  /* Copy text to clipboard with graceful fallback. */
  Fique.copy = function (text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); ta.remove(); resolve();
      } catch (e) { reject(e); }
    });
  };

  global.Fique = Fique;
})(window);
