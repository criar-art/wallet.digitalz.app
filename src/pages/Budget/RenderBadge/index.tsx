import { memo } from "react";
import { Text, View } from "react-native";
import { Props } from "./types";
import { useTranslation } from "react-i18next";

const RenderBadge = ({ type, testID }: Props) => {
  const { t } = useTranslation();

  let badgeText = type === "remaining" ? t("common.budgetExceeded") : t("common.withinBudget");
  let badgeColor = type === "remaining" ? "bg-red-500" : "bg-zinc-700 dark:bg-white";

  if(type === "complete") {
    badgeText = t("common.completeBudget");
    badgeColor = "bg-green-500" ;
  }


  return badgeText ? (
    <View
      testID={testID}
      className={`p-1 px-2 rounded-full absolute z-10 left-2 -top-3 ${badgeColor}`}
    >
      <Text className={`text-white text-center font-black text-xs uppercase ${type === "within" && "dark:text-black"}`}>
        {badgeText}
      </Text>
    </View>
  ) : null;
};

export default memo(RenderBadge);
