
let liId = document.querySelector('.mainlist-history');
let sw = 0;
liId.addEventListener('click',(e) =>{
    if(e.target && e.target.nodeName == "LI") {
       console.log(e.target.id );
       let nodes = document.getElementById(e.target.id).childNodes;
       if(sw === 1){
       nodes[5].className = "show-message";
       nodes[7].className = "show-message";
       sw = 0;
       }
       else if(sw === 0){
        nodes[5].className = "hidden";
        nodes[7].className = "hidden";
        sw = 1;
       }
    }
});