if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
}
const base_url = "http://localhost:3000";

fetch(base_url+ '/leaderboard', {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(response => {
    return response.json();
    
}).then(json => {
    if (json.status == "success"){
        //console.log(json.data);
        let alledata = json.data;
        for (let i = 0; i <alledata.length ; i++) {
            let newTransfer = ` <li>
            <p class="">${i+1}</p>
            <p class="list-naam">${alledata[i].nickname}</p>
            <p class="list-bedrag">€ ${alledata[i].totalAmount}</p>
        </li>`;
    
                document.querySelector(".leaderboardRank").insertAdjacentHTML('beforeend', newTransfer);
        }
    }
    else if (json.status == "error"){
        alert('error');
     }
})