const stripe = Stripe('');

document.getElementById('checkout-button').addEventListener('click', function() {
    fetch('/payment/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: [{ id: 'prod_Q5grwNM6iJl5mY', quantity: 1 }],
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel'
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(items) {
        return stripe.redirectToCheckout(items);
    })
    .then(function(result) {
        if (result.error) {
            alert(result.error.message);
        }
    })
    .catch(function(error) {
        alert('Couldn\'t redirect to checkout. Please try again.');
        console.error('Error:', error);
    });
});
