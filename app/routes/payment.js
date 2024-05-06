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
