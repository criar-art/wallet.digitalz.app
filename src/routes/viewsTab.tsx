import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../views/HomeScreen";
import ExpenseScreen from "../views/ExpenseScreen";
import EntryScreen from "../views/EntryScreen";
import InvestimentScreen from "../views/InvestimentScreen";
import { renderColorType } from "../utils";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";
import AppTabBar from "../components/AppTabBar";

const Tab = createBottomTabNavigator();

export function HomeStack() {
  const common = useAppSelector((state: RootState) => state.commonState);
  const getCountRegisters = (type: string) => {
    return common.registers.filter((item: any) => item.type == type).length;
  };
  const viewsTab = [
    {
      name: "Home",
      title: "Geral",
      tabBarLabel: "Início",
      tabBarIcon: (props: any) => (
        <MaterialIcons name="home" size={props.size} color={props.color} />
      ),
      component: HomeScreen,
    },
    {
      name: "Expense",
      title: "Despesa",
      tabBarLabel: "Despesa",
      tabBarIcon: (props: any) => (
        <MaterialCommunityIcons
          name="cash-remove"
          size={props.size}
          color={props.color}
        />
      ),
      component: ExpenseScreen,
      tabBarBadge: getCountRegisters("expense"),
    },
    {
      name: "Entry",
      title: "Entrada",
      tabBarLabel: "Entrada",
      tabBarIcon: (props: any) => (
        <MaterialCommunityIcons
          name="cash-check"
          size={props.size}
          color={props.color}
        />
      ),
      component: EntryScreen,
      tabBarBadge: getCountRegisters("entry"),
    },
    {
      name: "Investiment",
      title: "Investimento",
      tabBarLabel: "Investimento",
      tabBarIcon: (props: any) => (
        <MaterialIcons
          name="attach-money"
          size={props.size}
          color={props.color}
        />
      ),
      component: InvestimentScreen,
      tabBarBadge: getCountRegisters("investiment"),
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <AppTabBar {...props} />}
    >
      {viewsTab.map(
        ({ name, title, tabBarIcon, tabBarLabel, tabBarBadge, component }) => (
          <Tab.Screen
            key={name}
            name={name}
            options={{
              title,
              tabBarLabel,
              tabBarIcon,
              tabBarActiveTintColor: "#333",
              tabBarActiveBackgroundColor: "#eee",
              tabBarItemStyle: { padding: 10 },
              tabBarLabelStyle: {
                fontSize: 12,
                color: "#000",
              },
              tabBarStyle: { height: 75 },
              tabBarBadge,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: renderColorType(name.toLocaleLowerCase()),
                height: 35,
              },
              headerTitleStyle: {
                fontSize: 15,
                fontWeight: "bold",
              },
            }}
            component={component}
          />
        )
      )}
    </Tab.Navigator>
  );
}
