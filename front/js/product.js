//Récupération de l'id du produit
const id = window.location.search.split("?").join("");

//Récuppération de l'API
fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

//Répartition des valeurs du tableau sur les élément HTML concerant le canapé
    .then(function(Canape) {
        Canape.forEach(products =>  {
            if (products._id == id) { 
                
           
//Création de l'image dans la div
                let divImg = document.getElementsByClassName('item__img');
                let img = document.createElement('img');
                divImg[0].appendChild(img);
                img.src = products.imageUrl;
                img.alt = products.altTxt;

//Remplissage du titre du produit
                let h1 = document.getElementById('title');
                h1.innerText = products.name;

//Remplissage du prix
                let prix = document.getElementById('price');
                prix.innerText = products.price;

//Remplissage de la description
                let p =  document.getElementById('description');
                p.innerText = products.description;

//Parent des balises option
                let choisirCouleur = document.getElementById('colors');
//Création des balise option pour les couleurs
//Ajouter automatiquement le nombre de couleurs correspondantes
            
                products.colors.forEach(couleurs => {
                    let baliseCouleur = document.createElement('option');
                    choisirCouleur.appendChild(baliseCouleur);
                    baliseCouleur.value = couleurs;
                    baliseCouleur.innerHTML = couleurs;
                    
                })
//Ajout des listener pour le choix de couleur
                let SelectColor = document.getElementById('colors');
                SelectColor.addEventListener('select', function(event){
                    event.target.value;
                
                });
//Ajout des listener pour le nombre 
                let InputNumber = document.getElementById('quantity');
                InputNumber.addEventListener('input', function(event){
                    event.target.value;
                
                });
            
    

//Trouver le bouton et l'écouter
                let addToCart = document.getElementById('addToCart');
                addToCart.addEventListener('click', function() {
            
// Création variables pour le tableau
                    let productColor = SelectColor.value;
                    let productQuantity = InputNumber.value;
                    
               
//--------------------------------- Tableau ----------------------------------------------------------
//Stockage des informations
                    let produitSelectionne = {
                    idProduit: id,
                    CouleurProduit: productColor,
                    QuantiteProduit: productQuantity,
                    
                    };
//Récupération du tableau - voir si il existe déjà
                    let DonneesLocalStorage = JSON.parse(localStorage.getItem("produit"));
//Si le tableau n'est pas vide
                    if(DonneesLocalStorage) {
//Création variable
                    let idKanap = produitSelectionne.idProduit;  
//Parcourir le tableau donneeLocalStrage
                        
                            const produitDejaChoisi = DonneesLocalStorage.find(element => element.CouleurProduit === productColor && element.idProduit === idKanap );
                            
//Si le produit est déjà dans le tableau. (recherche grace à id et Couleur)
                            if(produitDejaChoisi){
// Convertir les strings en nombre
                                let QuantiteDejaChoisi = parseInt(produitSelectionne.QuantiteProduit);
                                let QuantiteChoisi = parseInt(productQuantity);
//Gérer sa quantité
                                produitSelectionne.QuantiteProduit = QuantiteDejaChoisi + QuantiteChoisi;
                                produitSelectionne.QuantiteProduit = JSON.stringify(produitSelectionne.QuantiteProduit);
                            
//Renvoyer la nouvelle valeur dans le tableau
                                
                                localStorage.setItem("produit", JSON.stringify(produitSelectionne));
                                
                            } else {
//Ajout du produit selectionné dans le tableau DonneesLocalStorage
                                DonneesLocalStorage.push(produitSelectionne);
//La transformation en format JSON de la clef produit du local storage
                                localStorage.setItem("produit", JSON.stringify(DonneesLocalStorage));
                            } 
                     
//Si il n'y a pas de données dans le local storage
                    } else {
//Créer le tableau pour mettre les info du produit
                        DonneesLocalStorage =[];
//Ajout du produit selectionné dans le tableau DonneesLocalStorage
                        DonneesLocalStorage.push(produitSelectionne);
//La transformation en format JSON de la clef produit du local storage
                        localStorage.setItem("produit", JSON.stringify(DonneesLocalStorage));
                    }
                })
            }
        
        })
    })
                
   
            
                
            
        
        
            
        
        
    

           
    
        

    
        

                
