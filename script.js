document.onselectstart = function(){return false;};
document.documentElement.style.setProperty('--animate-duration', '.5s');
// Check if the user has a saved account balance in cookies
var savedBalance = getCookie("accountBalance");
if (savedBalance) {
    var stanKonta = parseFloat(savedBalance);
} else {
    var stanKonta = 1000;
}

var ilosc = 1;
stawka(ilosc);

var pierwszy = 0;
var drugi = 1;
var trzeci = 2;
var iloscWygranej = 0;

document.getElementById("stanKonta").innerHTML = stanKonta + "$";

function stawka(x){
        let stawki = [0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var stawka = stawki[x];
        document.getElementById("stawka").innerHTML = stawka + "$";
        return stawka;
}

function dodajStawke(){
        ilosc++;
        stawka(ilosc);
}

function zmniejszStawke(){
        if (ilosc > 0) {
                ilosc--;
        }
        stawka(ilosc);
}

function wygrana(){
        // kwota
        iloscWygranej = stawka(ilosc) * 5;
        stanKonta += iloscWygranej;
        setCookie("accountBalance", stanKonta, 365);
        document.getElementById("stanKonta").innerHTML = stanKonta + "$";

        document.getElementById("kwotaWygranej").innerHTML = iloscWygranej + "$";
        
        // efekty
        var elements = document.querySelectorAll(".czerwony");
        var counter = 0;
        var interval = setInterval(function() {
                elements.forEach(function(element) {
                        if (element.style.backgroundColor === "red") {
                                element.style.backgroundColor = "rgba(255, 0, 0, 0.151)";
                        } else {
                                element.style.backgroundColor = "red";
                        }
                });
                var stanKontaElement = document.getElementById("stanKonta");
                if (stanKontaElement.style.color === "red") {
                        stanKontaElement.style.color = "white";
                        stanKontaElement.style.textShadow === "0px 0px 12px red";
                        stanKontaElement.style.textShadow = "";
                } else {
                        stanKontaElement.style.color = "red";
                        stanKontaElement.style.textShadow = "0px 0px 12px red";
                }

                counter++;
                if (counter === 10) {
                        clearInterval(interval);
                        elements.forEach(function(element) {
                                element.style.backgroundColor = "rgba(255, 0, 0, 0.151)";
                        });
                        stanKontaElement.style.color = "white";
                        stanKontaElement.style.textShadow = "";
                        document.getElementById("start").disabled = false;
                }
        }, 300);
        document.getElementById("start").disabled = true; 
}

function rnd(max) {
        return Math.floor(Math.random() * max);
}

function ustaw(x){
        var losowa = rnd(4);
        document.getElementById("img" + x).src = losowa + ".png";

        var button = document.getElementById("img" + x);
        button.classList.add("animate__animated", "animate__flipInX");

        button.addEventListener("animationend", function() {
                button.classList.remove("animate__animated", "animate__flipInX");
        });
        if(x == 4){
                pierwszy = losowa;
        }
        else if(x == 5){
                drugi = losowa;
        }
        else if(x == 6){
                trzeci = losowa;
        }
}

function start(){
        stanKonta -= stawka(ilosc);
        document.getElementById("stanKonta").innerHTML = stanKonta + "$";
        document.getElementById("kwotaWygranej").innerHTML = "0$";

        ustaw(1);
        ustaw(2);
        ustaw(3);
        ustaw(4);
        ustaw(5);
        ustaw(6);
        ustaw(7);
        ustaw(8);
        ustaw(9);

        setTimeout(function() {
                if(pierwszy == drugi && drugi == trzeci && trzeci == pierwszy){
                        wygrana();
                }
        }, 100);

        // Save the account balance in cookies
        setCookie("accountBalance", stanKonta, 365);
}

// Function to get a cookie value by name
function getCookie(name) {
        var cookieName = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        for(var i = 0; i < cookieArray.length; i++) {
                var cookie = cookieArray[i];
                while (cookie.charAt(0) == ' ') {
                        cookie = cookie.substring(1);
                }
                if (cookie.indexOf(cookieName) == 0) {
                        return cookie.substring(cookieName.length, cookie.length);
                }
        }
        return "";
}

// Function to set a cookie value
function setCookie(name, value, days) {
        var expires = "";
        if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
}