document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('title');
    if (searchQuery) {
        getProduct(searchQuery);
    }
});

function getProduct(searchQuery) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/products/search?title=${encodeURIComponent(searchQuery)}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            const products = JSON.parse(xhr.responseText);
            fillInfo(products);
        } else {
            console.error('Search failed. Status:', xhr.status);
        }
    };

    xhr.onerror = function() {
        console.error('Request error');
    };

    xhr.send();
}

function fillInfo(products) {
    const productsContainer = document.getElementById('Products-Container');
    if (productsContainer) {
        productsContainer.innerHTML = ''; // Clear previous results
        products.forEach(product => {
            /*const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <img src="${product.imageUrl}" alt="${product.title}" style="width:100px; height:auto;">
                <p>Price: $${product.price}</p>
            `;
            productsContainer.appendChild(productDiv);*/
            createProductCard(productsContainer, product);
        });
    } else {
        console.error('Products-Container element not found!');
    }
}

function createProductCard(productsContainer, product)
{

    let productCard = document.createElement('div');
    productCard.id = 'Product-Card';
    productCard.addEventListener('click', function() {
        localStorage.setItem('product', product.sku);
        window.location.href = 'product';
    });

    let cardImage = document.createElement('img');
    cardImage.id = 'Card-Image';
    cardImage.src = product.image;

    let cardTitle = document.createElement('h5');
    cardTitle.id = 'Card-Title';
    cardTitle.innerHTML = product.title;

    let cardDescription = document.createElement('p');
    cardDescription.id = 'Card-Description';
    cardDescription.innerHTML = '$' + product.price;

    productCard.appendChild(cardImage);
    productCard.appendChild(cardTitle);
    productCard.appendChild(cardDescription);

    productsContainer.appendChild(productCard);

}