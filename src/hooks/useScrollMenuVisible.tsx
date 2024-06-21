import { useRef, useEffect, useState } from "react";
import { Animated } from "react-native";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { RootState } from "@store";
import { setMenuVisible as setStoreMenuVisible } from "@store/commonSlice";

const useScrollMenuVisible = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const dispatch = useAppDispatch();
  const commonState = useAppSelector((state: RootState) => state.commonState);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      if (value > lastScrollY.current) {
        // Scrolling down
        dispatch(setStoreMenuVisible(false));
      } else if (value < lastScrollY.current) {
        // Scrolling up
        dispatch(setStoreMenuVisible(true));
      }
      lastScrollY.current = value;
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [commonState.menuVisible, scrollY]);

  return { handleScroll };
};

export default useScrollMenuVisible;
