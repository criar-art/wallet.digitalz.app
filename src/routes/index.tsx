import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import useOrientation from "@hooks/useOrientation";
import { useAppSelector } from "@store/hooks";
import { RootState } from "@store";
import { RoutesTab } from "./RoutesTab";
import Page from "@pages";
import AppDrawer from "@components/navigation/Drawer";
import { useTranslation } from "react-i18next";

const Drawer = createDrawerNavigator();

export default function Routes(props: any) {
  const { t } = useTranslation();
  const { landscape } = useOrientation();
  const { colorScheme } = useColorScheme();
  const { isLogin, isProtected } = useAppSelector(
    (state: RootState) => state.userState
  );

  const pages = [
    {
      name: "Root",
      title: "Wallet Digitalz",
      drawerLabel: t("routes.home"),
      drawerIcon: (props: any) => (
        <MaterialIcons name="home" size={props.size} color={props.color} />
      ),
      component: RoutesTab,
    },
    {
      name: "Login",
      title: t("routes.login"),
      drawerLabel: "Login",
      drawerIcon: (props: any) => (
        <MaterialIcons name="lock" size={props.size} color={props.color} />
      ),
      component: Page.Login,
    },
    {
      name: "About",
      title: t("routes.about"),
      drawerLabel: "Sobre",
      drawerIcon: (props: any) => (
        <Entypo name="info" size={props.size} color={props.color} />
      ),
      component: Page.About,
    },
    {
      name: "Contact",
      title: t("routes.contact"),
      drawerLabel: "Contato",
      drawerIcon: (props: any) => (
        <MaterialIcons name="call" size={props.size} color={props.color} />
      ),
      component: Page.Contact,
    },
  ];

  return (
    <Drawer.Navigator
      initialRouteName={isLogin ? "Root" : "Login"}
      drawerContent={(props: any) => <AppDrawer.Content {...props} />}
    >
      {pages.map(({ name, title, drawerIcon, drawerLabel, component }) => {
        if (
          !isLogin &&
          isProtected &&
          !["Login", "Contact", "About"].includes(name)
        ) {
          // Se a tela requer autenticação e o usuário não estiver logado, e não for a tela de login
          return null; // Não renderiza a tela
        }

        return (
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
              headerLeft: () => (
                <AppDrawer.Header onPress={props.toggleDrawer} />
              ),
              headerRight: () => <AppDrawer.Header type="right" />,
            }}
            component={component}
          />
        );
      })}
    </Drawer.Navigator>
  );
}
