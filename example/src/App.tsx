import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ImagePreview } from '../../src';
import { images } from './assets';
import { CustomHeader, ModalHeader } from './components';
import { imageData, Strings } from './constants';
import { applicationStyle } from './theme';

const {
  screen,
  scrollViewStyle,
  text,
  imageStyle,
  horizontalView,
  customImageStyle,
} = applicationStyle;

const App = () => {
  return (
    <SafeAreaView style={screen}>
      <CustomHeader title={Strings.home} />
      <ScrollView style={scrollViewStyle} showsVerticalScrollIndicator={false}>
        <Text style={text}>{Strings.dummyText}</Text>
        <ImagePreview imageSource={images.forest} imageStyle={imageStyle} />
        <Text style={text}>{Strings.dummyText}</Text>
        <ImagePreview
          imageSource={{
            uri: imageData.image1,
          }}
          imageStyle={imageStyle}
        />
        <Text style={text}>{Strings.dummyText}</Text>
        <View style={horizontalView}>
          <ImagePreview
            customHeader={onPressClose => (
              <ModalHeader onPress={onPressClose} />
            )}
            imageSource={{
              uri: imageData.image2,
            }}
            imageStyle={[imageStyle, customImageStyle]}
          />
          <ImagePreview
            imageSource={{
              uri: imageData.image3,
            }}
            imageStyle={[imageStyle, customImageStyle]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
