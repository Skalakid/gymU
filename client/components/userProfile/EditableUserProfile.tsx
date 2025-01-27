import { StyleSheet, View } from 'react-native';
import React from 'react';
import UserProfile, { UserProfileType } from './UserProfile';
import IconButton from '@/components/button/IconButton';
import Icons from '@/constants/Icons';
import useTheme from '@/hooks/useTheme';

type EditableUserProfileProps = UserProfileType & {
  onEditPress: () => void;
};

const EditableUserProfile = ({
  onEditPress,
  ...props
}: EditableUserProfileProps) => {
  const theme = useTheme();

  return (
    <View>
      <UserProfile {...props} />
      <IconButton
        icon={Icons.edit}
        onPress={onEditPress}
        style={[
          styles.editButton,
          {
            borderColor: theme.background,
            backgroundColor: theme.tile,
          },
        ]}
        size={20}
      />
    </View>
  );
};

export default EditableUserProfile;

const styles = StyleSheet.create({
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 50,
    width: 40,
    height: 40,
    borderWidth: 3,
  },
});
