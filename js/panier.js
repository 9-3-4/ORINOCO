fetch("http://localhost:3000/api/cameras").then(response =>{
    return response.json()
}).then(result =>{
    
    //on récupère quantite et option lentilles et index
    let quantite = localStorage.getItem("quantité");
    console.log (quantite);
    
    let option = localStorage.getItem("option");
    console.log (option);

    let index_produit = localStorage.getItem("index");
    console.log (index_produit);
 
    
    //on créer un élément article
    let commande = document.createElement("tr");
     
    // on insere les balises précédentes dans la balise div commande_produit
    let com= document.getElementById('commande_produit');
    if (com !== null ){com.appendChild(commande)}; 
     
    //on affiche dans HTML les données de la commande 
    commande.innerHTML= '<td><img class=produit_choisi src='+result[index_produit].imageUrl+'></td>';
    commande.innerHTML+='<td class=nom>'+result[index_produit].name +'</td>';
    commande.innerHTML+='<td class=description>'+result[index_produit].description +'</td>'; 
    commande.innerHTML+='<td class=option>'+option+'</td>';
    commande.innerHTML+='<td class=quantite>'+quantite+'</td>';
    
    
    
    //Affichage et calcul prix
   
    let prix_unitaire = result[index_produit].price;
    commande.innerHTML+='<td class=prixunitaire>'+prix_unitaire.toLocaleString('fr') +' € </td>';

    let prix_total = prix_unitaire * quantite;
    commande.innerHTML+='<td class=prixtotal>'+prix_total.toLocaleString('fr') +' € </td>';


    
  //!!!!!!!!!!!!!!boutton passer la commande avec popup résumer commande et formulaire contact à remplir!!!!!!!!!!!!!!!!!!!!!!!!!
//produit.innerHTML+="<a href='panier.html' >Ajouter au Panier </a>";




    
   

 
   





})//fin .then result
    





