const functions = require("firebase-functions");
const express=require("express");
const cors=require("cors");
const stripe=require("stripe")('sk_test_51ItcTYSIk8sIBBS9cHqQhsG2CeBzIR0luySEdLO7v0DxUKlzuAv8VRdLlVVtwPVcPRIVbv4zrD0gjaCl5ZMEqNhq001ojYoFqA');


//API


//App config
const app =express();

//midlewares
app.use(cors({origin:true}));
app.use(express.json());

//API routes
app.get('/',(request,response)=>{
    response.status(200).send('Confirm');
})

app.post("/payements/create",async (request,response)=>{
    const total=request.query.total;

    console.log('payment recieved',total);

    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,
        currency:"usd"
    });

    response.status(201)
    .send({
        clientSecret:paymentIntent.client_secret,
    })
})

//Listen command
exports.api=functions.https.onRequest(app);


//http://localhost:5001/clone-c688c/us-central1/api

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
