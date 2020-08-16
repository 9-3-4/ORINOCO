//recupération des données(en boucle) et afficher dans un tableau
var tableau_variable = [];
var variable_url = window.location.search.substr(1).split("&");
for (var i = 0; i < variable_url.length; i++) {
    var temp = variable_url[i].split("=");
    tableau_variable[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}

id_produit = tableau_variable['id_produit'];
option = tableau_variable['option'];

console.log(id_produit);
console.log(option);


//lecture du fichier json qui envoie la promesse dans variable id_produit
fetch("http://localhost:3000/api/cameras")
        .then(response => {

            fichier_json = response.json();
            var liste_produit = Promise.resolve(fichier_json);
            console.log(liste_produit);

            


        });//fin fetch
