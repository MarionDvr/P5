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
//Création du tableau pour le local storage

//Stockage des informations
            let addToCart = document.getElementById('addToCart');
            addToCart.addEventListener('click', addToCart);
            addToCart.onclick = () => {
            
                localStorage.setItem('id', id);
                localStorage.setItem('Couleur', colors.value);
                localStorage.setItem('Nombre', quantity.value);
                
            }
        
   
    }

    })

})


