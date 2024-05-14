import { useEffect } from "react";
import { View } from "react-native";
import { useDrawerStatus } from "@react-navigation/drawer";

import PanelsRegisters from "../components/PanelsRegisters";

import { useAppDispatch } from "../store/hooks";
import { setIsDrawerStatus } from "../store/commonSlice";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const isDrawerOpen = useDrawerStatus();

  useEffect(() => {
    dispatch(setIsDrawerStatus(isDrawerOpen === 'closed'));
  }, [isDrawerOpen]);

  return (
    <View testID="home-screen" className="p-5 flex-1 justify-between flex-col">
      <PanelsRegisters />
    </View>
  );
}
