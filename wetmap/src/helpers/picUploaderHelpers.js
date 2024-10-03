import { removePhoto } from "../cloudflareBucketCalls/cloudflareAWSCalls";

function getToday(DateVal) {
  let yearValue = DateVal.getFullYear().toString();
  let monthValue = (DateVal.getMonth() + 1).toString();
  let dayValue = DateVal.getDate().toString();

  if (dayValue.length == 1) {
    dayValue = "0" + dayValue;
  }

  if (monthValue.length == 1) {
    monthValue = "0" + monthValue;
  }

  let formattedDate = yearValue + "-" + monthValue + "-" + dayValue;

  return formattedDate;
}

function cleanupPinPicture(pin) {
  if (pin.PicFile !== null) {
    removePhoto({
      filePath: `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/`,
      fileName: `${pin.PicFile}`,
    });
  }
}

export { getToday, cleanupPinPicture };
