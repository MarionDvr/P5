async function getProducts() { 
  fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(Product) {
    console.log(Product);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

}

const section = document.getElementById('items');
const a = document.createElement('a');
section.appendChild(a);
a.href = './product.html?id=42';


const article = document.createElement('article');
a.appendChild(article);


const img = document.createElement('img');
article.appendChild(img);
img.src = getProducts().imageUrl;
img.alt = getProducts().altTxt;


const h3 = document.createElement('h3');
article.appendChild(h3);
h3.classList.add('productName');
h3.innerText = getProducts().name; 



const p = document.createElement('p');
article.appendChild(p);
p.classList.add('productDescription');
p.innerText = getProducts().description;



