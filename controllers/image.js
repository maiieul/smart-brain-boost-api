const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + "8959c572a85c44029813ea41c15f684f");

const promisifiedStub = (options, metadata) => {
  return new Promise((resolve, reject) => {
    stub.PostModelOutputs(options, metadata, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};
const handleApiCall = async (req, res) => {
  // This will be used by every Clarifai endpoint call
  try {
    const response = await promisifiedStub(
      {
        user_app_id: {
          user_id: "maieul",
          app_id: "portfolio-smart-brain-boost-api",
        },
        model_id: "face-detection",
        inputs: [
          {
            data: {
              image: {
                url: req.body.input,
                allow_duplicate_url: true,
              },
            },
          },
        ],
      },
      metadata
    );
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handleApiCall,
};
