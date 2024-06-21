import { RootState } from "@store";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useRef, useEffect, useState } from "react";
import { Animated } from "react-native";
import { setMenuVisible as setStoreMenuVisible } from "@store/commonSlice";

const useScrollMenuVisible = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const common = useAppSelector((state: RootState) => state.commonState);
  const [menuVisible, setMenuVisible] = useState(common.menuVisible);
  const dispatch = useAppDispatch();

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      if (value > lastScrollY.current) {
        // Scrolling down
        setMenuVisible(false);
      } else if (value < lastScrollY.current) {
        // Scrolling up
        setMenuVisible(true);
      }

      lastScrollY.current = value;
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY]);

  useEffect(() => {
    dispatch(setStoreMenuVisible(menuVisible));
  }, [menuVisible]);

  return { menuVisible, handleScroll };
};

export default useScrollMenuVisible;
