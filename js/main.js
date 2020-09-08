//pour lire le fichier json en recuperant le contenu de l url
recupereContenuURL("http://localhost:3000/api/cameras")
    .then((valeur) => {
            valeur.forEach(appareil_photo =>
                catalogue.innerHTML += affichageProduitEnHTML(appareil_photo) )       
    })
    .catch(error => {
        catalogue.innerHTML = "<h1>Erreur</h1>";
    });//fin fetch

//fonction qui affiche en html le catalogue de produit
function affichageProduitEnHTML(produit) {
    return `<article class="article_catalogue">
                <div class="photo_article">
                    <img src="${produit.imageUrl}" onclick="redirect_description_produit('${produit._id}')">
                </div>
                <h2 class="index_name">${produit.name}</h2>
                <button class="index_ensavoirplus" onclick="redirect_description_produit('${produit._id}')">En savoir +</button>
            </article>`
}
//fonction qui redirige vers la page description
function redirect_description_produit(id_produit) {
    window.location = 'description.html?id_produit=' + id_produit;
}