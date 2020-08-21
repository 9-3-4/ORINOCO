//boucle
let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')):[]

//récupération de la valeur de l'option lentille selectionner pour l'afficher dans l'url
function passer_commande(id_produit) {
     
     choix_valider = document.getElementsByClassName("description_option");
        var option_lentille = choix_valider[0].value;

    //message alert si option non sélectionner
    if (option_lentille === "Selectionner une lentille") {
       alert("Oups ! Vous avez oublie de selectionner l'option lentille");
    }
    else { 
     //stocker dans le localstorage
        panier.push({ id : id_produit, lentille: option_lentille });
        localStorage.setItem('panier', JSON.stringify(panier));
        window.location = 'panier.html';
    } 
}

//récupération de l'url avec une seule donnée, l'ID
id_produit = (window.location.search.substr(1).split('id_produit='))[1];

//lecture du fichier json qui envoie la promesse dans variable id_produit
fetch("http://localhost:3000/api/cameras")
    .then(response => {

            fichier_json = response.json();
            var liste_produit = Promise.resolve(fichier_json);

            //Création du tableau de produit dans div description
            var description = document.getElementById('description');

            //afficher seulement la valeur du tableau (array du json)
            liste_produit.then((valeur) => {

                //trouver dans les valeurs la ligne id_produit
                var information_appareil_photo = valeur.find(appareil_photo => appareil_photo._id === id_produit);
                
                //Récupération des valeurs du tableau des options dans une variable
                var liste_option_lentille = (information_appareil_photo.lenses).values();
                
                
                //Creation de la balise Select pour créer une liste déroulant
                liste_deroulante_option = '<select class="description_option"><option>Selectionner une lentille</option>' ;
                
                //Récupération de toutes les valeurs pour les mettre dans une balise option de la liste deroulante
                for (var valeur_option of liste_option_lentille) {
                    liste_deroulante_option += "<option value='" + valeur_option +"'>" + valeur_option + "</option>";
                    }

                //Fermeture de la balise select
                liste_deroulante_option += '</select>';
                                              
                // Création du code HTML
                description.innerHTML = `<article>
                                            <h2 class="description_name">${ information_appareil_photo.name}</h2>
                                            <div class="description_photo">
                                                <img src="${information_appareil_photo.imageUrl}">
                                            </div>
                                            <div class="description_selectionne">
                                                <p>${information_appareil_photo.description }</p>
                                            </div>
                                            ${liste_deroulante_option}
                                            <p class="description_prix">${information_appareil_photo.price} &#x20AC </p>
                                            <button class="btn_ajouter_panier" onclick="passer_commande(\''+id_produit+'\')">Commander</button>
                                        </article > `;
                              
            });

    });//fin fetch
;
