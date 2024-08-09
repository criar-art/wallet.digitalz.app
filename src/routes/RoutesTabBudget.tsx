import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useTranslation } from "react-i18next";
import TabBar from "@components/navigation/TabBar";
import utils from "@utils";
import Page from "@pages";
import { useBalance } from "@hooks/useBalance";
import useBudgetCalculations from '@hooks/useBudgetCalculations';
import useOrientation from "@hooks/useOrientation";
import { useAppDispatch } from "@store/hooks";
import { setMenuVisible } from "@store/commonSlice";
import { useEffect } from "react";

const Tab = createBottomTabNavigator();

export function RoutesTabBudget() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { getQuantity } = useBalance();
  const dispatch = useAppDispatch();
  const { orientation } = useOrientation();
  const getCountRegisters = (type: string) => getQuantity(type);
  const { budgetCount } = useBudgetCalculations();

  useEffect(() => {
    dispatch(setMenuVisible(true));
  }, [orientation]);

  function configRegisterScreen(name: string, title: string, icon: any) {
    return {
      name,
      title,
      tabBarLabel: title,
      tabBarIcon: icon,
      tabBarBadge: getCountRegisters(name.toLowerCase()),
      children: <Page.Register type={name.toLocaleLowerCase()} />,
    };
  }

  const viewsTab = [
    {
      name: "HomeBudget",
      title: "HomeBudget",
      tabBarBadge: budgetCount,
      tabBarLabel: t("routes.budget"),
      tabBarIcon: (props: any) => (
        <MaterialIcons name="layers" size={props.size} color={props.color} />
      ),
      children: <Page.Budget />,
    },
    {
      name: "Transaction",
      title: "Transaction",
      tabBarLabel: t("routes.transaction"),
      tabBarIcon: (props: any) => (
        <MaterialIcons name="money" size={props.size} color={props.color} />
      ),
      children: <Page.Transaction />,
    },
    configRegisterScreen("Investment", t("routes.investment"), (props: any) => (
      <MaterialIcons name="trending-up" size={props.size} color={props.color} />
    )),
  ];

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <TabBar {...props} type="budget" />}
    >
      {viewsTab.map((item: any) => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          options={{
            tabBarLabel: item.tabBarLabel,
            tabBarIcon: item.tabBarIcon,
            tabBarBadge: item.tabBarBadge,
            headerShown: item.headerShown,
            headerStyle: {
              backgroundColor: utils.renderColorType(
                item.name.toLocaleLowerCase(),
                colorScheme
              ),
              height: 5,
              elevation: 0,
              shadowOpacity: 0,
              borderWidth: 0,
            },
            headerTitleStyle: {
              fontSize: 0,
              display: "none",
            },
          }}
        >
          {() => item.children}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
}
