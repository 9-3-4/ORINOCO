//fonction pour onclick pour supprimer des produits 
function poubelle(ligne) {
    tableau_commande = JSON.parse(localStorage.getItem('panier'));
    ligne_a_supprimer = tableau_commande[ligne];

    //MAJ PANIER : creation du nouveau panier dans localStoage en excluant l'�l�ment cliquer
    var panier_maj = [];
    tableau_commande.forEach(element => {
        if (element !== ligne_a_supprimer) {
            panier_maj.push(JSON.stringify(element));           
        }         
    });
    localStorage.setItem('panier', `[${panier_maj}]`);   
    location.reload();
}
//r�cup�ration de l'url avec une seule donn�e, l'ID
id_produit = (window.location.search.substr(1).split('id_produit='))[1];

//lecture du fichier json qui envoie la promesse dans variable id_produit
fetch("http://localhost:3000/api/cameras")
        .then(response => {

            fichier_json = response.json();
            var liste_produit = Promise.resolve(fichier_json);
         
            //Cr�ation du tableau de produit dans div panier
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


                // Cr�ation du code HTML pour afficher le tableau ou boucle si panier vide avec desactivation du formulaire
                if (JSON.parse(localStorage.getItem('panier')).length == 0) {
                    panier.innerHTML = "<h1> Oh non !!! le panier est vide !!!</h1>";
                    document.getElementById("contact-submit").disabled = true;
                } else {
                    panier.innerHTML += `<table>${titre_tableau} ${ligne_tableau} <tr><td colspan="3">Prix total: <td>${prix_total} &#x20AC</td></tr></table>`;
                    
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
     * 
     **/

    e.preventDefault();

    //recup�re les donn�es du formulaire
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
            .then(result => { console.log(result) });
    } else {
        console.log("erreur dans le formulaire")
    } 
})
//v�rification des champs
function validateFormReturningContact(form) {
    const contact = {};
    let valid = true
    let errors = [];
    if (!validateString(form.get('prenom'))) {  valid = false; errors.push ("Le pr�nom n'est pas correct")}
    if (!validateString(form.get('nom'))) { valid = false; errors.push("Le nom n'est pas correct") }
    if (valid) {
        contact.firstName = form.get('prenom');
        contact.lastName = form.get('nom');
        contact.address = form.get('adresse');
        contact.city = `${form.get('code_postal')} ${form.get('ville')}`;
        contact.email = form.get('email');
        return contact
    } else {
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