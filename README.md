# Image-Processing-API

This project is relted to the Udacity Advanced full Stack nanodegree called Image Processing API.

The goal was to implement a server (express) where a given image is resized to the required width and height (using sharp), taking into consideration the test cases using unit testing and applying jasmine.

### Steps to get started:

#### 1- run `npm install`
#### 2- run `npm run build`
#### 3- run `npm run lint`
#### 4- run `npm run pretty`
#### 5- run `npm run test`
#### 6- run `npm run start`

### Endpoints to use:
http://localhost:3000/

### Example 1
http://localhost:3000/api/images?name=laptop&width=200&height=300

will return an error messgae as this image name is not provided.

### Example 2
http://localhost:3000/api/images?name=laptop&width=-200&height=300
#### OR
http://localhost:3000/api/images?name=palmtunnel&width=200&height=-300

will return an error messgae as this image width and height must be grater than 1.

### Example 3:
http://localhost:3000/api/images?name=fjord&width=200&height=300

will pass successfully and return the resized image as desired.
