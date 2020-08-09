//fonction pour récupéreration de l'url en synchrone
function lire_fichier_json(file, callback) {
    var fichier_json = new XMLHttpRequest();
    fichier_json.overrideMimeType("application/json");
    fichier_json.open("GET", file, true);
    fichier_json.onreadystatechange = function() {
        if (fichier_json.readyState === 4 && fichier_json.status == "200") {
            callback(fichier_json.responseText);
        }
    }
    fichier_json.send(null);
}
//supprime les articles si besoin
function poubelle(identifiant_key){
	localStorage.removeItem(identifiant_key);
	location.reload();
}

//récupere tant qu'il y en a les produits et les affichera dans un tableau 
let url_api = "http://localhost:3000/api/cameras";
let commande = JSON.parse(localStorage.getItem('commande'));
let tableau_commande = document.getElementById('panier');
let nbre_produit_commande = localStorage.length;
let ligne_tableau = '';
let titre_tableau = '<tr> \
					<th style="width:100px">Nom</th> \
					<th>Description</th>\
					<th>Prix</th>';
let prix_total = 0;

lire_fichier_json(url_api, function(text){
let i = 0;

//s'il n'y a aucun produit dans le panier
let donnee_json = JSON.parse(text);	
	if (localStorage.length == 0) { 
		console.log("le pannier est vide !");
		tableau_commande.innerHTML ='<fieldset class="panier"><legend>Panier</legend> \
		<p class="aucun_article"><img  src="./images/panier_vide.png"><span class="panier_vide">Votre panier est tristement vide !!<br> <a href="index.html">Consulter notre catalogue en ligne</a></span></p>';

//sinon affichage des données produits avec calcul prix total
	}else{
		while(i<nbre_produit_commande){
			let product = JSON.parse(localStorage.getItem(localStorage.key(i)));
			console.log(localStorage.length);
			ligne_tableau += '<tr> \
			<td>'+donnee_json[product[0]].name+'</td> \
			<td>'+donnee_json[product[0]].description+' <br> <br> <b>Lentille :</b>'+product[1]+'</td> \
			<td style="text-align:right">'+new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(donnee_json[product[0]].price)+'</td> \
			<td class="col_poubelle"><img src="./images/panier_supprimer.png" width="25px"onclick="poubelle('+localStorage.key(i)+')" class="poubelle")></td> \
			</tr>';
			i++;
		var prix = (donnee_json[product[0]].price);
			prix_total = prix_total + prix;
		var ligne_prix_total = '<tr><td colspan=2 class="cellule_prix_total">Prix total : </td><td class="somme_total_panier">'+new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix_total)+'</td></tr>';
			}
			tableau_commande.innerHTML = '<table>'+titre_tableau+ligne_tableau+ligne_prix_total+'</table></fieldset>';
		}


});

