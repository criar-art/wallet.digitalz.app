import { useState, useEffect, useCallback } from "react";
import {
  Orientation,
  getOrientationAsync,
  addOrientationChangeListener,
  removeOrientationChangeListener,
} from "expo-screen-orientation";

export default function useOrientation() {
  const [orientation, setOrientation] = useState<Orientation | null>(null);
  const [landscape, setLandscape] = useState<boolean>(false);
  const [portrait, setPortrait] = useState<boolean>(false);

  const handleOrientationChange = useCallback((event: any) => {
    setOrientation((prevOrientation) => {
      if (prevOrientation !== event.orientationInfo.orientation) {
        return event.orientationInfo.orientation;
      }
      return prevOrientation;
    });

    setLandscape(event.orientationInfo.orientation === 4 || event.orientationInfo.orientation === 3);
    setPortrait(event.orientationInfo.orientation === 1 || event.orientationInfo.orientation === 2);
  }, []);

  useEffect(() => {
    let isMounted = true;

    getOrientationAsync().then((value) => {
      if (isMounted) {
        setOrientation(value);
        setLandscape(value === 4 || value === 3);
        setPortrait(value === 1 || value === 2);
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
