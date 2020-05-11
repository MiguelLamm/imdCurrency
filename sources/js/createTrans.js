if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
}
const base_url = "http://localhost:3000";
//GET USERS VOOR INPUT FORM
primus = Primus.connect(base_url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
  });
let users=[];
fetch(base_url+ '/leaderboard', {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(response => {
    return response.json();
    
}).then(json => {
    if (json.status == "success"){
        let alledata = json.data;
        for (let i = 0; i <alledata.length ; i++) {
        users[i]=json.data[i].nickname;
        let newItem = `<option>${json.data[i].nickname}</option>`;
    
                document.querySelector("#namelist").insertAdjacentHTML('beforeend', newItem);
        }
    }
    else if (json.status == "error"){
        alert('error');
     }
})
document.getElementById('textarea').className= "textareahidden";

let option = document.getElementById('transMess').addEventListener("click", ()=>{
    options =  document.getElementById('transMess').value;
    if(options == "11"){
        document.getElementById('textarea').className= "textareashow";
    } else {
        document.getElementById('textarea').className= "textareahidden";
    }
})

//TRANSACTIE VERSTUREN
let btnTrans = document.querySelector('.btn--trans').addEventListener("click", ()=>{
    let to = document.querySelector('#transTo').value;
    let amount = document.querySelector('#transAmount').value;
    let personalMess= document.querySelector('#textarea').value;
    let message = document.querySelector('#transMess').value;

    if(to){
        if(amount){
            if(message=="11"){
                
                fetch(base_url+ '/api/v1/transfer', {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        "to": to,
                        "amount": amount,
                        "message": personalMess
                    })
                }).then(response => {
                    return response.json();
                    
                }).then(json => {
                    primus.write({
                        "action": "addT",
                        "data":json
                    })
                    redirectA(json);
                })
            }
            else if(message!="11"){
                fetch(base_url+ '/api/v1/transfer', {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        "to": to,
                        "amount": amount,
                        "message": message
                    })
                }).then(response => {
                    return response.json();
                    
                }).then(json => {
                    primus.write({
                        "action": "addT",
                        "data":json
                    })
                    redirectA(json);
                })
            }else{
                document.querySelector(".hidden").className = "show";
            }
        }
        else {
            document.querySelector(".hidden").className = "show";
        }
    }
    else {
        document.querySelector(".hidden").className = "show";
    }
});
redirectA = (json)=> {
    if (json.status == "success"){
                        
        window.location.href= "main.html";
    }

    else if (json.status == "error"){
        alert('error');
     }
}
