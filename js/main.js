//lecture du fichier json qui envoie la promesse dans variable liste_produit
function redirect_description_produit(id_produit) {
    window.location = 'description.html?id_produit='+ id_produit;
}
//pour lire le fichier json
fetch("http://localhost:3000/api/cameras")
    .then(response => {
        
        fichier_json = response.json();
        var liste_produit = Promise.resolve(fichier_json);
        console.log(liste_produit);

        //Création du tableau de produit dans div catalogue
        var catalogue = document.getElementById('catalogue')

        //Parcourir le tableau de json et afficher en html ce que l'on veut
        liste_produit.then((valeur) => {
            valeur.forEach(appareil_photo =>
                catalogue.innerHTML += `<article class="article_catalogue">
                                            <div class="photo_article">
                                                <img src="${appareil_photo.imageUrl}" onclick="redirect_description_produit('${appareil_photo._id}')">
                                            </div>
                                            <h2 class="index_name">${appareil_photo.name}</h2>
                                            </div>
                                            <button class="index_ensavoirplus" onclick="redirect_description_produit('${appareil_photo._id}')">En savoir +</button>
                                        </article>`)         
        });
    });//fin fetch