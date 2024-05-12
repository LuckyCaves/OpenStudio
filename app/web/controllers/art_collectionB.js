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

function createCategoryCard(categoriesContainer, image, category)
{

    let categoryCard = document.createElement('div');
    categoryCard.id = 'Category-Card';

    let cardImage = document.createElement('img');
    cardImage.id = 'Card-Image';
    cardImage.src = image;

    let cardTitle = document.createElement('h5');
    cardTitle.id = 'Card-Title';
    if(category === undefined)
        cardTitle.innerHTML = 'All';
    else
        cardTitle.innerHTML = category;

    categoryCard.appendChild(cardImage);
    categoryCard.appendChild(cardTitle);

    categoriesContainer.appendChild(categoryCard);

    let link = '';

    if(category === 'Painting')
        link = 'art_collectionA';
    else if(category === 'Sculpture')
        link = 'art_collectionB';
    else
        link = 'art_collection';

    categoryCard.addEventListener('click', function() {
        window.location.href = link;
    });

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function changePage(numero)
{
    let page = document.getElementById('page');
    page.innerHTML = numero;
}

window.onload = function() {
    getProducts(10);
    addCatCards();
    getProductsTotal();
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
    xhr.open('GET', 'http://localhost:3000/products/category', true);
    
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('value', 'Sculpture');
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

function getCategoriesImage(category)
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/products', true);
    
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    if(category !== undefined)
    {
        xhr.open('GET', 'http://localhost:3000/products/category', true);
        xhr.setRequestHeader('value', category);   
    }

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            let categoriesContainer = document.getElementById('Category-Container');
            let i = getRandomInt(response.length);
            createCategoryCard(categoriesContainer, response[i].image, category);

        } else {
            console.error('Request failed. Status:', xhr.status);
        }
    };

    xhr.onerror = function() {
        console.error('Request error');
    };

    xhr.send();
}

function addCatCards()
{
    getCategoriesImage('Painting');
    getCategoriesImage('Sculpture');
    getCategoriesImage();
    
}

function createPaginate(total)
{

    let paginate = document.getElementById('Paginado').firstElementChild;

    let pages = Math.ceil(total / 10);

    let ul = document.createElement('ul');

    for(let i = 1; i <= pages; i++)
    {
        let li = document.createElement('li');
        if(i === 1)
            li.className = 'current';

        let a = document.createElement('a');
        a.href = 'javascript:changePage(' + i  * 10 + ')';
        a.innerHTML = i;

        li.appendChild(a);
        ul.appendChild(li);

    }
    paginate.appendChild(ul);

}

function getProductsTotal()
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/products/category', true);
    
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('value', 'Scultpure');

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            createPaginate(response.length);
        } else {
            console.error('Request failed. Status:', xhr.status);
        }
    };

    xhr.onerror = function() {
        console.error('Request error');
    };

    xhr.send();
}