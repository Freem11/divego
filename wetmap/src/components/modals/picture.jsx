import React from 'react'
import FlagIcon from "@mui/icons-material/Flag";
import "./picture.css";

function Picture(props) {
  const { pic } = props

  let photoName =  pic.photoFile.split('/').pop();

  return (
    <div key={pic.id} className="pictureBoxQ">
    <div className="micro">
    <h4 className="animalLabel">{pic.label}</h4>
      <a
        className="atag"
        href={`mailto:DiveGo2022@gmail.com?subject=Reporting%20issue%20with%20picture:%20"${pic.label}"%20${pic.photoFile}&body=Type%20of%20issue:%0D%0A%0D%0A%0D%0A%0D%0A1)%20Animal%20name%20not%20correct%0D%0A%0D%0A(Please%20provide%20correct%20animal%20name%20and%20we%20will%20correct%20the%20record)%0D%0A%0D%0A%0D%0A%0D%0A2)%20Copy%20write%20image%20claim%0D%0A%0D%0A(Please%20provide%20proof%20that%20you%20own%20the%20submitted%20photo%20and%20we%20will%20remove%20it%20as%20you%20have%20requested)`}
      >
        <FlagIcon sx={{ color: "red", marginBottom: "-28px" }} />
      </a>  
    </div>
  
            <img
              src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`}
              // src={`https://bca075819c975f1f381667bcdff15b92.r2.cloudflarestorage.com/scubaseasons/${photoName}`}
              // src={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${pic.photoFile}`}
              style={{
                width: "100%",
                margin: "3px",
                borderRadius: "20px",
                objectFit: "cover"
              }}
              />
    <h4 className="userLabel">Added by: {pic.userName}</h4>
  </div>
  )
}

export default Picture
