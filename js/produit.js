
    function panier(index_produit,quantite) {
        let adresse_url = window.location;
        let url = new URL(adresse_url); 
        index_produit=url.searchParams.get("index");
        localStorage.setItem ("ref_produit",index_produit);
        quantite=5;
        localStorage.setItem ("quantite",quantite)
        console.log (index_produit);
       }

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
    

 

    produit.innerHTML+="<button onclick= panier() >Ajouter au Panier </button>";
    
   
    
    //teste
    produit.innerHTML+='<p class=ajouterpanier> Acheter </p>';
    /*localStorage.setItem ("index",index_produit);
    localStorage.setItem ("quantite","3");
   produit.innerHTML+=localStorage.getItem("index");
    produit.innerHTML+=localStorage.getItem("quantite");*/
    //console.log (test);

    //bouton
   


    console.log(result[0].imageUrl);
    


    

    


    
    
    
})