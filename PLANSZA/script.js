//dane sa pobierane z session storage-u
var wysokosc=Number(sessionStorage.getItem("size"));
var szerokosc=Number(sessionStorage.getItem("size"));
var mnoznik=Number(sessionStorage.getItem("diff")/100);
var iloscmin=Number(Math.round((wysokosc*szerokosc)*mnoznik));

//wypisuje dane w lewym górnym rogu
document.getElementById("datawys").innerHTML=wysokosc;
//document.getElementById("dataminy").innerHTML=iloscmin;
document.getElementById("dataszer").innerHTML=szerokosc;
$("#t2").html(iloscmin)
$("#t3").html(wysokosc*szerokosc-iloscmin)


//definiuje zmienne potrzebne dla utworzenia planszy
const plansza = document.getElementById("plansza");
var sprawdzonepola=[];
var topaste=" ";

//pętla tworząca plansze na podstawie danych z session starage-u
for(i=1;i<=wysokosc;i++){
    topaste+="<div class='wiersz' id='w"+i+"'>";
    for(j=1;j<=szerokosc;j++){
        topaste+="<div class='pole' id='w"+i+"p"+j+"' onclick = 'wys(w"+i+"p"+j+","+i+","+j+")' oncontextmenu='oflaguj("+i+","+j+")'></div>";
    }
    topaste+="</div>"
}

//wypisanie planszy
plansza.innerHTML+=topaste;


//wyliczam rozmiar pól na planszy
polewymiarywys=Math.round(100/wysokosc);
polewymiaryszer=Math.round(100/szerokosc);

//wyświetlam pola na planszy
$(".wiersz").css({"height": polewymiarywys-2+"%"});
$(".pole").css({"background-color": "rgb(122,23,114)", "border": "1px solid black","margin":"1%","height":"98%","width": polewymiaryszer-2+"%","text-align":"center"});

//definiuje zmienne potrzebne do losowania pozycji min
var miny=[];
var miny2=[];
var randminapole;
var randminawiersz;
var minydowylosowania=iloscmin;

//losuje pozycje min
while(minydowylosowania>0){
    randminawiersz = Math.floor(Math.random() * wysokosc+1);
    randminapole = Math.floor(Math.random() * szerokosc+1);
    if(miny.includes(Number((randminawiersz-1)*szerokosc+randminapole))==false){
        miny2.push({"wiersz":randminawiersz,"pole":randminapole,"index":((randminawiersz-1)*szerokosc+randminapole)});
        miny.push((randminawiersz-1)*szerokosc+randminapole);
        minydowylosowania--;
    }
}

//wyświetlam miny na planszy
/*
for(i=0;i<iloscmin;i++){
    $("#w"+miny2[i].wiersz+"p"+miny2[i].pole).css({"background-color":"white"});
}
*/

//sprwadz pole jest wywolywane kiedy juz wiemy ze pole nie jest bombą
function sprawdzpole(wierszwybranegopola,polewybranegopola,indexwybranegopola){
    //console.log("sprawdzam pole o indexie "+indexwybranegopola);
    var minydookolawybranegopola=0;
    //jeżeli pole nie było już sprawdzane, liczymy ile pól dookoła są minami
    if(sprawdzonepola.includes(Number(indexwybranegopola))==false){
            if(miny.includes(Number(indexwybranegopola-szerokosc-1))!=false&&wierszwybranegopola-1>0&&polewybranegopola-1>0){
                minydookolawybranegopola++;
                //console.log("mina w checku 1: "+Number(indexwybranegopola-szerokosc-1));
            }
            if(miny.includes(Number(indexwybranegopola-szerokosc))!=false&&wierszwybranegopola-1>0){
                minydookolawybranegopola++;
                //console.log("mina w checku 2: "+Number(indexwybranegopola-szerokosc));
            }
            if(miny.includes(Number(indexwybranegopola-szerokosc+1))!=false&&wierszwybranegopola-1>0&&polewybranegopola+1<=szerokosc){
                minydookolawybranegopola++;
                //console.log("mina w checku 3: "+Number(indexwybranegopola-szerokosc+1));
            }
            if(miny.includes(Number(indexwybranegopola-1))!=false&&polewybranegopola-1>0){
                minydookolawybranegopola++;
                //console.log("mina w checku 4: "+Number(indexwybranegopola-1));
            }
            if(miny.includes(Number(indexwybranegopola+1))!=false&&polewybranegopola+1<=szerokosc){
                minydookolawybranegopola++;
                //console.log("mina w checku 5: "+Number(indexwybranegopola+1));
            }
            if(miny.includes(Number(indexwybranegopola+szerokosc-1))!=false&&wierszwybranegopola+1<=wysokosc&&polewybranegopola-1>0){
                minydookolawybranegopola++;
                //console.log("mina w checku 6: "+Number(indexwybranegopola+szerokosc-1));
            }
            if(miny.includes(Number(indexwybranegopola+szerokosc))!=false&&wierszwybranegopola+1<=wysokosc){
                minydookolawybranegopola++;
                //console.log("mina w checku 7: "+Number(indexwybranegopola+szerokosc));
            }
            if(miny.includes(Number(indexwybranegopola+szerokosc+1))!=false&&wierszwybranegopola+1<=wysokosc&&polewybranegopola+1<=szerokosc){
                minydookolawybranegopola++;
                //console.log("mina w checku 8"+Number(indexwybranegopola+szerokosc+1));
            }
        //po zliczeniu min, dodaję numer pola do listy sprawdzonych pól, odświeżam licznik i wyświetlam numer min na polu
        sprawdzonepola.push(Number((wierszwybranegopola-1)*szerokosc+polewybranegopola));
        $("#t3").html(wysokosc*szerokosc-iloscmin-sprawdzonepola.length)
        //console.log("sprawdzono pole o indexie "+indexwybranegopola+" znaleziono "+minydookolawybranegopola+" min");
        odkryjpole(wierszwybranegopola,polewybranegopola,minydookolawybranegopola);
        //jeżeli dookoła nie ma min, pola dookoła też są sprawdzane
        if(minydookolawybranegopola==0){
            sprawdzpoladookola(wierszwybranegopola,polewybranegopola,indexwybranegopola);
        }
        //jeżeli nie ma nieodkrytych pól które nie są minami, gra się kończy
        if(wysokosc*szerokosc-iloscmin-sprawdzonepola.length==0){
            koniecgry();
        }
    }else{
        //console.log("wiersz:"+wierszwybranegopola+" pole:"+polewybranegopola+" już było sprawdzone")
    }
}

//funkcja sprawdza pola dookoła wybranego pola
function sprawdzpoladookola(wierszoryginalnegopola,poleoryginalnegopola,indexoryginalnegopola){
    //jeżeli pole jest miną, poza planszą lub było już sprawdzane, nie będzie ono sprawdzane
    if(miny.includes(indexoryginalnegopola-szerokosc-1)==false&&wierszoryginalnegopola-1>0&&poleoryginalnegopola-1>0&&sprawdzonepola.includes(indexoryginalnegopola-szerokosc-1)==false&&indexoryginalnegopola-szerokosc-1>0){
        sprawdzpole(wierszoryginalnegopola-1,poleoryginalnegopola-1,Number(indexoryginalnegopola-szerokosc-1));
    }
    if(miny.includes(indexoryginalnegopola-szerokosc)==false&&wierszoryginalnegopola-1>0&&sprawdzonepola.includes(indexoryginalnegopola-szerokosc)==false&&indexoryginalnegopola-szerokosc>0){
        sprawdzpole(wierszoryginalnegopola-1,poleoryginalnegopola,Number(indexoryginalnegopola-szerokosc));
    }
    if(miny.includes(indexoryginalnegopola-szerokosc+1)==false&&wierszoryginalnegopola-1>0&&poleoryginalnegopola+1<=szerokosc&&sprawdzonepola.includes(indexoryginalnegopola-szerokosc+1)==false&&indexoryginalnegopola-szerokosc+1>0){
        sprawdzpole(wierszoryginalnegopola-1,poleoryginalnegopola+1,Number(indexoryginalnegopola-szerokosc+1));
    }
    if(miny.includes(indexoryginalnegopola-1)==false&&poleoryginalnegopola-1>0&&sprawdzonepola.includes(indexoryginalnegopola-1)==false&&indexoryginalnegopola-1>0){
        sprawdzpole(wierszoryginalnegopola,poleoryginalnegopola-1,Number(indexoryginalnegopola-1));
    }
    if(miny.includes(indexoryginalnegopola+1)==false&&poleoryginalnegopola+1<=szerokosc&&sprawdzonepola.includes(indexoryginalnegopola+1)==false&&indexoryginalnegopola+1>0){
        sprawdzpole(wierszoryginalnegopola,poleoryginalnegopola+1,Number(indexoryginalnegopola+1));
    }
    if(miny.includes(indexoryginalnegopola+szerokosc-1)==false&&wierszoryginalnegopola+1<=wysokosc&&poleoryginalnegopola-1>0&&sprawdzonepola.includes(indexoryginalnegopola+szerokosc-1)==false&&indexoryginalnegopola+szerokosc-1>0){
        sprawdzpole(wierszoryginalnegopola+1,poleoryginalnegopola-1,Number(indexoryginalnegopola+szerokosc-1));
    }
    if(miny.includes(indexoryginalnegopola+szerokosc)==false&&wierszoryginalnegopola+1<=wysokosc&&sprawdzonepola.includes(indexoryginalnegopola+szerokosc)==false&&indexoryginalnegopola+szerokosc>0){
        sprawdzpole(wierszoryginalnegopola+1,poleoryginalnegopola,Number(indexoryginalnegopola+szerokosc));
    }
    if(miny.includes(indexoryginalnegopola+szerokosc+1)==false&&wierszoryginalnegopola+1<=wysokosc&&poleoryginalnegopola+1<=szerokosc&&sprawdzonepola.includes(indexoryginalnegopola+szerokosc+1)==false&&indexoryginalnegopola+szerokosc+1>0){
        sprawdzpole(wierszoryginalnegopola+1,poleoryginalnegopola+1,Number(indexoryginalnegopola+szerokosc+1));
    }
}

//funkcja wypisuje ilość min dookoła na polu
function odkryjpole(wierszdoodkrycia,poledoodkrycia,minydookolaodkrywanegopola){
    $("#w"+wierszdoodkrycia+"p"+poledoodkrycia).html(minydookolaodkrywanegopola);
}

// losowanie numerow , znakow i odpowiedzi
function losnum() {
    var a = Math.floor(Math.random() * 10) + 1;
    var b = Math.floor(Math.random() * 10) + 1;
    //var c = Math.floor(Math.random() * 4) + 1; DLA '/'
    var c = Math.floor(Math.random() * 3) + 1;
    
    var znk;
    switch (c){
        case 1:
        znk = '+'
        odp = a + b;
        break;
        case 2:
        znk = '-'
        odp = a - b;
        break;
        case 3:
        znk = '*'
        odp = a * b;
        break;
        //znak '/' usunięty ponieważ zwracał niesprawiedliwe lub niemożliwe do zapisania działania
        /*
        case 4:
        znk = '/'
        odp = a / b;
        break;
        */
    }

    $(".quest").html("Ile Wynosi "+a+" "+znk+" "+b+"?")


}
var naduszoneminy=[];
var time;
var odkryteminy=[];
// on click na polach
function wys(id,w,p){
    // trafiono na mine
    //console.log(w,p)
    if(miny.includes((w-1)*szerokosc+p)==true&&odkryteminy.includes("w"+w+"p"+p)==false){
        //console.log("hit")
        losnum();
        timeout();
        naduszoneminy.push("w"+w+"p"+p);
        if(naduszoneminy.length>1){
            if(confirm("Przegrywasz")){
                window.location.href = '../MENU/index.html';    
            }else{
                window.location.href = '../MENU/index.html'; 
            }
        }
    }else if(odkryteminy.includes("w"+w+"p"+p)==false){sprawdzpole(w,p,(w-1)*szerokosc+p)};
}
// Funkcja sprawdzająca prawidziwosc odpowiedzi
function conf(){
    var value = $("#odp").val();
    // dobra odp
    if(value==odp){
        //console.log("fin")
        $("#odp").val(" ")
        $(".quest").html("...")
        clearTimeout(time);
        $("#"+naduszoneminy[0]).css({"background-color":"white"});
        odkryteminy.push(naduszoneminy[0]);
        $("#t2").html(iloscmin-odkryteminy.length);
        naduszoneminy.shift();
        if(iloscmin-odkryteminy.length==0){
            koniecgry();
        }
    }
    //zla odp
    else if(value!=odp){
        if(confirm("Przegrywasz")){
            window.location.href = '../MENU/index.html';    
        }else{
            window.location.href = '../MENU/index.html'; 
        }
    }
}
// ustawianie czasu na rozbrojenie
function timeout(){
     time = setTimeout(Lose,10000)
    // console.log("time on")

}
// funkcja wywolywana gdy konczy sie czas na rozbrojenie
function Lose(){
    console.log("time off");
    if(confirm("Rozbrojenie bomby zajeło zbyt długo czasu. Przegrywasz")){
        window.location.href = '../MENU/index.html';    
    }else{
        window.location.href = '../MENU/index.html'; 
    }
}
var timer1;
// zmienne sekund i minut
var s1 = 1;
var m1 = 0;
// timer gry
$(document).ready(function () {
    timer1 = setInterval(function () {
        if(m1<=9){
            if(s1<=9){
                $("#t1").html("0"+m1+":"+"0"+s1)
            }
            else{
                $("#t1").html("0"+m1+":"+s1)
            }
        }
        else{
            if(s1<=9){
                $("#t1").html(m1+":"+"0"+s1)
            }
            else{
                $("#t1").html(m1+":"+s1)
            }
        }
        //console.log(m1,s1);
        if(s1==59){
            m1 ++;
            s1 = 0;
        }
        else{
        s1++;
    }
      },1000)
});

//funkcja kończąca grę kiedy nie ma żadnych nieodkrytych min lub bezpiecznych pól, wysyła gracza na stronę z gratulacjami
function koniecgry(){
    window.location.href = 'KONIEC.html'; 
}

//symbol flagi do zaznaczania min zmienia się w zależności od miesiąca
var symbolflagi;
const datetime = new Date();
switch(datetime.getMonth()+1){
    case 1:
        //w styczniu jest to kawałek ciasta ponieważ Łukasz ma w styczniu urodziny
        symbolflagi="🍰";
        break;
    case 2:
        //w lutym jest to serce z okazji walentynek
        symbolflagi="❤";
        break;
    case 3:
        //w marcu jest to ciasto ponieważ Paweł ma w styczniu urodziny. Warto zauważyć że Paweł dostaje całe ciasto a Łukasz tylko kawałek. To dlatego, że urodziny Pawła są ważniejsze.
        symbolflagi="🎂";
        break;
    case 4:
        //w kwietniu jest to klaun z okazji prima aprilis
        symbolflagi="🤡";
        break;
    case 5:
        //w maju jest to polska flaga z okazji rocznicy podpisania konstytucji
        symbolflagi="🇵🇱";
        break;
    case 6:
        //w czerwcu jest to tęczowa flaga z okazji miesiąca równości
        symbolflagi="🏳‍🌈";
        break;
    case 7:
        //w lipcu jest to słońce z uwagi na słoneczną lipcową pogodę
        symbolflagi="☀";
        break;
    case 8:
        //w sierpniu jest to strzałka w lewo z okazji międzynarodowego dnia osób leworęcznych
        symbolflagi="⬅";
        break;
    case 9:
        //we wrześniu jest to szkoła z okazji rozpoczęcia roku szkolnego
        symbolflagi="🏫";
        break;
    case 10:
        //we październiku jest to dynia z okazji halloween
        symbolflagi="🎃";
        break;
    case 11:
        //we listopadzie jest to orzch z uwagi na NNN (pomysł Łukasza)
        symbolflagi="🌰";
        break;
    case 12:
        //w grudniu jest to choinka z okazji świąt Bożego narodzenia
        symbolflagi="🎄";
        break;
    default:
        //domyślnie jest to czerwona flaga
        symbolflagi="🚩";
}

//kod który sprawia że prawy przycisk nie otwiera menu
document.addEventListener('contextmenu', event => {
    event.preventDefault();
});

//funkcja i zmienne odpowiedzialne za flagowanie pól
var polaoflagowane=[];
var indexdoflagowania;
function oflaguj(wierszdoflagowania,poledoflagowania){
    indexdoflagowania = (wierszdoflagowania-1)*szerokosc+poledoflagowania
    //jeżeli pole jest sprawdzone, nie można go flagować
    if(polaoflagowane.includes(indexdoflagowania)==false&&sprawdzonepola.includes(indexdoflagowania)==false){
        document.getElementById("w"+wierszdoflagowania+"p"+poledoflagowania).innerHTML+=symbolflagi;
        polaoflagowane.push(indexdoflagowania)
    }else if(sprawdzonepola.includes(indexdoflagowania)==false){
        //flagowanie już oflagowanego pola zdejmuje z niego flagę
        document.getElementById("w"+wierszdoflagowania+"p"+poledoflagowania).innerHTML="";
        polaoflagowane.splice(jQuery.inArray(indexdoflagowania,polaoflagowane),1);
    }
}