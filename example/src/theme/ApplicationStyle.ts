import { StyleSheet } from 'react-native';
import Colors from './Colors';
import Metrics from './Metrics';

const { verticalScale, moderateScale, horizontalScale } = Metrics;

const applicationStyle = StyleSheet.create({
  screen: {
    flex: 1,
  },
  imageStyle: {
    height: verticalScale(200),
    width: '100%',
  },
  text: {
    color: Colors.black,
    fontSize: moderateScale(18),
    marginVertical: verticalScale(10),
    textAlign: 'justify',
  },
  scrollViewStyle: {
    marginHorizontal: horizontalScale(10),
    backgroundColor: Colors.white,
  },
  horizontalView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  customImageStyle: {
    width: horizontalScale(170),
  },
});

export default applicationStyle;
