import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ImagePreview } from '../../src';
import { images } from './assets';
import { CustomHeader, ModalHeader } from './components';
import { Strings } from './constants';
import { applicationStyle } from './theme';

const App = () => {
  return (
    <SafeAreaView style={applicationStyle.screen}>
      <View style={applicationStyle.container}>
        <CustomHeader title={Strings.home} />
        <ScrollView
          style={applicationStyle.scrollViewStyle}
          showsVerticalScrollIndicator={false}>
          <Text style={applicationStyle.text}>{Strings.dummyText}</Text>
          <ImagePreview
            imageSource={images.forest}
            imageStyle={applicationStyle.imageStyle}
          />
          <Text style={applicationStyle.text}>{Strings.dummyText}</Text>
          <ImagePreview
            imageSource={{
              uri: 'https://images.unsplash.com/photo-1490109875367-0dbd3c96fa1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
            }}
            imageStyle={applicationStyle.imageStyle}
          />
          <Text style={applicationStyle.text}>{Strings.dummyText}</Text>
          <View style={applicationStyle.horizontalView}>
            <ImagePreview
              customHeader={onPressClose => {
                return <ModalHeader onPress={onPressClose} />;
              }}
              imageSource={{
                uri: 'https://images.unsplash.com/photo-1591892234230-dc80bfe2ee31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=726&q=80',
              }}
              imageStyle={[
                applicationStyle.imageStyle,
                applicationStyle.customImageStyle,
              ]}
            />
            <ImagePreview
              imageSource={{
                uri: 'https://images.unsplash.com/photo-1523251343397-9225e4cb6319?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
              }}
              imageStyle={[
                applicationStyle.imageStyle,
                applicationStyle.customImageStyle,
              ]}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;
