export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    // utility function to convert image file to base64
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
