import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../../theme';

const { horizontalScale, verticalScale, moderateScale } = Metrics;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  closeButton: {
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: moderateScale(10),
    height: verticalScale(40),
    width: horizontalScale(80),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: horizontalScale(10),
    top: verticalScale(10),
    zIndex: 1,
  },
  closeButtonParent: {
    flex: 1,
    zIndex: 1,
  },
  imageStyle: {
    position: 'absolute',
  },
  closeText: {
    fontSize: moderateScale(16),
    color: Colors.white,
  },
});

export default styles;
