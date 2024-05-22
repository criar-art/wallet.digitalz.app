import { useState, useEffect, useCallback } from 'react';
import { Dimensions } from 'react-native';

const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);

  const checkIfTablet = useCallback(() => {
    const { width } = Dimensions.get('window');
    setIsTablet(width >= 600);
  }, []);

  useEffect(() => {
    checkIfTablet();

    const subscription = Dimensions.addEventListener('change', checkIfTablet);

    // Remove o listener quando o componente é desmontado
    return () => {
      subscription?.remove();
    };
  }, [checkIfTablet]);

  return isTablet;
};

export default useIsTablet;
