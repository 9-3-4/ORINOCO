

//recuperation des donnees du localStorage
const totaux_commande = localStorage.getItem('totaux_commande');
const prenom_client = localStorage.getItem('prenom');
const nom_client = localStorage.getItem('nom');
const numero_commande_client = localStorage.getItem('numero_commande');
/*console.log(validation_commande);
console.log(prenom_client);
console.log(nom_client);
console.log(numero_commande_client);*/

//Création div confirmation
var confirmation = document.getElementById('confirmation');

//confirmation.innerHTML = `${prenom_client} ${nom_client} ${numero_commande_client} ${totaux_commande}`;
confirmation.innerHTML = `<article>
                             <h2>Bonjour ${prenom_client} ${nom_client}&#44</h2>
                             <p>Votre commande ${numero_commande_client} d'un montant de ${totaux_commande} &#x20AC est valid&#233e.</p>
                             <p>ORINOCO vous remercie et souhaite vous retrouver vite, nous invitons a decouvrir nos autres produits</p>
                          </article > `;

localStorage.clear();







console.log(confirmation);





