//funkcja sprawdza czy ustawienia były zmieniane. Jeżeli nie, ustawia defaultowe
function startgame(){
    if(sessionStorage.getItem("altered")!=1){
        sessionStorage.setItem("diff", 10);
        sessionStorage.setItem("size", 9);
    }
}