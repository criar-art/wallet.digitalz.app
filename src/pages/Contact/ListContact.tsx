import { Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Fontisto } from "@expo/vector-icons";
import Button from "../../components/common/Button";
import { useTranslation } from "react-i18next";

export default function ListContact() {
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();

  const iconConfig = {
    size: 28,
    color: colorScheme === "dark" ? "white" : "black",
  };

  const buttonData = [
    {
      text: "criar.art",
      label: t("contact.site"),
      onPress: () => Linking.openURL("https://criar.art/contact"),
      icon: <Fontisto name="world" {...iconConfig} />,
    },
    {
      text: "criar.art.tecnologia",
      label: t("contact.instagram"),
      onPress: () =>
        Linking.openURL("http://instagram.com/criar.art.tecnologia"),
      icon: <Zocial name="instagram" {...iconConfig} />,
    },
    {
      text: "contato@criar.art",
      label: t("contact.email"),
      onPress: () =>
        Linking.openURL(
          "mailto:contato@criar.art?subject=Wallet Digitalz APP&body=Olá tudo bem?\nPreciso de ajuda com"
        ),
      icon: <MaterialIcons name="email" {...iconConfig} />,
    },
    {
      text: "+55 (83) 98210-7202",
      label: t("contact.whatsapp"),
      onPress: () =>
        Linking.openURL(
          "https://wa.me/5583982107202?text=Ol%C3%A1+tudo+bem%3F"
        ),
      icon: <Fontisto name="whatsapp" {...iconConfig} />,
    },
    {
      text: "@lucasferreiralimax",
      label: t("contact.linkedin"),
      onPress: () =>
        Linking.openURL("https://linkedin.com/in/lucasferreiralimax"),
      icon: <Zocial name="linkedin" {...iconConfig} />,
    },
  ];

  return (
    <>
      {buttonData.map((button, index) => (
        <Button
          key={index}
          {...button}
          textColor="text-lg text-black dark:text-white"
          twClass="justify-start mt-4 p-6 shadow-lg bg-white dark:bg-zinc-800"
        >
          <MaterialIcons
            name="navigate-next"
            {...iconConfig}
            style={{ marginLeft: "auto" }}
          />
        </Button>
      ))}
    </>
  );
}
