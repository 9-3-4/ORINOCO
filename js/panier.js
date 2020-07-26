fetch("http://localhost:3000/api/cameras").then(response =>{
    return response.json()
}).then(result =>{
    
    let quantite = localStorage.getItem("quantité");
    console.log (quantite);



})
    





