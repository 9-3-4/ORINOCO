//Création div confirmation
let confirmation = document.getElementById('confirmation');
 //recuperation des donnees du localStorage
let totaux_commande = localStorage.getItem('totaux_commande');
let prenom_client = localStorage.getItem('prenom');
let nom_client = localStorage.getItem('nom');
let numero_commande_client = localStorage.getItem('numero_commande');
//affichage en HTML
confirmation.innerHTML = confirmationCommande(totaux_commande, prenom_client, nom_client, numero_commande_client);
//fonction pour afficher l order_id, prix...
function confirmationCommande(totaux_commande, prenom_client, nom_client, numero_commande_client) {
return`<article>
            <h2 class="hello">Bonjour ${prenom_client} ${nom_client},</h2>
                <p class="remerciement">Toute notre &#233quipe vous remercie et vous informe que votre commande <span class="bold"> ${numero_commande_client} </span> d'un montant de <span class="bold"> ${parseInt(totaux_commande).toLocaleString('fr-FR')} &#x20AC </span>  est valid&#233e.</p>
                <p class="livraison">Votre colis vous sera livr&#233 comme pr&#233vu sous 48h.</p>
                    <img class="chat" src="./images/livraison.png">
        </article > `;
}

localStorage.clear();




