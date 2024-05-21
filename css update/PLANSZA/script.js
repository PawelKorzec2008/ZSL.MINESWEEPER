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
    if(miny.includes({"wiersz":randminawiersz,"pole":randminapole})==false){
        miny.push({"wiersz":randminawiersz,"pole":randminapole});
        minydowylosowania--;
    }
}

//wyświetlam miny na planszy
for(i=0;i<iloscmin;i++){
    $("#w"+miny[i].wiersz+"p"+miny[i].pole).css({"background-color":"white"});
}
var odp;
// losowanie numerow , znakow i odpowiedzi
function losnum() {
    var a = Math.floor(Math.random() * 10) + 1;
    var b = Math.floor(Math.random() * 10) + 1;
    var c = Math.floor(Math.random() * 4) + 1;
    
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
        case 4:
        znk = '/'
        odp = a / b;
        break;
    }

    $(".quest").html("Ile Wynosi "+a+" "+znk+" "+b+"?")


}
var time;
// on click na polach
function wys(id,w,p){
    // trafiono na mine
    console.log(w,p)
    for(var i = 0;i<miny.length;i++){
        if(miny[i].wiersz == w && miny[i].pole == p){
            console.log("hit")
            losnum();
            timeout();
        }
    }

}
// Funkcja sprawdzająca prawidziwosc odpowiedzi
function conf(){
    var value = $("#odp").val();
    // dobra odp
    if(value==odp){
        console.log("fin")
        $("#odp").val(" ")
        $(".quest").html("...")
        clearTimeout(time);
    }
    //zla odp
    else if(value!=odp){
        alert("Przegrywasz")
        history.back();
    }
}
// ustawianie czasu na rozbrojenie
function timeout(){
     time = setTimeout(Lose,10000)
     console.log("time on")

}
// funkcja wywolywana gdy konczy sie czas na rozbrojenie
function Lose(){
    console.log("time off");
    alert("Rozbrojenie bomby zajeło zbyt długo czasu. Przegrywasz")
    history.back();
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
        console.log(m1,s1);
        if(s1==59){
            m1 ++;
            s1 = 0;
        }
        else{
        s1++;
    }
      },1000)
});