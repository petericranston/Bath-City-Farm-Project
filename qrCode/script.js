function domReady(fn) {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(fn, 1000);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

domReady(function () {
  function onScanSuccess(decodeText, decodeResult) {
    console.log("Scanned QR Code:", decodeText);
    window.location.href = decodeText;
  }

  let htmlscanner = new Html5QrcodeScanner("my-qr-reader", {
    fps: 10,
    qrbox: 250, // fixed typo from 'qrbos' to 'qrbox'
  });

  htmlscanner.render(onScanSuccess);
});

