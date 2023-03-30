import type React from 'react';
import type { Dispatch, SetStateAction } from 'react';

export type ModalConfigType = {
  x: number;
  y: number;
  visible: boolean;
};

export type ImageModalProps = {
  children: React.ReactElement;
  setModalConfig: Dispatch<SetStateAction<ModalConfigType>>;
  modalConfig: ModalConfigType;
};

export type ImagePreviewProps = {
  children: React.ReactElement;
};
