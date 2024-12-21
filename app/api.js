// axios , cors , express,

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/location',async(req,res)=>{
    const {latitude, longitude} = req.body;
    if (!latitude || !longitude) {
        res.status(400).send({error: "latitude and longitude are required"});

    }
    try{
        const response = await axios.get(`https://maps.googleapis.com/maps/apis/geocode/json?latlang=${latitude},${longitude}&key=${'apikey'}`)

        const address=response.data.results[0].formatted_address;

        res.send({address});
    }catch(error){
        console.log(error)
    }
})
app.listen(3000,()=>{
    console.log("listing")
})