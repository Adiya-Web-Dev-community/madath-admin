import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./config"; // Adjust the path as per your Firebase configuration


const uploadImage = async (fileName: string, file: Blob, progressCallback: (progress: number) => void,
progressUrlCallback: (progress: string) => void
) => {
  const uniqueIdentifier = `image_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

  try {
    // Create a reference to the storage bucket
    const storageRef = ref(storage, `${fileName.replace(/\s+/g, '')}/${uniqueIdentifier} ${fileName}`);

    // Create a new upload task
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on("state_changed",
      (snapshot) => {
        // Get upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressCallback(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Error uploading image:", error);
        throw error; // Re-throw the error for handling in the caller function
      },
      async () => {
        // Handle successful uploads on complete
        console.log("Upload complete");

        try {
          // Get the download URL of the uploaded image
          const downloadURL = await  getDownloadURL(uploadTask.snapshot.ref);
          // You can return the downloadURL or use it as needed
          progressUrlCallback(downloadURL)
        } catch (error) {
          console.error("Error getting download URL:", error);
          throw error; // Re-throw the error for handling in the caller function
        }
      });

  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw the error for handling in the caller function
  }
};

export { uploadImage };