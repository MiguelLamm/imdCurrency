if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
}
const base_url = "http://localhost:3000";
fetch(base_url +"/api/v1/transfer", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();

}).then(json => {

    //json.data.transfers.forEach(transfer => {
    let alledata = json.data.transfers;
    console.log(json.total);
   
    console.log(json);
    //for (let i = 0; i < alledata.length; i++) {
    for (let i = alledata.length-1; i >= 0 ; i--) {
        if (alledata[i].from != json.requester) {
            let newTransfer = ` <li>
        <p class="list-naam">${json.data.transfers[i].from}</p>
        <p class="list-bedrag green">+ €${json.data.transfers[i].amount}</p>
         </li>`;

            document.querySelector(".mainlist-history ").insertAdjacentHTML('beforeend', newTransfer);

        } else {
            let newTransfer = ` <li>
            <p class="list-naam">${json.data.transfers[i].to}</p>
            <p class="list-bedrag red">- €${json.data.transfers[i].amount}</p>
        </li>`;

            document.querySelector(".mainlist-history ").insertAdjacentHTML('beforeend', newTransfer);
        }
    };
    if (json.status === "success") {
        showData(json);
        updateleader(json);
        console.log("succesvol");
    }
    /*fetch('http://localhost:3000/leaderboard', {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    }).then(response => {
        return response.json();
        
    }).then(json => {
        if (json.status == "success"){
            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href= "main.html";
        }

        else if (json.status == "error"){
            alert('error');
         }
    })*/
});

let updateleader = (json) => {
    fetch(base_url +"/leaderboard", {
        'headers': {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(result => {
        return result.json();
    
    }).then(json => {
    console.log(json);
    })
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