import { TouchableOpacity } from 'react-native';
import Tag from './Tag';
import useTheme from '@/hooks/useTheme';
import { SizePresets } from '@/constants/Typography';

type TagProps = {
  orderIndex: number;
  value: string;
  size?: keyof typeof SizePresets;
  onSelectionChange?: (ornderIndex: number, isSelected: boolean) => void;
  isSelected: boolean;
};

const SelectableTag = ({
  orderIndex,
  value,
  size = 's',
  onSelectionChange,
  isSelected,
}: TagProps) => {
  const theme = useTheme();

  const handlePress = () => {
    onSelectionChange?.(orderIndex, !isSelected);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Tag
        value={value}
        size={size}
        style={{
          backgroundColor: isSelected ? theme.primary : theme.tile,
        }}
      />
    </TouchableOpacity>
  );
};

export default SelectableTag;
