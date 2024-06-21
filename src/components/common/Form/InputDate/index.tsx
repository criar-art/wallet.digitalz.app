import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Props } from "./types";
import { formatDate } from "@utils/date";

function InputDate(props: Props) {
  const { colorScheme } = useColorScheme();
  const [date, setDate] = useState<Date>(new Date());
  const [showDate, setShowDate] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDate(false);

    if (event.type == "set" && selectedDate) {
      setDate(selectedDate);
      props.onChangeDate(selectedDate);
    }
    if (event.type == "dismissed") {
      setDate(new Date());
      props.onChangeDate(null);
    }
  };

  return (
    <View testID={props.testID} className={`flex ${props.twClass}`}>
      <Text
        testID="input-date-label"
        className="text-black dark:text-white mb-1 text-base"
      >
        {props.label}
      </Text>
      <Pressable
        onPress={() => setShowDate(true)}
        className={`flex flex-row bg-white dark:bg-zinc-800 items-center p-3 pr-4 rounded-lg border-2 border-slate-600 dark:border-zinc-500 ${
          props.error ? "border-red-500" : ""
        }`}
        accessibilityLabel={props.accessibilityLabel}
        accessibilityRole="button"
        testID="input-date-pressable"
      >
        <MaterialIcons
          name="calendar-month"
          size={25}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text
          testID="input-date-value"
          className="text-base ml-2 text-black dark:text-white"
        >
          {props.value && formatDate(props.value)}
        </Text>
      </Pressable>
      {showDate && (
        <DateTimePicker
          testID="input-date-picker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          maximumDate={props.maximumDate}
          minimumDate={props.minimumDate}
        />
      )}
    </View>
  );
}

export default InputDate;
