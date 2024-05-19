import { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableWithoutFeedback, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import useOrientation from "../../hooks/useOrientation";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store";
import { setModalInfo } from "../../store/commonSlice";
import Button from "../Button";
import { Props } from "./types";
import { types } from "../../utils";

export default function ModalInfo(props: Props) {
  const orientation = useOrientation();
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [shakeAnimation] = useState(new Animated.Value(0));
  const transformAnim = useRef(new Animated.Value(500)).current;
  const isOpenModal = (): boolean =>
    ["liquid", "patrimony", "entry", "expense", "investiment"].includes(
      common.modalInfo
    );

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

  const modalContent: any = {
    liquid: (
      <>
        <Text className="text-black dark:text-white text-base mb-4">
          O cálculo do valor líquido é feito subtraindo o total das despesas do
          total das entradas de registros.
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
    ),
    patrimony: (
      <>
        <Text className="text-black dark:text-white text-base mb-4">
          O valor do patrimônio é a soma do valor líquido com o valor dos
          investimentos. Essencialmente, é a combinação do valor líquido e dos
          investimentos.
        </Text>
        <View className="bg-yellow-100 dark:bg-zinc-800 p-4 rounded-xl">
          <Text className="text-sm dark:text-yellow-100">
            Esta medida proporciona uma visão abrangente do valor total dos
            ativos e passivos da sua carteira.
          </Text>
        </View>
      </>
    ),
    investiment: (
      <>
        <Text className="text-black dark:text-white text-base mb-4">
          Investimentos são alocações de recursos com o objetivo de obter
          retornos futuros. Eles são parte importante do planejamento
          financeiro.
        </Text>
        <View className="bg-yellow-100 dark:bg-zinc-800 p-4 rounded-xl">
          <Text className="text-sm dark:text-yellow-100">
            Avaliar corretamente os investimentos é crucial para garantir a
            saúde financeira a longo prazo.
          </Text>
        </View>
      </>
    ),
    entry: (
      <>
        <Text className="text-black dark:text-white text-base mb-4">
          Entradas representam o total de receitas recebidas em determinado
          período, como vendas, juros recebidos e outros ganhos.
        </Text>
        <View className="bg-yellow-100 dark:bg-zinc-800 p-4 rounded-xl">
          <Text className="text-sm dark:text-yellow-100">
            Monitorar as entradas ajuda a entender a capacidade de geração de
            receita de suas finanças.
          </Text>
        </View>
      </>
    ),
    expense: (
      <>
        <Text className="text-black dark:text-white text-base mb-4">
          Despesas são os custos incorridos para operar e manter as atividades
          na sua carteira. Elas podem incluir salários, aluguel, e outras
          obrigações.
        </Text>
        <View className="bg-yellow-100 dark:bg-zinc-800 p-4 rounded-xl">
          <Text className="text-sm dark:text-yellow-100">
            Controlar as despesas é essencial para manter a saúde financeira e
            evitar déficits.
          </Text>
        </View>
      </>
    ),
    vehicle: (
      <>
        <Text className="text-black dark:text-white text-base mb-4">
          Veículos são ativos tangíveis que podem ser usados para operações ou
          como parte dos ativos da sua carteira. Eles podem incluir carros,
          caminhões e outros meios de transporte.
        </Text>
        <View className="bg-yellow-100 dark:bg-zinc-800 p-4 rounded-xl">
          <Text className="text-sm dark:text-yellow-100">
            A depreciação dos veículos deve ser considerada para refletir seu
            valor atual corretamente.
          </Text>
        </View>
      </>
    ),
  };

  const modalIcons: any = {
    liquid: <MaterialIcons name="attach-money" size={30} color="#aaa" />,
    patrimony: <MaterialCommunityIcons name="gold" size={30} color="#aaa" />,
    investiment: <MaterialIcons name="trending-up" size={30} color="#aaa" />,
    entry: <MaterialCommunityIcons name="cash-plus" size={30} color="#aaa" />,
    expense: (
      <MaterialCommunityIcons name="cash-remove" size={30} color="#aaa" />
    ),
    vehicle: <MaterialCommunityIcons name="car" size={30} color="#aaa" />, // Assumindo um ícone para veículo, ajuste conforme necessário
  };

  const renderModalIcon = (type: any) => modalIcons[type] || null;
  const renderModalContent = (type: string) => modalContent[type] || null;

  return (
    <TouchableWithoutFeedback onPress={() => startShakeAnimation()}>
      <Animated.View
        testID={props.testID}
        className="z-10 absolute bg-black/80 min-h-full min-w-full top-0 bottom-0 flex justify-end items-center"
        style={{ opacity: fadeAnim }}
        pointerEvents={isOpenModal() ? "auto" : "none"}
      >
        <TouchableWithoutFeedback onPress={undefined}>
          <Animated.View
            className={`bg-white dark:bg-zinc-900 p-5 rounded-t-3xl ${
              orientation === 4 || orientation === 3 ? "w-1/2" : "w-full"
            }`}
            accessibilityViewIsModal
            style={{
              transform: [
                { translateY: transformAnim },
                { translateY: shakeAnimation },
              ],
            }}
            pointerEvents={isOpenModal() ? "auto" : "none"}
            aria-hidden={!isOpenModal()}
          >
            <View className="flex flex-row items-center justify-center mb-4 border-b-2 pb-2 px-2 border-slate-300 dark:border-zinc-600">
              <Text className="text-black dark:text-white text-center text-xl mr-2">
                Valor {types[common.modalInfo]}
              </Text>
              <View className="ml-auto">
                {renderModalIcon(common.modalInfo)}
              </View>
            </View>

            <View className="mb-6 px-2 pt-0">
              {renderModalContent(common.modalInfo)}
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
        </TouchableWithoutFeedback>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
