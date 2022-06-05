import React, { PropsWithChildren } from "react";
import { Modal } from "react-native";

interface IModalContainer {
  visible: boolean;
  onRequestClose: () => void;
}

interface IModalContainerProps extends PropsWithChildren<IModalContainer> {}

const ModalContainer = ({
  visible,
  onRequestClose,
  children,
}: IModalContainerProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      {children && children}
    </Modal>
  );
};

export default ModalContainer;
