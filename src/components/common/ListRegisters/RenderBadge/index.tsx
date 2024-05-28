import { memo } from "react";
import { Text, View } from "react-native";
import utils from "@utils";
import { Props } from "./types";

const RenderBadge = ({ type, date, isPaid, testID }: Props) => {
  let badgeText = "";
  let badgeColor = "";

  if (isPaid) {
    badgeText = "PAGO";
    badgeColor = "bg-green-500";
  } else if (utils.isDateToday(date)) {
    badgeText = type === "expense" ? "VENCE HOJE" : "DISPONÍVEL HOJE";
    badgeColor = type === "expense" ? "bg-red-500" : "bg-green-500";
  } else if (utils.isDateTomorrow(date)) {
    badgeText = type === "expense" ? "VENCE AMANHÃ" : "DISPONÍVEL AMANHÃ";
    badgeColor = type === "expense" ? "bg-red-500" : "bg-green-500";
  } else if (utils.isDatePast(date)) {
    badgeText = type === "expense" ? "VENCIDO" : "DISPONÍVEL";
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
