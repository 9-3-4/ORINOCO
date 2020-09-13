//attente de resultat et renvoie une promesse
async function recupereContenuURL(url) {
    let result = await fetch(url)
        .then(response => response.json());
    return result;
}
