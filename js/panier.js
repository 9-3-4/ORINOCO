
function poubelle(id_produit_supprimer) {
    liste_commande = JSON.parse(localStorage.getItem('panier'))
    delete liste_commande[id_produit_supprimer];
    maj_panier = JSON.stringify(liste_commande);
    console.log(maj_panier);
    if (id_produit_supprimer == 0) {
        maj_panier = (maj_panier.replace(null, '')).replace(',', '');
        localStorage.setItem('panier', maj_panier);
        //location.reload();
    } 
    

   // location.reload();

    console.log(liste_commande.count);
   
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


                // Création du code HTML pour afficher le tableau
                panier.innerHTML += `<table>${titre_tableau} ${ligne_tableau} <tr><td colspan="3">Prix total: <td>${prix_total} &#x20AC</td></tr></table>`;
               
                







            });







        });//fin fetch
