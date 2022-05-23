import * as faceapi from 'face-api.js';


//to load all the models with the reference path
//the API will match the files name and load the models accordingly
export async function loadModels(
  setLoadingMessage,
  setLoadingMessageError
) {
  const MODEL_URL = process.env.PUBLIC_URL + '/models';

  try {
    setLoadingMessage('Loading Face Detector');
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);

    setLoadingMessage('Loading 68 Facial Landmark Detector');
    await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);

    setLoadingMessage('Loading Feature Extractor');
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
  } catch (err) {
    setLoadingMessageError(
      'Model loading failed. Please contact me about the bug:Attend-a-bot@gmail.com'
    );
  }
}

/*Input size:
    size at which image is processed,the smaller the faster,
  but less precise in detecting smaller faces,must be divisible
  by 32,common sizes are 128,160,224,320,416,512,608,
    for face tracking via webcam recommend using smaller sizes,e.g. 128,160,
    for detecting smaller faces use larger sizes,e.g. 512,608
    default input size:416 */

export async function getFullFaceDescription(blob, inputSize = 512) {
  // tiny_face_detector options
  //ssd_mobilenet_v1 options-->to detect face with threshold accuracy
  let scoreThreshold = 0.8; //can be set to 0.45
  const OPTION = new faceapi.SsdMobilenetv1Options({
    inputSize,
    scoreThreshold,
  });
  const useTinyModel = true;

  // fetch image to api
  let img = await faceapi.fetchImage(blob);

  // detect all faces and generate full description from image
  // including landmark and descriptor of each face
  let fullDesc = await faceapi
    .detectAllFaces(img, OPTION)
    .withFaceLandmarks(useTinyModel)
    .withFaceDescriptors();
  return fullDesc;
}

export async function createMatcher(faceProfile, maxDescriptorDistance) {
  // Create labeled descriptors of member from profile
  let labeledDescriptors = faceProfile.map(
    (profile) =>
      new faceapi.LabeledFaceDescriptors(
        profile.student._id,
        profile.facePhotos.map(
          (photo) => new Float32Array(photo.faceDescriptor.match(/-?\d+(?:\.\d+)?/g).map(Number))
        )  //parsing string to float32array
      )
  );

  // Create face matcher (maximum descriptor distance is 0.5)
  let faceMatcher = new faceapi.FaceMatcher(
    labeledDescriptors,
    maxDescriptorDistance
  );

  return faceMatcher;
}

//to check the parameters variable from api is defined or null
export function isFaceDetectionModelLoaded() {
  return !!faceapi.nets.ssdMobilenetv1.params;
}

export function isFeatureExtractionModelLoaded() {
  return !!faceapi.nets.faceRecognitionNet.params;
}

export function isFacialLandmarkDetectionModelLoaded() {
  return !!faceapi.nets.faceLandmark68TinyNet.params;
}