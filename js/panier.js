fetch("http://localhost:3000/api/cameras").then(response =>{
    return response.json()
}).then(result =>{
    
    //on récupére la valeur ID de l'URL
    let adresse_url = window.location;
    let url = new URL(adresse_url);
    //let index_panier = url.searchParams.get("index");
}
    





