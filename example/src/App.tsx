import React from 'react';
import { Image, View } from 'react-native';
import { ImagePreview } from '../../src';
import { images } from './assets';
import { applicationStyle } from './theme';

const App = () => {
  return (
    <View style={applicationStyle.screen}>
      <ImagePreview>
        <Image source={images.forest} style={applicationStyle.imageStyle} />
      </ImagePreview>
    </View>
  );
};

export default App;
