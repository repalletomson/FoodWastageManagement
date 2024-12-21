import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';

const ImageUploadForm = () => {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    try {
      setUploading(true);

      // Convert image to blob
      const response = await fetch(image);
      const blob = await response.blob();

      // Create unique filename
      const filename = `upload_${Date.now()}.jpg`;
      const storageRef = ref(storage, `uploads/${filename}`);

      // Upload to Firebase
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      setUploadedUrl(url);

      // Verify upload
      const uploadsRef = ref(storage, 'uploads');
      const filesList = await listAll(uploadsRef);
      const fileExists = filesList.items.some(item => item.name === filename);

      if (fileExists) {
        Alert.alert('Success', 'Image uploaded and verified in Firebase storage!');
      } else {
        Alert.alert('Error', 'Upload verification failed');
      }

    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity 
            style={[styles.button, styles.uploadButton]} 
            onPress={uploadImage}
            disabled={uploading}
          >
            {uploading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Upload Image</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {uploadedUrl && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Uploaded Image URL:</Text>
          <Text style={styles.url}>{uploadedUrl}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButton: {
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  url: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default ImageUploadForm;
