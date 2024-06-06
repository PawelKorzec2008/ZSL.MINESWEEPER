//Definiuje SFX
var audio = new Audio("../SFX/SpaceTapped.ogg");

//sprawdzamy czy ustawienia były zmienione. Jeżeli nie, ustawiamy podstawowe
if(sessionStorage.getItem("altered")!=1){
    var diff = 10;
    var sizew = 9;
    var sizeh = 9;
}else{
    var diff = sessionStorage.getItem("diff");
    var sizeh = sessionStorage.getItem("sizeh");
    var sizew = sessionStorage.getItem("sizew");
}

//ustawiamy odpowiednie guziki na kolor niebieski
switch(Number(diff)){
    case 10:
        console.log(diff);
        $("#easy").css({"background-color":"rgb(58, 96, 178)"});
        break;
    case 20:
        console.log(diff);
        $("#normal").css({"background-color":"rgb(58, 96, 178)"});
        break;
    case 30:
        console.log(diff);
        $("#hard").css({"background-color":"rgb(58, 96, 178)"});
        break;
    case 40:
        console.log(diff);
        $("#impossible").css({"background-color":"rgb(58, 96, 178)"});
        break;
    default:
        console.log(diff);
        $("#wlasnydiff").css({"background-color":"rgb(58, 96, 178)"});
}

switch(sizeh+"|"+sizew){
    case ("9|9"):
        console.log(sizeh);
        console.log(sizew);
        $("#9x9").css({"background-color":"rgb(58, 96, 178)"});
        break;
    case ("12|12"):
        console.log(sizeh);
        console.log(sizew);
        $("#12x12").css({"background-color":"rgb(58, 96, 178)"});
        break;
    case ("15|15"):
        console.log(sizeh);
        console.log(sizew);
        $("#15x15").css({"background-color":"rgb(58, 96, 178)"});
        break;
    case ("18|18"):
        console.log(sizeh);
        console.log(sizew);
        $("#18x18").css({"background-color":"rgb(58, 96, 178)"});
        break;
    default:
        console.log(sizeh);
        console.log(sizew);
        $("#wlasnysize").css({"background-color":"rgb(58, 96, 178)"});
}

//funkcja zmienia kolor guzików i ustawia nową trudność
function fdiff(x){
    diff=x;
    audio.play();
    $(".btndiff").css({"background-color":"rgb(98, 136, 218)"});
    switch(diff){
        case 10:
            $("#easy").css({"background-color":"rgb(58, 96, 178)"});
            break;
        case 20:
            $("#normal").css({"background-color":"rgb(58, 96, 178)"});
            break;
        case 30:
            $("#hard").css({"background-color":"rgb(58, 96, 178)"});
            break;
        case 40:
            $("#impossible").css({"background-color":"rgb(58, 96, 178)"});
            break;
    }
};

//funkcja zmienia kolor guzików i ustawia nowy rozmiar
function fsize(x){
    sizew=x;
    sizeh=x;
    audio.play();
    $(".btnsize").css({"background-color":"rgb(98, 136, 218)"});
    switch(sizeh+"|"+sizew){
        case ("9|9"):
            $("#9x9").css({"background-color":"rgb(58, 96, 178)"});
            break;
        case ("12|12"):
            $("#12x12").css({"background-color":"rgb(58, 96, 178)"});
            break;
        case ("15|15"):
            $("#15x15").css({"background-color":"rgb(58, 96, 178)"});
            break;
        case ("18|18"):
            $("#18x18").css({"background-color":"rgb(58, 96, 178)"});
            break;
    }
};

//funkcja odpowiedzialna za ustawianie własnego rozmiaru planszy
function customsize(){
    audio.play();
    sizeh = prompt("Podaj wysokość planszy [2-200]");
    //pytanie jest powtarzane dopóki odpowiedź gracza nie znajdzie się w podanym zakresie
    while(Number(sizeh)>200||Number(sizeh)<2){
        sizeh = prompt("Podaj wysokość planszy [2-200]");
    }
    sizew = prompt("Podaj szerokość planszy [2-200]");
    while(Number(sizew)>200||Number(sizew)<2){
        sizew = prompt("Podaj szerokość planszy [2-200]");
    }
    $(".btnsize").css({"background-color":"rgb(98, 136, 218)"});
    $("#wlasnysize").css({"background-color":"rgb(58, 96, 178)"});
}

//funkcja odpowiedzialna za ustawianie własnego poziomu trudności
function customdiff(){
    audio.play();
    diff = prompt("Podaj procent zaminowanych pól [1-99]");
    while(Number(diff)>99||Number(diff)<1){
        diff = prompt("Podaj procent zaminowanych pól [1-99]");
    }
    $(".btndiff").css({"background-color":"rgb(98, 136, 218)"});
    $("#wlasnydiff").css({"background-color":"rgb(58, 96, 178)"});
}

//funkcja zapisuje nowe ustawienia i fakt że były one zmienione
function save(){
    audio.play();
    sessionStorage.setItem("diff", diff);
    sessionStorage.setItem("sizew", sizew);
    sessionStorage.setItem("sizeh", sizeh);
    sessionStorage.setItem("altered", 1);
};

//funkcja wysyła gracza z powrotem na stronę główną. wersja 'sound' zapewnia że SFX zagra bez przeszkód
function back(){
    audio.play();
    setTimeout(backSound,200)
}
function backSound(){
    window.location.href = '../MENU/index.html'; 
}