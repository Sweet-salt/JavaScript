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

var sorts = {
    recent: function(a,b){return (a.idx > b.idx) ? -1 : 1},
    like: function(a,b){return (a.idx > b.idx) ? -1 : 1}
};
var sort = sorts.recent;

var filters = {
    all: function(it){return true;},
    mine: function(it){return it.user_id === my_info.id;},
    like: function(it){return my_info.like.indexOf(it.idx) > -1;},
    follow: function(it){return my_info.follow.indexOf(it.user_id)}
}
var filter = filters.all;

function setSort(_sort){
    document.querySelectorAll("#sorts li").forEach(function (sortli){
        sortli.classList.remove("on");
    });
    document,querySelector("#sorts li."+ _sort).classList.add("on");
        
    sort = sorts[_sort];
    showPhotos();
}

function setFilter(_filter){
    document.querySelectorAll("#filters li").forEach(function (sortli){
        sortli.classList.remove("on");
    });
    document,querySelector("#filters li."+ _filter).classList.add("on");

    filter = filters[_filter];
    showPhotos();
}

function showMyInfo(){
    document.querySelector("#myInfoId").innerHTML = my_info["id"];
    document.querySelector("#myInfoUserName").innerHTML = my_info.user_name;
    document.querySelector("#ip-intro").value = my_info.introduction;
    document.querySelector("#sp-intro").innerHTML = my_info.introduction;
    document.querySelector("#myinfo input[tpye=radio][value=" + my_info.as + "]").checked = true;

    document.querySelectorAll("#myinfo input[type=checkbox]").forEach(function (checkbox){
        console.log(checkbox) = false;
    });
    my_info.interest.forEach(function (interest){
        document.querySelector("#myinfo input[type=checkbox][value=" + interest + "]").checked = true;
    });
}
function setEditMyInfo (on){
    document.querySelector("#myinfo > div").className = on ? 'edit' : 'none edit';
    document.querySelectorAll("#myinfo input").forEach(function(input){
        input.disabled = !on;
    });
    showMyInfo();
}

function updateMyInfo() {
    my_info.introduction = document.querySelector("#ip-intro").value;
    my_info.as = document.querySelector("#myinfo input[type=radio]:checked").value;
    var interests = [];
    document.querySelectorAll("#myinfo input[type=checkbox]:checked").forEach(function (checkbox){
    interests.push(checkbox.value);
    });
    my_info.interest = interests;
    setEditMyInfo(false);
    updateMyInfoDB();
}

function showPhotos() {
    var existingNodes = document.querySelectorAll("article:not(.hidden)");
    existingNodes.forEach(function (existingNodes){
        existingNodes.remove();
    });
    var gallery = document.querySelector("#gallery");
    var filtered = photos.filter(filter);
    filtered.sort(sort);

    filtered.forEach(function (photo){
        var photoNode = document.querySelector("article.hidden").cloneNode(true);
        photoNode.classList.remove("hidden");
        photoNode.querySelector(".author").innerHTML = photo.innerHTML = photo.user_name;

        photoNode.querySelector(".desc").innerHTML = photo.description;
        photoNode.querySelector(".like").innerHTML = photo.likes;
        
        if(my_info.like.indexOf(photo.idx) > -1 ){
            photoNode.querySelector(".like").classList.add("on");
        } 
        photoNode.querySelector(".photo").style.backgroundImage
        = "url('./img/phto/" + photo.file_name +"')";

        photoNode.querySelector(".like").addEventListener('click', function(){
            toggleLike();
        });
        gallery.append(photoNode);
    });
}
function toggleLike(idx) {
    if(my_info.like.indexOf(idx) === -1){
        my_info.like.push(idx);
        for(var i = 0; i < photos.like; i++){
            if(photos[i].idx === idx){
                photos[i].likes--;
                break;
            }
        }
    }else{
        my_info.like = my_info.like.filter(function(it){
           return photo.it  !== idx;
        });
        for(var i = 0; i < photos.length; i++){
            if(photos[i].idx === idx){
                photos[i].likes--;
                break;
            }
        }
    }
    showPhotos();
}

function init() {
    //showMyInfo();
    //showPhotos();
    loadMyinfo();
}

function loadMyinfo(){
    db.collection("my_info").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          my_info = doc.data();
    
          // ????????? document??? id
          my_info.docId = doc.id;
    
          showMyInfo();
        })
      });
    
}

function updateMyInfoDB(){
    db.collection("my_info").doc(my_info.docId).update({
        introduction: my_info.introduction,
        as: my_info.as,
        interest: my_info.interest
    }).then(function () {
        loadMyInfo();
    })

}