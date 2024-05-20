import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import useOrientation from "../hooks/useOrientation";
import { RoutesTab } from "./RoutesTab";
import Page from "../pages";
import AppDrawer from "../components/Drawer";

const Drawer = createDrawerNavigator();

export const pages = [
  {
    name: "Root",
    title: "Wallet Digitalz",
    drawerLabel: "Início",
    drawerIcon: (props: any) => (
      <MaterialIcons name="home" size={props.size} color={props.color} />
    ),
    component: RoutesTab,
  },
  {
    name: "About",
    title: "Sobre",
    drawerLabel: "Sobre",
    drawerIcon: (props: any) => (
      <Entypo name="info" size={props.size} color={props.color} />
    ),
    component: Page.About,
  },
  {
    name: "Contact",
    title: "Contato",
    drawerLabel: "Contato",
    drawerIcon: (props: any) => (
      <MaterialIcons name="call" size={props.size} color={props.color} />
    ),
    component: Page.Contact,
  },
];

export default function Routes(props: any) {
  const { landscape } = useOrientation();
  const { colorScheme } = useColorScheme();

  const nameOfRoute = props.name?.toLowerCase();
  const typeCategory = ["entry", "expense", "investiment"].includes(nameOfRoute)
    ? nameOfRoute
    : "patrimony";

  return (
    <Drawer.Navigator
      initialRouteName="Root"
      drawerContent={(props: any) => <AppDrawer.Content {...props} />}
    >
      {pages.map(({ name, title, drawerIcon, drawerLabel, component }) => (
        <Drawer.Screen
          key={name}
          name={name}
          options={{
            title,
            drawerLabel,
            drawerIcon,
            drawerPosition: "left",
            overlayColor: "rgba(0,0,0,0.8)",
            headerTitleAlign: landscape ? "left" : "center",
            headerTitleStyle: {
              fontWeight: "bold",
              color: colorScheme === "dark" ? "white" : "black",
            },
            headerStyle: {
              height: 100,
              backgroundColor:
                colorScheme === "dark" ? "rgb(39 39 42)" : "white",
              elevation: 0,
              shadowOpacity: 0,
              borderWidth: 0,
            },
            headerLeft: () => <AppDrawer.Header onPress={props.toggleDrawer} />,
            headerRight: () => (
              <AppDrawer.Header
                type={!props.dashboard ? "header" : "back"}
                category={typeCategory}
                onPress={() => props.navigation.goBack()}
              />
            ),
          }}
          component={component}
        />
      ))}
    </Drawer.Navigator>
  );
}
