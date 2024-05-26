import { useEffect, useRef } from "react";
import { Animated, Easing, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { setEditRegister } from "@store/commonSlice";
import { setModalPay } from "@store/modalsSlice";
import { RootState } from "@store";
import Modal from "@components/common/Modal";
import { ModalHandle } from "@components/common/Modal/types";
import { Props } from "./types";

export default function ModalDelete(props: Props) {
  const modalRef = useRef<ModalHandle>(null);
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const modals = useAppSelector((state: RootState) => state.modalsState);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const isOpenModal = (): boolean => Boolean(modals.modalPay);
  const shakeInterpolate = shakeAnimation.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-5deg", "5deg"],
  });

  useEffect(() => {
    if (modals.modalPay) {
      Animated.spring(scaleAnimation, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      scaleAnimation.setValue(0);
    };
  }, [modals.modalPay, scaleAnimation]);

  const confirmModal = () => {
    dispatch(setEditRegister({ ...modals.modalPay, pay: true }));

    Animated.sequence([
      Animated.spring(scaleAnimation, {
        toValue: 1.3,
        friction: 5,
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
    ]).start(() => {
      modalRef.current?.closeModal();
    });
  };

  return (
    <Modal
      ref={modalRef}
      type="window"
      isOpen={isOpenModal()}
      testID={props.testID ? props.testID : "teste-modal"}
      closeAction={() => dispatch(setModalPay(""))}
      confirmAction={confirmModal}
      confirmButton={{
        text: "Confirmar",
        label: "Ok fechar o modal de pagamento",
        icon: <MaterialIcons name="check" size={28} color="white" />,
      }}
    >
      <Animated.View
        style={{
          transform: [{ rotate: shakeInterpolate }, { scale: scaleAnimation }],
        }}
      >
        <MaterialIcons
          name="paid"
          size={50}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      </Animated.View>
      <Text className="text-black dark:text-white text-center text-xl my-4">
        Tem certeza que desejar pagar?
      </Text>
    </Modal>
  );
}
