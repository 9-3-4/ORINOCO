//fonction pour onclick pour supprimer des produits 
function poubelle(ligne) {
    tableau_commande = JSON.parse(localStorage.getItem('panier'));
    ligne_a_supprimer = tableau_commande[ligne];

    //MAJ PANIER : creation du nouveau panier dans localStoage en excluant l'élèment cliquer
    var panier_maj = [];
    tableau_commande.forEach(element => {
        if (element !== ligne_a_supprimer) {
            panier_maj.push(JSON.stringify(element));           
        }         
    });
    localStorage.setItem('panier', `[${panier_maj}]`);   
    location.reload();
}
//récupération de l'url avec une seule donnée, l'ID
id_produit = (window.location.search.substr(1).split('id_produit='))[1];

//lecture du fichier json qui envoie la promesse dans variable id_produit
fetch("http://localhost:3000/api/cameras")
        .then(response => {

            fichier_json = response.json();
            var liste_produit = Promise.resolve(fichier_json);
         
            //Création du tableau de produit dans div panier
            var panier = document.getElementById('panier');

            //gestion du tableau du panier avec prix total
            var ligne_tableau = '';
            let titre_tableau = `<tr>
                                    <th>Photo</th>
					                <th>Nom</th> 
					                <th>Description</th>
					                <th>Prix</th>`;
            var prix_total = 0;
            var ligne = 0;

            //afficher seulement la valeur du tableau (array du json)
            liste_produit.then((valeur) => {
                JSON.parse(localStorage.getItem('panier')).forEach(produit => {

                    //trouver dans les valeurs la ligne id_produit
                    var choix_appareil_photo = valeur.find(appareil_photo => appareil_photo._id === produit.id);

                    // Creation du tableau pour afficher le choix d'article avec prix total
                    ligne_tableau +=    `<tr class="commande"> 
                                        <td><img src="${choix_appareil_photo.imageUrl}" width= "150"></td>
			                            <td>${choix_appareil_photo.name}</td> 
			                            <td>Lentille: ${produit.lentille}</td> 
			                            <td>${choix_appareil_photo.price} &#x20AC</td> 
			                            <td><img src="./images/panier_supprimer.png" width="25" onclick= poubelle("${ligne}")></td>
			                            </tr>`;

                    ligne++;
                    prix_total = prix_total + choix_appareil_photo.price;
               

                })


                // Création du code HTML pour afficher le tableau ou boucle si panier vide avec desactivation du formulaire
                if (JSON.parse(localStorage.getItem('panier')).length == 0) {
                    panier.innerHTML = "<h1> Oh non !!! le panier est vide !!!</h1>";
                    document.getElementById("contact-submit").disabled = true;
                } else {
                    panier.innerHTML += `<table>${titre_tableau} ${ligne_tableau} <tr><td colspan="3">Prix total: <td>${prix_total} &#x20AC</td></tr></table>`;
                    
                }


                


            });


        });//fin fetch
