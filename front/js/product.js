//Récuppération de l'API

    fetch('http://localhost:3000/api/products')
    
    .then(function(res) {
        if (res.ok) {
            return res.json();
      }
    })

//Répartition des valeurs du tableau sur les élément HTML concerant le canapé
    .then(function(canapé) {
        canapé.forEach(products =>  {
            console.log('canapé');

//Création de l'image dans la div
            let divImg = document.getElementById('item__img');
            let img = document.createElement('img');
            divImg.appendChild(img);
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

//Création des balise option pour les couleurs
            let choisirCouleur = document.getElementById('');
//Ajouter automatiquement le nombre de couleurs correspondantes
            function Couleurs() {
                products.forEach(colors => {
                    let couleur = document.createElement('option');
                    couleur.setAttribute("value", colors.color);
                    couleur.innerText = colors.color;
                    couleur.appendChild(choisirCouleur);
                })
            
                
            }

        }
    );

    })


