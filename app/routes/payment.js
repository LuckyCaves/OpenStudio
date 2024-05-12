const express = require('express');
const stripe = require('stripe')('');

const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
    try {
        // console.log(req.body);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd',
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/create-checkout-session', async (req, res) => {
    const { items, success_url, cancel_url } = req.body;

    try {
        const lineItems = await Promise.all(items.map(async (item) => {
        // Retrieve product details from Stripe using the product ID
        const product = await stripe.products.retrieve(item.id);

        return {
            price_data: {
            currency: product.metadata.currency,
            product_data: {
            name: product.name,
            },
            unit_amount: product.metadata.unit_amount, // Amount in cents
        },
        quantity: item.quantity,
        };
    }));

      // Create a new Checkout Session with the retrieved product details
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: success_url, // URL to redirect to after successful payment
        cancel_url: cancel_url, // URL to redirect to after payment cancellation
    });

      // Send the session ID in the response
    res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send({ error: 'An error occurred while creating the checkout session.' });
    }
});


  // Route for handling payment success
router.post('/payment-success', (req, res) => {
    // Handle successful payment
    res.send('Payment successful!');
});

  // Route for handling payment failure
router.post('/payment-failure', (req, res) => {
    // Handle payment failure
    res.send('Payment failed.');
});

module.exports = router;
