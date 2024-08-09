import { memo } from "react";
import { Text, View } from "react-native";
import { Props } from "./types";
import { useTranslation } from "react-i18next";

const RenderBadge = ({ type, testID }: Props) => {
  const { t } = useTranslation();

  const badgeStyles: Record<"remaining" | "within" | "complete", { text: string; color: string }> = {
    remaining: {
      text: t("common.budgetExceeded"),
      color: "bg-red-500",
    },
    within: {
      text: t("common.withinBudget"),
      color: "bg-zinc-700 dark:bg-white",
    },
    complete: {
      text: t("common.completeBudget"),
      color: "bg-green-500",
    },
  };

  const { text: badgeText, color: badgeColor } = badgeStyles[type];

  return badgeText ? (
    <View
      testID={testID}
      className={`p-1 px-2 rounded-full absolute z-10 left-2 -top-3 ${badgeColor}`}
    >
      <Text className={`text-white text-center font-black text-xs uppercase ${type === "within" ? "dark:text-black" : ""}`}>
        {badgeText}
      </Text>
    </View>
  ) : null;
};

export default memo(RenderBadge);
