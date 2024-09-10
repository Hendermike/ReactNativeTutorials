/* Import framework related utils */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
  /* Image picker component, from special library */
import * as ImagePicker from 'expo-image-picker';
  /* To use selecte image */
import {useState} from 'react';
/* Gesture handler import */
import { GestureHandlerRootView } from 'react-native-gesture-handler';

/* Import specific component implementation, located in components directory for reusability */
import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

/* Load our available image, located in assets directory */
const PlaceholderImage = require('./assets/images/background-image.png');

/* Async task for our app /root launch */
export default function App() {
  /* For emoji List purposes */
  const [pickedEmoji, setPickedEmoji] = useState(null);
  /* State for Modal management */
  const [isModalVisible, setIsModalVisible] = useState(false);
  /* Global variable to distinguish global app state changes based on user decisions.
      Becomes true when the user picks a selected image */
  const [showAppOptions, setShowAppOptions] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      //console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.')
    }

  };

  /* { bool ? ():() } */

  /* IconButton and CircelButton related onPress functions */
  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = () => {

  };

  return ( /* return our layout and components */
    
    <GestureHandlerRootView style={styles.container}> 
        <View style={styles.imageContainer}>
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>}
        </View>

        {showAppOptions ? (
          
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon='refresh' label='Reset' onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync} />
            </View>
          </View>
          
        ) : (
          <View style={styles.footerContainer}>
            <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
            <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
          </View>
        )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
  
}

/* Style related content object */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});
