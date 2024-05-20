import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import useOrientation from "../hooks/useOrientation";
import { RoutesTab } from "./RoutesTab";
import AboutScreen from "../views/About/About";
import ContactScreen from "../views/Contact/Contact";
import AppDrawerContent from "../components/AppDrawerContent";
import AppDrawerHeader from "../components/AppDrawerHeader";

const Drawer = createDrawerNavigator();

export const views = [
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
    component: AboutScreen,
  },
  {
    name: "Contact",
    title: "Contato",
    drawerLabel: "Contato",
    drawerIcon: (props: any) => (
      <MaterialIcons name="call" size={props.size} color={props.color} />
    ),
    component: ContactScreen,
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
      drawerContent={(props: any) => <AppDrawerContent {...props} />}
    >
      {views.map(({ name, title, drawerIcon, drawerLabel, component }) => (
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
            headerLeft: () => <AppDrawerHeader onPress={props.toggleDrawer} />,
            headerRight: () => (
              <AppDrawerHeader
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
