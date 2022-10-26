const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 3ddbbe058f524cd9a5a03ce099f98064");

// use next two lines to check for Model_IDs in console//
//import Clarifai from 'clarifai';
//console.log(Clarifai);

const handleApiCall= (req, res) => {

    stub.PostModelOutputs(
        {
            model_id: "a403429f2ddf4b49b307e318f00e528b",
            inputs: [{data: {image: {url: req.body.input}}}]
        },
        metadata,
        (err, response) => {
            if (err) {
                console.log("Error: " + err);
                return;
            }
            if (response.status.code !== 10000) {
                console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                return;
            }
            return(res.json(response));           
        }
    );        
}

const handleImage = (req,res,db)=>{
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => res.json(entries[0].entries))
    .catch(err=> res.status(400).json('error getting entries: ', err));

}

module.exports = {
    handleImage : handleImage,
    handleApiCall
}