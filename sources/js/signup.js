var btnSignup = document.querySelector('.btn--signup').addEventListener("click", ()=>{
    let userFname = document.querySelector('#signup-voornaam').value;
    let userLname = document.querySelector('#signup-naam').value;
    let email = document.querySelector('#signup-email').value;
    let password = document.querySelector('#signup-ww').value;
    let username = userFname + " "+userLname;
    console.log(username);


   fetch('http://localhost:3000/users/signup', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
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