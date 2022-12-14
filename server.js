const express = require("express");
app = express();
const path = require("path");
cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: `./wetmap/.env.local` });

const { checkAdmin } = require("./routes/adminRoutes");
const { getDiveSites, addNewDiveSite } = require("./routes/diveSiteRoutes");
const {
  getDiveSiteWaits,
  addDiveSiteWaiter,
  getDiveSiteWaitById,
  delDiveSiteWait,
} = require("./routes/diveSiteWaitRoutes");
const {
  grabAnimals,
  grabAnimalsMobile,
  addNewPhoto,
  filterAnimals,
  getAnchorPhotos,
} = require("./routes/photoRoutes");
const {
  getPhotoWaits,
  addPhotoWaiter,
  getPhotoWaitById,
  delPhotoWait,
} = require("./routes/photoWaitRoutes");
const {
  uploadPhoto,
  viewUploadedPhotos,
  removeUploadedPhoto,
} = require("./routes/uploadRoutes");
const {
  getHeatPoints,
  getSingleHeatPoint,
  addNewHeatPoint,
  getHeatPointById,
  UpdateHeatPoint,
} = require("./routes/heatPointRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

port = process.env.PORT || 5000;

// app.use(express.static(path.join(__dirname, "/wetmap/index.html")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "wetmap/dist")));
}

app.listen(port, () => console.log("Backend server live on " + port));
//Admin Routes
app.use(checkAdmin);

//Upload Routes
app.use(uploadPhoto);
app.use(viewUploadedPhotos);
app.use(removeUploadedPhoto);

//DiveSite Routes
app.use(getDiveSites);
app.use(addNewDiveSite);

//DiveSiteWait Routes
app.use(getDiveSiteWaits);
app.use(addDiveSiteWaiter);
app.use(getDiveSiteWaitById);
app.use(delDiveSiteWait);

//Photo Routes
app.use(grabAnimals);
app.use(grabAnimalsMobile);
app.use(addNewPhoto);
app.use(filterAnimals);
app.use(getAnchorPhotos);

//PhotoWait Routes
app.use(getPhotoWaits);
app.use(addPhotoWaiter);
app.use(getPhotoWaitById);
app.use(delPhotoWait);

//HeatPoint Routes
app.use(getHeatPoints);
app.use(getSingleHeatPoint);
app.use(addNewHeatPoint);
app.use(getHeatPointById);
app.use(UpdateHeatPoint);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "wetmap/dist/index.html"));
});
