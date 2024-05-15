//Implémenter le JS de ma page

const inputNom = document.getElementById('NomInput');
const inputPrenom = document.getElementById('PrenomInput');
const inputEmail = document.getElementById('EmailInput');
const inputPassword = document.getElementById('PasswordInput');
const inputValidatePassword = document.getElementById('ValidatePasswordInput');
const btnSubmitInscription = document.getElementById('btn-validation-inscription');
const formInscription = document.getElementById('formulaireInscription');


inputNom.addEventListener('keyup', validateForm);
inputPrenom.addEventListener('keyup', validateForm);
inputEmail.addEventListener('keyup', validateForm);
inputPassword.addEventListener('keyup', validateForm);
inputValidatePassword.addEventListener('keyup', validateForm);
btnSubmitInscription.addEventListener('click', userInscription);

function validateForm() {
    const nomOk= validateRequired(inputNom);
    const prenomOk = validateRequired(inputPrenom);
    const emailOk = validateMail(inputEmail);
    const passwordOk = validatePassword(inputPassword);
    const passwordConfirmOk = validateConfirmationPassword(inputPassword, inputValidatePassword);

    if(nomOk && prenomOk && emailOk && passwordOk && passwordConfirmOk){
        btnSubmitInscription.disabled = false;
    } else {
        btnSubmitInscription.disabled = true;
    } 
}

function validateRequired(input) {
    if(input.value != ''){
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        return true;
    } else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return false;
    }
}

function validateMail(input){
    //définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)){
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        return true;
    }else{
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return false;
    }
}

function validatePassword(input){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)){
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        return true;
    }else{
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return false;
    }
}

function validateConfirmationPassword(inputPwd, inputConfirmPwd){
    if (inputPwd.value == inputConfirmPwd.value) {
        inputConfirmPwd.classList.add('is-valid');
        inputConfirmPwd.classList.remove('is-invalid');
        return true;
    }else{
        inputConfirmPwd.classList.add('is-invalid');
        inputConfirmPwd.classList.remove('is-valid');
        return false;
    }
}

function userInscription(){
    let dataForm = new FormData(formInscription);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "firstName": dataForm.get('Prenom'),
    "lastName": dataForm.get('Nom'),
    "email": dataForm.get('Email'),
    "password": dataForm.get('Mdp')
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch(apiUrl+"registration", requestOptions)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            alert('Erreur lors de l\'inscription');
        }
    })
    .then((result) => {   
            alert(dataForm.get('Prenom') + 'Inscription réussie ! Vous pouvez vous connecter');
            document.location.href = "/signin";
    })
    .catch((error) => console.error('error', error));
}