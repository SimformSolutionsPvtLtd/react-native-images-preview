import type React from 'react';
import type { Dispatch, SetStateAction } from 'react';

export type ModalConfigType = {
  x: number;
  y: number;
  visible: boolean;
};
export type ImagePreviewProps = {
  children: React.ReactElement;
  customHeader?: (close: () => void) => React.ReactElement;
};

export type ImageModalProps = ImagePreviewProps & {
  setModalConfig: Dispatch<SetStateAction<ModalConfigType>>;
  modalConfig: ModalConfigType;
};

export type HeaderProps = Pick<ImagePreviewProps, 'customHeader'> & {
  onPressClose: () => void;
};
