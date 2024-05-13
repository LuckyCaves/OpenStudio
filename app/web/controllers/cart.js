document.addEventListener("DOMContentLoaded", function() {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    updateCartDisplay(cartItems);
});

function updateCartDisplay(cartItems) {
    const cartContainer = document.getElementById('cartItems');
    let total = 0;
    cartItems.forEach(item => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.title}" style="width: 50px; height: auto;"></td>
            <td>${item.title}</td>
            <td>${item.year}</td>
            <td>${item.dimensions}</td>
            <td>$${item.price}</td>
        `;
        cartContainer.appendChild(row);
        total += parseFloat(item.price);
    });
    document.getElementById('cartTotal').innerText = `$${total.toFixed(2)}`;
}