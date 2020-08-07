function lire_fichier_json(file, callback) {
    var fichier_json = new XMLHttpRequest();
    fichier_json.overrideMimeType("application/json");
    fichier_json.open("GET", file, true);
    fichier_json.onreadystatechange = function() {
        if (fichier_json.readyState === 4 && fichier_json.status == "200") {
            callback(fichier_json.responseText);
        }
    }
    fichier_json.send(null);
}
let url_api = "http://localhost:3000/api/cameras";