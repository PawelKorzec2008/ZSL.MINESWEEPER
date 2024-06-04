//sprawdzamy czy ustawienia były zmienione. Jezełi nie ustawiamy defaultowe
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
    default:
        console.log(diff);
        $("#wlasnydiff").css({"background-color":"blue"});
}

switch(true){
    case (sizeh==9&&sizew==9):
        console.log(sizeh);
        console.log(sizew);
        $("#9x9").css({"background-color":"blue"});
        break;
    case (sizeh==12&&sizew==12):
        console.log(sizeh);
        console.log(sizew);
        $("#12x12").css({"background-color":"blue"});
        break;
    case (sizeh==15&&sizew==15):
        console.log(sizeh);
        console.log(sizew);
        $("#15x15").css({"background-color":"blue"});
        break;
    case (sizeh==18&&sizew==18):
        console.log(sizeh);
        console.log(sizew);
        $("#18x18").css({"background-color":"blue"});
        break;
    default:
        console.log(sizeh);
        console.log(sizew);
        $("#wlasnysize").css({"background-color":"blue"});
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
    sizew=x;
    sizex=x;
    $(".btnsize").css({"background-color":"rgb(122,23,114)"});
    switch(sizex|sizew){
        case (sizeh==9&&sizew==9):
            $("#9x9").css({"background-color":"blue"});
            break;
        case (sizeh==12&&sizew==12):
            $("#12x12").css({"background-color":"blue"});
            break;
        case (sizeh==15&&sizew==15):
            $("#15x15").css({"background-color":"blue"});
            break;
        case (sizeh==18&&sizew==18):
            $("#18x18").css({"background-color":"blue"});
            break;
    }
};

function customsize(){
    sizeh = prompt("Podaj wysokość planszy [2-200]");
    while(Number(sizeh)>200||Number(sizeh)<2){
        sizeh = prompt("Podaj wysokość planszy [2-200]");
    }
    sizew = prompt("Podaj szerokość planszy [2-200]");
    while(Number(sizew)>200||Number(sizew)<2){
        sizew = prompt("Podaj szerokość planszy [2-200]");
    }
    $(".btnsize").css({"background-color":"rgb(122,23,114)"});
    $("#wlasnysize").css({"background-color":"blue"});
}

function customdiff(){
    diff = prompt("Podaj procent zaminowanych pól [1-99]");
    while(Number(diff)>99||Number(diff)<1){
        diff = prompt("Podaj procent zaminowanych pól [1-99]");
    }
    $(".btndiff").css({"background-color":"rgb(122,23,114)"});
    $("#wlasnydiff").css({"background-color":"blue"});
}

//funkcja zapisuje nowe ustawienia i fakt żed były one zmienione
function save(){
    sessionStorage.setItem("diff", diff);
    sessionStorage.setItem("sizew", sizew);
    sessionStorage.setItem("sizeh", sizeh);
    sessionStorage.setItem("altered", 1);
};
function back(){
    window.history.back();
}