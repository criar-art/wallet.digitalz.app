import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import Button from "../Button";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store";
import { setModalDelete, setRegister } from "../../store/commonSlice";

import { Props } from "./types";
import { MaterialIcons } from "@expo/vector-icons";

export default function ModalDelete(props: Props) {
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    if (common.modalDelete) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      fadeAnim.setValue(0);
    };
  }, [common.modalDelete, fadeAnim]);

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      dispatch(setModalDelete(""));
    }, 500);
  };

  const confirmModal = () => {
    const filter = common.registers.filter(
      ({ id }) => id !== common.modalDelete
    );
    dispatch(setRegister(filter));
    dispatch(setModalDelete(""));
  };

  return (
    <Animated.View
      testID={props.testID ? props.testID : "fade-view"}
      className="p-4 bg-red-200 z-10 absolute bg-black/70 min-h-full min-w-full top-0 bottom-0 flex justify-center"
      style={{ opacity: fadeAnim }}
      pointerEvents={!common.modalDelete ? "none" : "auto"}
    >
      <Animated.View
        className="bg-white p-4 rounded-lg m-10"
        style={{ transform: [{ scale: scaleAnim }] }}
      >
        <Text className="text-center text-xl">Tem certeza que desejar excluir?</Text>
        <View className="flex flex-row mt-4">
          <Button
            className="text-white bg-red-600 flex-1 mr-2"
            label="Cancelar"
            text="Cancelar"
            onPress={() => closeModal()}
            icon={<MaterialIcons name="cancel" size={22} color="white" />}
          />
          <Button
            className="text-white bg-green-600 flex-1"
            label="Confirmar"
            text="Confirmar"
            onPress={() => confirmModal()}
            icon={<MaterialIcons name="check-circle" size={22} color="white" />}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
}
