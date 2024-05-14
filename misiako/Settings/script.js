function powrot(){
    window.history.back();
}
var lastnr; // ostatni numer
var lastdif;
// TEN IF MA PROBLEM Z KONWERSJA DANYCH I WYSWIETLANIU PRAWIDLOWEGO KOLRU NA ODPOWIDNIM NUMERZE
var be = parseInt(sessionStorage.getItem("Jest"))
if(be != 1){
    lastnr = 9
    lastdif = "Ep"

    document.getElementById("i"+lastnr).style.backgroundColor = "rgb(122, 23, 114)"
    document.getElementById(lastdif).style.backgroundColor ="rgb(122, 23, 114)"
}
else{
    temp = sessionStorage.getItem("Pola")
    lastnr = parseInt(temp)
    lastdif = sessionStorage.getItem("Trudnosc")
    console.log("i"+lastnr)
    document.getElementById("i"+lastnr).style.backgroundColor = "rgb(122, 23, 114)";
    document.getElementById(lastdif).style.backgroundColor = "black"
}



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
    sessionStorage.setItem("Jest","1")
    console.log(sessionStorage.getItem("Trudnosc"))
    console.log(sessionStorage.getItem("Pola"))
}