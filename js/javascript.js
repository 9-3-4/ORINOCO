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
let url_api = "http://localhost:3000/api/cameras";

//chargera la page description avec les produit-selectionne
function selection_produit(nom_produit){
	sessionStorage.setItem('produit-selectionne',nom_produit);
	window.location = "description.html";	
}
//chargera la page panier avec les donnees produit qui seront enregistrés
function redirection_panier(mavairable){
	window.location = "panier.html";
	localStorage.setItem("le_produit",mavairable);

}
//creation de "cle" pour utiliser les donnees des item du json 
lire_fichier_json(url_api, function(text){
	let donnee_json = JSON.parse(text);
	 for (var cle in donnee_json){

//affichage en html du catalogue avec toute les donnees du produit récupérer via la cle 
let resume_description = (donnee_json[cle].description).substr(0, 28);
catalogue.innerHTML += '<article class="catalogue_produit"> \
<img src="'+donnee_json[cle].imageUrl+'" width="252px" height="166px"> \
<p class="resume_description"> \
<span class="titre_catalogue">'+donnee_json[cle].name+' </span> \
-  '+resume_description+' ...</p> \
<footer class=footer_catalogue><button  class="btn_plus-dinfo" value="'+donnee_json[cle].name+'" onclick="selection_produit('+cle+')"> Description du <strong><u> '+donnee_json[cle].name+'</u></strong> </button> \
<!--<button class="btn_ajouter_panier" id="myBtn" value="'+cle+'" onclick="redirection_panier('+cle+')">Ajouter au panier</button></footer></article>-->' ;			
}	
	
});