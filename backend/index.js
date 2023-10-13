const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(cors());

let webhooksRoute = require('./routes/webhooks');
app.use('/webhooks', webhooksRoute);

app.use(morgan('dev'));
app.use(express.json());

app.use((req,res, next)=>{req.user=null; req.subscription=null; req.subscriptionPlan=null; next();}); // make sure these cannot be spoofed

let authRoute = require('./routes/auth');
app.use('/auth', authRoute);

let accountRoute = require('./routes/account');
app.use('/account', accountRoute);

let subscriptionPlansRoute = require('./routes/subscriptionPlan');
app.use('/subscription-plans', subscriptionPlansRoute);

let checkoutRoute = require('./routes/checkout');
app.use('/checkout', checkoutRoute);

let subscriptionRoute = require('./routes/subscription');
app.use('/subscription', subscriptionRoute);



module.exports = app;