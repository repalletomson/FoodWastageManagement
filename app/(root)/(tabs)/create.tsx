import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ID } from 'appwrite';
import { databases, storage } from '../../../config/appwrite';

const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    location: '',
    startDate: '',
    expire: '',
    why: '',
    images: [] as string[],
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images','videos'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...result.assets.map((asset) => asset.uri)],
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Upload images first
      const imageIds = await Promise.all(
        formData.images.map(async (uri) => {
          try {
            const response = await fetch(uri);
            const blob = await response.blob();
            
            const file = await storage.createFile(
              '673a43640008d69d5db5', // Replace with your bucket ID
              ID.unique(),
              new File([blob], 'image.jpg', { type: blob.type })
            );
            
            return file.$id;
          } catch (error) {
            console.error('Image upload error:', error);
            return null;
          }
        })
      );

      // Filter out failed uploads
      const validImageIds = imageIds.filter(id => id !== null);

      // Create document in database
      await databases.createDocument(
        '673a3ef6003e0b0ad550', // Replace with your database ID
        '673a3f6d0034fd7b8c27',        // Your collection ID
        ID.unique(),
        {
          name: formData.name,
          phoneNo: parseInt(formData.phoneNo),
          location: formData.location,
          why: formData.why,
          startDate: new Date(formData.startDate).toISOString(),
          expire: new Date(formData.expire).toISOString(),
          images: validImageIds,
        }
      );

      setFormSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      Alert.alert(
        'Error',
        'Failed to complete submission. Please try again.'
      );
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {!formSubmitted ? (
        <>
          <Text style={styles.title}>Donate Food</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Full Name *"
              value={formData.name}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))}
            />

            <TextInput
              style={styles.input}
              placeholder="Phone Number *"
              keyboardType="phone-pad"
              value={formData.phoneNo}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, phoneNo: text }))}
            />

            <TextInput
              style={styles.input}
              placeholder="Location *"
              value={formData.location}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, location: text }))}
            />

            <TextInput
              style={styles.input}
              placeholder="Start Date (YYYY-MM-DD) *"
              value={formData.startDate}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, startDate: text }))}
            />

            <TextInput
              style={styles.input}
              placeholder="Expiry Date (YYYY-MM-DD) *"
              value={formData.expire}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, expire: text }))}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Why are you donating food? *"
              multiline
              numberOfLines={4}
              value={formData.why}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, why: text }))}
            />
          </View>

          <View style={styles.imageContainer}>
            {formData.images.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                style={styles.previewImage}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.addButton} onPress={pickImage}>
            <Text style={styles.addButtonText}>Add Image</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.thankYouContainer}>
          <Text style={styles.thankYouText}>
            "A kind gesture can reach a wound that only compassion can heal."
          </Text>
          <Text style={styles.thankYouSubText}>
            Thank you for your generous donation!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 96,
    textAlignVertical: 'top',
  },
  addButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#34D399',
    padding: 8,
    borderRadius: 8,
    marginTop: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 24,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  thankYouContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34D399',
    textAlign: 'center',
  },
  thankYouSubText: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});

export default Create;