//Récupération de l'id du produit
const id = window.location.search.split("?").join("");

//Récupération de l'API
fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

//Répartition des valeurs du tableau sur les éléments HTML concerant le canapé
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
                //Écouter le choix de la couleur
                let selectColor = document.getElementById('colors');
                selectColor.addEventListener('select', function(event){
                    event.target.value;
                });
                //Ajout des listener pour le nombre 
                let inputNumber = document.getElementById('quantity');
                inputNumber.addEventListener('input', function(event){
                    event.target.value;
                });
                //Trouver le bouton et l'écouter
                let addToCart = document.getElementById('addToCart');
                addToCart.addEventListener('click', function() {
                    // Création variables pour le tableau
                    let productColor = selectColor.value;
                    let productQuantity = inputNumber.value;
                    //Stockage des informations
                    let produitSelectionne = {
                        idProduit: id,
                        couleurProduit: productColor,
                        quantiteProduit: productQuantity,
                        idCouleur: id + productColor
                    };
                    //Récupération du tableau
                    let donneesLocalStorage = JSON.parse(localStorage.getItem("produit"));
                    //Si le tableau n'est pas vide
                    if(donneesLocalStorage) {
                        let idKanap = produitSelectionne.idProduit;  
                        //Variable pour trouver si le produit est déjà dans le tableau donneeLocalStrage (recherche grace à id et Couleur)
                        const produitDejaChoisi = donneesLocalStorage.find((element) => element.couleurProduit === productColor && element.idProduit === idKanap );
                        //Si le produit est déjà dans le tableau. 
                        if(produitDejaChoisi){
                            //Convertir les strings en nombre et ajouter les quantités
                            let ajoutQuantite = parseInt(produitSelectionne.quantiteProduit) + parseInt(produitDejaChoisi.quantiteProduit);
                            produitDejaChoisi.quantiteProduit = ajoutQuantite;
                            //Renvoyer la nouvelle valeur dans le tableau
                            localStorage.setItem("produit", JSON.stringify(donneesLocalStorage));
                        } else {
                            //Ajout du produit selectionné dans le tableau donneesLocalStorage
                            donneesLocalStorage.push(produitSelectionne);
                            //La transformation en format JSON de la clef produit du local storage
                            localStorage.setItem("produit", JSON.stringify(donneesLocalStorage));
                        } 
                    //Si il n'y a pas de données dans le local storage
                    } else {
                        //Créer le tableau pour mettre les info du produit
                        donneesLocalStorage =[];
                        //Ajout du produit selectionné dans le tableau donneesLocalStorage
                        donneesLocalStorage.push(produitSelectionne);
                        //La transformation en format JSON de la clef produit du local storage
                        localStorage.setItem("produit", JSON.stringify(donneesLocalStorage));
                    }
                })
            }
        
        })
    })
                
   
            
                
            
        
        
            
        
        
    

           
    
        

    
        

                
