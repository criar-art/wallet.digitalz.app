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
  const common = useAppSelector((state: RootState) => state.commonState);
  const { getTotal } = useBalance();
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();
  const { landscape } = useOrientation();

  const pieData = [
    { value: getTotal("expense"), color: '#f87171' },
    { value: getTotal("entry"), color: '#4ade80' },
    { value: getTotal("investment"), color: '#38bdf8' },
  ];

  const totalValue = pieData.reduce((acc, item) => acc + item.value, 0);
  const getPercentage = (value: number) => (totalValue ? (value / totalValue) * 100 : 0).toFixed(2);

  const renderDot = (color: string) => (
    <View
      className="w-3 h-3 rounded-full mr-2"
      style={{ backgroundColor: color }}
    />
  );

  const renderLegendItem = (color: string, label: string, percentage: string) => (
    <View className={`flex gap-2 flex-1 items-center ${landscape ? "flex-row" : "flex-col"}`}>
      <View className="flex flex-row items-center">
        {renderDot(color)}
        <Text className="text-black dark:text-white">{label}</Text>
      </View>
      <Text className="text-black dark:text-white text-lg font-bold">{percentage}%</Text>
    </View>
  );

  const renderTitle = () => (
    <Text className="text-black dark:text-white font-bold text-center text-xl">
      {t('common.summary')}
    </Text>
  )

  const renderLegendComponent = () => (
    <View className={`flex ${landscape ? "flex-col h-28" : "flex-row"}`}>
      {landscape && renderTitle()}
      {renderLegendItem('#f87171', t('common.expense'), utils.parseMoney(getPercentage(pieData[0].value), common.eyeStatus))}
      {renderLegendItem('#4ade80', t('common.entry'), utils.parseMoney(getPercentage(pieData[1].value), common.eyeStatus))}
      {renderLegendItem('#38bdf8', t('common.investment'), utils.parseMoney(getPercentage(pieData[2].value), common.eyeStatus))}
    </View>
  );

  return (
    <View className="flex-1" testID={testID}>
      <View className={`flex m-5 rounded-lg ${landscape ? "flex-row justify-center items-center" : "flex-col p-5 bg-white dark:bg-zinc-800 shadow-lg"}`}>
        <View className="flex">
          {!landscape && renderTitle()}
          <View className={`items-center ${landscape ? "mr-10" : "p-4"}`}>
            <PieChart
              data={pieData}
              donut
              showGradient
              radius={90}
              innerRadius={60}
              innerCircleColor={colorScheme === "dark" ? "#27272a" : '#fff'}
              centerLabelComponent={() => (
                <View className="flex justify-center items-center">
                  <MaterialCommunityIcons
                    name="fire"
                    size={90}
                    color={colorScheme === "dark" ? "#fff" : "#eee"}
                  />
                </View>
              )}
            />
          </View>
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  );
}
