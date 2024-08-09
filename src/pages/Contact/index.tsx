import { Image, View, ScrollView } from "react-native";
import useOrientation from "@hooks/useOrientation";
import FadeView from "@components/animation/FadeView";
import ListContact from "./ListContact";

export default function ContactScreen() {
  const { landscape } = useOrientation();

  return (
    <FadeView>
      {landscape ? (
        <View
          testID="contact-screen"
          className="flex h-full flex-row"
        >
          <Image
            style={{
              resizeMode: "cover",
              height: "100%",
              width: "50%",
            }}
            source={require("../../images/world.png")}
          />
          <ScrollView
            className="px-5"
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 20,
            }}
          >
            <ListContact />
          </ScrollView>
        </View>
      ) : (
        <View
          testID="contact-screen"
          className="flex flex-col h-full"
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 20,
            }}
          >
            <Image
              style={{
                resizeMode: "cover",
                height: 250,
                width: "100%",
              }}
              source={require("../../images/world.png")}
            />
            <View className="px-5">
              <ListContact />
            </View>
          </ScrollView>
        </View>
      )}
    </FadeView>
  );
}
