import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { PieChart } from "react-native-gifted-charts";
import { useColorScheme } from "nativewind";
import { useBalance } from "@hooks/useBalance";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import utils from "@utils";
import { useAppSelector } from "@store/hooks";
import { RootState } from "@store";
import useOrientation from "@hooks/useOrientation";

export default function Summary({ testID }: any) {
  const { t } = useTranslation();
  const { getTotal } = useBalance();
  const { colorScheme } = useColorScheme();
  const { landscape } = useOrientation();
  const common = useAppSelector((state: RootState) => state.commonState);

  const pieData = [
    { value: getTotal("expense"), color: "#f87171" },
    { value: getTotal("entry"), color: "#4ade80" },
    { value: getTotal("investment"), color: "#38bdf8" },
  ];

  const totalValue = pieData.reduce((acc, item) => acc + item.value, 0);
  const getPercentage = (value: number) => {
    if (totalValue === 0) return "0.00";
    const percentage = (value / totalValue) * 100;
    return percentage % 1 === 0 ? percentage.toString() : percentage.toFixed(2);
  };

  const renderDot = (color: string) => (
    <View
      style={{ backgroundColor: color }}
      className="w-3 h-3 rounded-full mr-2"
    />
  );

  const renderLegendItem = (
    color: string,
    label: string,
    percentage: string
  ) => (
    <View
      key={label}
      className={`flex gap-2 ${
        landscape ? "flex-row" : "flex-col"
      } items-center flex-1`}
    >
      <View className="flex flex-row items-center">
        {renderDot(color)}
        <Text className="text-black dark:text-white">{label}</Text>
      </View>
      <Text className="text-black dark:text-white text-lg font-bold">
        {percentage}%
      </Text>
    </View>
  );

  const renderTitle = () => (
    <Text className="text-black dark:text-white font-bold text-center text-xl">
      {t("common.summary")}
    </Text>
  );

  const renderLegendComponent = () => (
    <View className={`flex ${landscape ? "flex-col h-28" : "flex-row"}`}>
      {landscape && renderTitle()}
      {pieData.map((item, index) => {
        const percentage = getPercentage(item.value);
        if (percentage !== "0" && percentage !== "0.00") {
          return renderLegendItem(
            item.color,
            t(`common.${["expense", "entry", "investment"][index]}`),
            utils.parseMoney(percentage, common.eyeStatus)
          );
        }
        return null;
      })}
    </View>
  );

  return (
    <View className="flex-1 m-5" testID={testID}>
      <View
        className={`flex rounded-lg ${
          landscape
            ? "flex-row justify-center items-center mt-5"
            : "flex-col p-5 bg-white dark:bg-zinc-800 shadow-lg"
        }`}
      >
        <View className="flex">
          {!landscape && renderTitle()}
          <View className={`items-center ${landscape ? "mr-10" : "p-4"}`}>
            <PieChart
              data={pieData}
              donut
              showGradient
              radius={90}
              innerRadius={60}
              innerCircleColor={colorScheme === "dark" ? "#27272a" : "#fff"}
              centerLabelComponent={() => (
                <View className="flex justify-center items-center">
                  <MaterialCommunityIcons
                    name="fire"
                    size={90}
                    color={colorScheme === "dark" ? "#555" : "#eee"}
                  />
                </View>
              )}
            />
          </View>
        </View>
        {renderLegendComponent()}
        {!landscape && (
          <View className="flex flex-row w-full mt-4 rounded-lg overflow-hidden">
            {pieData.map((item, index) => (
              <View
                key={index}
                className="h-2"
                style={
                  {
                    backgroundColor: item.color,
                    width: `${getPercentage(item.value)}%`,
                  } as any
                }
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
