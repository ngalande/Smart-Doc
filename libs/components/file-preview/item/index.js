import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { MotiView } from "moti";
import { Button, Icon } from "@ui-kitten/components";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

function ItemPreview({ onDelete, showDelete, item, index, onPress }) {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        opacity: {
          type: "timing",
          duration: 500,
        },
      }}
      exit={{ opacity: 0 }}
      exitTransition={{
        opacity: {
          type: "timing",
          duration: 200,
        },
      }}
    >
      <View style={styles.itemContainer}>
        {showDelete && (
          <Button
            style={styles.cancelButton}
            appearance="ghost"
            accessoryLeft={(props) => (
              <Icon
                {...props}
                style={[props.style, styles.cancelButtonIcon]}
                fill="#C53030"
                name="close-circle-outline"
              />
            )}
            onPress={() => onDelete(index)}
          />
        )}

        {["image/png", "image/jpeg", "image/webp"].includes(
          item.contentType
        ) ? (
          <TouchableOpacity onPress={onPress}>
            <Image
              key={index}
              style={[styles.item, styles.image]}
              source={{ uri: item.file }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity key={index} style={[styles.item, styles.notImage]}>
            <FontAwesomeIcon icon={faFileAlt} size={80} />
          </TouchableOpacity>
        )}
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {},
  cancelButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
    margin: 8,
  },
  cancelButtonIcon: {
    position: "absolute",
    left: -16,
    bottom: -6,
  },
  item: {
    width: 125,
    height: 125,
    margin: 8,
    borderRadius: 8,
  },
  notImage: {
    borderColor: "#E2E8F0",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    backgroundColor: "#E2E8F0",
  },
});

export default ItemPreview;
