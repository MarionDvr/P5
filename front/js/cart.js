//Récupération du local storage
//Récupération du tableau et transformation en js
let DonneesLocalStorage = JSON.parse(localStorage.getItem("produit"));

//si le panier est vide afficher le panier est vide
if(DonneesLocalStorage === null){
    const title = document.querySelector("h1");
    title.innerHTML = "Le panier est vide !";
}else {
//si le panier n'est pas vide afficher chaque produit du local Storage
DonneesLocalStorage.forEach(produit => {
let idKanap = produit.idProduit;

    
//Récupération de l'API
fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

//Répartition des valeurs du tableau sur les élément HTML concerant le canapé

    .then(function(Canape) {
        Canape.forEach(products =>  {
            if (products._id == idKanap) { 
           
        
//Création de l'article
                let sectionCartItems = document.getElementById('cart__items');
                let article = document.createElement('article');
                article.classList.add('cart__item');
                article.dataset.id = 'productID';
                article.dataset.color = 'productColor'
                sectionCartItems.appendChild(article);

                //Création de la div contenant l'image
                let divItemImage = document.createElement('div');
                divItemImage.classList.add('cart__item__img');
                sectionCartItems.appendChild(divItemImage);
                //Image
                let ImageItem = document.createElement('img');
                ImageItem.src = products.imageUrl;
                ImageItem.alt = products.altTxt;
                divItemImage.appendChild(ImageItem);

                //Création de la div contenant les détails du produit
                //div parent
                let divItemContent = document.createElement('div');
                divItemContent.classList.add('cart__item__content');
                article.appendChild(divItemContent);
                //div enfant
                let divItemDescription = document.createElement('div');
                divItemDescription.classList.add('cart__item__content__description');
                divItemContent.appendChild(divItemDescription);
                //Titre
                let h2 = document.createElement('h2');
                divItemDescription.appendChild(h2);
                h2.innerHTML = products.name;
                //Couleur
                let pColor = document.createElement('p');
                divItemDescription.appendChild(pColor);
                pColor.innerHTML = produit.CouleurProduit;
                //Prix
                let pPrice = document.createElement('p');
                divItemDescription.appendChild(pPrice);
                pPrice.innerHTML = products.price + '€';

                //Création de la div contenant la quantité et la suppression
                //div parent
                let divItemSettings = document.createElement('div');
                divItemSettings.classList.add('cart__item__content__settings');
                article.appendChild(divItemSettings);


                //Création de la div contenant la quantité - div enfant 1
                let divItemsSettingsQuantity = document.createElement('div');
                divItemsSettingsQuantity.classList.add('cart__item__content__settings__quantity');
                divItemSettings.appendChild(divItemsSettingsQuantity);
                // paragraphe
                let pQuantité = document.createElement('p');
                divItemsSettingsQuantity.appendChild(pQuantité);
                pQuantité.innerHTML = 'Qté :';
                //input
                let inputItemQuantity = document.createElement('input');
                inputItemQuantity.classList.add('itemQuantity');
                divItemsSettingsQuantity.appendChild(inputItemQuantity);
                inputItemQuantity.dataset.name = 'itemQuantity';
                inputItemQuantity.dataset.min = '1';
                inputItemQuantity.dataset.max = '100';
                inputItemQuantity.value = produit.QuantiteProduit;

                //Création de la suppression
                //div enfant 2
                let divItemDelete = document.createElement('div');
                divItemDelete.classList.add('cart__item__content__settings__delete');
                divItemSettings.appendChild(divItemDelete);
                //Paragraphe
                let pDelete = document.createElement('p');
                pDelete.classList.add('deleteItem');
                pDelete.innerHTML = "Supprimer";
                divItemDelete.appendChild(pDelete);
                
       
 

function TotalQuantite() {
//Récupération des input itemQuantity
    let itemQuantity = document.querySelectorAll('.itemQuantity');
//Récupérer la valeur des input
    let qteDuProduit = inputItemQuantity.value;
    
//Mettre la quantité en nombre pour le calcul
    qteDuProduit = parseInt(qteDuProduit);
    
//Création de la variable pour le total
    let TotalQte = 0;

        
//Calcul = La quantité de chaque input
        TotalQte =+ qteDuProduit;
        console.log(TotalQte);
}

//fonction
TotalQuantite();



function Supprimer () {
//Suprimer un article
    let deleteItem = document.querySelectorAll('.deleteItem');
//Parcourir les bouton supprimer
    for (let b = 0; b < deleteItem.length; b++) {
//Ecouter le texte "supprimer"   
        deleteItem[b].addEventListener('click', function() {
//Supprimer avec remove
            localStorage.removeItem('idProduit');
//Rechergement de la page
            window.location.reload();
        })
    }

}
//Déclaration variable pour les regex prenom nom et ville
let nameCityRegExp = new RegExp('^[A-Za-zéèêôîïû-]+$', 'g');

function RegexpPrenom() {
//Récupération de la balise form pour ensuite pouvoir appeler les autres éléments avec leurs noms
    let form = document.querySelector('.cart__order__form');
//écouter l'input PRÉNOM
    form.firstName.addEventListener('change', function() {
//this fait référence à l'input de firstName
        validFirstName(this);
    });
//Fonction avec la regexp pour valider le prénom
    const validFirstName = function(inputFirstName){
        let testFirstName = nameCityRegExp.test(inputFirstName.value);
//Variable pour écrire une message de validation ou d'erreur
        let firstNameErrorMsg = inputFirstName.nextElementSibling;
//Si testPrénom est vrai = adresse valide
        if (testFirstName){
            firstNameErrorMsg.innerHTML = '';
//Sinon = adressse invalide                       
        } else {
            firstNameErrorMsg.innerHTML = "Le prénom n'est pas valide";
        }
    }
}

function RegExpNom() {
//écouter l'input NOM
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });
//Fonction avec la regexp pour valider le nom 
    const validLastName = function(inputLastName){
        let testLastName = nameCityRegExp.test(inputLastName.value);
//Variable pour écrire une message de validation ou d'erreur
        let lastNameErrorMsg = inputLastName.nextElementSibling;
//Si test est vrai = adresse valide
        if (testLastName){
            lastNameErrorMsg.innerHTML = '';
//Sinon = adressse invalide                       
        } else {
            lastNameErrorMsg.innerHTML = "Le nom n'est pas valide";
        }
    }
}

function RegExpAdresse () {
//écouter l'input NOM
    form.address.addEventListener('change', function() {
        validAddress(this);
    });
//Fonction avec la regexp pour valider le nom et prénom
    const validAddress = function(inputAdress){ 
//Explication regExp : ensemble quelconque de chiffre suivit éventuellement d'un espace suivit d'un ensemble quelconque de lettres espaces virgules ou points suivit éventuellement d'un espace
        let adressRegExp = new RegExp('^[0-9 A-Za-z-]{1,40}$', 'g');
        let testAdress = adressRegExp.test(inputAdress.value);
//Variable pour écrire une message de validation ou d'erreur
        let adressErrorMsg = inputAdress.nextElementSibling;
//Si test est vrai = adresse valide
        if (testAdress){
            adressErrorMsg.innerHTML = '';
//Sinon = adressse invalide                       
        } else {
            adressErrorMsg.innerHTML = "L'adresse n'est pas valide";
        }
    }
}

function RegExpVille () {
//écouter l'input ville
    form.city.addEventListener('change', function() {
        validCity(this);
    });
//Fonction avec la regexp pour valider la ville 
    const validCity = function(inputCity){
        let testCity = nameCityRegExp.test(inputCity.value);
//Variable pour le message d'erreur
        let cityErrorMsg = inputCity.nextElementSibling;
//Si test est vrai = adresse valide
        if (testCity){
            cityErrorMsg.innerHTML = '';
//Sinon = adressse invalide                       
        } else {
            cityErrorMsg.innerHTML = "La ville n'est pas valide";
        }
    }
}

function RegExpEmail () {
//écouter l'input email
    form.email.addEventListener('change', function() {
        validEmail(this);
    });
//Fonction avec la regexp pour valider l'email
    const validEmail = function(inputEmail){
        let emailRegExp = new RegExp('^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-_]+\.[a-z]{2-3}$', 'g');
        let testEmail = emailRegExp.test(inputEmail.value);
//Variable pour écrire une message de validation ou d'erreur
        let emailErrorMsg = inputEmail.nextElementSibling;
//Si testEmail est vrai
        if (testEmail){
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = "L'adresse email n'est pas valide";
        }
    }
    
}
}
})

})
     
})
}