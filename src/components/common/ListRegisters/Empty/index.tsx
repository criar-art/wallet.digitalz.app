import { Dimensions, Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "nativewind";
import Button from "@components/common/Button";
import { useAppDispatch } from "@store/hooks";
import useOrientation from "@hooks/useOrientation";
import utils from "@utils";
import { Props } from "./types";

export default function Empty(props: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { landscape } = useOrientation();
  const dispatch = useAppDispatch();
  const { setResetFilter } = utils.getStateAndActions(props.type);

  return (
    <View
      testID={props.testID}
      style={{ height: landscape ? Dimensions.get('window').height - 180 : Dimensions.get('window').height - 270 }}
      className="flex-1 flex flex-col items-center justify-center"
    >
      {props.filtered ? (
        <MaterialIcons
          name="search-off"
          size={60}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      ) : (
        <MaterialCommunityIcons
          name="sticker-alert-outline"
          size={60}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      )}
      <View>
        <Text className="text-black dark:text-white text-center text-xl p-5">
          {props.filtered ? t("common.empty_filter") : t("common.empty_register")}
        </Text>
        {props.filtered && (
          <Button
            text={`${t("filter.btn_reset")} ${t("filter.btn")}`}
            label={t("filter.btn_reset_label")}
            twClass="mx-auto px-2 bg-red-600"
            textColor="text-white ml-2"
            onPress={() => setResetFilter && dispatch(setResetFilter())}
            icon={
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={30}
                color="white"
              />
            }
          />
        )}
      </View>
    </View>
  );
}
