import { useState, useEffect, useCallback } from "react";
import {
  Orientation,
  getOrientationAsync,
  addOrientationChangeListener,
  removeOrientationChangeListener,
} from "expo-screen-orientation";

export default function useOrientation() {
  const [orientation, setOrientation] = useState<Orientation | null>(null);

  const handleOrientationChange = useCallback((event: any) => {
    setOrientation((prevOrientation) => {
      if (prevOrientation !== event.orientationInfo.orientation) {
        return event.orientationInfo.orientation;
      }
      return prevOrientation;
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    getOrientationAsync().then((value) => {
      if (isMounted) {
        setOrientation(value);
      }
    });

    const subscription = addOrientationChangeListener(handleOrientationChange);

    return () => {
      isMounted = false;
      removeOrientationChangeListener(subscription);
    };
  }, [handleOrientationChange]);

  return orientation;
}
