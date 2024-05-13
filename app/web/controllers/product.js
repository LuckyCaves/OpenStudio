function fillInfo(product)
{

    let productImage = document.getElementById('Product-Image');
    let productArtist = document.getElementById('Artist-Name');
    let productTitle = document.getElementById('Product-Name');
    let productYear = document.getElementById('Product-Year');
    let productMethod = document.getElementById('Medio');
    let productDimension = document.getElementById('Dimensiones');
    let productQuantity = document.getElementById('Cantidad');
    let productPrice = document.getElementById('Price');

    productImage.firstElementChild.src = product.image;
    productArtist.firstElementChild.innerHTML = product.artist;
    productTitle.innerHTML = product.title;
    productYear.innerHTML = product.year;
    productMethod.innerHTML = product.method;
    productDimension.innerHTML = product.dimensions + " inches";

    if(product.quantity == 0)
    {
        productQuantity.innerHTML = "Out of stock";
        let button = document.getElementById('Purchase-btn');
        button.href = "#";
        button.disabled = true;
        button.innerHTML = "Out of stock";
    }
    else if(product.quantity == 1)
        productQuantity.innerHTML = "Unique work";
    else
        productQuantity.innerHTML = product.quantity + " units available";

    productPrice.innerHTML = "US$" + product.price;

    getArtistId(product.artist);

    let purchaseButton = document.getElementById('Purchase-btn');
    purchaseButton.addEventListener('click', function(e) {
        e.preventDefault();
        addToCart(product);
    });

}

function addToCart(product) {
    let cart = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    cart.push(product);
    sessionStorage.setItem('cartItems', JSON.stringify(cart));
    alert('Product added to cart!');
}


function getProduct(sku)
{

    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/products/sku', true);
    
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('value', sku);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            fillInfo(response[0]);

        } else {
            console.error('Request failed. Status:', xhr.status);
        }
    };

    xhr.onerror = function() {
        console.error('Request error');
    };

    xhr.send();
}

function getArtistId(artist)
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/artists/artist', true);
    
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('value', artist);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            localStorage.setItem('artist', response[0].artistNumber);

        } else {
            console.error('Request failed. Status:', xhr.status);
        }
    };

    xhr.onerror = function() {
        console.error('Request error');
    };

    xhr.send();
}

window.onload = function() {
    getProduct(localStorage.getItem('product'));
}

