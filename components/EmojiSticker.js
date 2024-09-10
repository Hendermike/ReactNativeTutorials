import {View, Image} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function EmojiSticker({ imageSize, stickerSource }) {
    /**
     *  Hooks for emoji's (X,Y) position. Argument 0 in useSharedValue hook inherits the initial position of the image to the initialized object.
     */
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const scaleImage = useSharedValue(imageSize); // Hook for animated emoji

    /** Double tap object for size change trigger */
    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if (scaleImage.value !== imageSize * 2) {
                scaleImage.value = scaleImage.value * 2;
            }
            });

    /** Drag object to update sticker position while moving it around */
    const drag = Gesture.Pan()
        .onChange((event) => {
            translateX.value += event.changeX; // This suggests that Pan() is asynchronously tracking incremental change in finger position through the screen.
            translateY.value += event.changeY;
        });
            
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                }
            ],
        };
    });

    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle, {top:-350}]}>
                <GestureDetector gesture={doubleTap}>
                    <Animated.Image
                    source={stickerSource}
                    resizeMode="contain"
                    style={[imageStyle, { width: imageSize, height: imageSize }]} 
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}