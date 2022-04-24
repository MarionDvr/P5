fetch('http://localhost:3000/api/products');

const section = document.getElementById('items');
const a = document.createElement('a');
section.appendChild(a);
a.href = './product.html?id=42';


const article = document.createElement('article');
a.appendChild(article);


const img = document.createElement('img');
article.appendChild(img);
img.join('imageUrl');



const h3 = document.createElement('h3');
article.appendChild(h3);
h3.classList.add('productName');

const p = document.createElement('p');
article.appendChild(p);
p.classList.add('productDescription');





