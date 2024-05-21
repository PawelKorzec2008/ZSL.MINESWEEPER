//dane sa pobierane z session storage-u
var wysokosc=sessionStorage.getItem("size");
var szerokosc=sessionStorage.getItem("size");
var mnoznik =sessionStorage.getItem("diff")/100;
var iloscmin=Math.round((wysokosc*szerokosc)*mnoznik);

//wypisuje dane w lewym górnym rogu
document.getElementById("datawys").innerHTML=wysokosc;
document.getElementById("dataminy").innerHTML=iloscmin;
document.getElementById("dataszer").innerHTML=szerokosc;

//definiuje zmienne dla utworzenia planszy
const plansza = document.getElementById("plansza");
var sprawdzonepola=[];
var topaste=" ";

//pętla tworząca plansze na podstawie danych z session starage-u
for(i=1;i<=wysokosc;i++){
    topaste+="<div class='wiersz' id='w"+i+"'>";
    for(j=1;j<=szerokosc;j++){
        topaste+="<div class='pole' id='w"+i+"p"+j+"' onclick = 'wys(w"+i+"p"+j+","+i+","+j+")'></div>";
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
$(".pole").css({"background-color": "rgb(122,23,114)", "border": "1px solid black","margin":"1%","height":"98%","width": polewymiaryszer-2+"%"});

//definiuje zmienne potrzebne do losowania pozycji min
var miny=[];
var randminapole;
var randminawiersz;
var minydowylosowania=iloscmin;

//losuje pozycje min
while(minydowylosowania>0){
    randminawiersz = Math.floor(Math.random() * wysokosc+1);
    randminapole = Math.floor(Math.random() * szerokosc+1);
    if(jQuery.inArray({"wiersz":randminawiersz,"pole":randminapole},miny)==-1){
        miny.push({"wiersz":randminawiersz,"pole":randminapole,"index":((randminawiersz-1)*szerokosc+randminapole)});
        minydowylosowania--;
    }
}

//wyświetlam miny na planszy
for(i=0;i<iloscmin;i++){
    $("#w"+miny[i].wiersz+"p"+miny[i].pole).css({"background-color":"white"});
}
//miny.some(miny => miny.wiersz == wierszwybranegopola)&&miny.some(miny => miny.pole == polewybranegopola)
//sprwadz pole jest wywolywane kiedy juz wiemy ze pole nie jest bombą
function sprawdzpole(wierszwybranegopola,polewybranegopola){
    var minydookolawybranegopola=0;
    if(jQuery.inArray({"wiersz":wierszwybranegopola,"pole":polewybranegopola},sprawdzonepola)==-1){
            if(jQuery.inArray({"wiersz":wierszwybranegopola-1,"pole":polewybranegopola-1},miny)!=-1){
                minydookolawybranegopola++;
            }
            if(jQuery.inArray({"wiersz":wierszwybranegopola-1,"pole":polewybranegopola},miny)!=-1){
                minydookolawybranegopola++;
            }
            if(jQuery.inArray({"wiersz":wierszwybranegopola-1,"pole":polewybranegopola+1},miny)!=-1){
                minydookolawybranegopola++;
            }
            if(jQuery.inArray({"wiersz":wierszwybranegopola,"pole":polewybranegopola-1},miny)!=-1){
                minydookolawybranegopola++;
            }
            if(jQuery.inArray({"wiersz":wierszwybranegopola,"pole":polewybranegopola+1},miny)!=-1){
                minydookolawybranegopola++;
            }
            if(jQuery.inArray({"wiersz":wierszwybranegopola+1,"pole":polewybranegopola-1},miny)!=-1){
                minydookolawybranegopola++;
            }
            if(jQuery.inArray({"wiersz":wierszwybranegopola+1,"pole":polewybranegopola},miny)!=-1){
                minydookolawybranegopola++;
            }
            if(jQuery.inArray({"wiersz":wierszwybranegopola+1,"pole":polewybranegopola+1},miny)!=-1){
                minydookolawybranegopola++;
            }
        console.log("sprawdzono wiersz:"+wierszwybranegopola+" pole:"+polewybranegopola+" z sukcesem")
        sprawdzonepola.push({"wiersz":wierszwybranegopola,"pole":polewybranegopola});
        odkryjpole(wierszwybranegopola,polewybranegopola,minydookolawybranegopola);
        if(minydookolawybranegopola==0){
            sprawdzpoladookola(wierszwybranegopola,polewybranegopola);
        }
    }else{
        console.log("wiersz:"+wierszwybranegopola+" pole:"+polewybranegopola+" już było sprawdzone")
    }
}

function sprawdzpoladookola(wierszoryginalnegopola,poleoryginalnegopola){
    if(jQuery.inArray({"wiersz":wierszoryginalnegopola-1,"pole":poleoryginalnegopola-1},miny)==-1&&wierszoryginalnegopola-1>0&&poleoryginalnegopola-1>0&&jQuery.inArray({"wiersz":wierszoryginalnegopola-1,"pole":poleoryginalnegopola-1},sprawdzonepola)==-1){
        sprawdzpole(wierszoryginalnegopola-1,poleoryginalnegopola-1);
    }
    if(jQuery.inArray({"wiersz":wierszoryginalnegopola-1,"pole":poleoryginalnegopola},miny)==-1&&wierszoryginalnegopola-1>0&&jQuery.inArray({"wiersz":wierszoryginalnegopola-1,"pole":poleoryginalnegopola},sprawdzonepola)==-1){
        sprawdzpole(wierszoryginalnegopola-1,poleoryginalnegopola);
    }
    if(jQuery.inArray({"wiersz":wierszoryginalnegopola-1,"pole":poleoryginalnegopola+1},miny)==-1&&wierszoryginalnegopola-1>0&&poleoryginalnegopola+1<=szerokosc&&jQuery.inArray({"wiersz":wierszoryginalnegopola-1,"pole":poleoryginalnegopola+1},sprawdzonepola)==-1){
        sprawdzpole(wierszoryginalnegopola-1,poleoryginalnegopola+1);
    }
    if(jQuery.inArray({"wiersz":wierszoryginalnegopola,"pole":poleoryginalnegopola-1},miny)==-1&&poleoryginalnegopola-1>0&&jQuery.inArray({"wiersz":wierszoryginalnegopola,"pole":poleoryginalnegopola-1},sprawdzonepola)==-1){
        sprawdzpole(wierszoryginalnegopola,poleoryginalnegopola-1);
    }
    if(jQuery.inArray({"wiersz":wierszoryginalnegopola,"pole":poleoryginalnegopola+1},miny)==-1&&poleoryginalnegopola+1<=szerokosc&&jQuery.inArray({"wiersz":wierszoryginalnegopola,"pole":poleoryginalnegopola+1},sprawdzonepola)==-1){
        sprawdzpole(wierszoryginalnegopola,poleoryginalnegopola+1);
    }
    if(jQuery.inArray({"wiersz":wierszoryginalnegopola+1,"pole":poleoryginalnegopola-1},miny)==-1&&wierszoryginalnegopola+1<=wysokosc&&poleoryginalnegopola-1>0&&jQuery.inArray({"wiersz":wierszoryginalnegopola+1,"pole":poleoryginalnegopola-1},sprawdzonepola)==-1){
        sprawdzpole(wierszoryginalnegopola+1,poleoryginalnegopola-1);
    }
    if(jQuery.inArray({"wiersz":wierszoryginalnegopola+1,"pole":poleoryginalnegopola},miny)==-1&&wierszoryginalnegopola+1<=wysokosc&&jQuery.inArray({"wiersz":wierszoryginalnegopola+1,"pole":poleoryginalnegopola},sprawdzonepola)==-1){
        sprawdzpole(wierszoryginalnegopola+1,poleoryginalnegopola);
    }
    if(jQuery.inArray({"wiersz":wierszoryginalnegopola+1,"pole":poleoryginalnegopola+1},miny)==-1&&wierszoryginalnegopola+1<=wysokosc&&poleoryginalnegopola+1<=szerokosc&&jQuery.inArray({"wiersz":wierszoryginalnegopola+1,"pole":poleoryginalnegopola+1},sprawdzonepola)==-1){
        sprawdzpole(wierszoryginalnegopola+1,poleoryginalnegopola+1);
    }
}

function odkryjpole(wierszdoodkrycia,poledoodkrycia,minydookolaodkrywanegopola){
    $("#w"+wierszdoodkrycia+"p"+poledoodkrycia).html(minydookolaodkrywanegopola);
    console.log("odkryto wiersz:"+wierszdoodkrycia+" pole:"+poledoodkrycia);
}

function wys(id,wierz,pole){

}