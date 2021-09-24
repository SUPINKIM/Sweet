import {
  storageInstance,
  storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from '../Firebase/firebase';

const Storage = {
  uploadImages: function (file) {
    const result = uploadBytesResumable(
      storageRef(storageInstance, `images/${file.name}`),
      file
    )
      .then((res) => {
        return { response: res, success: true };
      })
      .catch((error) => {
        return {
          response: error,
          success: false,
          message: '이미지 업로드 실패',
        };
      });
    return result;
  },
  downloadImagesUrl: function (file) {
    const result = getDownloadURL(
      storageRef(storageInstance, `images/${file.name}`)
    )
      .then((url) => {
        return { response: url, success: true };
      })
      .catch((error) => {
        return {
          response: error,
          success: false,
          message: '이미지 URL 다운로드 실패',
        };
      });
    return result;
  },
};

export default Storage;
