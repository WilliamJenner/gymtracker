import React from "react";

interface IUseModal {
  visible: boolean;
  toggle: () => void;
  close: () => void;
}

const useModal = (initialState: boolean): IUseModal => {
  const [visible, setVisible] = React.useState<boolean>(initialState);

  const toggle = () => {
    setVisible(!visible);
  };

  const close = () => {
    setVisible(false);
  };

  return {
    visible,
    toggle,
    close,
  };
};

export default useModal;
