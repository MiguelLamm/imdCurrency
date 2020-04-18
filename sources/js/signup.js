var btnSignup = document.querySelector('.btn--signup').addEventListener("click", ()=>{
    let userFname = document.querySelector('#signup-voornaam').value;
    let userLname = document.querySelector('#signup-naam').value;
    let email = document.querySelector('#signup-email').value;
    let password = document.querySelector('#signup-ww').value;


    fetch('http://localhost:3000/users/signup', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": email,
            "password": password
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status === "succes"){
           
        }
    })
});