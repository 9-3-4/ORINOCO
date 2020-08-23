




const adresse_url = window.location.href;
const url = new URL(adresse_url);
const nom = url.searchParams.get("nom");
const prenom = url.searchParams.get("prenom");
const adresse = url.searchParams.get("adresse");
const cp = url.searchParams.get("code_postal");
const ville = url.searchParams.get("ville");
const email = url.searchParams.get("email");
const information_client = `{nom:"${nom}", prenom:"${prenom}", adresse:"${adresse}", cp:"${cp}", ville:"${ville}", email:"${email}"}`;
const contact_client = localStorage.setItem("info_client",'['+information_client+']');
const panier = JSON.parse(localStorage.getItem('panier'));


fetch("http://localhost:3000/api/cameras/order", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: panier
});

