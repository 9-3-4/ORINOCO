/*fonction pour récupéreration de l'url en synchrone*/

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

function finalise_commande (){
	localStorage.setItem('option', liste_option[0]);
	 var qte = document.getElementById("quantite").value;
	 localStorage.setItem('quantite', qte);
	 console.log (qte);
	 
	//console.log (localStorage.setItem('quantite',qte));
}
function selection_produit(){
	let valeur_produit=document.getElementById('btn_plus-dinfo').name
	console.log(valeur_produit);
}
	

	lire_fichier_json("http://localhost:3000/api/cameras", function(text){
   let data = JSON.parse(text);
   let catalogue = document.getElementById("catalogue");
   let description = document.getElementById("produit");
   let panier = document.getElementById("panier");
 
	
	for (var cle in data){
		//Creation du catalogue
			article = '<article class="produit"><h2 class="produit">'+ data[cle].name+'</h2><img src ='+ data[cle].imageUrl +' width= "40%" class="img_produit"><p class="description_produit">'+data[cle].description +'<p class="prix_catalogue">'+(data[cle].price).toLocaleString("fr")+' €</p><footer><span class="bouton_info"><a href="description.html?produit='+cle+'" >+ d\'info</a></span> <span class="bouton_panier"> Ajouter au panier </span></footer></article>';
			if (catalogue != null){ catalogue.innerHTML += article};			
	}
	var url = new URL(window.location.href);
	var id=url.searchParams.get("produit");
	var string_url = url.toString();
	//page description produit
	if(string_url.indexOf('description')!== -1){
			let nom_produit = data[id].name;
			let description_produit = data[id].description;
			let prix_produit = (data[cle].price);
			let url_image_produit = data[id].imageUrl;
			let panier_temporaire = [nom_produit,description_produit,prix_produit, url_image_produit];
			console.log(panier_temporaire);
			
			let description_article = '<article class="page_description_produit"><h2>'+data[id].name+'</h2>';
			description_article +='<p class="details_produit">'+data[id].description+'</p>';
			description_article += '<p class="prix_catalogue">'+(data[cle].price).toLocaleString("fr")+' €</p>';
			description_article += '<img src ='+ data[id].imageUrl +' width="800px"></p>';
			
			//Creation Fiche produit
			liste_option = data[id].lenses
			let x =0;
			description_article += '<div class="personnlaisation"><p class="label_option_lentille" > Choix de la lentille : &nbsp;</p>';
			localStorage.clear('Option','');	
			if (liste_option.length !== 1){
				for (var option in liste_option){			
					description_article += '<p class="option_lentille" id="'+liste_option[option]+'" onclick="localStorage.setItem(\'option\',\''+liste_option[option]+'\')" > '+liste_option[option]+'</p>';
					x++;
				} 
			}else{
				description_article += 'Lentille de l\'appareil : '+ data[id].lenses+'</p>';
			}
			let qte =1;
			
			description_article += '<p class="qte"><label class="label_qte" >Quantité : &nbsp;  </label>';
			description_article += '<input type="number" class="quantite" id="quantite" name="quantite" min="1" max="5" value="1"  ></p></div>';
			description_article += '<footer><a href="panier.html" class="bouton_panier" onclick="finalise_commande()" > Ajouter au panier </span></footer></article>';
			description.innerHTML = description_article;
			localStorage.setItem('panier_temporaire',JSON.stringify(panier_temporaire));
	 }
			
	if(string_url.indexOf('panier')!== -1){
		let panier_temporaire=JSON.parse(localStorage.getItem('panier_temporaire'));
		let option = localStorage.getItem('option');
		let quantite =  localStorage.getItem('quantite');
		console.log(panier_temporaire[0]);
		console.log(panier_temporaire[1]);
		console.log(panier_temporaire[2]);
		console.log(panier_temporaire[3]);
		console.log(option);
		console.log(quantite);
		let prix_total = quantite * parseInt(panier_temporaire[2]);
		console.log('prix --->'+prix_total);
		panier.innerHTML = '<h1>panier</h1>';
		commande = '<div class="commande_panier"><div class="photo_panier"><img src="'+panier_temporaire[3]+'" width="100%" ></div><div class="description"><span class="titre_description_panier">'+panier_temporaire[0]+'</span><br/>'+panier_temporaire[1]+'<br /> Option : '+option+'</div><div class="prix_panier">'+panier_temporaire[2].toLocaleString('fr')+' €</div><div class="quantite_panier"><input type="number" value="'+quantite+'" min="1" max="10" ></div><div class="prix_panier_total">'+prix_total.toLocaleString('fr')+' €</div></div>';
		panier.innerHTML += commande;

		
		
	}
	
	
	
	

		
 
 
});
