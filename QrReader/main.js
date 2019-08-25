document.addEventListener('DOMContentLoaded', () => {
    let fileSelector = document.querySelector('input[type=file]'),
        qr = document.querySelector('#qr'),
        btnCamara = document.querySelector('#btnCamara'),
        btnCapturar = document.querySelector('#btnCapturar');

    btnCamara.addEventListener('click', iniciarCamara);
    btnCapturar.addEventListener('click', capturar);

    fileSelector.addEventListener('change', e => {
        let fReader = new FileReader();
        
        fReader.addEventListener("load", e => {
            // console.log(e);
            qrcode.decode(e.target.result);
            qr.style.display = 'block';
            qr.src = e.target.result;
        });
        fReader.readAsDataURL( fileSelector.files[0] );
    });       
})

qrcode.callback = data => {
    let salida = document.querySelector('output');
    salida.innerHTML = `Los datos del qr son: ${data}`;
}

const iniciarCamara = () => {
    if(navigator.getUserMedia != undefined){
        navigator.getUserMedia( {video: true, audio: false},
            localMediaStream => {
                let video = document.querySelector('video');
                video.srcObject = localMediaStream;
                video.play();
            }, () => console.log('No se pudo abrir el video')
        )
    }else{
        console.log('No esta disonible la camara');
    }
}

const capturar = () => {
    let video = document.querySelector('video'),
        canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;

    let ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    let image = canvas.toDataURL('imge/jpg');
    qrcode.decode(image);

}