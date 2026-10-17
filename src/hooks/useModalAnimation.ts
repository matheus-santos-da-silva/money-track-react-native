import { useRef, useEffect } from "react";
import { Animated, PanResponder, PanResponderInstance } from "react-native";

type ModalAnimationHook = {
  translateY: Animated.Value;
  panResponder: PanResponderInstance;
  handleOpen: () => void;
  handleClose: (onClosed?: () => void) => void;
};

export const useModalAnimation = (
  visible: boolean,
  onClose: () => void,
  sheetHeight: number
): ModalAnimationHook => {
  const translateY = useRef(new Animated.Value(sheetHeight)).current;

  const handleOpen = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = (onClosed?: () => void) => {
    Animated.timing(translateY, {
      toValue: sheetHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
      onClosed?.();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 5,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          translateY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 100) {
          handleClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [visible]);

  return {
    translateY,
    panResponder,
    handleOpen,
    handleClose,
  };
};
