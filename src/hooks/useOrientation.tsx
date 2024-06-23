import { useState, useEffect, useCallback } from "react";
import { Dimensions } from "react-native";
import {
  Orientation,
  getOrientationAsync,
  addOrientationChangeListener,
  removeOrientationChangeListener,
} from "expo-screen-orientation";

export default function useOrientation() {
  const { width, height } = Dimensions.get("window");
  const [orientation, setOrientation] = useState<Orientation | null>(null);
  const [landscape, setLandscape] = useState<boolean>(width > height);
  const [portrait, setPortrait] = useState<boolean>(width < height);

  const handleOrientationChange = useCallback((event: any) => {
    setOrientation((prevOrientation) => {
      if (prevOrientation !== event.orientationInfo.orientation) {
        return event.orientationInfo.orientation;
      }
      return prevOrientation;
    });

    setLandscape(
      event.orientationInfo.orientation === 4 ||
        event.orientationInfo.orientation === 3
    );
    setPortrait(
      event.orientationInfo.orientation === 1 ||
        event.orientationInfo.orientation === 2 ||
        event.orientationInfo.orientation === 0
    );
  }, []);

  useEffect(() => {
    let isMounted = true;

    getOrientationAsync().then((value) => {
      if (isMounted) {
        setOrientation(value);
        setLandscape(value === 4 || value === 3);
        setPortrait(value === 1 || value === 2 || value === 0);
      }
    });

    const subscription = addOrientationChangeListener(handleOrientationChange);

    return () => {
      isMounted = false;
      removeOrientationChangeListener(subscription);
    };
  }, [handleOrientationChange]);

  return { orientation, landscape, portrait };
}
