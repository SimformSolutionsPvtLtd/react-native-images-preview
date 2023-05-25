import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

const { verticalScale, moderateScale, horizontalScale } = Metrics;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: verticalScale(60),
    backgroundColor: Colors.blue700,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(5),
  },
  textStyle: {
    color: Colors.white,
    fontSize: moderateScale(18),
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;
