function powrot(){
    window.history.back();
}
var lastnr = 9; // ostatni numer
var lastdif = "Ep";
function wybierzNumer(numer){
    document.getElementById("i"+lastnr).style.backgroundColor = "blue";
    var id = parseInt(numer);
    document.getElementById("i"+id).style.backgroundColor = "rgb(122, 23, 114)";
    lastnr = id
}
function wybierzTrudnosc(nazwa) {
    document.getElementById(lastdif).style.backgroundColor = "blue";
    lastdif = nazwa
    document.getElementById(nazwa).style.backgroundColor = "rgb(122, 23, 114)";
  }
function zapisz() {
    toString(lastnr)
    sessionStorage.setItem("Trudnosc",lastdif)
    sessionStorage.setItem("Pola",lastnr)
    console.log(sessionStorage.getItem("Trudnosc"))
    console.log(sessionStorage.getItem("Pola"))
}