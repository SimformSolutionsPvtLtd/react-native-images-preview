import type React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type {
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';

export type ModalConfigType = {
  x: number;
  y: number;
  height: number;
  width: number;
  visible: boolean;
};

export type HeaderOpacityAnimationType = {
  opacity: number;
};

export type ImagePreviewProps = {
  imageSource: ImageSourcePropType;
  imageStyle: StyleProp<ImageStyle>;
  imageProps?: Omit<ImageProps, 'source' | 'defaultSource' | 'style'>;
  doubleTapZoomEnabled?: boolean;
  pinchZoomEnabled?: boolean;
  swipeDownCloseEnabled?: boolean;
  customHeader?: (close: () => void) => React.ReactElement;
};

export type ImageModalProps = Omit<
  ImagePreviewProps,
  'imageStyle' | 'imageProps'
> & {
  setModalConfig: Dispatch<SetStateAction<ModalConfigType>>;
  modalConfig: ModalConfigType;
};

export type HeaderProps = Pick<ImagePreviewProps, 'customHeader'> & {
  onPressClose: () => void;
  headerOpacityAnimation: HeaderOpacityAnimationType;
};
