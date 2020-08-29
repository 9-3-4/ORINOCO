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
                                    <th class="photo_produit">Photo</th>
					                <th class="nom_produit">Nom</th> 
					                <th class="lentille_produit">Lentille</th>
					                <th class="prix_produit">Prix</th>`;
            var prix_total = 0;
            var ligne = 0;

            //afficher seulement la valeur du tableau (array du json)
            liste_produit.then((valeur) => {
                if (localStorage.getItem('panier')) {//La valeur panier existe
                    JSON.parse(localStorage.getItem('panier')).forEach(produit => {

                        //trouver dans les valeurs la ligne id_produit
                        var choix_appareil_photo = valeur.find(appareil_photo => appareil_photo._id === produit.id);

                        // Creation du tableau pour afficher le choix d'article avec prix total
                        ligne_tableau += `<tr class="commande"> 
                                        <td><img src="${choix_appareil_photo.imageUrl}" width= "70%"></td>
			                            <td>${choix_appareil_photo.name}</td> 
			                            <td>${produit.lentille}</td> 
			                            <td>${choix_appareil_photo.price} &#x20AC</td> 
			                            <td><img src="./images/panier_supprimer.png" width="30" onclick= poubelle("${ligne}")></td>
			                            </tr>`;

                        ligne++;
                        prix_total = prix_total + choix_appareil_photo.price;
                        localStorage.setItem('totaux_commande', prix_total);
                    })

                    // Création du code HTML pour afficher le tableau ou boucle si panier vide avec desactivation du formulaire
                    if (JSON.parse(localStorage.getItem('panier')).length == 0) {

                        panier.innerHTML = '<p class="aucun_produit"><img class="aucun_article" src="./images/pas_article.png" width="20%"><span class="panier_vide">Votre panier est tristement vide !!<br> <a href="index.html">Consulter notre catalogue en ligne</a></span></p>';

                        document.getElementById("contact-submit").disabled = true;
                    } else {
                        panier.innerHTML += `<table>${titre_tableau} ${ligne_tableau} <tr><td class="prix_produit" colspan="3">Prix total: <td class="total_produit">${prix_total} &#x20AC</td></tr></table>`;

                    }
                } else {// sinon la valeur panier n'existe pas 
                    panier.innerHTML = '<p class="aucun_produit"><img class="aucun_article" src="./images/pas_article.png" width="20%"><span class="panier_vide">Votre panier est tristement vide !!<br> <a href="index.html">Consulter ici notre catalogue en ligne</a></span></p>';

                    document.getElementById("contact-submit").disabled = true;

                }
            });

        });//fin fetch 

//traite le formulaire des le submit 
document.getElementById('contact').addEventListener('submit', (e) => {
    /**
     * contenu du formulaire prevu par la demande
     * contact:{
     * firstName:string,
     * lastName:string,
     * address:string,
     * city:string,
     * email:string
     * }
     * produtc:[string]<--array of product_id 
     **/

    e.preventDefault();

    //recupère les données du formulaire pour les envoyer au server
    let form = new FormData(document.getElementById('contact'));
    let contact = validateFormReturningContact(form);
    if (contact !== false){
        const products = JSON.parse(localStorage.getItem('panier')).map(elt => elt.id);
        const sendOrder = { contact, products }
        console.log(sendOrder);

        //pour envoie du formulaire
        fetch("http://localhost:3000/api/cameras/order", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sendOrder)
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                console.log((result.contact).firstName);
                console.log((result.contact).lastName);
                console.log(result.orderId);
                localStorage.setItem('numero_commande', result.orderId);
                localStorage.setItem('prenom', (result.contact).firstName);
                localStorage.setItem('nom', (result.contact).lastName);
            });
    } else {
        console.log("erreur dans le formulaire");

    } 
})

//vérification des champs du formulaire
function validateFormReturningContact(form) {
    const contact = {};
    let valid = true
    let errors = [];
    if (!validateString(form.get('prenom'))) {  valid = false; errors.push ("Prénom incorrect")}
    if (!validateString(form.get('nom'))) { valid = false; errors.push("Nom incorrect") }
    if (valid) {
        contact.firstName = form.get('prenom');
        contact.lastName = form.get('nom');
        contact.address = form.get('adresse');
        contact.city = `${form.get('code_postal')} ${form.get('ville')}`;
        contact.email = form.get('email');
        setTimeout(() => { if (valid = true) { window.location = 'confirmation.html' }; }, 500);
        return contact;
    }

    else {
        return false
    }
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validateString(string) {
        const re = /[a-zA-Z\S0-9]{2,}/
        return re.test(string);
    }
}



