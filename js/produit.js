
fetch("http://localhost:3000/api/cameras").then(response =>{
    return response.json()
}).then(result =>{

    //on récupére la valeur ID de l'URL concernant le produit cliqué
    let adresse_url = window.location;
    let url = new URL(adresse_url);
    let index_produit = url.searchParams.get("index");
    localStorage.setItem("index",index_produit);

  //-------------------------------------------------------------------------------------//
  //################################fiche produit########################################
  //-------------------------------------------------------------------------------------//    
    //On crée un élément article
    let produit = document.createElement("article");
            
    // on récupére l'index_produit pour l'afficher dans code produit.html
    produit.innerHTML= '<img src='+result[index_produit].imageUrl+'>';
    produit.innerHTML+='<p class=nom>'+result[index_produit].name +'</p>';
    produit.innerHTML+='<p class=description>'+result[index_produit].description ;  
    
    // on insére les balises img et p, précédente dans la balise div description_produit
    let photo_produit = document.getElementById('description_produit');           
    if (photo_produit !== null ){photo_produit.appendChild(produit);}

    //séparateur nombre pour le prix et son affichage 
    let prix = result[index_produit].price;
    produit.innerHTML+='<p class=prixunitaire>'+prix.toLocaleString('fr') +' €</p>';
    
    
//-------------------------------------------------------------------------------------//
//##########################creation de la liste deroulante############################
//-----------------------------------------------------------------------------------//  
   
   //récupérer les options des lentilles sur le produit
   let option_lentille= (result[index_produit].lenses);
   
   //savoir le nombre de lentille qu'il y a pour chaque produit
   let nbr_option_lentille=(result[index_produit].lenses).length;
   
   //indication de l'emplacement des élements qui vont être ajouté en HTML
   let liste_deroulante_lentille= document.getElementById("liste_deroulante_lentille");
   liste_deroulante_lentille.innerHTML = "<option value='' selected>-->choisir sa lentille<--</option>";
   
   //création liste déroulante option lentille 
    let  x=0;
      while(x<nbr_option_lentille){
        liste_deroulante_lentille.innerHTML += "<option value='"+option_lentille[x]+"'>"+ option_lentille[x]+"</option>";
        x++;
      };
  
  //creation liste deroulante quantite
  let qte= document.getElementById("liste_qte");
  qte.innerHTML = "<option value='' selected>-->quantité</option>";

  let y=1;
    while(y<=10){
    qte.innerHTML += "<option value="+y+">"+y+"</option>";
    y++;
  };


//-------------------------------------------------------------------------------------//
//################recuperation nombre quantité et option lentille#####################
//-----------------------------------------------------------------------------------//

$(document).ready(function(){
  //Dès qu'une quantite différente est choisie, récupère et affiche sa valeur (jquery)
  $("#liste_qte").change(function(){
      $("span").text($(this).val());
      qte_selectionner=($(this).val());
      
      if (qte_selectionner===undefined){
        qte_selectionner=qte_selectionner;
        localStorage.setItem("quantité",qte_selectionner);
      }else{
        qte_selectionner===null;
        localStorage.removeItem(qte_selectionner);
        qte_selectionner=qte_selectionner;
        localStorage.setItem("quantité",qte_selectionner);
      };  
     
  });
  //Dès qu'une option différente est choisie, récupère et affiche sa valeur
  $("#liste_deroulante_lentille").change(function(){
    $("span").text($(this).val());
    option_selectionner=($(this).val());

    if (option_selectionner===undefined){
      option_selectionner=option_selectionner;
      localStorage.setItem("option",option_selectionner);
    }else{
      option_selectionner===null;
      localStorage.removeItem(option_selectionner);
      option_selectionner=option_selectionner;
      localStorage.setItem("option",option_selectionner);
    };  
    
});//fin function change jquery


//boutton ajouter au panier
produit.innerHTML+="<a id=ajoutaupanier href='panier.html' >Ajouter au Panier </a>";

$("#ajoutaupanier").click(function(){

if (liste_deroulante_lentille===undefined){

}else{
  alert ("mettre une option");
}

})//fin function click jquery


});




})
