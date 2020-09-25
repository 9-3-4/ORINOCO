//récupération de l'url avec une seule donnée, l'ID du produit choisi
let id_produit = (window.location.search.substr(1).split('id_produit='))[1];

let description = document.getElementById('description');
//pour lire le fichier json en recuperant le contenu de l url
recupereContenuURL("http://localhost:3000/api/cameras/" + id_produit)
    .then((appareil) => {                                 
       //Récupération des valeurs du tableau des options dans une variable et affichage html
       let liste_option_lentille = appareil.lenses.values();
       let liste_deroulante_option = creationSelect(liste_option_lentille);                           
       description.innerHTML = affichageArticle(appareil, liste_deroulante_option);
});
//fonction qui cree la balise select avec insertion d une liste deroulante
function creationSelect(liste_option_lentille){
    liste_deroulante_option = '<select class="description_option"><option>Selectionner une lentille</option>' ;
    //Récupération de toutes les valeurs pour les mettre dans une balise option de la liste deroulante
    for (let valeur_option of liste_option_lentille) {
    liste_deroulante_option += "<option value='" + valeur_option + "'>" + valeur_option + "</option>";
    }
    //Fermeture de la balise select
    liste_deroulante_option += '</select>';
    return liste_deroulante_option
}
//fonction qui affiche en html le produit et la liste deroulante
function affichageArticle(appareil, liste_deroulante_option) {
    return `<article>
           <h2 class="description_name">${appareil.name}</h2>
           <div class="description_photo">
               <img src="${appareil.imageUrl}">
           </div>
           <div class="description_selectionne">
               <p>${appareil.description}</p>
           </div>
           ${liste_deroulante_option}
               <p class="description_prix">${parseInt(appareil.price)/100} &#x20AC </p>
           <button class="btn_ajouter_panier" onclick="passer_commande(\''+id_produit+'\')">Commander</button>
       </article > `;
}
// fonction qui recupere la valeur de l'option lentille selectionner et redirige vers le panier
function passer_commande(id_produit) {
    let choix_valider = document.getElementsByClassName("description_option");
    let option_lentille = choix_valider[0].value;
    //affichage message alert si option non selectionner
    if (option_lentille === "Selectionner une lentille") {
        alert("Oups ! Veuillez selectionner une lentille");
    }
    else {
        ajoutPanier(id_produit, option_lentille);
        window.location = 'panier.html';
    }
}
//fonction qui ajoute au panier et dans localstorage le produit avec son option
function ajoutPanier(id_produit, option_lentille) {
    let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : []
    panier.push({ id: id_produit, lentille: option_lentille });
    localStorage.setItem('panier', JSON.stringify(panier));
}
