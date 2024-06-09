import { useRef } from "react";
import { Switch, Text, View, Linking } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { useColorScheme } from "nativewind";
import useAuthentication from "@hooks/useAuthentication";
import { RootState } from "@store";
import { setModalInfo } from "@store/modalsSlice";
import { setIsProtected } from "@store/userSlice";
import utils from "@utils";
import Modal from "@components/common/Modal";
import { ModalHandle } from "@components/common/Modal/types";
import Button from "@components/common/Button";
import { useTranslation } from "react-i18next";

export default function ModalInfo(props: { testID?: string }) {
  const { t } = useTranslation();
  const { protection } = useAuthentication();
  const { colorScheme } = useColorScheme();
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
      "investment",
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
          {t("modalContent.liquid.text")}
        </Text>
        <View className="bg-yellow-100 dark:bg-zinc-800 p-4 rounded-xl">
          <Text className="text-sm dark:text-yellow-100">
            {t("modalContent.liquid.note1")}
          </Text>
          <Text className="text-sm dark:text-yellow-100">
            {t("modalContent.liquid.note2")}
          </Text>
        </View>
      </>
    ),
    patrimony: (
      <>
        <Text className="text-black dark:text-white text-base mb-4">
          {t("modalContent.patrimony.text")}
        </Text>
        <View className="bg-yellow-100 dark:bg-zinc-800 p-4 rounded-xl">
          <Text className="text-sm dark:text-yellow-100">
            {t("modalContent.patrimony.note")}
          </Text>
        </View>
      </>
    ),
    investment: (
      <>
        <Text className="text-black dark:text-white text-base mb-4">
          {t("modalContent.investment.text")}
        </Text>
        <View className="bg-yellow-100 dark:bg-zinc-800 p-4 rounded-xl">
          <Text className="text-sm dark:text-yellow-100">
            {t("modalContent.investment.note")}
          </Text>
        </View>
      </>
    ),
    entry: (
      <>
        <Text className="text-black dark:text-white text-base mb-4">
          {t("modalContent.entry.text")}
        </Text>
        <View className="bg-yellow-100 dark:bg-zinc-800 p-4 rounded-xl">
          <Text className="text-sm dark:text-yellow-100">
            {t("modalContent.entry.note")}
          </Text>
        </View>
      </>
    ),
    expense: (
      <>
        <Text className="text-black dark:text-white text-base mb-4">
          {t("modalContent.expense.text")}
        </Text>
        <View className="bg-yellow-100 dark:bg-zinc-800 p-4 rounded-xl">
          <Text className="text-sm dark:text-yellow-100">
            {t("modalContent.expense.note")}
          </Text>
        </View>
      </>
    ),
    vehicle: (
      <>
        <Text className="text-black dark:text-white text-base mb-4">
          {t("modalContent.vehicle.text")}
        </Text>
        <View className="bg-yellow-100 dark:bg-zinc-800 p-4 rounded-xl">
          <Text className="text-sm dark:text-yellow-100">
            {t("modalContent.vehicle.note")}
          </Text>
        </View>
      </>
    ),
    loginSupported: (
      <>
        <Text className="text-black dark:text-white text-base">
          {t("modalContent.protection.text")}
        </Text>
        <View className="flex flex-row items-center my-2 ml-2">
          <View className="flex items-center justify-center">
            <Switch
              accessibilityLabel="Payment"
              value={isProtected}
              onValueChange={handleProtected}
              trackColor={{ false: "rgb(220 38 38)", true: "rgb(34 197 94)" }}
              thumbColor="#f4f3f4"
              style={{ transform: [{ scale: 1.5 }] }}
            />
          </View>
          <Text className="ml-5 text-black dark:text-white text-base text-center">
            {t("modalContent.protection.switchLabel")}
          </Text>
        </View>
        <Button
          twClass="my-2 py-2 pr-4 mx-auto absolute right-2 bottom-0 rounded-full dark:bg-zinc-700"
          textColor="text-black dark:text-white ml-1"
          text={t("modalContent.protection.buttonText")}
          label={t("modalContent.protection.buttonLabel")}
          onPress={() => Linking.sendIntent("android.settings.SETTINGS")}
          icon={
            <MaterialIcons
              name="settings"
              size={30}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          }
        />
      </>
    ),
  };

  const modalIcons: any = {
    liquid: <MaterialIcons name="attach-money" size={30} color="#aaa" />,
    patrimony: <MaterialCommunityIcons name="gold" size={30} color="#aaa" />,
    investment: <MaterialIcons name="trending-up" size={30} color="#aaa" />,
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
        isProtected && modals?.modalInfo === "loginSupported"
          ? activeProtection()
          : modalRef.current?.closeModal()
      }
      header={{
        title:
          modals?.modalInfo === "loginSupported"
            ? t("modalInfo.header.protectionInformation")
            : t("modalInfo.header.value", {
                value: t(`common.${modals?.modalInfo}`),
              }),
        icon: renderModalIcon(modals?.modalInfo),
      }}
      cancelButton={{
        hidden: true,
      }}
      confirmButton={{
        text:
          modals?.modalInfo === "loginSupported"
            ? t("common.btn_save")
            : t("common.btn_understand"),
        label: t("modalInfo.confirmButton.label"),
        icon: <MaterialIcons name="check" size={28} color="white" />,
      }}
      optional={modals?.modalInfo === "loginSupported"}
    >
      <View className="mb-6 px-2 pt-4">
        {renderModalContent(modals?.modalInfo)}
      </View>
    </Modal>
  );
}
