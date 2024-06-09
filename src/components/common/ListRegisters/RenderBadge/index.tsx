import { memo } from "react";
import { Text, View } from "react-native";
import utils from "@utils";
import { Props } from "./types";
import { useTranslation } from "react-i18next";

const RenderBadge = ({ type, date, isPaid, testID }: Props) => {
  const { t } = useTranslation();

  let badgeText = "";
  let badgeColor = "";

  if (isPaid) {
    badgeText = t("badge.paid");
    badgeColor = "bg-green-500";
  } else if (utils.isDateToday(date)) {
    badgeText =
      type === "expense" ? t("badge.due_today") : t("badge.available_today");
    badgeColor = type === "expense" ? "bg-red-500" : "bg-green-500";
  } else if (utils.isDateTomorrow(date)) {
    badgeText =
      type === "expense"
        ? t("badge.due_tomorrow")
        : t("badge.available_tomorrow");
    badgeColor = type === "expense" ? "bg-red-500" : "bg-green-500";
  } else if (utils.isDatePast(date)) {
    badgeText = type === "expense" ? t("badge.overdue") : t("badge.available");
    badgeColor = type === "expense" ? "bg-red-500" : "bg-green-500";
  }

  return badgeText ? (
    <View
      testID={testID}
      className={`p-1 px-2 rounded-full absolute z-10 left-2 -top-3 ${badgeColor}`}
    >
      <Text className="text-white text-center font-black text-xs">
        {badgeText}
      </Text>
    </View>
  ) : null;
};

export default memo(RenderBadge);
