import { useEffect, useRef } from "react";
import { Animated, Easing, Text } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useAppSelector, useAppDispatch } from "@store/hooks";
// import { setRegister } from "@store/commonSlice";
import { setModalDelete } from "@store/modalsSlice";
import { RootState } from "@store";
import Modal from "@components/common/Modal";
import { ModalHandle } from "@components/common/Modal/types";

import { setRegister as setRegisterExpense } from "@store/expenseSlice";
import { setRegister as setRegisterEntry } from "@store/entrySlice";
import { setRegister as setRegisterInvestment } from "@store/investmentSlice";
import { selectRegistersType } from "@store/commonSelects";
import { useSelector } from "react-redux";

export default function ModalDelete(props: { testID?: string }) {
  const modalRef = useRef<ModalHandle>(null);
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const expenseRegisters = useAppSelector(
    (state: RootState) => state.expenseState
  );
  const entryRegisters = useAppSelector((state: RootState) => state.entryState);
  const investmentRegisters = useAppSelector(
    (state: RootState) => state.investmentState
  );
  const modals = useAppSelector((state: RootState) => state.modalsState);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const isOpenModal = (): boolean => Boolean(modals.modalDelete);
  const shakeInterpolate = shakeAnimation.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-5deg", "5deg"],
  });

  useEffect(() => {
    if (modals.modalDelete) {
      Animated.spring(scaleAnimation, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      scaleAnimation.setValue(0);
    };
  }, [modals.modalDelete, scaleAnimation]);

  const confirmModal = () => {
    console.log("modals.modalDelete?.type: ", modals.modalDelete?.type);

    switch (modals.modalDelete?.type) {
      case "expense":
        dispatch(
          setRegisterExpense(
            expenseRegisters.registers.filter(
              ({ id }) => id !== modals.modalDelete?.id
            ) as any
          )
        );
        break;
      case "entry":
        dispatch(
          setRegisterEntry(
            entryRegisters.registers.filter(
              ({ id }) => id !== modals.modalDelete?.id
            ) as any
          )
        );
        break;
      case "investment":
        dispatch(
          setRegisterInvestment(
            investmentRegisters.registers.filter(
              ({ id }) => id !== modals.modalDelete?.id
            ) as any
          )
        );
        break;
    }

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
      closeAction={() => dispatch(setModalDelete(""))}
      confirmAction={confirmModal}
      confirmButton={{
        text: "Confirmar",
        label: "Ok fechar o modal de deletar",
        icon: <MaterialIcons name="check" size={28} color="white" />,
      }}
    >
      <Animated.View
        style={{
          transform: [{ rotate: shakeInterpolate }, { scale: scaleAnimation }],
        }}
      >
        <MaterialCommunityIcons
          name="delete-alert"
          size={50}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      </Animated.View>
      <Text className="text-black dark:text-white text-center text-xl my-4">
        Tem certeza que deseja deletar?
      </Text>
    </Modal>
  );
}
