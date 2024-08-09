import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useTranslation } from "react-i18next";
import useOrientation from "@hooks/useOrientation";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { setEyeStatus } from "@store/commonSlice";
import { setModalInfo, setModalFilter } from "@store/modalsSlice";
import { RootState } from "@store";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import Button from "@components/common/Button";
import utils from "@utils";
import { Props } from "./types";

import {
  selectRegistersEntry,
  selectRegistersExpense,
  selectRegistersFilterEntry,
  selectRegistersFilterExpense,
  selectRegistersFilterInvestment,
  selectRegistersFilteredEntry,
  selectRegistersFilteredExpense,
  selectRegistersFilteredInvestment,
  selectRegistersInvestment,
} from "@store/commonSelects";
import BalanceTotal from "@components/common/BalanceTotal";
import useIsTablet from "@hooks/useIsTablet";

export default function AppDrawerHeader(props: Props) {
  const { t } = useTranslation();
  const { landscape } = useOrientation();
  const { colorScheme } = useColorScheme();
  const isTablet = useIsTablet();
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const { isLogin, isProtected } = useAppSelector((state: RootState) => state.userState);
  const toggleEye = () => dispatch(setEyeStatus(!common.eyeStatus));
  const indexRoute = useNavigationState((state) => state?.index);
  const stateRoute = useNavigationState((state) => state);
  const indexTab = useNavigationState(
    (state) => state?.routes[0]?.state?.index
  );
  const getRegistersFilterEntry = useAppSelector(selectRegistersFilterEntry);
  const getRegistersEntry = useAppSelector(selectRegistersEntry);
  const getRegistersFilteredEntry = useAppSelector(
    selectRegistersFilteredEntry
  );

  const getRegistersFilterExpense = useAppSelector(
    selectRegistersFilterExpense
  );
  const getRegistersExpense = useAppSelector(selectRegistersExpense);
  const getRegistersFilteredExpense = useAppSelector(
    selectRegistersFilteredExpense
  );

  const getRegistersFilterInvestment = useAppSelector(
    selectRegistersFilterInvestment
  );
  const getRegistersInvestment = useAppSelector(selectRegistersInvestment);
  const getRegistersFilteredInvestment = useAppSelector(
    selectRegistersFilteredInvestment
  );

  // Define a mapping of props.type to selectors
  const selectorMapping: any = {
    entry: {
      filter: getRegistersFilterEntry,
      registers: getRegistersEntry,
      filtered: getRegistersFilteredEntry,
    },
    expense: {
      filter: getRegistersFilterExpense,
      registers: getRegistersExpense,
      filtered: getRegistersFilteredExpense,
    },
    investment: {
      filter: getRegistersFilterInvestment,
      registers: getRegistersInvestment,
      filtered: getRegistersFilteredInvestment,
    },
  };

  // Select the appropriate selectors based on props.type
  const selectedSelectors = selectorMapping[String(utils.TypeCategory(indexTab))];

  // Use the selected selectors with useAppSelector
  const getRegistersFilter = selectedSelectors ? selectedSelectors.filter : {};
  const getRegisters = selectedSelectors ? selectedSelectors.registers : [];
  const getRegistersFiltered = selectedSelectors
    ? selectedSelectors.filtered
    : [];

  const isTypesTab = () =>
    ["expense", "entry", "investment"].includes(
      String(utils.TypeCategory(indexTab))
    );
  const navigation: any = useNavigation();
  const iconConfig = {
    size: 25,
    color: colorScheme === "dark" ? "white" : "black",
  };

  if (
    !stateRoute?.routeNames.includes("Root") &&
    indexRoute === 0 &&
    props.type == "right"
  ) {
    return;
  }

  if (
    stateRoute?.routeNames.includes("Budget") &&
    indexRoute === 1 &&
    props.type == "right"
  ) {
    return (
      <View className="flex flex-row items-center">
        <TouchableOpacity
        testID={props.testID}
        className="flex justify-center items-center mr-4 h-10 w-10"
        onPress={toggleEye}
        accessibilityLabel={
          common.eyeStatus ? t("drawerHeader.eyeStatusDisable") : t("drawerHeader.eyeStatusEnable")
        }
      >
        <Ionicons
          name={common.eyeStatus ? "eye" : "eye-off"}
          {...iconConfig}
        />
      </TouchableOpacity>
    </View>
    )
  }

  if (
    stateRoute?.routeNames.includes("Root") &&
    indexRoute === 0 &&
    props.type == "right"
  ) {
    return (
      <View className="flex flex-row items-center">
        {(landscape || isTablet) && (
          <View className="mt-1 flex flex-row">
            {
              <BalanceTotal
                drawer
                filter={getRegistersFilter}
                filtered={getRegistersFiltered}
                onPress={() =>
                  dispatch(setModalInfo(utils.TypeCategory(indexTab)))
                }
                type={String(utils.TypeCategory(indexTab))}
              />
            }
            {getRegisters.length > 1 && isTypesTab() && (
              <Button
                twClass="bg-transparent justify-end pr-4 rounded-none border-r-2 border-gray-100 dark:border-zinc-700 h-12"
                text="Filtro"
                label="Abrir modal de filtros"
                textColor="text-black dark:text-white"
                onPress={() =>
                  dispatch(setModalFilter(utils.TypeCategory(indexTab)))
                }
                icon={
                  <>
                    {utils.isObjectEmpty(getRegistersFilter) ? (
                      <MaterialIcons
                        name="filter-list"
                        size={30}
                        color={colorScheme === "dark" ? "white" : "black"}
                      />
                    ) : (
                      <Text className="scale-[1.2] text-xs bg-black dark:bg-white font-bold text-white dark:text-black px-2 py-1 rounded-full">
                        {utils.getFilledItemsCount(getRegistersFilter)}
                      </Text>
                    )}
                  </>
                }
              ></Button>
            )}
          </View>
        )}
        <TouchableOpacity
          testID={props.testID}
          className="flex justify-center items-center mr-4 h-10 w-10"
          onPress={toggleEye}
          accessibilityLabel={
            common.eyeStatus ? t("drawerHeader.eyeStatusDisable") : t("drawerHeader.eyeStatusEnable")
          }
        >
          <Ionicons
            name={common.eyeStatus ? "eye" : "eye-off"}
            {...iconConfig}
          />
        </TouchableOpacity>
      </View>
    );
  }

  if (props.type == "right") {
    return (
      <TouchableOpacity
        testID={props.testID}
        className="flex justify-center items-center mr-4 h-10 w-10"
        onPress={() =>
          (!isProtected || isLogin) ? navigation.goBack() : navigation.navigate("Login")
        }
        accessibilityLabel={t("drawerHeader.goBack")}
      >
        <MaterialIcons
          name={(!isProtected || isLogin) ? "close" : "lock"}
          {...iconConfig}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      testID={props.testID}
      className="flex justify-center items-center ml-4 h-10 w-10"
      onPress={props.onPress}
      accessibilityLabel={t("drawerHeader.openMenuNavigation")}
    >
      <MaterialIcons name="menu" {...iconConfig} />
    </TouchableOpacity>
  );
}
