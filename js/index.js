fetch("http://localhost:3000/api/cameras").then(response =>{
    return response.json()
}).then(result =>{
    commande_en_cours=localStorage.getItem("commande en cours");
    console.log(commande_en_cours);
    if (commande_en_cours === null) {
    num_ligne=0;
    localStorage.setItem("commande en cours",num_ligne);
    }else{
        num_ligne = commande_en_cours;
    };
    //création variables pour affichage images
    let nb_image= (result).length;
    let index_image = 0;

    //tant que    
    while (index_image<nb_image){
         //Creation de la balise ou sont insérer les images
        let balise_img = document.createElement("li");
            
        // on récupére l'index de l'image dans code index.html pour l 'afficher
        balise_img.innerHTML= result[index_image].name+'<a href="produit.html?index='+index_image+'"> <img src ='+result [index_image].imageUrl+'></a>';
            
        // on insére le code précédent dans la balise liste produit
        let photo_produit = document.getElementById('produit');           
        if (photo_produit !== null ){photo_produit.appendChild(balise_img);}
        
        index_image++;    


    };

})









