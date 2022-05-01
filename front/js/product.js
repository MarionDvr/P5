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
                    let couleur = document.createElement('option');
                    couleur.value = couleurs.couleur;
                    choisirCouleur.appendChild(couleur);
                    couleur.innerHTML = couleurs.colors;
                    
                })
            
                
            }
        }

        
    );

    })


