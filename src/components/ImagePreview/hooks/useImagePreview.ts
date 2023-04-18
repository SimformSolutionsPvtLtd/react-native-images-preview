import { useRef, useState } from 'react';
import type { Image } from 'react-native';
import type { ModalConfigType } from '../types';

const useImagePreview = () => {
  const [modalConfig, setModalConfig] = useState<ModalConfigType>({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
    visible: false,
  });
  const imageRef = useRef<Image>(null);

  const onPressImage = async () => {
    imageRef.current?.measure((_ox, _oy, width, height, px, py) => {
      setModalConfig({
        x: px,
        y: py,
        width: width,
        height: height,
        visible: true,
      });
    });
  };

  return {
    modalConfig,
    setModalConfig,
    onPressImage,
    imageRef,
  };
};

export default useImagePreview;
