import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

interface Prediction {
  label: string;
  confidence: number;
}

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // result.assets is an array of ImagePicker.ImagePickerAsset
      const uri = result.assets[0].uri;
      setImage(uri);
      console.log("Picked image URI:", uri);
      sendToBackend(uri);

    }
  };

  const sendToBackend = async (uri: string) => {
    console.log("Sending to backend:", uri);
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any); // Cast as any to satisfy TS for FormData file objects

    try {
      const response = await axios.post<{ predictions: Prediction[] }>(
        'http://10.0.2.2:8000/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log("Predictions:", response.data.predictions);
      setPredictions(response.data.predictions);
    } catch (error: any) {
      console.error("Error details:", error);

      if (error.response) {
        console.error("Response error:", error.response.data);
        alert(`Server responded with status ${error.response.status}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response from backend.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }

  };

  return (
    <View style={styles.container}>
      <Button title="Pick an Image" onPress={pickImage} />
      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.predictionTitle}>Predictions:</Text>
          {predictions && predictions.length > 0 ? (
             predictions.map((p, i) => (
              <Text key={i}>
                {p.label}: {(p.confidence * 100).toFixed(2)}%
              </Text>
            ))
          ) : (
            <Text>No predictions received.</Text>
          )}

        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  image: { width: 200, height: 200, marginVertical: 20 },
  predictionTitle: { fontWeight: 'bold', marginTop: 10, marginBottom: 5 },
});
