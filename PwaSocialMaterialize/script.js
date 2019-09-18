// Forms
const frmLogin = document.querySelector('#login-page'),
      frmRegister = document.querySelector('#register-page');

// Login
const btnLogin = document.querySelector('#btn-login'),
      linkRegister = document.querySelector('#link-register');

linkRegister.addEventListener('click', evt => {
    evt.preventDefault();
    frmLogin.className = 'hide';
    frmRegister.className = 'row show animated fadeIn fast';
});

btnLogin.addEventListener('click', evt => {
    let email = document.querySelector('#email-login').value,
        pass = document.querySelector('#password-login').value;

    if( email.lenght < 6 || pass.lenght < 6 )
        M.toast({html: 'Datos invalidos!'})
    else{
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(() => {
                M.toast({html: 'Usuario logueado!'});
                
            })
            .catch(err => M.toast({html: 'Error de autenticacion!'}))
    }
});

// Register
const btnRegister = document.querySelector('#btn-register');

btnRegister.addEventListener('click', () => {
    let name = document.querySelector('#name').value,
        email = document.querySelector('#email').value,
        pass = document.querySelector('#password').value,
        repass = document.querySelector('#repassword').value;

    if( name.lenght < 3 || email < 6 || pass < 6 ){
        M.toast({html: 'Validaciones'});
    }else{
        if( pass != repass)
            M.toast({html :'Las claves no coinciden'});
        else{
            firebase.auth().createUserWithEmailAndPassword(email, pass)
                .then(()=>{
                    M.toast({html: "Usuario registrado"});
                    user = firebase.auth().currentUser;
                    user.updateProfile({
                        displayName: name
                    });
                    clearForm();
                })
                .catch( err => console.error(err) )
        }
    }
});

const clearForm = () => {
    let name = document.querySelector('#name').value = ''
        email = document.querySelector('#email').value = ''
        pass = document.querySelector('#password').value = ''
        repass = document.querySelector('#repassword').value = '';
}



