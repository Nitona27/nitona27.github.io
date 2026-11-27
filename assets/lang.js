/* 端末の言語設定に合わせて日本語／英語のページへ切り替える。
   「日本語 →」「ENGLISH →」を押して選んだ言語は、次からそちらを優先する。 */
(function () {
  var page = document.documentElement.lang === 'ja' ? 'ja' : 'en';
  var other = page === 'ja' ? 'en' : 'ja';
  var KEY = 'nitona27_lang';

  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a.lang[hreflang]');
    if (a) save(a.getAttribute('hreflang'));
  });

  if (/bot|crawl|spider|slurp/i.test(navigator.userAgent || '')) return;
  var alt = document.querySelector('link[rel="alternate"][hreflang="' + other + '"]');
  if (!alt) return;

  var want = saved();
  if (want !== 'ja' && want !== 'en') {
    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    want = /^ja/i.test(langs[0] || '') ? 'ja' : 'en';
  }
  if (want === page) return;

  var path = new URL(alt.href).pathname;
  if (path === location.pathname) return;
  location.replace(path + location.search + location.hash);
})();
