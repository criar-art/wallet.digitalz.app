import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store";
import { setModalInfo } from "../../store/commonSlice";
import Button from "../Button";
import { Props } from "./types";

export default function ModalInfo(props: Props) {
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transformAnim = useRef(new Animated.Value(500)).current;
  const isOpenModal = (): boolean =>
    ["liquid", "patrimony"].includes(common.modalInfo);

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
      dispatch(setModalInfo(""));
    });
  };

  useEffect(() => {
    if (common.modalInfo) {
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
  }, [common.modalInfo, fadeAnim, transformAnim]);

  return (
    <Animated.View
      testID={props.testID}
      className="z-10 absolute bg-black/80 min-h-full min-w-full top-0 bottom-0 flex justify-end"
      style={{ opacity: fadeAnim }}
      pointerEvents={isOpenModal() ? "auto" : "none"}
    >
      <Animated.View
        className="bg-white dark:bg-zinc-900 p-5 rounded-t-3xl"
        accessibilityViewIsModal
        style={{
          transform: [{ translateY: transformAnim }],
        }}
        pointerEvents={isOpenModal() ? "auto" : "none"}
        aria-hidden={!isOpenModal()}
      >
        <View className="flex flex-row items-center justify-center mb-4 border-b-2 pb-2 px-2 border-slate-300 dark:border-zinc-600">
          <Text className="text-black dark:text-white text-center text-xl mr-2">
            Valor {common.modalInfo === "liquid" ? "Líquido" : "Patrimônio"}
          </Text>
          <View className="ml-auto">
            {common.modalInfo === "patrimony" ? (
              <MaterialCommunityIcons name="gold" size={30} color="#aaa" />
            ) : (
              <MaterialIcons name="attach-money" size={30} color="#aaa" />
            )}
          </View>
        </View>

        <View className="mb-6 px-2 pt-0">
          {common.modalInfo === "liquid" ? (
            <>
              <Text className="text-black dark:text-white text-base mb-4">
                O cálculo do valor líquido é feito subtraindo o total das
                despesas do total das entradas de registros.
              </Text>
              <View className="bg-yellow-100 dark:bg-zinc-800 p-4 rounded-xl">
                <Text className="text-sm dark:text-yellow-100">
                  Investimentos não são diretamente considerados nesse cálculo.
                </Text>
                <Text className="text-sm dark:text-yellow-100">
                  São reservas de capital para futuros retornos, gerenciados
                  separadamente.
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text className="text-black dark:text-white text-base mb-4">
                O valor do patrimônio é a soma do valor líquido com o valor dos
                investimentos. Essencialmente, é a combinação do valor líquido e
                dos investimentos.
              </Text>
              <View className="bg-yellow-100 dark:bg-zinc-800 p-4 rounded-xl">
                <Text className="text-sm dark:text-yellow-100">
                  Esta medida proporciona uma visão abrangente do valor total
                  dos ativos e passivos da entidade.
                </Text>
              </View>
            </>
          )}
        </View>

        <View className="flex flex-row">
          <Button
            text="Entendi"
            label="Ok fechar o modal de informações"
            className="flex-1 mr-1 p-3 bg-green-600"
            textColor="text-white"
            onPress={() => closeModal()}
            icon={<MaterialIcons name="check" size={28} color="white" />}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
}
