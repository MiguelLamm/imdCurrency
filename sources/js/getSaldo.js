fetch("http://localhost:3000/api/v1/transfer",{
    'headers': {
        'Authorization':'Bearer '+ localStorage.getItem('token')
    }
}).then(result =>{
    return result.json();
}).then(json => {
    console.log(json);
}).catch(err => {
    console.log("error");
});