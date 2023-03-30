import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Strings } from '../../../constants';
import type { HeaderProps } from '../types';
import styles from './styles/HeaderStyle';

const Header = ({ customHeader, onPressClose }: HeaderProps) => {
  return (
    <View style={styles.closeButtonParent}>
      {customHeader ? (
        customHeader(onPressClose)
      ) : (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            onPressClose();
          }}>
          <Text style={styles.closeText}>{Strings.close}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
