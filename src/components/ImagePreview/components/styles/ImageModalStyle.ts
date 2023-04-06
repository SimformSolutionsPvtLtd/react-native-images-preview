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
    activityIndicatorStyle: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });

export default imageModalStyle;
