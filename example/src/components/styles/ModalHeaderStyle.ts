import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

const { horizontalScale, moderateScale } = Metrics;

const styles = StyleSheet.create({
  closeIcon: {
    height: moderateScale(22),
    width: moderateScale(22),
    marginLeft: horizontalScale(10),
    tintColor: Colors.white,
  },
});

export default styles;
