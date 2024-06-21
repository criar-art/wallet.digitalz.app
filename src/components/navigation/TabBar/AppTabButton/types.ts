export type Props = {
  twClass?: string;
  labelButton: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  options: Options;
  name: string;
};

export type Options = {
  tabBarLabel?: string;
  title?: string;
  tabBarAccessibilityLabel?: string;
  tabBarTestID?: string;
  tabBarIcon: React.ComponentType<{ size: number; color: string }>;
  tabBarBadge?: string;
};
