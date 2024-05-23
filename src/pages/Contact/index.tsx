import { Image, View, ScrollView } from "react-native";
import useOrientation from "@hooks/useOrientation";
import FadeView from "@components/animation/FadeView";
import ListContact from "./ListContact";

export default function ContactScreen() {
  const { landscape } = useOrientation();

  return (
    <FadeView>
      <View
        testID="contact-screen"
        className={`flex flex-col h-full ${landscape ? "flex-row" : ""}`}
      >
        <Image
          style={{
            resizeMode: "cover",
            height: landscape ? "100%" : 250,
            width: landscape ? "50%" : "100%",
          }}
          source={require("../../images/world.png")}
        />
        <ScrollView
          className={`px-5 ${landscape ? "" : ""}`}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
          }}
        >
          <ListContact />
        </ScrollView>
      </View>
    </FadeView>
  );
}
