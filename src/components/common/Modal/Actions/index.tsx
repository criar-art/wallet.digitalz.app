import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@components/common/Button";
import { Props } from "./types";
import { useTranslation } from "react-i18next";

export default function Actions(props: Props) {
  const { t } = useTranslation();
  return (
    <View className="flex flex-row" testID={props.testID}>
      {!props.cancelButton?.hidden && (
        <Button
          twClass="flex-1 mr-2 p-3 bg-red-600"
          text={
            props.cancelButton?.text
              ? props.cancelButton?.text
              : t("common.btn_cancel")
          }
          label={
            props.cancelButton?.label
              ? props.cancelButton?.label
              : t("common.btn_cancel_label")
          }
          textColor="text-white"
          onPress={props.cancelAction ? props.cancelAction : props.closeModal}
          icon={
            props.cancelButton?.icon ? (
              props.cancelButton?.icon
            ) : (
              <MaterialIcons name="close" size={28} color="white" />
            )
          }
        />
      )}
      <Button
        text={props.confirmButton?.text}
        label={props.confirmButton?.label}
        twClass={`flex-1 p-3 bg-green-600 ${
          !props.cancelButton?.hidden ? "ml-2" : ""
        }`}
        textColor="text-white"
        onPress={props.confirmAction}
        icon={props.confirmButton?.icon}
      />
    </View>
  );
}
