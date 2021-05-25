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

// app.post("/payments/create",async (request,response) => {
//     const total=request.query.total;

//     console.log('payment recieved',total);

//     const paymentIntent=await stripe.paymentIntents.create({
//         // amount:total,
//         // currency:"usd",
//         // description: 'Software development services'

//         description: 'Software development services',
//         shipping: {
//         name: 'Jenny Rosen',
//         address: {
//             line1: '510 Townsend St',
//             postal_code: '98140',
//             city: 'San Francisco',
//             state: 'CA',
//             country: 'US',
//         },
//     },
//         amount: total,
//         currency: 'usd',
//         payment_method_types: ['card'],
//     });

//     response.status(201)
//     .send({
//         clientSecret:paymentIntent.client_secret,
//     })
// })


app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
  
    // console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
  
    const paymentIntent = await stripe.paymentIntents.create({
    //   amount: total, // subunits of the currency
    //   currency: "usd",

        description: 'Software development services',
        shipping: {
            name: 'Jenny Rosen',
            address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
            },
        },
        amount: total,
        currency: 'usd',
        payment_method_types: ['card'],
    

        
    });
  
    // OK - Created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
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
