fetch("http://localhost:3000/api/cameras").then(response =>{
    return response.json()
}).then(result =>{
    
    //on récupère quantite et option lentilles et index
    let index_produit = localStorage.getItem("index");
         
    // on créer un élément table et on insere les balises précédentes dans la balise commande_produit
    let commande = document.createElement("table");
    let com=document.getElementById('commande_produit');
    if (com !== null ){com.appendChild(commande)};   
 
    //on affiche dans HTML les données de la commande 
    let picture = '<tr></tr><td><img class=produit_choisi src='+result[index_produit].imageUrl+'></td>';
    let name='<td class=nom>'+result[index_produit].name +'</td>';
    let description ='<td class=description>'+result[index_produit].description +'</td>'; 
    let prix_unitaire = '<td>'+result[index_produit].price.toLocaleString('fr')+'</td>';
    let quantite = '<td>'+localStorage.getItem("quantité")+'</td>';
    let option = '<td>'+ localStorage.getItem("option") +'</td>';
    let prix_total = '<td>'+(result[index_produit].price *localStorage.getItem("quantité") ).toLocaleString('fr')+'</td></tr>';
    
    //affichage des données dans un tableau nommé commande1
    commande1= []
    commande1.push(picture,name,description,option,quantite,prix_unitaire,prix_total);
   
    //on enregistre les donnees de commande1 pour ensuite les recuperer tout en créant chaque commande dans une ligne différente
    commande_en_cours = localStorage.getItem("commande en cours");
    ligne_commande= "ligne"+commande_en_cours;
    localStorage.setItem (ligne_commande, JSON.stringify(commande1));
    commande_en_cours++;
    ligne_commande= "ligne"+commande_en_cours;
    localStorage.setItem("commande en cours",commande_en_cours);

    //on affiche les lignes de commandes tant qu'il y en a   
    x=0;
    while (x<=commande_en_cours) {
        num_ligne="ligne"+x;
        console.log(num_ligne);
        recup_valeur_json=JSON.parse(localStorage.getItem(num_ligne));
        if (recup_valeur_json !== null){
        commande.innerHTML+="<tr>"+((recup_valeur_json).toString()).replace(/,/g,"")+"</tr>";}
        x++;
        
    }
    //on affiche le tableau avec les lignes pour chaque produit choisi
    commande.innerHTML+="</tr>";

    //bouton continuer mes achats avec lien page index*
    
    commande.innerHTML+="<a href='index.html' >Continuer mes achats </>";


    
  
    
   

 
   





})//fin .then result
    





