import { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import useOrientation from "../../hooks/useOrientation";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setModalDelete, setRegister } from "../../store/commonSlice";
import { RootState } from "../../store";
import Button from "../Button";
import { Props } from "./types";

export default function ModalDelete(props: Props) {
  const orientation = useOrientation();
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0)).current;

  const startShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const shakeInterpolate = shakeAnimation.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-5deg", "5deg"],
  });

  useEffect(() => {
    if (common.modalDelete) {
      Animated.parallel([
        Animated.spring(scaleAnimation, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => {
      fadeAnim.setValue(0);
      scaleAnimation.setValue(0);
    };
  }, [common.modalDelete, fadeAnim]);

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Callback após a animação terminar
      dispatch(setModalDelete(""));
    });
  };

  const confirmModal = () => {
    const filter = common.registers.filter(
      ({ id }) => id !== common.modalDelete
    );
    dispatch(setRegister(filter));

    Animated.sequence([
      Animated.spring(scaleAnimation, {
        toValue: 1.5,
        friction: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnimation, {
        toValue: .8,
        friction: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnimation, {
        toValue: 1.8,
        friction: 50,
        useNativeDriver: true,
      }),
    ]).start(() => {
      closeModal();
    });
  };

  return (
    <Animated.View
      testID={props.testID ? props.testID : "fade-view"}
      className="p-4 bg-red-200 z-10 absolute bg-black/80 min-h-full min-w-full top-0 bottom-0 flex justify-center items-center"
      style={{ opacity: fadeAnim }}
      pointerEvents={!common.modalDelete ? "none" : "auto"}
    >
      <Animated.View
        className={`bg-white dark:bg-zinc-900 p-4 rounded-lg flex flex-col items-center ${
          orientation === 4 || orientation === 3 ? "w-1/2" : ""
        }`}
        style={{ transform: [{ scale: scaleAnim }] }}
        accessibilityViewIsModal
        aria-hidden={!common.modalDelete}
      >
        <Animated.View style={{ transform: [{ rotate: shakeInterpolate }, { scale: scaleAnimation }] }}>
          <MaterialCommunityIcons
            name="delete-alert"
            size={50}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </Animated.View>
        <Text className="text-black dark:text-white text-center text-xl my-4">
          Tem certeza que desejar deletar?
        </Text>
        <View className="flex flex-row mt-4">
          <Button
            className="text-white bg-red-600 flex-1 mr-2 p-3"
            label="Cancelar exclusão"
            text="Cancelar"
            onPress={closeModal}
            icon={<MaterialIcons name="cancel" size={28} color="white" />}
          />
          <Button
            className="text-white bg-green-600 flex-1 p-3"
            label="Confirmar exclusão"
            text="Confirmar"
            onPress={confirmModal}
            icon={<MaterialIcons name="check-circle" size={28} color="white" />}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
}
