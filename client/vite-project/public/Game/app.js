
window.onclick = function(e) {
    if (!e.target.matches('.dropbutton')) {
    var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
        }
    }
};

var Saturn = 0;
var clickerCost = 100;
var clicker = 0;

function buyClicker ()       {
    if (Saturn >= clickerCost){
        Saturn = Saturn - clickerCost;
        clicker = clicker + 1;
        clickerCost = Math.round (clickerCost * 1.10);

        document.getElementById("Rings").innerHTML = Saturn;
        document.getElementById("clickerCost").innerHTML = clickerCost;
        document.getElementById("clicker").innerHTML = clicker;

    }
}
function reset () {
    Saturn = 0;
    clicker = 0;
    clickerCost = 100
    document.getElementById("Rings").innerHTML = Saturn;
    document.getElementById("clickerCost").innerHTML = clickerCost;
    document.getElementById("clicker").innerHTML = clicker;
    
}

function addToRings(amount){
    Saturn = Saturn + amount;
    document.getElementById("Rings").innerHTML = Saturn;
}

setInterval (function(){
    Saturn = Saturn + clicker;
    document.getElementById("Saturn").innerHTML = Donuts;
}, 1000); // 1000ms = 1 second
