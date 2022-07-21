//Récupération du local storage
//Récupération du tableau et transformation en js
let DonneesLocalStorage = JSON.parse(localStorage.getItem("produit"));
//si le panier est vide afficher le panier est vide (ou que tous les artciles ont été supprimé)
if(DonneesLocalStorage === null || DonneesLocalStorage == 0){
    const title = document.querySelector("h1");
    title.innerHTML = "Le panier est vide !";
} else {
    //Varaible pour calculer le prix total sans avoir des problèmes liés au boucles
    //Le total commence à 0
    let totalPrix = 0;
//si le panier n'est pas vide afficher chaque produit du local Storage
//produit fait référence au données du local storage

    DonneesLocalStorage.forEach(produit => {
        let Kanap = {
            id: produit.idProduit,
            color : produit.CouleurProduit,
            quantity: produit.QuantiteProduit,
            idColor: produit.idCouleur
        }
    
//Récupération de l'API
        fetch("http://localhost:3000/api/products/" + Kanap.id) 
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })

//products fait référence aux données de l'API
        .then(function(products) {
            //Canape.forEach(products =>  {
                //if (products._id == Kanap.id) {
//Création du HTML
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
                    pColor.innerHTML = Kanap.color;
                    //Prix
                    let pPrice = document.createElement('p');
                    divItemDescription.appendChild(pPrice);
                    pPrice.innerHTML = products.price + '€';
                    let prixProduits = products.price;
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
                    inputItemQuantity.setAttribute('name', "itemQuantity");
                    inputItemQuantity.setAttribute('min', '1');
                    inputItemQuantity.setAttribute('max', '100');
                    inputItemQuantity.value = Kanap.quantity;
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

                    

//CHANGEMENT QUANTITE dans les input
                    //écouter si il y a un changement sur les input
                    inputItemQuantity.addEventListener('change', (event) => {
                        event.preventDefault();
                        //Récupère l'id dans le local storage
                        let itemId = produit.idProduit;
                        //Récupère la couleur dans le local storage
                        let itemCouleur = produit.CouleurProduit;
                        //Trouver dans le local storage l'element qui possède le même id et la même couleur
                        const modifQuantite = DonneesLocalStorage.find((element) => element.idProduit === itemId && element.CouleurProduit === itemCouleur );
                        //si l'élement est trouvé
                        if(modifQuantite) {
                        //La quantité de cet élement est égale à celle présente dans l'input
                            modifQuantite.QuantiteProduit = Number(inputItemQuantity.value);
                        //Envoyer les nouvelles données dans le local storage
                            localStorage.setItem("produit", JSON.stringify(DonneesLocalStorage));
                        }
                        //Recherger la page
                        window.location.reload();
                    })

//SUPPRIMER UN ARTICLE
                    //écouter le clique du bouton pDelete
                    pDelete.addEventListener('click', (event) => {
                        event.preventDefault();
                        let idCouleurASupprimer = Kanap.idColor;
                    //Selectionner avec la méthode filter (selectionner les éléments à garder et supprimer l'élement à suppimer)
                        articleASupprimer = DonneesLocalStorage.filter((el)=> el.idCouleur !== idCouleurASupprimer);
                    //Renvoyer les données dans le local Storage
                        localStorage.setItem("produit", JSON.stringify(articleASupprimer));
                    //Recharger la page
                        window.location.reload();
                    })
//_____________________________________________________________________________________________________
//pour envoyer uniquement les id des produits choisis
                    //Mettre dans un tableau uniquement les id des produits
                    
                   
                //console.log(produitsChoisi)
                    //Envoyer les id des produits choisis dans le local storage
                    //localStorage.setItem("produitsChoisi", JSON.stringify(produitsChoisis));

//Calcul de la QUANTITE TOTAL
                    //Récupérer les données du local storage
                    let qteDuProduit = DonneesLocalStorage;
                    //Calcul de la quantité total
                    //Le total commence à 0
                    let totalQte = 0;
                    //Calcul du total en ajoutant à celui ci les quantités sous forme de nombres
                    for (let element of qteDuProduit) {
                        totalQte += Number(element.QuantiteProduit);
                    }  
                    //Insertion de la quantité total
                    let pTotalQuantity = document.getElementById('totalQuantity');
                    pTotalQuantity.innerHTML = totalQte;
                    

//Calcul du prix total
                    //Calcul total prix
                    totalPrix += prixProduits * Kanap.quantity;
                    //Afficher le prix total
                    let totalPrice = document.getElementById('totalPrice');
                        totalPrice.innerHTML = totalPrix;
                //}
            //})
        })

    })

}

//REGEXP
//Récupération de la balise form 
let form = document.querySelector('.cart__order__form');
//Création de variable pour récupérer les élééments html
let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
let firstName = document.getElementById('firstName');
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
let lastName = document.getElementById('lastName');
let addressErrorMsg = document.getElementById('addressErrorMsg');
let address = document.getElementById('address');
let cityErrorMsg = document.getElementById('cityErrorMsg');
let city = document.getElementById('city');
let emailErrorMsg = document.getElementById('emailErrorMsg');
let email = document.getElementById('email');
//Déclarations variables pour les regex prenom nom et ville
let nameCityRegExp = new RegExp(/^[a-zA-Z\s,'-]*$/);
//Regexp ADRESSE
//Explication regExp : ensemble quelconque de chiffre suivit éventuellement d'un espace suivit d'un ensemble quelconque de lettres espaces virgules ou points suivit éventuellement d'un espace
let addressRegExp = new RegExp(/^[0-9 A-Za-z'-]{1,40}$/);
//Regexp EMAIL
let emailRegExp = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-z]{2,3})$/);

//écouter l'input PRENOM
form.firstName.addEventListener('change', function() {
    if(nameCityRegExp.test(firstName.value) == false){
        firstNameErrorMsg.innerHTML = "Le prénom n'est pas valide";
    }
});
//écouter l'input NOM
form.lastName.addEventListener('change', function() {
    if(nameCityRegExp.test(lastName.value) == false){
        lastNameErrorMsg.innerHTML = "Le nom n'est pas valide";
    }
});

//écouter l'input ADRESSE
form.address.addEventListener('change', function() {
    if(addressRegExp.test(address.value) == false){
        addressErrorMsg.innerHTML = "L'adresse n'est pas valide";
    }
});

//écouter l'input VILLE
form.city.addEventListener('change', function() {
    if(nameCityRegExp.test(city.value) == false){
        cityErrorMsg.innerHTML = "La ville n'est pas valide";
    }
});

//écouter l'input EMAIL
form.email.addEventListener('change', function() {
    if(emailRegExp.test(email.value) == false){
        emailErrorMsg.innerHTML = "L'email n'est pas valide";
    }
});



//Définition de la cariable du bouton
let order = document.getElementById('order');

//Ecouter le bouton commander
order.addEventListener('click', (event) => {
    event.preventDefault();
    //si les champs de sont pas rempli, mettre un message d'erreur
    if(!firstName.value || !lastName.value || !address.value || !city.value || !email.value){
        alert('Tous les champs doivent être remplis');
        
    }else{

        //Création tableau pour mettre les id produits à l'intérieur
        let tableauIdProduits = [];
        for(let canape of DonneesLocalStorage){
            tableauIdProduits.push(canape.idProduit);
        }

   
        //Stockage des informations du formulaire
        let elementsAEnvoyer = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: tableauIdProduits,
        };
        
        
        //Envoyer les données du local storage au server
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(elementsAEnvoyer),
        })
        .then((res) => res.json())
        .then((data) => {
            document.location.href = 'confirmation.html?' + data.orderId;
        })
        .catch(function(erreur) {
            console.log('Une erreur est survenue' + erreur);
        });
        localStorage.clear();
    
    }
}) 


    