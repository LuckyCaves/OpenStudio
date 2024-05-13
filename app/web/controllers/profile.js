let acc_name;

function getUserInfo() {
    return fetch('/user-info')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let temp_mail = data.email;
                acc_name = data.name;
                document.getElementById("Artist-Name").innerHTML = data.name;
                document.getElementById("Artist-Email").innerHTML = temp_mail;
                getProducts(acc_name);
            } else {
                console.error('Error obtaining the user data:', data.message);
            }
        })
        .catch(error => {
            console.log(response);
            console.error('Error request:', error);
        });
}

getUserInfo();

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

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-secondary', 'remove-btn');
    deleteButton.innerHTML = 'X';
    deleteButton.addEventListener('click', function () {
        fetch(`/admin/products/${product.sku}`, {
            method: 'DELETE',  
            headers: {
                "x-auth": "Hola"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo eliminar el producto');
            }
            return response.text();
        })
        .then(data => {
            console.log(data); // "Producto eliminado con éxito"
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
        window.location.href = '/';
    });

    productCard.appendChild(cardImage);
    productCard.appendChild(deleteButton);
    productCard.appendChild(cardTitle);
    productCard.appendChild(cardDescription);

    productsContainer.appendChild(productCard);

}

function fillArtistPhoto(products)
{

    let totalProducts = products.length;
    let i = getRandomInt(totalProducts);

    let artistPhoto = document.getElementById('Artist-Image');
    artistPhoto.firstElementChild.src = products[i].image;

}

function getRandomInt(max) {
    return 5 + Math.random() * max;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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
            console.log(response);
            response.forEach((element) => createProductCard(productsContainer, element));
            
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
    //get to, well, get the artist number of yourself
};
