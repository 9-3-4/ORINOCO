//recuperation des donnees du localStorage
const totaux_commande = localStorage.getItem('totaux_commande');
const prenom_client = localStorage.getItem('prenom');
const nom_client = localStorage.getItem('nom');
const numero_commande_client = localStorage.getItem('numero_commande');


//Création div confirmation
var confirmation = document.getElementById('confirmation');

//création du Html
confirmation.innerHTML = `<article>
                             <h2 class="hello">Bonjour ${prenom_client} ${nom_client},</h2>
                             <p class="remerciement">Toutes notre &#233quipe vous remercie et vous informe que votre commande <span class="bold"> ${numero_commande_client} </span> d'un montant de <span class="bold"> ${parseInt(totaux_commande).toLocaleString('fr-FR')} &#x20AC </span>  est valid&#233e.</p>
                             <p class="livraison">Votre colis vous sera livr&#233 comme pr&#233vu sous 48h.</p>
                             <img class="chat" src="./images/livraison.png">
                          </article > `;

localStorage.clear();




