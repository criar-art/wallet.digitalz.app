export type Props = {
  labelButton: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  options: Options;
}

export type Options = {
  tabBarLabel?: string;
  title?: string;
  tabBarAccessibilityLabel?: string;
  tabBarTestID?: string;
  tabBarIcon: React.ComponentType<{ size: number; color: string }>;
  tabBarBadge?: string;
};
