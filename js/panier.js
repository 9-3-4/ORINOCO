//Création du tableau de produit dans div panier
let panier = document.getElementById('panier');
//gestion du tableau du panier avec prix total
let titre_tableau = creationEnteteTableau();
let ligne_tableau = '';
let prix_total = 0;
let ligne = 0;
//lecture du fichier json qui envoie la promesse 
recupereContenuURL("http://localhost:3000/api/cameras")
    .then((appareils_photos) => {
        if (localStorage.getItem('panier')) {//La valeur panier existe
            // Création du code HTML avec boucle si panier vide et desactivation du formulaire ou affichage du tableau avec produit
            if (JSON.parse(localStorage.getItem('panier')).length == 0) {
                panierVide();
            } else {
                JSON.parse(localStorage.getItem('panier')).forEach(produit => {
                    let choix_appareil_photo = appareils_photos.find(appareil_photo => appareil_photo._id === produit.id);
                    choix_appareil_photo.lentille = produit.lentille;
                    ajoutLigneTableau(choix_appareil_photo, ligne);
                })
                //affichage en html du tableau panier
                panier.innerHTML += `<table>${titre_tableau} ${ligne_tableau} <tr><td class="prix_produit" colspan="3">Prix total: <td class="total_produit">${prix_total} &#x20AC</td></tr></table>`;
            }
        } else {
            panierVide();
        }
    });
//traite le formulaire (submit) 
document.getElementById('contact').addEventListener('submit', (e) => {
    /** contenu du formulaire prevu par la demande
     * contact:{
     * firstName:string,
     * lastName:string,
     * address:string,
     * city:string,
     * email:string
     * }
     * produtc:[string]<--array of product_id  **/

    e.preventDefault();

    //recupère les données du formulaire pour les envoyer au serveur
    let form = new FormData(document.getElementById('contact'));
    let contact = valideFormRetourneContact(form);
        if (contact !== false) {
            const products = JSON.parse(localStorage.getItem('panier')).map(elt => elt.id);
            const sendOrder = { contact, products }

            //pour envoie du formulaire
            fetch("http://localhost:3000/api/cameras/order", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sendOrder)
            }).then(response => response.json())
                .then(result => {
                    localStorage.setItem('numero_commande', result.orderId);
                    localStorage.setItem('prenom', (result.contact).firstName);
                    localStorage.setItem('nom', (result.contact).lastName);
                    window.location = 'confirmation.html';
                });
        } else {
            console.log("erreur dans le formulaire");

        }
    
 
})
//fonction qui vérifie les champs du formulaire
function valideFormRetourneContact(form) {
    const contact = {};
    let valid = true
    let errors = [];
    if (!valideString(form.get('prenom'))) { valid = false; errors.push("Prénom incorrect") }
    if (!valideString(form.get('nom'))) { valid = false; errors.push("Nom incorrect") }
    if (!valideEmail(form.get('email'))) { valid = false; errors.push("Email incorrect") }
    if (valid) {
        contact.firstName = form.get('prenom');
        contact.lastName = form.get('nom');
        contact.address = form.get('adresse');
        contact.city = `${form.get('Code_postal')} ${form.get('ville')}`;
        contact.email = form.get('email');
        
        return contact;
    }
    else {
        return false
    }
}
//fonction pour validation du format de l email
function valideEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//fonction pour validation du format de chaine de caractère autorisé
function valideString(string) {
    const re = /[a-zA-Z\S0-9]{2,}/
    return re.test(string);
}
//fonction pour création des entetes du tableau de panier
function creationEnteteTableau() {
    return `<tr>
                <th class="photo_produit">Photo</th>
			    <th class="nom_produit">Nom</th> 
			    <th class="lentille_produit">Lentille</th>
				<th class="prix_produit">Prix</th>
            </tr>`;
}
//fonction pour supprimer des produits
function poubelle(ligne) {
    tableau_commande = JSON.parse(localStorage.getItem('panier'));
    ligne_a_supprimer = tableau_commande[ligne];

    //MAJ PANIER : creation du nouveau panier dans localStoage en excluant l'élèment cliquer
    let panier_maj = [];
    tableau_commande.forEach(element => {
        if (element !== ligne_a_supprimer) {
            panier_maj.push(JSON.stringify(element));
        }
    });
    localStorage.setItem('panier', `[${panier_maj}]`);
    location.reload();
}

//fonction si le panier est vide
function panierVide(){
    panier.innerHTML = '<p class="aucun_produit"><img class="aucun_article" src="./images/pas_article.png" width="20%"><span class="panier_vide">Votre panier est tristement vide !!<br> <a href="index.html">Consulter notre catalogue en ligne</a></span></p>';
    document.getElementById("contact-submit").disabled = true;
}
//fonction qui affiche les lignes de produit selectionner dans tableau
function ajoutLigneTableau(item, numero_ligne) {
ligne_tableau += `<tr class="commande"> 
                    <td><img src="${item.imageUrl}" width= "70%"></td>
			        <td>${item.name}</td> 
			        <td>${item.lentille}</td> 
			        <td>${parseInt(item.price)/100} &#x20AC</td> 
			        <td><img src="./images/panier_supprimer.png" width="30" onclick= poubelle("${numero_ligne}")></td>
			      </tr>`;

ligne++;
prix_total = prix_total + parseInt(item.price)/100;
localStorage.setItem('totaux_commande', prix_total);
}
