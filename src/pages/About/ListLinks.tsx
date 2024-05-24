import { Linking } from "react-native";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import Button from "../../components/common/Button";

export default function ListLinks() {
  const { colorScheme } = useColorScheme();
  const iconConfig = {
    size: 28,
    color: colorScheme === "dark" ? "white" : "black",
  };

  const buttonData = [
    {
      text: "Política de Privacidade",
      label: "Acessar a Política de Privacidade",
      url: "https://walletdigitalz.web.app/privacy",
    },
    {
      text: "walletdigitalz.web.app",
      label: "Acessar site walletdigitalz.web.app",
      url: "https://walletdigitalz.web.app",
    },
    {
      text: "Criar.Art",
      label: "Acessar site criar.art",
      url: "https://criar.art/contact",
    },
  ];

  return (
    <>
      {buttonData.map((button, index) => (
        <Button
          key={index}
          text={button.text}
          label={button.label}
          textColor="text-lg text-black dark:text-white"
          onPress={() => Linking.openURL(button.url)}
          icon={<Fontisto name="world" {...iconConfig} />}
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
