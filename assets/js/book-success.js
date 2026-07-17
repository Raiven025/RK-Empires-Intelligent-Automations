// PayPal return handler: /book/success/?provider=paypal&token=<orderId>
// captures the approved order (idempotent server-side, safe on refresh).
(function () {
  var params = new URLSearchParams(window.location.search);
  var el = document.getElementById('capture-status');
  if (!el || params.get('provider') !== 'paypal' || !params.get('token')) return;

  var API = 'https://rk-empires-api-production.up.railway.app/api/v1';
  el.style.display = 'block';
  el.textContent = 'Finalizing your PayPal payment...';

  fetch(API + '/public/paypal/capture', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId: params.get('token') })
  })
    .then(function (res) {
      return res.json().catch(function () { return null; }).then(function (data) {
        return { ok: res.ok, data: data };
      });
    })
    .then(function (result) {
      if (result.ok && result.data && result.data.status === 'COMPLETED') {
        el.textContent = '✓ PayPal payment confirmed — your slot is locked in.';
        return;
      }
      throw new Error('capture failed');
    })
    .catch(function () {
      el.className = 'capture-status error';
      el.innerHTML = 'Your PayPal approval went through, but confirming the payment hit a snag. Don’t pay again — email <a href="mailto:rk.empires01@gmail.com">rk.empires01@gmail.com</a> and Raiven will confirm your reservation manually.';
    });
})();
