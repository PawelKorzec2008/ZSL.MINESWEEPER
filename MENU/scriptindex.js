//definiuje SFX
var audio = new Audio("../SFX/SpaceTapped.ogg");

//wersja 'sound' każdej funkcji zapewnia że SFX zagra bez problemów
function startgame(){
    audio.play();
    setTimeout(startgameSound,200);
}
//funkcja sprawdza czy ustawienia były zmieniane. Jeżeli nie, ustawia domyślne
function startgameSound(){
    location.href = "../PLANSZA/index.html"
    if(sessionStorage.getItem("altered")!=1){
        sessionStorage.setItem("diff", 10);
        sessionStorage.setItem("sizeh", 9);
        sessionStorage.setItem("sizew", 9);
    }
}

function Ustawienia(){
    audio.play();
    setTimeout(UstawieniaSound,200);
}
//funkcja zabiera gracza na podstronę z ustawieniami
function UstawieniaSound(){
    location.href = "../MENU/settings.html"
}

function zakoncz(){
    audio.play();
    setTimeout(zakonczSound,200);
}
function zakonczSound(){
    //window.close('','_parent',''); 
    //^nie działa
}