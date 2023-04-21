import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../../theme';

const { horizontalScale, verticalScale, moderateScale, width } = Metrics;

const styles = StyleSheet.create({
  closeButton: {
    borderWidth: 2,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderColor: Colors.white,
    height: verticalScale(40),
    width: horizontalScale(80),
    marginTop: verticalScale(5),
    marginRight: horizontalScale(5),
    borderRadius: moderateScale(20),
    backgroundColor: Colors.black,
  },
  closeButtonParent: {
    width,
    zIndex: 1,
  },
  closeText: {
    fontSize: moderateScale(16),
    color: Colors.white,
  },
});

export default styles;
