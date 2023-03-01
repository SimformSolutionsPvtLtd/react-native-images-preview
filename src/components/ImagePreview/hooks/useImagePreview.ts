import { useRef, useState } from 'react';
import type { View } from 'react-native';
import type { ModalConfigType } from '../types';

const useImagePreview = () => {
  const [modalConfig, setModalConfig] = useState<ModalConfigType>({
    x: 0,
    y: 0,
    visible: false,
  });
  const viewRef = useRef<View>(null);

  const onPressImage = async () => {
    viewRef.current?.measure((_ox, _oy, _width, _height, px, py) => {
      setModalConfig({
        x: px,
        y: py,
        visible: true,
      });
    });
  };

  return {
    modalConfig,
    setModalConfig,
    onPressImage,
    viewRef,
  };
};

export default useImagePreview;
