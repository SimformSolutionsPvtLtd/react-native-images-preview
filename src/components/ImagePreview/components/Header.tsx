import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { Strings } from '../../../constants';
import type { HeaderProps } from '../Types';
import { HeaderStyle as styles } from './styles';

const Header = ({
  renderHeader,
  onPressClose,
  headerOpacityAnimation,
}: HeaderProps) => {
  return (
    <Animated.View style={[styles.closeButtonParent, headerOpacityAnimation]}>
      {renderHeader ? (
        renderHeader(onPressClose)
      ) : (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            onPressClose();
          }}>
          <Text style={styles.closeText}>{Strings.close}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default Header;
