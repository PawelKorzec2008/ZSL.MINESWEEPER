//definiuje SFX
var audio = new Audio("../SFX/SpaceTapped.ogg");

var wysokosc = Number(sessionStorage.getItem("sizeh"));
var szerokosc = Number(sessionStorage.getItem("sizew"));
var diff = Number(sessionStorage.getItem("diff"));
var difstr;
var minystr = sessionStorage.getItem('naduszoneminy');
var miny = JSON.parse(minystr);
var sekundy = Number(sessionStorage.getItem("sekundy"));
var minuty = Number(sessionStorage.getItem("minuty"));
//console.log(sekundy)
//console.log(minuty);
// zamiana liczbowego poziomu trudonosci na napis
switch (diff) {
    case 10:
        diffstr = "Łatwym";
        break;
    case 20:
        diffstr = "Normalnym";
        break;
    case 30:
        diffstr = "Trudnym";
        break;
    case 40:
        diffstr = "Niemożliwym";
        break;
    default:
        diffstr = "Własnym";
        break;

}
// funkcja konwertujuaca czas aby mozna bylo go wyswietlic
function convertTime(s, m) {
    var czas = "";
    var sh;
    var mh;
    var ss = s;
    var ms = m;

    if (m <= 9) {
        mh = "0" + ms
        czas += mh
    }
    else {
        czas += ms
    }
    czas += ":"
    if (s <= 9) {
        sh = "0" + s
        czas += sh
    }
    else {
        czas += ss
    }
    return czas;
}

$(document).ready(function () {

    $(".lilh").html("Udało&nbsp;ci&nbsp;się&nbsp;ukończyć&nbsp;grę w&nbsp;POLE&nbsp;MINOWE na&nbsp;poziomie " + "<d><b>" + diffstr + "</b></d>");
    $("#miny").html(miny.length);
    $("#czas").html(convertTime(sekundy, minuty));
    $("#rozmiar").html(wysokosc + "x" + szerokosc);

});

function back() {
    audio.play();
    setTimeout(backSoud,200)
}

function backSoud() {
    location.href = "../MENU/index.html";
}
