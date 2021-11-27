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

function showMyInfo(){
    document.querySelector("#myInfoId").innerHTML = my_info["id"];
    document.querySelector("#myInfoUserName").innerHTML = my_info.user_name;
    document.querySelector("#ip-intro").value = my_info.introduction;
    document.querySelector("#sp-intro").innerHTML = my_info.introduction;
}

function init() {
    showMyInfo();
}