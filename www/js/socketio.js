var socket; //pensez à déclarer la socket en globale en haut du fichier.
document.addEventListener('deviceready', function (evt) {
    socket = io('http://192.168.100.26:3000'); // connexion au serveur
    socket.on('connect', function () {
        // on met le client en écoute
        socket.on('text', function (text) {
            console.log(text); // Affichage de la réponse du serveur
        });
    });
    
    socket.on('message', function (msg) {
        console.log('Serveur dit : ' + msg);
    });
    document.querySelector('#send_msg').addEventListener('click', function (evt) {
        socket.emit('message', document.querySelector('#zonetext').value);
    });
           
    
}, false);


