
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

let url_api = "http://localhost:3000/api/cameras";
let commande = JSON.parse(localStorage.getItem('commande'));
let tableau_commande = document.getElementById('panier');
let nbre_produit_commande = localStorage.length;
let ligne_tableau = '';
let titre_tableau = '<tr> \
					<th style="width:100px">Nom</th> \
					<th>Description</th>\
					<th>Prix</th>';
lire_fichier_json(url_api, function(text){
		let i = 0;
		let donnee_json = JSON.parse(text);	
		while(i<nbre_produit_commande){
		let product = JSON.parse(localStorage.getItem(localStorage.key(i)));
		//console.log(product[0]+'------>'+ product[1]);
		console.log(donnee_json[product[0]].name+'---------------'+product[1]);
		//console.log(product[1]);
		ligne_tableau += '<tr> \
		<td>'+donnee_json[product[0]].name+'</td> \
		<td>'+donnee_json[product[0]].description+' <br> <br> <b>Option :</b>'+product[1]+'</td> \
		<td>'+new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(donnee_json[product[0]].price)+'</td> \
		</tr>';
		i++;
		}
tableau_commande.innerHTML = '<fieldset class="panier"><legend>Panier</legend><table>'+titre_tableau+ligne_tableau+'</table></fieldset>';
});

