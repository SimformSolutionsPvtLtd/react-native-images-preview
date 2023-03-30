import { StyleSheet } from 'react-native';

const imageModalStyle = (x: number, y: number) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
    },
    gestureContainer: {
      flex: 1,
    },
    imageStyle: {
      position: 'absolute',
      top: y,
      left: x,
    },
  });

export default imageModalStyle;
