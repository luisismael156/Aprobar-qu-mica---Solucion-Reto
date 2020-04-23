var Moeller = [
"1s","2s","2p","3s","3p","4s","3d","4p","5s","4d","5p","6s","4f","5d","6p","7s","5f","6d","7p"];
var numberAtomic = 0;
var elementQuimic = "Hidrogeno";
var Result = [];

var subniveles = {
  s: 2,
  p: 6,
  d: 10,
  f: 14,
};
function leerArchivo(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function (e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido) {
  let content = contenido.split("\n");
  console.log(content);
  content.forEach((element) => {
    let elementos = element.split(" ");
    let Acumulado = [];
    let valores = {
      elementoQuimico: elementos[0],
      numeroQuimico: elementos[1],
    };
    console.log(valores);

    for (let i = 0; i < Moeller.length; i++) {
      if (valores.elementoQuimico != "Hidrogeno") {
        if (valores.numeroQuimico > 0) {
          let [numberMoeller, subnivelMoeller] = Moeller[i].split("");
          if (valores.numeroQuimico >= subniveles[subnivelMoeller]) {
            valores.numeroQuimico -= subniveles[subnivelMoeller];
            Acumulado.push(Moeller[i] + "" + subniveles[subnivelMoeller]);
          } else {
            Acumulado.push(Moeller[i] + "" + valores.numeroQuimico);
            break;
          }
        }
      } else {
        Acumulado.push("1s0");
        break;
      }
    }
    var elemento = document.getElementById("contenido-archivo");
    elemento.innerHTML += valores.elementoQuimico+ "<br>"+ Acumulado + "<br><br>";

    Result.push(Acumulado);
  });
}
document
  .getElementById("file-input")
  .addEventListener("change", leerArchivo, false);

