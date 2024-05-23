import { useRef } from "react";
import { Switch, Text, View, Linking } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import useAuthentication from "@hooks/useAuthentication";
import { RootState } from "@store";
import { setModalInfo } from "@store/modalsSlice";
import { setIsProtected } from "@store/userSlice";
import { types } from "@utils";
import Modal from "@components/Modal";
import { ModalHandle } from "@components/Modal/types";
import { Props } from "./types";

// @todo verificar porque não esta trazendo style
import Button from "../../components/Button";

export default function ModalInfo(props: Props) {
  const { protection } = useAuthentication();
  const dispatch = useAppDispatch();
  const modals = useAppSelector((state: RootState) => state.modalsState);
  const { isProtected } = useAppSelector((state: RootState) => state.userState);
  const modalRef = useRef<ModalHandle>(null);
  const isOpenModal = (): boolean =>
    [
      "liquid",
      "patrimony",
      "entry",
      "expense",
      "investiment",
      "loginSupported",
    ].includes(modals?.modalInfo);

  const handleProtected = (value: any) => {
    dispatch(setIsProtected(value));
  };

  const activeProtection = () => {
    protection();
    modalRef.current?.closeModal();
  };

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
    loginSupported: (
      <>
        <Text className="text-black dark:text-white text-base">
          Para melhor proteção, ative o bloqueio para manter suas informações
          privadas. Se você desativar, o acesso se tornará livre, sem nenhuma
          restrição ou segurança.
        </Text>
        <View className="flex flex-row items-center my-2 ml-2">
          <View className="flex items-center justify-center">
            <Switch
              accessibilityLabel="Pagamento"
              value={isProtected}
              onValueChange={handleProtected}
              trackColor={{ false: "rgb(220 38 38)", true: "rgb(34 197 94)" }}
              thumbColor="#f4f3f4"
              style={{ transform: [{ scale: 1.5 }] }}
            />
          </View>
          <Text className="ml-5 text-black dark:text-white text-base text-center">
            Proteção
          </Text>
        </View>
        <Button
          className="my-2 py-2 pr-4 mx-auto absolute right-2 bottom-0 rounded-full"
          textColor="text-black dark:text-white ml-1"
          text="Abrir configurações"
          label="Abrir configurações de bloqueio"
          onPress={() => Linking.sendIntent("android.settings.SETTINGS")}
          icon={<MaterialIcons name="settings" size={30} color="#000" />}
        />
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
    vehicle: <MaterialCommunityIcons name="car" size={30} color="#aaa" />,
    loginSupported: (
      <MaterialCommunityIcons
        name={isProtected ? "lock" : "lock-open"}
        size={30}
        color="#aaa"
      />
    ),
  };

  const renderModalIcon = (type: any) => modalIcons[type] || null;
  const renderModalContent = (type: string) => modalContent[type] || null;

  return (
    <Modal
      ref={modalRef}
      isOpen={isOpenModal()}
      testID={props.testID ? props.testID : "teste-modal"}
      closeAction={() => dispatch(setModalInfo(""))}
      confirmAction={() =>
        isProtected && modals?.modalInfo == "loginSupported"
          ? activeProtection()
          : modalRef.current?.closeModal()
      }
      header={{
        title:
          modals?.modalInfo == "loginSupported"
            ? "Informação de Proteção"
            : `Valor ${types[modals?.modalInfo]}`,
        icon: renderModalIcon(modals?.modalInfo),
      }}
      cancelButton={{
        hidden: true,
      }}
      confirmButton={{
        text: modals?.modalInfo == "loginSupported" ? "Salvar" : "Entendi",
        label: "Ok fechar o modal de informações",
        icon: <MaterialIcons name="check" size={28} color="white" />,
      }}
    >
      <View className="mb-6 px-2 pt-4">
        {renderModalContent(modals?.modalInfo)}
      </View>
    </Modal>
  );
}
