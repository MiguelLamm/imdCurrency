fetch(base_url + "/api/v1/todos", {
    'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    json.data.transfer.forEach(transfer => {

        console.log(transfer.amount);
    
    });
