//Récupération du local storage
//Récupération du tableau et transformation en js
let DonneesLocalStorage = JSON.parse(localStorage.getItem("produit"));

//si le panier est vide afficher le panier est vide (ou que tous les artciles ont été supprimé)
if(DonneesLocalStorage === null || DonneesLocalStorage == 0){
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

//Répartition des valeurs du tableau de l'API sur les élément HTML concerant le canapé

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
                        } /*else {
                            DonneesLocalStorage.push(Canape);
                            localStorage.setItem("produit", JSON.stringify(DonneesLocalStorage));
                        }*/
                //Recherger la page
                        window.location.reload();
                    }); 



                //Calcul de la QUANTITE TOTAL
                //Récupérer les données du local storage
                let qteDuProduit = DonneesLocalStorage;
                //Calcul de la quantité total
                //Le total commence à 0
                let totalQte = 0;
                //Calcul du total en ajoutant à celui ci les quantités qui sont des nombres
                for (let element of qteDuProduit) {
                    totalQte += Number(element.QuantiteProduit);
                }  
                //Insertion de la quantité total
                let pTotalQuantity = document.getElementById('totalQuantity');
                pTotalQuantity.innerHTML = totalQte;



                //Calcul du PRIX TOTAL
                //Récupérer les prix de l'api
                let prixProduits = products.price;
                
                //Calcul du total prix par article
                let totalPrixParProduit = 0;
                totalPrixParProduit = prixProduits * produit.QuantiteProduit;
                let tableau = [];
                tableau.push(totalPrixParProduit);
                console.log(tableau);
                //Calcul du prix total
                //Le total commence à 0
                let totalPrix = 0;
                //Calcul total
                totalPrix =+ totalPrixParProduit;
                
                             
            }
            
            //SUPPRIMER UN ARTICLE
            let deleteItem = document.querySelectorAll('.deleteItem');
                
            for (let c = 0; c < deleteItem.length; c++) {
                deleteItem[c].addEventListener('click', (event) => {
                    event.stopImmediatePropagation();
                    let idCouleurASupprimer = DonneesLocalStorage[c].idCouleur;
            //Selectionner avec la méthode filter (selectionner les éléments à garder et supprimer l'élement à suppimer)
                    DonneesLocalStorage = DonneesLocalStorage.filter((el)=> el.idCouleur !== idCouleurASupprimer);
            //Renvoyer les données dans le local Storage
                    localStorage.setItem("produit", JSON.stringify(DonneesLocalStorage));
            //Recharger la page
                    window.location.reload();
                    
                })
            }
        })

    })
     
})
}
//REGEXP
//Déclaration variable pour les regex prenom nom et ville
let nameCityRegExp = new RegExp('^[A-Za-zéèêôîïû-]+$', 'g');
//Récupération de la balise form pour ensuite pouvoir appeler les autres éléments avec leurs noms
let form = document.querySelector('.cart__order__form');

function RegexpPrenom() {

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
        //let emailRegExp = new RegExp('^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-z]{2,3})$', 'g');
        let emailRegExp = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-z]{2,3})$/g);
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
RegexpPrenom();
RegExpNom();
RegExpAdresse();
RegExpVille();
RegExpEmail();