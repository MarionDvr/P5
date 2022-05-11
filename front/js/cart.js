//Récupération de l'API
fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

//Répartition des valeurs du tableau sur les élément HTML concerant le canapé

     .then(function(products) {
        
            
//Récupération du local storage
//Voir si il y a déjà des données dans le local storage -- Récupération du tableau et transformation en js
        let DonneesLocalStorage = JSON.parse(localStorage.getItem("produit"));
        
        //si le panier est vide
        if(DonneesLocalStorage === null){
            const title = document.querySelector("h1");
            title.innerHTML = "Le panier est vide !";
        }else {
        //si le panier n'est pas vide afficher chaque produit du local Storage
        DonneesLocalStorage.forEach(produit => {
        let idKanap = DonneesLocalStorage.idProduit;
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
        pPrice.innerHTML = products.Prix;

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
        //input
        let inputItemQuantity = document.createElement('input');
        inputItemQuantity.classList.add('itemQuantity');
        divItemsSettingsQuantity.appendChild(inputItemQuantity);
        inputItemQuantity.innerHTML = produit.QuantiteProduit;

        //Création de la suppression
        //div enfant 2
        let divItemDelete = document.createElement('div');
        divItemDelete.classList.add('cart__item__content__settings__delete');
        //divItemSetting.appendChild(divItemDelete);
        //Paragraphe
        let pDelete = document.createElement('p');
        pDelete.classList.add('deleteItem');
        pDelete.innerHTML = "Supprimer";
        divItemDelete.appendChild(pDelete);
    } 
    }) 
  
}
          

 

})