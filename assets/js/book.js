// Priority-deposit checkout (interim static version of rk-empires-site /book).
// Talks directly to the production API; buttons show a friendly notice until
// the payment providers are configured server-side.
(function () {
  var API = 'https://rk-empires-api-production.up.railway.app/api/v1';
  var err = document.getElementById('book-error');
  var btns = Array.prototype.slice.call(document.querySelectorAll('[data-provider]'));

  function setBusy(busy) {
    btns.forEach(function (b) { b.disabled = busy; });
  }

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var provider = btn.getAttribute('data-provider');
      var label = btn.textContent;
      if (err) err.style.display = 'none';
      setBusy(true);
      btn.textContent = provider === 'paypal' ? 'Opening PayPal...' : 'Opening secure checkout...';
      fetch(API + '/public/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ package: 'project-deposit', provider: provider })
      })
        .then(function (res) {
          return res.json().catch(function () { return null; }).then(function (data) {
            return { ok: res.ok, data: data };
          });
        })
        .then(function (result) {
          if (result.ok && result.data && result.data.url) {
            window.location.href = result.data.url;
            return;
          }
          throw new Error('checkout unavailable');
        })
        .catch(function () {
          if (err) err.style.display = 'block';
          setBusy(false);
          btn.textContent = label;
        });
    });
  });
})();
