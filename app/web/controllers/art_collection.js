function createProductCard(productsContainer)
{

    let productCard = document.createElement('div');
    productCard.id = 'Product-Card';
    productCard.addEventListener('click', function() {
        window.location.href = 'product';
    });

    let cardImage = document.createElement('img');
    cardImage.id = 'Card-Image';
    let imageNumber = getRandomInt(5) - 4;
    cardImage.src = '../web/images/image' + Math.floor(imageNumber) + '.png';
    let blockSize = getRandomInt(15);
    cardImage.style.blockSize = blockSize + 'em';

    let cardTitle = document.createElement('h5');
    cardTitle.id = 'Card-Title';
    cardTitle.innerHTML = 'Title';

    let cardDescription = document.createElement('p');
    cardDescription.id = 'Card-Description';
    cardDescription.innerHTML = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';

    productCard.appendChild(cardImage);
    productCard.appendChild(cardTitle);
    productCard.appendChild(cardDescription);

    productsContainer.appendChild(productCard);

}

function generateCards()
{
    let productsContainer = document.getElementById('Products-Container');
    for (let i = 0; i < 12; i++)
    {
        let productCard = createProductCard(productsContainer);
    }
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
    generateCards();
};