function setMenu (_menu){
    console.log(_menu);
    var menus = document.querySelectorAll("nav li");
    menus.forEach(function (menu){
        menu.classList.remove('on');
    });

    document.querySelector("nav li." + _menu).classList.add("on");
    document.querySelector("main").className = _menu;
}
function setDescLength() {
    document.querySelector("span.desclength").innerHTML 
    = document.querySelector("input.description").value.length +"/20";
}