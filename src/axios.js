
import axios from "axios";

//For deplyed Server
// const instance = axios.create({
//     baseURL:'https://us-central1-clone-c688c.cloudfunctions.net/api'
// });

//For development sever
const instance = axios.create({
    baseURL:'http://localhost:5001/clone-c688c/us-central1/api'
});

export default instance;


// local test url: http://localhost:5001/clone-c688c/us-central1/api
// For starting local backend:
// -cd to Functions
// -open terminal
// -type firebase emulators:start
//Backend has started.


//Function deployed url: https://us-central1-clone-c688c.cloudfunctions.net/api