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

            //Création du tableau de produit dans div panier
            var panier = document.getElementById('panier');

            //afficher seulement la valeur du tableau (array du json)
            liste_produit.then((valeur) => {

                //trouver dans les valeurs la ligne id_produit
                var choix_appareil_photo = valeur.find(appareil_photo => appareil_photo._id === id_produit);

               // Création du code HTML
               panier.innerHTML = '<article><h2 class="panier_name">' + choix_appareil_photo.name + '</h2><div class="panier_photo"><img src="' + choix_appareil_photo.imageUrl + '"></div><p class="panier_prix"> ' + choix_appareil_photo.price + ' &#x20AC </p></artticle > ';


            });







        });//fin fetch
