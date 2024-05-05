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

function fillArtistInfo(artist)
{

    let artistName = document.getElementById('Artist-Name');
    artistName.innerHTML = artist.artist;

    let artistNationality = document.getElementById('Artist-Nationality');
    artistNationality.innerHTML = artist.nationality;

    let yearBorn = document.getElementById('Year-Born');
    yearBorn.innerHTML = "b." + artist.year;

    let artistDescription = document.getElementById('Description');
    artistDescription.innerHTML = artist.description;

    let artistFacebook = document.getElementById('facebook');
    artistFacebook.href = artist.facebook;

    let artistInstagram = document.getElementById('instagram');
    artistInstagram.href = artist.instagram;

    let artistPinterest = document.getElementById('pinterest');
    artistPinterest.href = artist.pinterest;
}

function fillArtistPhoto(products)
{

    let totalProducts = products.length;
    let i = getRandomInt(totalProducts);

    let artistPhoto = document.getElementById('Artist-Image');
    artistPhoto.firstElementChild.src = products[i].image;

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getArtist(id)
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/artists/artistNumber', true);
    
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('value', id);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            fillArtistInfo(response[0]);
            getProducts(response[0].artist);

        } else {
            console.error('Request failed. Status:', xhr.status);
        }
    };

    xhr.onerror = function() {
        console.error('Request error');
    };

    xhr.send();
}

function getProducts(artist)
{

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/products/artist', true);
    
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('value', artist);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            let productsContainer = document.getElementById('Artist-Product');
            response.forEach(function(product) {
                createProductCard(productsContainer, product);
            });
            fillArtistPhoto(response);

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
    getArtist(localStorage.getItem('artist'));
};