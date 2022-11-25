function setPseudo() {
    var id = document.getElementById('id').value;
    var pseudo = document.getElementById('pseudo').value;
    var code = document.getElementById('code').value;
    var errorsField = document.getElementById('errors');
    if (pseudo.length < 3) {
        errorsField.innerHTML = "Pseudo must be at least 3 characters long";
        return;
    }
    if (!code) {
        errorsField.innerHTML = "You must enter a code";    
        return;
    }
    errorsField.innerHTML = "";

    sendRequest(id, pseudo, code);
}


async function sendRequest(id, pseudo, code){

        await fetch(`/api/v1/setpseudo/${id}/${pseudo}/${code}`)
        .then(res => res.json())
        .then(data => {
            if(data.message){
                document.getElementById('errors').innerHTML = data.message;
            }
            else{
                document.getElementById('errors').innerHTML = "";
                document.getElementById('pseudo').value = "";
                document.getElementById('code').value = "";
                document.getElementById('id').value = "";
            }
        }
        )

}

