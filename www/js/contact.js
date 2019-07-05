function initialize() {
    var btn_contact = document.getElementById('btn_contact');
    btn_contact.addEventListener('click', writeContact);
}

function writeContact(evt) {
    // todo : il faut parser le formulaire pour en faire du json.
    var form = document.getElementById('contactform');
    var formData = new FormData(form);
    var contact = {}; // initialisation de la variable contact qui contient l’objet a insérer
    for (var i = 0; i < form.length; i++) {
        console.log('form[' + i + '].name : ' + form[i].name);
        console.log('value : ' + formData.get(form[i].name));
        contact[form[i].name] = formData.get(form[i].name);
    }
    delete contact.button; // le bouton submit est envoyé dans un POST?
    console.log('contact : ', contact);
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    evt.preventDefault(); // uniquemement si le bouton est de type Submit.
    form.reset();
}
/** au chargement de la page contacts.html appel de la fonction initialize() **/
window.onload = initialize();

window.onload = function (evt) {
    var listCountries = document.querySelector('#listeContacts');
    var xhr = new XMLHttpRequest();
    xhr.timeout = 4000;
    xhr.open("GET", 'http://192.168.100.26/contactsJSON', true);
    xhr.send(null);
    xhr.onabort = function (e) {
        alert('Error : ' + e);
        window.location = "ma_box.html";
    };
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var html = "";
                console.log('data here : \n' + xhr.responseText);
                var data = JSON.parse(xhr.responseText);
                // on construit la chaîne de caractère contenant le code HTML des options de la liste
                for (var i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i]._id + '">' + data[i].name + '</option>';
                }
                // on intègre de cette façon les données dans la page HTML
                listContacts.innerHTML = html;
            }
        }
    }
}
