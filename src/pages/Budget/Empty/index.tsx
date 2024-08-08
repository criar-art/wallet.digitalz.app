import { Dimensions, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "nativewind";
import useOrientation from "@hooks/useOrientation";
import { Props } from "./types";

export default function Empty(props: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { landscape } = useOrientation();

  return (
    <View
      testID={props.testID}
      style={{ height: landscape ? Dimensions.get('window').height - 190 : Dimensions.get('window').height - 200 }}
      className="flex-1 flex flex-col items-center justify-center"
    >
      <MaterialCommunityIcons
        name="sticker-alert-outline"
        size={60}
        color={colorScheme === "dark" ? "white" : "black"}
      />
      <View>
        <Text className="text-black dark:text-white text-center text-xl p-5">
          {t("common.empty_register")}
        </Text>
      </View>
    </View>
  );
}
