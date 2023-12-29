import { useState, useEffect } from "react";
import { Form, Input, Label } from "reactstrap";
import { photoWaits } from "../../supabaseCalls/photoWaitSupabaseCalls";
import { insertphoto } from "../../supabaseCalls/photoSupabaseCalls";
import { removePhoto } from "../../supabaseCalls/uploadSupabaseCalls";
import {
  grabPhotoWaitById,
  deletePhotoWait,
} from "../../supabaseCalls/photoWaitSupabaseCalls";
import {
  getLoneHeatPoint,
  insertHeatPoint,
  updateHeatPoint,
} from "../../supabaseCalls/heatPointSupabaseCalls";
import { siteGPSBoundaries } from "../../helpers/mapHelpers";
import { scrapeMonthNumber } from "../../helpers/heatPointHelpers";
import Fab from "@mui/material/Fab";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./photoVetting.css";
import { Gallery, Item } from "react-photoswipe-gallery";

const PhotoListItem = (props) => {
  const { key, id, photoFile, animal, date, lat, lng, setPhotoWait } = props;

  let photoById;
  let heatPointExists;

  const ValidatePhoto = async (id) => {
    photoById = await grabPhotoWaitById(id);

    let monthID = scrapeMonthNumber(photoById[0].dateTaken);

    // let boundaries = siteGPSBoundaries(
    //   photoById[0].latitude,
    //   photoById[0].longitude
    // );

    insertHeatPoint({
      lat: photoById[0].latitude,
      lng: photoById[0].longitude,
      animal: photoById[0].label,
      month: monthID,
      UserID: photoById[0].UserID,
      userName: photoById[0].userName,
    });

    // heatPointExists = await getLoneHeatPoint({
    //   minLat: boundaries.minLat,
    //   maxLat: boundaries.maxLat,
    //   minLng: boundaries.minLng,
    //   maxLng: boundaries.maxLng,
    //   animal: photoById[0].label,
    //   month: monthID,
    // });

    // heatPointExists.length > 0
    //   ? updateHeatPoint({
    //       id: heatPointExists[0].id,
    //       weight: heatPointExists[0].weight,
    //     })
    //   : insertHeatPoint({
    //       lat: photoById[0].latitude,
    //       lng: photoById[0].longitude,
    //       animal: photoById[0].label,
    //       month: monthID,
    //     });

    photoById ? await insertphoto(photoById[0], monthID) : [];
    await deletePhotoWait(id);
    let photosToVett = await photoWaits();
    setPhotoWait(photosToVett);
  };

  const RejectPhoto = async (id) => {
    await removePhoto({ filePath: animal, fileName: photoFile });
    await deletePhotoWait(id);
    let photosToVett = await photoWaits();
    setPhotoWait(photosToVett);
  };

  const [formVals, setFormVals] = useState({
    id: id,
    key: id,
    photo: photoFile,
    animal: animal,
    date: date,
    lat: lat,
    lng: lng,
  });

  useEffect(() => {
    setFormVals({
      id: id,
      key: id,
      photo: photoFile,
      animal: animal,
      date: date,
      lat: lat,
      lng: lng,
    });
  }, [props]);

  const handleChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <li
      id={key}
      key={key}
      className="photoLI"
      style={{ listStyleType: "none" }}
    >
      <div id="photoContainer">
        <Form id="photoValidator">
          <div className="imageBox">
            <Gallery>
              <div>
                <Item
                  original={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${formVals.photo}`}
                  thumbnail={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${formVals.photo}`}
                  width="992"
                  height="558"
                  style={{ borderRadius: "10px" }}
                >
                  {({ ref, open }) => (
                    <img
                      style={{
                        width: "175px",
                        height: "100px",
                        marginLeft: "0%",
                        borderRadius: "10px 0px 0px 10px",
                        objectFit: "cover",
                      }}
                      ref={ref}
                      onClick={open}
                      src={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${formVals.photo}`}
                    />
                  )}
                </Item>
              </div>
            </Gallery>
          </div>
          <div className="infoBox">
            <div className="labelInputCombo">
              <Label className="labels">Animal: </Label>
              <Input
                id="inpt"
                onChange={handleChange}
                onBlur={handleSubmit}
                name="animal"
                type="text"
                value={formVals.animal}
                style={{ textAlign: "left" }}
              ></Input>
            </div>
            <div className="labelInputCombo">
              <Label className="labels">Date Taken: </Label>
              <Input
                id="inpt"
                onChange={handleChange}
                onBlur={handleSubmit}
                name="date"
                type="date"
                disabled={"disabled"}
                value={formVals.date && formVals.date.substring(0, 10)}
              ></Input>
            </div>
            <div className="labelInputCombo">
              <Label className="labels">Latitude: </Label>
              <Input
                id="inpt"
                onChange={handleChange}
                onBlur={handleSubmit}
                name="lat"
                type="number"
                disabled={"disabled"}
                value={formVals.lat}
              ></Input>
            </div>
            <div className="labelInputCombo">
              <Label className="labels">Longitude: </Label>
              <Input
                id="inpt"
                onChange={handleChange}
                onBlur={handleSubmit}
                name="lng"
                type="number"
                disabled={"disabled"}
                value={formVals.lng}
              ></Input>
            </div>
          </div>
          <div className="FABbox">
            <div className="FAB">
              <Fab color="primary" aria-label="add">
                <TaskAltIcon onClick={() => ValidatePhoto(id)} />
              </Fab>
            </div>
            <div className="FAB">
              <Fab color="secondary" aria-label="add">
                <HighlightOffIcon onClick={() => RejectPhoto(id)} />
              </Fab>
            </div>
          </div>
        </Form>
      </div>
    </li>
  );
};

export default PhotoListItem;
