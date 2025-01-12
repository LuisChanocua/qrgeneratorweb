function limpiar() {
  var dataInput = document.getElementById("dataInput");
  dataInput.value = '';
  document.getElementById("codigosQR").innerHTML = '';
}

function generarCodigosQR() {
  var datos = document.getElementById("dataInput").value;
  var datosArray = datos.split('__');

  var codigosQRDiv = document.getElementById("codigosQR");

  codigosQRDiv.innerHTML = '';

  if (datos.trim() !== '') {
    datosArray.forEach(function (data, index) {
      var qrcode = new QRCode(document.createElement('div'), {
        text: data.trim(),
        width: 300,
        height: 300
      });

      codigosQRDiv.appendChild(qrcode._el);

      var downloadButton = document.createElement("button");
      downloadButton.innerText = "Descargar QR " + (index + 1);
      downloadButton.classList.add("btn");
      downloadButton.classList.add("btn-info");
      downloadButton.onclick = function () {
        descargarCodigoQRIndividual(data.trim(), qrcode._el.getElementsByTagName("img")[0]);
      };
      codigosQRDiv.appendChild(downloadButton);
    });
  } else {
    alert('Ingrese datos para generar los códigos QR.');
  }
}

function descargarCodigoQRIndividual(nombreArchivo, imagen) {
  var downloadLink = document.createElement("a");

  html2canvas(imagen).then(function (canvas) {
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.download = nombreArchivo + "_codigo_qr.png";

    downloadLink.click();
  });
}

function descargarTodosIndividualmente() {
  var codigosQRDiv = document.getElementById("codigosQR");
  var imagenes = codigosQRDiv.getElementsByTagName("img");

  if (imagenes.length > 0) {
    for (var i = 0; i < imagenes.length; i++) {
      var downloadLink = document.createElement("a");
      downloadLink.href = imagenes[i].src; // La URL de la imagen
      downloadLink.download = `codigo_qr_${i + 1}.png`; // Nombre del archivo a descargar
      downloadLink.click(); // Simula el clic para descargar
    }
  } else {
    alert("No hay códigos QR para descargar.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let year_footer = document.getElementById('year-footer');
  year_footer.innerText = new Date().getFullYear();
});
