import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Props } from "./types";
import { setModalFilter, setModalInfo } from "@store/modalsSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import TotalCategory from "../../TotalCategory";
import Button from "../../Button";
import useOrientation from "@hooks/useOrientation";
import { useSelector } from "react-redux";
import { selectRegistersType } from "@store/commonSlice";
import { RootState } from "@store";
import { getFilledItemsCount, isObjectEmpty } from "@utils";

export default function Header(props: Props) {
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const { portrait } = useOrientation();
  const getRegisters = useSelector(selectRegistersType(String(props.type)));
  const common = useAppSelector((state: RootState) => state.commonState);

  return (
    !!portrait && (
      <View
        testID={props.testID}
        className={`flex items-center justify-center ${
          isObjectEmpty(common.registerFilter) ? "flex-col" : "flex-row"
        }`}
      >
        {
          <TotalCategory
            twClass="w-full"
            type={String(props.type)}
            onPress={() => dispatch(setModalInfo(props.type))}
          />
        }
        {getRegisters.length > 1 && (
          <Button
            twClass="bg-gray-100 dark:bg-zinc-900 p-3 pr-4 mx-4 rounded-full absolute right-0"
            text="Filtro"
            label="Abrir modal de filtros"
            textColor="text-black dark:text-white ml-2"
            onPress={() => dispatch(setModalFilter(props.type))}
            icon={
              <>
                {isObjectEmpty(common.registerFilter) ? (
                  <MaterialIcons
                    name="filter-list"
                    size={30}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                ) : (
                  <Text className="scale-[1] text-xs bg-black dark:bg-white font-bold text-white dark:text-black px-2 py-1 rounded-full">
                    {getFilledItemsCount(common.registerFilter)}
                  </Text>
                )}
              </>
            }
          ></Button>
        )}
      </View>
    )
  );
}
