import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { renderColorType } from "../utils";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";
import AppTabBar from "../components/AppTabBar";
import HomeScreen from "../views/HomeScreen";
import RegisterScreen from "../views/RegisterScreen";

const Tab = createBottomTabNavigator();

export function RoutesTab() {
  const common = useAppSelector((state: RootState) => state.commonState);
  const getCountRegisters = (type: string) => {
    return common.registers.filter((item: any) => item.type == type).length;
  };

  function configRegisterScreen(name: string, title: string, icon: any) {
    return {
      name,
      title,
      tabBarLabel: title,
      tabBarIcon: icon,
      tabBarBadge: getCountRegisters(name.toLowerCase()),
      children: <RegisterScreen type={name.toLocaleLowerCase()} />,
    };
  }

  const viewsTab = [
    {
      name: "Home",
      title: "Geral",
      headerShown: false,
      tabBarLabel: "Início",
      tabBarIcon: (props: any) => (
        <MaterialIcons name="home" size={props.size} color={props.color} />
      ),
      children: <HomeScreen />,
    },
    configRegisterScreen("Expense", "Despesa", (props: any) => (
      <MaterialCommunityIcons
        name="cash-remove"
        size={props.size}
        color={props.color}
      />
    )),
    configRegisterScreen("Entry", "Entrada", (props: any) => (
      <MaterialCommunityIcons
        name="cash-check"
        size={props.size}
        color={props.color}
      />
    )),
    configRegisterScreen("Investiment", "Investimento", (props: any) => (
      <MaterialIcons
        name="attach-money"
        size={props.size}
        color={props.color}
      />
    )),
  ];

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <AppTabBar {...props} />}
    >
      {viewsTab.map((item: any) => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.title,
            tabBarLabel: item.tabBarLabel,
            tabBarIcon: item.tabBarIcon,
            tabBarBadge: item.tabBarBadge,
            headerShown: item.headerShown,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: renderColorType(item.name.toLocaleLowerCase()),
              height: 35,
            },
            headerTitleStyle: {
              fontSize: 15,
              fontWeight: "bold",
            },
          }}
        >
          {() => item.children}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
}
