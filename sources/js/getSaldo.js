
if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}
console.log("goed2");
fetch("http://localhost:3000/api/v1/transfer", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
    
}).then(json => {
    json.data.transfers.forEach(transfer => {

console.log(json.data.transfers.to);
            let newTransfer = ` <li>
            <p class="list-naam">${json.data.transfers['2'].to}</p>
            <p class="list-bedrag">€ ${json.data.transfers['2'].amount}</p>
        </li>`;
      
        document.querySelector(".mainlist-history ").insertAdjacentHTML('beforeend', newTransfer);
    })});
    