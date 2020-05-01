if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
}
const base_url = "http://localhost:3000";
let btnTrans = document.querySelector('.btn--trans').addEventListener("click", ()=>{
    let to = document.querySelector('#transTo').value;
    let amount = document.querySelector('#transAmount').value;
    let message = document.querySelector('#transMess').value;

    if(to){
        if(amount){
            if(message){
                
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
                    if (json.status == "success"){
                       
                        window.location.href= "main.html";
                    }
            
                    else if (json.status == "error"){
                        alert('error');
                     }
                })
            }
            else {
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
