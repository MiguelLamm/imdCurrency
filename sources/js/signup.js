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
                    createRank(json);
                    //window.location.href = "main.html";
                } else if (json.status == "error") {
                    alert('kan geen nieuwe user toevoegen');
                }
            })

            //probleem
            let createRank = (json) => {
                fetch(base_url +"/leaderboard", {
                    method: "post",
                    'headers': {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "nickname": username,
                        "amount": 100
                    })
                }).then(result => {
                    return result.json();
                
                }).then(json => {
                    console.log('what');
                    if (json.status == "success") {
                        window.location.href = "main.html";
                    } else if (json.status == "error") {
                        alert('kan geen rank creeren');
                    }
                })


            }
        } else {
            document.querySelector(".hidden").className = "show";
        }


    } else {
        document.querySelector(".hidden").className = "show";
    }
});