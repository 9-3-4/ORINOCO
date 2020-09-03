//récupération de l'url avec une seule donnée, l'ID
let id_produit = (window.location.search.substr(1).split('id_produit='))[1];

//lecture du fichier json qui envoie la promesse dans variable id_produit
let description = document.getElementById('description');
fetch("http://localhost:3000/api/cameras/" + id_produit)
    .then(response => response.json())
    .then((appareil) => {
                                       
                //Récupération des valeurs du tableau des options dans une variable
                let liste_option_lentille = (appareil.lenses).values();
                let liste_deroulante_option = creationSelect(liste_option_lentille);                           
                // Création du code HTML
                description.innerHTML = affichageArticle(appareil, liste_deroulante_option);
                              
            });
;
function creationSelect(liste_option_lentille){
    //Creation de la balise Select pour créer une liste déroulant
    liste_deroulante_option = '<select class="description_option"><option>Selectionner une lentille</option>' ;

    //Récupération de toutes les valeurs pour les mettre dans une balise option de la liste deroulante
    for (var valeur_option of liste_option_lentille) {
    liste_deroulante_option += "<option value='" + valeur_option + "'>" + valeur_option + "</option>";
}

//Fermeture de la balise select
    liste_deroulante_option += '</select>';
    return liste_deroulante_option
}
//récupération de la valeur de l'option lentille selectionner pour l'afficher dans l'url
function passer_commande(id_produit) {

    choix_valider = document.getElementsByClassName("description_option");
    var option_lentille = choix_valider[0].value;

    //message alert si option non sélectionner
    if (option_lentille === "Selectionner une lentille") {
        alert("Oups ! Vous avez oubli&#233 de selectionner une lentille");
    }
    else {
        ajoutPanier(id_produit, option_lentille);
        window.location = 'panier.html';
    }
}

function ajoutPanier(id_produit, option_lentille) {
    let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : []
    panier.push({ id: id_produit, lentille: option_lentille });
    localStorage.setItem('panier', JSON.stringify(panier));
}
function affichageArticle(appareil, liste_deroulante_option) {
return`<article>
           <h2 class="description_name">${appareil.name}</h2>
           <div class="description_photo">
               <img src="${appareil.imageUrl}">
           </div>
           <div class="description_selectionne">
               <p>${appareil.description }</p>
           </div>
           ${liste_deroulante_option}
               <p class="description_prix">${appareil.price} &#x20AC </p>
           <button class="btn_ajouter_panier" onclick="passer_commande(\''+id_produit+'\')">Commander</button>
       </article > `;
}