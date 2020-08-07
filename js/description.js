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
function selection_option_lentille(choix_option){
    localStorage.setItem('option', choix_option);
}
function passer_commande(){
    localStorage.removeItem('produit-selectionne');
    option_choisi = document.getElementById("selection_option").selectedIndex;
    selection_choix = (document.getElementsByTagName("option")[option_choisi]).value;
    commande =[produit_selectionne,selection_choix];
    localStorage.setItem(Date.now(),JSON.stringify(commande));
    window.location = "panier.html";
}
let produit_selectionne = localStorage.getItem('produit-selectionne');
let url_api = "http://localhost:3000/api/cameras";
let description = document.getElementById('produit');
lire_fichier_json(url_api, function(text){
	let donnee_json = JSON.parse(text);   
	let description_camera =  
        '<div id="img_description"><img src="'+donnee_json[produit_selectionne].imageUrl+'" width="395px" height="263px" > </div> \
         <div id="texte_description"><h2>'+donnee_json[produit_selectionne].name+'</h2> \
         <p>' +donnee_json[produit_selectionne].description+'</p>';
        description_camera_footer = '<footer id="bouton"><button class="btn_ajouter_panier" onclick="passer_commande()">Commander</button></footer></div>';
    let option_lentilles = (donnee_json[produit_selectionne]).lenses;
    description.innerHTML = '<h1> Détail de l\'appareil '+donnee_json[produit_selectionne].name+'</h1>';
    console.log(option_lentilles.length);
    if (option_lentilles.length > 1){
        let  description_option_lentille ='';
            for (var option_lentille in option_lentilles){
           // description_option_lentille += '<button class="option_lentille"  onclick="selection_option_lentille(\''+option_lentilles[option_lentille]+'\')">'+option_lentilles[option_lentille]+'</button>';
            description_option_lentille += '<option  value="'+option_lentilles[option_lentille]+'">'+option_lentilles[option_lentille]+'</option>';
            }; 
            description.innerHTML = '<h1> Détail de l\'appareil '+donnee_json[produit_selectionne].name+' </h1><article id="article_description">'+description_camera + '<fieldset><legend>Lentilles disponibles </legend><select id="selection_option"><option>Selectionner une lentille</option>'+description_option_lentille +'</select></fieldset>'+ description_camera_footer +'</article>';        
	}else{
        description.innerHTML = '<article id="article_description">'+description_camera + '<p class="lentille_sans_option">Lentille disponible : '+option_lentilles+'</p>'+ description_camera_footer +'</article>';
    }    
});