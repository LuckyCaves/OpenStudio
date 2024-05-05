
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

function getRandomInt(max) {
    return 5 + Math.random() * max;
}

function changePage(numero)
{
    let page = document.getElementById('page');
    page.innerHTML = numero;
}

window.onload = function() {
    getProducts(10);
};

function changePage(numero)
{

    let productsContainer = document.getElementById('Products-Container');
    productsContainer.innerHTML = '';

    getProducts(numero);
}

function getProducts(page)
{

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/products', true);
    
    xhr.setRequestHeader('Content-Type', 'application/json');
    if(page !== undefined)
    {
        xhr.setRequestHeader('page', page);
    }

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            let productsContainer = document.getElementById('Products-Container');
            response.forEach(function(product) {
                createProductCard(productsContainer, product);
            });

        } else {
            console.error('Request failed. Status:', xhr.status);
        }
    };

    xhr.onerror = function() {
        console.error('Request error');
    };

    xhr.send();
}