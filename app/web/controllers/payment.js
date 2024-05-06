document.addEventListener("DOMContentLoaded", async function() {
    const stripe = Stripe('');
    const elements = stripe.elements();
    
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');
    
    const form = document.getElementById('payment-form');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        form.querySelector('button').disabled = true;

        try {
            // Fetch clientSecret from the server
            const response = await fetch('http://localhost:3000/payment/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: /* The amount to charge, in cents or smallest currency unit */1000,
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch client secret');
            }

            const data = await response.json();

            // Confirm the payment intent with Stripe
            const { paymentIntent, error } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: 'Jenny Rosen',
                    },
                }
            });
        
            if (error) {
                console.error('Error:', error);
                // Show error message to the user
                // For example: displayErrorMessage(error.message);
            } else {
                console.log('Success:', paymentIntent);
                alert('Payment successful! Redirecting to home page...');
                window.location.href = 'http://localhost:3000/home';
                // Redirect to a success page or show success message to the user
                // For example: window.location.href = '/success';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Payment Error! Redirecting to home page...');
            window.location.href = 'http://localhost:3000/home';
            // Show generic error message to the user
            // For example: displayErrorMessage('An error occurred. Please try again later.');
        }
    });
});
