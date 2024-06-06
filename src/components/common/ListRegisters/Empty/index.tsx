import { Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import Button from "@components/common/Button";
import { useAppDispatch } from "@store/hooks";
import utils from "@utils";
import { Props } from "./types";

export default function Empty(props: Props) {
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const { setResetFilter } = utils.getStateAndActions(props.type);

  return (
    <View
      testID={props.testID}
      className={`flex flex-col items-center min-h-full ${
        props.filtered ? "justify-center pt-10" : "justify-center"
      }`}
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
          {props.filtered
            ? "Nenhum resultado filtrado"
            : "Nenhum registro cadastrado."}
        </Text>
        {props.filtered && (
          <Button
            text="Limpar Filtro"
            label="Resetar o filtro aplicado"
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
