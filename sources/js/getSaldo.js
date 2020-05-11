if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
}
const base_url = "http://localhost:3000";

primus = Primus.connect(base_url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
  });

  primus.on('data', (json)=> {
      if(json.action === "addT"){
          addrecent(json.data.message.transfer);
          console.log(json.data.message.transfer);
      }
  })

fetch(base_url +"/api/v1/transfer", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();

}).then(json => {
    
appendT(json);
    
});
let addrecent = (json) => {
    fetch(base_url +"/api/v1/transfer", {
        'headers': {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(result => {
        return result.json();
    
    }).then(json => {
        
    appendT(json);
        
    });
};
let appendT = (json)=> {
    
    //json.data.transfers.forEach(transfer => {
        let alledata = json.data.transfers;
        console.log(alledata);
        //for (let i = 0; i < alledata.length; i++) {
        for (let i = alledata.length-1; i >= 0 ; i--) {
            if (alledata[i].from != json.requester) {
                let newTransfer = ` <li id = '${json.data.transfers[i]._id}'>
            <p class="list-naam">${json.data.transfers[i].from}</p>
            <p class="list-bedrag green">+ €${json.data.transfers[i].amount}</p>
             </li>`;
    
                document.querySelector(".mainlist-history ").insertAdjacentHTML('beforeend', newTransfer);
    
            } else {
                let newTransfer = ` <li id = '${json.data.transfers[i]._id}'>
                <p class="list-naam">${json.data.transfers[i].to}</p>
                <p class="list-bedrag red">- €${json.data.transfers[i].amount}</p>
            </li>`;
    
                document.querySelector(".mainlist-history ").insertAdjacentHTML('beforeend', newTransfer);
            }
        };
        if (json.status === "success") {
            showData(json);
            //updateleader(json);
            fetch(base_url+ '/leaderboard', {
                method: "put",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    "totalAmount":json.total
                })
            }).then(response => {
                return response.json();
                
            }).then(json => {
                if (json.status == "success"){
                 
                }
        
                else if (json.status == "error"){
                    alert('error');
                 }
            })
        }
}

let showData = (json) => {
    let saldo = document.querySelector(".saldoNumber");
    if (json.total < 0){
        saldo.className="saldoNumber red";
        saldo.textContent = "€ " + json.total;
    }
    else{
        saldo.className="saldoNumber";
        saldo.textContent = "€ " + json.total;
    }
   
    let nickname =document.querySelector("#nickname");
    nickname.textContent= json.requester;

}
