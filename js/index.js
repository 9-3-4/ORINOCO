fetch("http://localhost:3000/api/cameras").then(response =>{
    return response.json()
}).then(result =>{
    //création variables pour afichage images
    let nb_image= (result).length;
    let index_image = 0;
        //tant que    
        while (index_image<nb_image){
            //Creation de la balise ou sont insérer les images
            let balise_img = document.createElement("p");
            // on récupére l'index de l'image dans un code html
            balise_img.innerHTML= result [index_image].name+'<img src ='+result [index_image].imageUrl+'>';
            // on insére le code précédent dans la div produit
            let photo_produit = document.getElementById('produit');
            photo_produit.appendChild(balise_img);
                index_image++;       



            


}
})







