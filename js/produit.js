fetch("http://localhost:3000/api/cameras").then(response =>{
    return response.json()
}).then(result =>{
    //on récupére la valeur ID de l'URL
    let adresse_url = window.location;
    let url = new URL(adresse_url);
    let index_produit = url.searchParams.get("index");
    
    //On crée un élément article
    let produit = document.createElement("article");
            
    // on récupére l'index de l'image dans code produit.html pour l'afficher
    produit.innerHTML= '<img src='+result[index_produit].imageUrl+'>';
    produit.innerHTML+='<p class=description>'+result[index_produit].description +'</p>';
       
    
    // on insére le code précédent dans la balise div produit
    let photo_produit = document.getElementById('description_produit');           
    if (photo_produit !== null ){photo_produit.appendChild(produit);}

    //séparateur nombre
    let prix = result[index_produit].price;
    produit.innerHTML+='<p class=prix>'+prix.toLocaleString('fr') +' € </p>';

    console.log(result[0].imageUrl)
    


    

    


    
    
    
})