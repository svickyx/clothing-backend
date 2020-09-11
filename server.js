const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
//path is not in package.json, but its bundled in the node project, can build pathing for directories. 
// it allows to dynamically build when we call it from current directory to where we want to go

if (process.env.NODE_ENV !== 'production') require('dotenv').config();
//if process environment. node environment is not equal to production(we are in development or testing mode)
//it will load the dotenv into the process environment, and the process env have access to secret key

const stripe = require('stripe')(process.env.STRIPE_SECERT_KEY);
//because the above line, we have access to secert key

const app = express();
//express is a library that make it easier to build api server
const port = process.env.PORT || 5000;
//if there is a port value on process env, we use that port, otherwise use localhost 5000
app.use(bodyParser.json());
//any requests coming in need to process their body tag and convert it to json
app.use(bodyParser.urlencoded({extended: true}));
//urlencoded allows url string to get in and pass out without contain things like spaces/symbols

app.use(cors());
//cors: cross origin request, it allows to make request from port 3000 to 5000, just to make sure to make a proper request

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function(req,res){
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port' + port);
});


app.post('/payment', (req, res)=> {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };
    stripe.charges.create(body, (stripeErr, stripeRes)=> {
        if(stripeErr){
            res.status(500).send({error: stripeErr});
        }else {
            res.status(200).send({success: stripeRes});
        }
    })
})
//in client/stripe-button.js, there is a token props, which take all the information about the payments(credit card information)
//that allows stripe to know where this payment come from
//amount: the total charge amount we are going to make
//stripeErr, stripeRes is two possible response from stripe, which is payment failed or payment successed. 
//status(500) is failed

//the whole logic of the app.post is when we get a request from client side, we got the id and amount, and make a stripe charge,
//and according to the payment situation, we response stripeErr or stripeRes