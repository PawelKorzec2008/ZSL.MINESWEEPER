//tutaj dane te będą pobierane z session storage-u
var wysokosc=15;
var szerokosc=15;
var iloscmin=30;

//wypisuje dane w lewym górnym rogu
document.getElementById("datawys").innerHTML=wysokosc;
document.getElementById("dataminy").innerHTML=iloscmin;
document.getElementById("dataszer").innerHTML=szerokosc;

//definiuje zmienne dla utworzenia planszy
const plansza = document.getElementById("plansza");
var topaste=" ";

//pętla tworząca plansze na podstawie danych z session starage-u
for(i=1;i<=wysokosc;i++){
    topaste+="<div class='wiersz' id='w"+i+"'>";
    for(j=1;j<=szerokosc;j++){
        topaste+="<div class='pole' id='w"+i+"p"+j+"'></div>";
    }
    topaste+="</div>"
}

//wypisanie planszy
plansza.innerHTML+=topaste;


//wyliczam wymiary dla pól na planszy
polewymiarywys=Math.round(100/wysokosc);
polewymiaryszer=Math.round(100/szerokosc);

//wyświetlam pola na planszy
$(".wiersz").css({"height": polewymiarywys-2+"%"});
$(".pole").css({"background-color": "white", "border": "1px solid black","margin":"1%","height":"98%","width": polewymiaryszer-2+"%"});

//definiuje zmienne potrzebne do losowania pozycji min
var miny=[];
var randminapole;
var randminawiersz;
var minydowylosowania=iloscmin;

//losuje pozycje min
while(minydowylosowania>0){
    randminawiersz = Math.floor(Math.random() * wysokosc+1);
    randminapole = Math.floor(Math.random() * szerokosc+1);
    if(miny.includes({"wiersz":randminawiersz,"pole":randminapole})==false){
        miny.push({"wiersz":randminawiersz,"pole":randminapole});
        minydowylosowania--;
    }
}

//wyświetlam miny na planszy
for(i=0;i<iloscmin;i++){
    $("#w"+miny[i].wiersz+"p"+miny[i].pole).css({"background-color":"red"});
}