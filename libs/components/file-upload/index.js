import React from "react";
import { StyleSheet, View, Linking } from "react-native";
import { Button, Modal, Text, Icon } from "@ui-kitten/components";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import Alert from "../alert";

const compressImage = async (uri) => {
  const format = SaveFormat.JPEG;

  const result = await manipulateAsync(uri, [{ resize: { width: 1200 } }], {
    compress: 0.5,
    format,
    base64: true,
  });

  return { type: `image/${format}`, ...result };
};

//TODO HAVE A MAX FILE SIZE OF 5 MB FOR EACH FILE
export default function FileUpload({ onChange, multiple = false }) {
  const [operation, setOperation] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleCapture = async () => {
    try {
      setError(null);
      const access = await ImagePicker.getCameraPermissionsAsync();

      if (access.canAskAgain) {
        const userResponse = await ImagePicker.requestCameraPermissionsAsync();
        const userResponseToWrite =
          await ImagePicker.getMediaLibraryPermissionsAsync(true);
        console.log(userResponse.granted, userResponseToWrite.granted);
        if (userResponse.granted || userResponseToWrite.granted) {
          await handleCaptureGallery();
          setIsModalOpen(false);
          setOperation(null);
          return;
        } else {
          console.log("status", userResponseToWrite.status);
          setOperation({
            status: userResponseToWrite.status,
            permission: "file_access",
          });
          return;
        }
      }
      if (!access.granted) {
        setOperation({
          status: access.status,
          permission: "camera_access",
        });
        setIsModalOpen(false);
        setOperation(null);
        return;
      }
      if (access.granted) {
        await handleCaptureGallery();
        return;
      }
    } catch (error) {
      setError(error.message);
      setIsModalOpen(false);
    }
  };

  const handleCaptureGallery = async () => {
    const results = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      allowsMultipleSelection: multiple,
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    const fileName = results.uri.split("/").pop();
    const { base64, type } = await compressImage(results.uri);
    const data = [
      {
        file: `data:${type};base64,${base64}`,
        contentType: type,
        fileName,
      },
    ];
    if (!results.cancelled) onChange(data);
  };

  const handleonBackdropPress = () => {
    setOperation(null);
    setIsModalOpen(false);
    setError(null);
  };

  const pickFiles = async () => {
    const ALLOWED_MIME_TYPE = ["image/*", "application/pdf", "text/csv"];

    try {
      setError(null);
      const { size, uri, mimeType, type } =
        await DocumentPicker.getDocumentAsync({
          multiple,
          type: ALLOWED_MIME_TYPE,
          copyToCacheDirectory: true,
        });

      const fileSize = Math.round(size / 1024);

      if (fileSize >= 5096) {
        throw new Error("File too Big, please select a file less than 5mb");
      }

      if (!uri) {
        return;
      }
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      function getFilesArray() {
        const fileName = uri.split("/").pop();
        return [
          {
            file: `data:${mimeType};base64,${base64}`,
            contentType: mimeType,
            fileName,
          },
        ];
      }
      setIsModalOpen(false);

      if (type !== "cancel") onChange(getFilesArray());
    } catch (err) {
      setError(err.message);
      setIsModalOpen(false);
    }
  };

  const renderPrompts = (permission) => {
    switch (permission) {
      case "camera_access":
        return (
          <>
            <Text appearance={"hint"} style={styles.hint}>
              You have not set permissions to access {"\n"}your camera
            </Text>

            <Button
              style={styles.btn}
              onPress={async () => {
                setIsModalOpen(false);
                setOperation(null);
                await Linking.openSettings();
              }}
            >
              Turn on Camera Permissions
            </Button>
          </>
        );
      case "file_access":
        return (
          <>
            <Text appearance={"hint"} style={styles.hint}>
              You have not set permissions to access{"\n"}your files
            </Text>

            <Button
              style={styles.btn}
              onPress={async () => {
                setIsModalOpen(false);
                setOperation(null);
                await Linking.openSettings();
              }}
            >
              Turn on file Permissions
            </Button>
          </>
        );

      default:
        return (
          <>
            <Text appearance={"hint"} style={styles.hint}>
              Kindly select one of the following options:
            </Text>

            <View style={{ alignItems: "center" }}>
              <Button
                style={styles.btn}
                onPress={handleCapture}
                accessoryLeft={(props) => <Icon {...props} name="camera" />}
              >
                Camera
              </Button>
              <Button
                style={styles.btn}
                onPress={pickFiles}
                accessoryLeft={(props) => <Icon {...props} name="upload" />}
              >
                Upload
              </Button>
            </View>
          </>
        );
    }
  }

  return (
    <View>
      <Button
        style={styles.button}
        size="small"
        accessoryLeft={(props) => <Icon {...props} name="upload-outline" />}
        appearance="outline"
        onPress={() => setIsModalOpen(true)}
      >
        Upload
      </Button>

      <Alert
        isShown={error}
        variant="error"
        content={error}
        style={styles.alert}
      />

      {isModalOpen && (
        <Modal
          backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          visible={isModalOpen}
          onBackdropPress={handleonBackdropPress}
          style={{}}
        >
          <View style={styles.container}>
            <Text category={"h6"} style={{ textAlign: "center" }}>
              Upload File
            </Text>
            {renderPrompts(operation?.permission)}
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
  },
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
  hint: { marginTop: 30, marginBottom: 10, textAlign: "center" },
  btn: { borderRadius: 50, marginTop: 20, width: "60%" },
  alert: {
    marginTop: 10,
    padding: 10,
  },
});
