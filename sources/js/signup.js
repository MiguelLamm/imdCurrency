var btnSignup = document.querySelector('.btn--signup').addEventListener("click", () => {
    const base_url = "http://localhost:3000";
    let email = document.querySelector('#signup-email').value;
    const substring = "@student.thomasmore.be";
    if (email.includes(substring) == true) {

        let userFname = document.querySelector('#signup-voornaam').value;
        let userLname = document.querySelector('#signup-naam').value;

        let password = document.querySelector('#signup-ww').value;
        let passlength = password.length;
        console.log(passlength);
        let username = userFname + " " + userLname;
        console.log(username);

        if (passlength > 3) {
            console.log("processing");
            fetch(base_url+'/users/signup', {
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
                if (json.status == "success") {
                    let token = json.data.token;
                    localStorage.setItem("token", token);
                    window.location.href = "main.html";
                } else if (json.status == "error") {
                    alert('error');
                }
            })
        } else {
            document.querySelector(".hidden").className = "show";
        }


    } else {
        document.querySelector(".hidden").className = "show";
    }
});