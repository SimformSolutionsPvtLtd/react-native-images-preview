import React from 'react';
import { Text, View } from 'react-native';
import { CustomHeaderStyle as styles } from './styles';
import type { CustomHeaderType } from './Types';

const CustomHeader = ({ title }: CustomHeaderType) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};

export default CustomHeader;
