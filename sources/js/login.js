var btnLogin = document.querySelector('.btn--login').addEventListener("click", ()=>{
    let email = document.querySelector('#login-email').value;
    let password = document.querySelector('#login-ww').value;


    fetch('http://localhost:3000/users/login', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
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
    })
});