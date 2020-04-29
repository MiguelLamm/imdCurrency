
if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}


fetch("http://localhost:3000/api/v1/transfer", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
    
}).then(json => {

    //json.data.transfers.forEach(transfer => {
let alledata = json.data.transfers;
console.log(alledata);
for (let i = 0; i < alledata.length; i++){
            let newTransfer = ` <li>
            <p class="list-naam">${json.data.transfers[i].to}</p>
            <p class="list-bedrag">€ ${json.data.transfers[i].amount}</p>
        </li>`;
      
        document.querySelector(".mainlist-history ").insertAdjacentHTML('beforeend', newTransfer);

};
        if(json.status==="success"){
            showData(json)
            console.log("succesvol");
        }
    })
    ;
//});
    
    let showData= (json) => {
        let saldo = document.querySelector(".saldoNumber");
        saldo.textContent= json.total;
        
    }