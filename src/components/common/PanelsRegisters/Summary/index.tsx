import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { PieChart } from "react-native-gifted-charts";
import { useColorScheme } from "nativewind";
import { useBalance } from "@hooks/useBalance";

export default function Summary({ testID } : any) {
  const { getTotal } = useBalance();
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();

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
    <View className="flex flex-col gap-2 flex-1 items-center">
      <View className="flex flex-row items-center">
        {renderDot(color)}
        <Text className="text-black dark:text-white">{label}</Text>
      </View>
      <Text className="text-black dark:text-white">{percentage}%</Text>
    </View>
  );

  const renderLegendComponent = () => (
    <View className="flex flex-row">
      {renderLegendItem('#f87171', t('common.expense'), getPercentage(pieData[0].value))}
      {renderLegendItem('#4ade80', t('common.entry'), getPercentage(pieData[1].value))}
      {renderLegendItem('#38bdf8', t('common.investment'), getPercentage(pieData[2].value))}
    </View>
  );

  return (
    <View className="flex-1" testID={testID}>
      <View className="m-5 p-5 bg-white dark:bg-zinc-800 rounded-lg shadow-lg">
        <Text className="text-black dark:text-white font-bold text-center text-xl">
          {t('common.summary')}
        </Text>
        <View className="p-4 items-center">
          <PieChart
            data={pieData}
            donut
            showGradient
            radius={90}
            innerRadius={60}
            innerCircleColor={colorScheme === "dark" ? "#27272a" : '#fff'}
            centerLabelComponent={() => (
              <View className="flex justify-center items-center">
                <Text className={`text-black dark:text-white font-bold text-[50px]`}>$</Text>
              </View>
            )}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  );
}
