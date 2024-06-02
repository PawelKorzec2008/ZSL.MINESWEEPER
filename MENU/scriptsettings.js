//sprawdzamy czy ustawienia były zmienione. Jezełi nie ustawiamy defaultowe
if(sessionStorage.getItem("altered")!=1){
    var diff = 10;
    var size = 9;
}else{
    var diff = sessionStorage.getItem("diff");
    var size = sessionStorage.getItem("size");
}

//ustawiamy odpowiednie guziki na kolor niebieski
switch(Number(diff)){
    case 10:
        console.log(diff);
        $("#easy").css({"background-color":"blue"});
        break;
    case 20:
        console.log(diff);
        $("#normal").css({"background-color":"blue"});
        break;
    case 30:
        console.log(diff);
        $("#hard").css({"background-color":"blue"});
        break;
    case 40:
        console.log(diff);
        $("#impossible").css({"background-color":"blue"});
        break;
}

switch(Number(size)){
    case 9:
        console.log(size);
        $("#9x9").css({"background-color":"blue"});
        break;
    case 12:
        console.log(size);
        $("#12x12").css({"background-color":"blue"});
        break;
    case 15:
        console.log(size);
        $("#15x15").css({"background-color":"blue"});
        break;
    case 18:
        console.log(size);
        $("#18x18").css({"background-color":"blue"});
        break;
}

//funkcja zmienia kolor guzików i ustawia nową trudność
function fdiff(x){
    diff=x;
    $(".btndiff").css({"background-color":"rgb(122,23,114)"});
    switch(diff){
        case 10:
            $("#easy").css({"background-color":"blue"});
            break;
        case 20:
            $("#normal").css({"background-color":"blue"});
            break;
        case 30:
            $("#hard").css({"background-color":"blue"});
            break;
        case 40:
            $("#impossible").css({"background-color":"blue"});
            break;
    }
};

//funkcja zmienia kolor guzików i ustawia nowy rozmiar
function fsize(x){
    size=x;
    $(".btnsize").css({"background-color":"rgb(122,23,114)"});
    switch(size){
        case 9:
            $("#9x9").css({"background-color":"blue"});
            break;
        case 12:
            $("#12x12").css({"background-color":"blue"});
            break;
        case 15:
            $("#15x15").css({"background-color":"blue"});
            break;
        case 18:
            $("#18x18").css({"background-color":"blue"});
            break;
    }
};

//funkcja zapisuje nowe ustawienia i fakt żed były one zmienione
function save(){
    sessionStorage.setItem("diff", diff);
    sessionStorage.setItem("size", size);
    sessionStorage.setItem("altered", 1);
};
function back(){
    window.history.back();
}