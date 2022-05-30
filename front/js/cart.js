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

// -----------------------Total des articles ---------------------------------

//Tableau pour contenir tous les prix
let prixTotalCalcul = [];
//Mettre les prix dans prixTotalCalcul
let PrixProduit = products.price;
prixTotalCalcul.push(PrixProduit);

const result = prixTotalCalcul.reduce((sum, current) => sum + current.price, 0)
console.log(result) 
            
// ------suprimer
// ça fonctionne por vider l'intégralité du panier
let deleteItem = document.querySelector('.deleteItem')


    
//Ecouter le texte "supprimer"   
deleteItem.addEventListener('click', function() {
        
      
//Supprimer avec remove
    localStorage.removeItem('produit');
//Rechergement de la page
    window.location.href = 'cart.html';

})








//------------------------------Regexp Formulaire--------------------------------------------------
//Récupération de la balise form pour ensuite pouvoir appeler les autres éléments avec leurs noms
        let form = document.querySelector('.cart__order__form');
    
  
//------------------------------Regexp PRENOM --------------------------------------------------
//écouter l'input PRÉNOM
        form.firstName.addEventListener('change', function() {
//this fait référence à l'input de firstName
                validFirstName(this);
        });
//Fonction avec la regexp pour valider le prénom
    const validFirstName = function(inputFirstName){
        let firstnameRegExp = new RegExp('^[A-Za-zéèêôîïû-]{3,}$', 'g');
        let testFirstName = firstnameRegExp.test(inputFirstName.value);
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



//------------------------------Regexp NOM --------------------------------------------------
//écouter l'input NOM
        form.lastName.addEventListener('change', function() {
   
                    validLastName(this);
        });
    //Fonction avec la regexp pour valider le nom 
        const validLastName = function(inputLastName){
            let lastnameRegExp = new RegExp('^[A-Za-zéèêôîïû-]+$', 'g');
            let testLastName = lastnameRegExp.test(inputLastName.value);
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




//------------------------------Regexp Adresse --------------------------------------------------
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




//------------------------------Regexp VILLE --------------------------------------------------
//écouter l'input ville
form.city.addEventListener('change', function() {
   
    validCity(this);
});
//Fonction avec la regexp pour valider la ville 
const validCity = function(inputCity){
    let cityRegExp = new RegExp("^[A-Za-z-'éèêôîïû ]{1,40}$", 'g');
    let testCity = cityRegExp.test(inputCity.value);
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





//------------------------------Regexp Email --------------------------------------------------
//écouter l'input email
        form.email.addEventListener('change', function() {
            validEmail(this);
        });
//Fonction avec la regexp pour valider l'email
        const validEmail = function(inputEmail){
//Création de la regExp -- Eplication regexp :
// ^ = le début [a-zA-Z0-9.-_]+ = les caractères acceptés (avant le @) : a jusqu'à z en minuscules, puis en majuscule, puis les chiffres de 0 à 9, puis des points, des tirets, des underscore. Et le + c'est pour dire que ces caractères acceptés peuvent être seuls ou plusieurs.
//[@] = caractères acceptés @ {1} = un seul @
//[a-zA-Z0-9.-_]+ = Même chose qu'au début
//[.]{1} = caractère accepté :  un seul point
//[a-z]{2-3} = caractères acceptés : des minuscules de a à z au nombre de 2 ou 3
//$ = la fin
//g = Le drapeau " g " indique que l'expression régulière doit être testée par rapport à toutes les correspondances possibles dans une chaîne.
            let emailRegExp = new RegExp('^[a-zA-Z0-9\._-]+[@][a-zA-Z0-9-_]+[\.]{1}[a-z]{2-3}$', 'g');
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
})
        
}
)
  
    
})
} 
 


