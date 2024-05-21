//funkcja sprawdza czy ustawienia były zmieniane. Jeżeli nie, ustawia defaultowe
function startgame(){
    location.href = "../PLANSZA/index.html"
    if(sessionStorage.getItem("altered")!=1){
        sessionStorage.setItem("diff", 10);
        sessionStorage.setItem("size", 9);
    }
}
function Ustawienia(){
    location.href = "../MENU/settings.html"
}
function zakoncz(){
    window.close('','_parent','');
}