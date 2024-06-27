import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

const useTheme = () => {
  const theme = useColorScheme() ?? 'dark';
  return Colors[theme];
};

export default useTheme;
