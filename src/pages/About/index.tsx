import { Image, Text, View, ScrollView } from "react-native";
import useOrientation from "@hooks/useOrientation";
import { useTranslation } from "react-i18next";
import FadeView from "@components/animation/FadeView";
import ListLinks from "./ListLinks";

export default function AboutScreen() {
  const { t } = useTranslation();
  const { landscape } = useOrientation();

  return (
    <FadeView>
      {landscape ? (
        <View
          testID="about-screen"
          className="flex flex-col h-full flex-row"
        >
          <Image
            style={{
              resizeMode: "cover",
              height: "100%",
              width: "50%",
            }}
            source={require("../../images/finance.jpg")}
          />
          <ScrollView
            className="p-5"
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 40,
            }}
          >
            <Text className="my-2 text-black dark:text-white text-base">
              {t("about.intro1")}
            </Text>
            <Text className="my-2 text-black dark:text-white text-base">
              {t("about.intro2")}
            </Text>
            <Text className="my-2 text-black dark:text-white text-base">
              {t("about.intro3")}
            </Text>
            <ListLinks />
          </ScrollView>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
        >
          <View
            testID="about-screen"
            className="flex flex-col h-full"
          >
            <Image
              style={{
                resizeMode: "cover",
                height: 250,
                width: "100%",
              }}
              source={require("../../images/finance.jpg")}
            />
            <View className="p-5">
              <Text className="my-2 text-black dark:text-white text-base">
                {t("about.intro1")}
              </Text>
              <Text className="my-2 text-black dark:text-white text-base">
                {t("about.intro2")}
              </Text>
              <Text className="my-2 text-black dark:text-white text-base">
                {t("about.intro3")}
              </Text>
              <ListLinks />
            </View>
          </View>
        </ScrollView>
      )}
    </FadeView>
  );
}
