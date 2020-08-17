
//récupération de l'url avec une seule donnée, l'ID
id_produit = (window.location.search.substr(1).split('id_produit='))[1];



//lecture du fichier json qui envoie la promesse dans variable id_produit
fetch("http://localhost:3000/api/cameras")
        .then(response => {

            fichier_json = response.json();
            var liste_produit = Promise.resolve(fichier_json);
           

            //Création du tableau de produit dans div panier
            var panier = document.getElementById('panier');
         

            //afficher seulement la valeur du tableau (array du json)
            liste_produit.then((valeur) => {
                JSON.parse(localStorage.getItem('panier')).forEach(produit => {
                    //trouver dans les valeurs la ligne id_produit
                    var choix_appareil_photo = valeur.find(appareil_photo => appareil_photo._id === produit.id);

                    // Création du code HTML
                   panier.innerHTML += `<article>
                                        <h2 class="panier_name">${choix_appareil_photo.name}</h2>
                                        <div class="panier_photo">
                                            <img src="${choix_appareil_photo.imageUrl}"width="250">
                                        </div>
                                        <p>${produit.lentille}</p>
                                        <p class="panier_prix">${choix_appareil_photo.price} &#x20AC </p>
                                    </article >`;

                })
                
                







            });







        });//fin fetch
