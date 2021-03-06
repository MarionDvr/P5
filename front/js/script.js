//Récupération de l'API
fetch('http://localhost:3000/api/products')
  .then(function(res) {
      if (res.ok) {
          return res.json();
      }
  })
    //Répartition des valeurs du tableau sur les éléments HTML
    .then(function(Produits) {
      Produits.forEach(products =>  {
          console.log('Produits');
          //Création du lien
          let section = document.getElementById('items');
          let a = document.createElement('a');
          section.appendChild(a);
          a.href = "./product.html?" + products._id;
          //Création de l'article
          let article = document.createElement('article');
          a.appendChild(article);
          //Création de l'image 
          let img = document.createElement('img');
          article.appendChild(img);
          img.src = products.imageUrl;
          img.alt = products.altTxt; 
          //Création du titre
          let h3 = document.createElement('h3');
          article.appendChild(h3);
          h3.classList.add('productName');
          h3.innerHTML = products.name; 
          //Création de la description
          let p = document.createElement('p');
          article.appendChild(p);
          p.classList.add('productDescription');
          p.innerText = products.description;
      })
    }) 

  //Affichage du message d'erreur
  .catch(function(erreur) {
      console.error('Une erreur est survenue' + erreur);
  });
  






