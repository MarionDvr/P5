//Récupération de l'emplacement de l'id dans le html
const orderId = document.getElementById('orderId');
//Récupération de l'id de la commande dans l'url
const id = window.location.search.split("?").join("");


orderId.innerHTML = id;