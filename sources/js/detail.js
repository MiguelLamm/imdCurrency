
let liId = document.querySelector('.mainlist-history');
let ID = 0;

liId.addEventListener('click',(e) =>{
    if(e.target && e.target.nodeName == "LI") {
       //console.log('detail.html/'+e.target.id );
       window.location.href = "detail.html";
       ID  = e.target.id;
       //console.log(ID);
      fetchDetails(ID);
    }
});


let fetchDetails = (ID) => {
    console.log(ID);
}
/*
 let url = "http://localhost:3000";
    fetch(url +"/api/v1/transfer/"+ID, {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();

}).then(json => {
    
console.log(json);
    
});*/