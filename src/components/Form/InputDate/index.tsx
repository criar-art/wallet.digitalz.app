import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { formatDateString } from "@utils";
import { Props } from "./types";

function InputDate(props: any) {
  const { colorScheme } = useColorScheme();
  const [date, setDate] = useState<Date>(new Date());
  const [showDate, setShowDate] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setShowDate(false);
      setDate(date);
      props.onChangeDate(formatDateString(date), "date");
    }
  };

  return (
    <View className={`flex ${props.className}`}>
      <Text className="text-black dark:text-white mb-1 text-base">
        {props.label}
      </Text>
      <Pressable
        onPress={() => setShowDate(true)}
        className="flex flex-row bg-white dark:bg-zinc-800 items-center p-3 pr-4 rounded-lg border-2 border-slate-600 dark:border-zinc-500"
        accessibilityLabel={props.accessibilityLabel}
        accessibilityRole="button"
      >
        <MaterialIcons
          name="calendar-month"
          size={25}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text className="text-base ml-2 text-black dark:text-white">
          {props.value}
        </Text>
      </Pressable>
      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
}

export default InputDate;
