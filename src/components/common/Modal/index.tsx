import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Animated, Text, TouchableWithoutFeedback, View } from "react-native";
import useOrientation from "@hooks/useOrientation";
import useIsTablet from "@hooks/useIsTablet";
import Actions from "./Actions";
import { Props, ModalHandle } from "./types";

function Modal(props: Props, ref: React.Ref<ModalHandle>) {
  const isTablet = useIsTablet();
  const { landscape } = useOrientation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [shakeAnimation] = useState(new Animated.Value(0));
  const transformAnim = useRef(new Animated.Value(500)).current;
  const scaleAnim = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(transformAnim, {
        toValue: 500,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      props.closeAction();
    });
  };

  const startShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (props.isOpen) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(transformAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => {
      fadeAnim.setValue(0);
      transformAnim.setValue(500);
    };
  }, [props.isOpen, fadeAnim, transformAnim]);

  useImperativeHandle(ref, () => ({
    startShake() {
      startShakeAnimation();
    },
    closeModal() {
      closeModal();
    },
  }));

  if (props.type == "window") {
    return (
      <TouchableWithoutFeedback
        onPress={props.optional ? closeModal : () => startShakeAnimation()}
      >
        <Animated.View
          testID={props.testID ? props.testID : "fade-view"}
          className="p-4 bg-red-200 z-10 absolute bg-black/80 min-h-full min-w-full top-0 bottom-0 flex justify-center items-center"
          style={{ opacity: fadeAnim }}
          pointerEvents={props.isOpen ? "auto" : "none"}
        >
          <Animated.View
            className={`bg-white dark:bg-zinc-900 p-4 rounded-lg flex flex-col items-center ${
              landscape || isTablet ? "w-1/2" : ""
            }`}
            style={{
              transform: [{ scale: scaleAnim }, { translateY: shakeAnimation }],
            }}
            accessibilityViewIsModal
            aria-hidden={!props.isOpen}
          >
            {props.children}
            <Actions
              cancelButton={{ ...props.cancelButton }}
              cancelAction={props.cancelAction}
              confirmButton={{ ...props.confirmButton }}
              confirmAction={props.confirmAction}
              closeModal={closeModal}
            />
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={props.optional ? closeModal : () => startShakeAnimation()}
    >
      <Animated.View
        testID={props.testID}
        className="z-10 absolute bg-black/80 min-h-full min-w-full top-0 bottom-0 flex justify-end items-center"
        style={{ opacity: fadeAnim }}
        pointerEvents={props.isOpen ? "auto" : "none"}
      >
        <TouchableWithoutFeedback onPress={undefined}>
          <Animated.View
            className={`bg-white dark:bg-zinc-900 px-4 pt-3 pb-4 rounded-t-3xl max-h-screen ${
              landscape || isTablet ? "w-1/2" : "w-full"
            }`}
            accessibilityViewIsModal
            style={{
              transform: [
                { translateY: transformAnim },
                { translateY: shakeAnimation },
              ],
            }}
            pointerEvents={props.isOpen ? "auto" : "none"}
            aria-hidden={!props.isOpen}
          >
            {props.alertModal?.show && (
              <View
                className="flex flex-row items-center justify-center"
                pointerEvents="none"
              >
                <Animated.View
                  style={{
                    transform: [{ translateY: shakeAnimation }],
                  }}
                  className={`flex flex-row items-center bg-red-300 p-3 rounded-full m-4 absolute -top-[65]`}
                >
                  {props.alertModal?.icon}
                  <Text className="ml-2 font-base font-bold">
                    {props.alertModal?.text}
                  </Text>
                </Animated.View>
              </View>
            )}
            {props.header && (
              <View className="flex flex-row items-center justify-center border-b-2 pb-2 px-2 border-zinc-300 dark:border-zinc-500">
                <Text className="text-black dark:text-white text-center text-xl mr-2">
                  {props.header.title}
                </Text>
                {props.header.icon && (
                  <View className="ml-auto">{props.header.icon}</View>
                )}
              </View>
            )}
            {props.children}
            <Actions
              cancelButton={{ ...props.cancelButton }}
              cancelAction={props.cancelAction}
              confirmButton={{ ...props.confirmButton }}
              confirmAction={props.confirmAction}
              closeModal={closeModal}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

export default forwardRef(Modal);
