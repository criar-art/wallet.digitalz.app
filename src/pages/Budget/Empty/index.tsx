import { Dimensions, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "nativewind";
import useOrientation from "@hooks/useOrientation";
import { Props } from "./types";

export default function Empty({ testID }: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { landscape } = useOrientation();

  const windowHeight = Dimensions.get('window').height;
  const adjustedHeight = landscape ? windowHeight - 190 : windowHeight - 200;
  const iconColor = colorScheme === "dark" ? "white" : "black";
  const textColor = colorScheme === "dark" ? "text-white" : "text-black";

  return (
    <View
      testID={testID}
      style={{ height: adjustedHeight }}
      className="flex-1 flex flex-col items-center justify-center"
      accessible={true}
    >
      <MaterialCommunityIcons
        name="sticker-alert-outline"
        size={60}
        color={iconColor}
      />
      <Text className={`text-center text-xl p-5 ${textColor}`}>
        {t("common.empty_register")}
      </Text>
    </View>
  );
}
