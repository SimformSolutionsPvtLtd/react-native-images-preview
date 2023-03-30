import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles/CustomHeaderStyle';
import type { CustomHeaderType } from './types';

const CustomHeader = ({ title }: CustomHeaderType) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};

export default CustomHeader;
