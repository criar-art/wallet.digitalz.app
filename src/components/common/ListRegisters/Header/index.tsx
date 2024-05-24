import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Props } from "./types";
import { setModalFilter, setModalInfo } from "@store/modalsSlice";
import { useAppDispatch } from "@store/hooks";

import TotalCategory from "../../TotalCategory";
import Button from "../../Button";
import useOrientation from "@hooks/useOrientation";

export default function Header(props: Props) {
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const { portrait } = useOrientation();

  return (
    !!portrait && (
      <View
        testID={props.testID}
        className="flex flex-col items-center justify-center"
      >
        <TotalCategory
          className="w-full"
          type={String(props.type)}
          onPress={() => dispatch(setModalInfo(props.type))}
        />
        <Button
          className="bg-gray-100 dark:bg-zinc-900 p-4 pr-8 mt-4 rounded-l-full absolute right-0"
          text="Filtro"
          label="Abrir modal de filtros"
          textColor="text-black dark:text-white"
          onPress={() => dispatch(setModalFilter(props.type))}
          icon={
            <MaterialIcons
              name="filter-list"
              size={26}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          }
        />
      </View>
    )
  );
}
