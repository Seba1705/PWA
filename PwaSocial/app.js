// Link Encabezado
const linkPost = document.querySelector('#linkPost'),
      linkLogin = document.querySelector('#linkLogIn'),
      linkLogOut = document.querySelector('#linkLogOut'),
      linkSignUp = document.querySelector('#linkSignUp');

// Secciones
const sectionSignUp = document.querySelector('#signUp'),
      sectionLogin = document.querySelector('#login'),
      sectionPost = document.querySelector('#post');

// Botones
let btnLogin = document.querySelector('#btnLogin'),
    btnRegister = document.querySelector('#btnRegister'),
    btnPostImage = document.querySelector('#btnPostImage');

// User
let user;

// Image
let fileSelector = document.querySelector("input[type=file]"),
    secImage = document.querySelector('#secImage'),
    imageSelected = document.querySelector('#imageSelected'),
    filter = document.querySelector('select'),
    selectedFile;

linkLogin.addEventListener('click', evt => {
    clearSection();
    sectionLogin.style.display = 'block';
});

linkSignUp.addEventListener('click', evt => {
    clearSection();
    sectionSignUp.style.display = 'block';
});

linkPost.addEventListener('click', evt => {
    clearSection();
    sectionPost.style.display = 'block';
});

linkLogOut.addEventListener('click', evt => {
    // Desautenticar en firebase
    firebase.auth().signOut();
    activateLoggedOut();
});

const activateLoggedIn = () => {
    document.querySelector('#loggedIn').style.display = 'block';
    document.querySelector('#loggedOut').style.display = 'none';
    updateTimeLine();
}

const activateLoggedOut = () => {
    document.querySelector('#loggedIn').style.display = 'none';
    document.querySelector('#loggedOut').style.display = 'block';
}

const clearSection = () => {
    let sections = document.querySelectorAll('main>section');
    for(let section of sections){
        section.style.display = 'none';
    }
    let timeline = document.querySelector('#timeline');
    timeline.style.display = 'block';
}

user ? activateLoggedIn() : activateLoggedOut();

btnRegister.addEventListener('click', evt => {
    let name = document.querySelector('#name').value,
        email = document.querySelector('#email').value,
        pass = document.querySelector('#pass').value,
        repass = document.querySelector('#repass').value;
    
    if( name.lenght < 3 || email < 6 || pass < 6 ){
        alert('Validaciones');
    }else{
        if( pass != repass)
            alert('Las claves no coinciden');
        else{
            firebase.auth().createUserWithEmailAndPassword(email, pass)
                .then(()=>{
                    alert("Usuario registrado");
                    clearSection();
                    activateLoggedIn();
                    user = firebase.auth().currentUser;
                    user.updateProfile({
                        displayName: name
                    })
                })
                .catch( err => console.error(err) )
        }
    }

});

btnLogin.addEventListener('click', evt => {
    let email = document.querySelector('#emailLogin').value,
        pass = document.querySelector('#passLogin').value;

    if( name.lenght < 3 || email < 6 || pass < 6 )
        alert('Datos invalidos');
    else{
        // firebase.auth().loginUserWithEmailAndPassword(email, pass)
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then( ()=> {
                activateLoggedIn();
                clearSection();
            })
            .catch( err => alert('Error de autenticacion') )
    }
});

filter.addEventListener('change', () => {
    imageSelected.style.filter = filter.value;
});

fileSelector.addEventListener('change', () => {
    let reader = new FileReader();
    reader.addEventListener('load', evt => {
        secImage.style.display = 'block';
        imageSelected.src = evt.target.result;
    });
    reader.readAsDataURL(fileSelector.files[0]);
    selectedFile = fileSelector.files[0];
});

btnPostImage.addEventListener('click', evt => {
    let ref = firebase.storage().ref(),
        fileName = Math.random().toString(36).substring(3),
        imageRef = ref.child(`photos/${fileName}.jpg`);
    
    imageRef.put(selectedFile)
        .then( () => {
            let filterValue = document.querySelector('select').value,
                db = firebase.database().ref('pwasocial'),
                object = db.push();
            
            object.set({
                path: `photos/${fileName}.jpg`,
                user: firebase.auth().currentUser.displayName,
                filter: filterValue
            });
            alert('Foto posteada');
            clearSection();
        })
        .catch( err => {
            console.log('Error subiendo el archivo', err);
            alert('Foto no encontrada');
        });
    
});

const updateTimeLine = () => {
    let ul = document.querySelector('#timeline ul');
    ul.innerHTML = '';

    let db = firebase.database().ref('pwasocial'),
        list = db.limitToLast(100);
    list.on('child_added', child => {
        let img = child.val(),
            storageRef = firebase.storage().ref(),
            imgRef = storageRef.child(img.path),
            li = '';
        imgRef.getDownloadURL()
            .then( url => {
                li += `
                    <li>
                        <figure>
                            <img src='${url}' width='100%' style='filter:${img.filter}' /> 
                            <figcaption>Subida por: ${img.user}</figcaption>
                        </figure>
                    </li>`;
                ul.innerHTML += li;
            })
            .catch( err => console.log(err) )
    })
}