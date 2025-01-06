import { Alert, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Tile from '../common/Tile';
import ThemedText from '../ThemedText';
import TextInput from '../input/TextInput';
import PrimaryButton from '../button/PrimaryButton';

type UserDetailsType = {
  userDetails: UserDetails | null;
};

const UserDetailsForm = ({ userDetails }: UserDetailsType) => {
  const [username, setUsername] = useState(userDetails?.username ?? '');
  const [email, setEmail] = useState(userDetails?.email ?? '');
  const [description, setDescription] = useState(
    userDetails?.description ?? '',
  );

  return (
    <View style={styles.container}>
      <Tile style={styles.tile}>
        <ThemedText size="l" weight="semiBold" style={styles.userInfoTitle}>
          General info
        </ThemedText>
        <View style={styles.userInfoContent}>
          <TextInput
            label="Username"
            placeholder="Enter your username..."
            onChangeText={setUsername}
            value={username}
          />

          <TextInput
            label="Email"
            placeholder="Enter your email..."
            onChangeText={setEmail}
            value={email}
          />

          <TextInput
            label="Description"
            placeholder="Enter description..."
            onChangeText={setDescription}
            value={description}
          />
        </View>
      </Tile>
      <PrimaryButton
        value="Save"
        onPress={() => {
          Alert.alert('User details saved!');
        }}
      />
    </View>
  );
};

export default UserDetailsForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 20,
  },
  tile: {
    width: '100%',
  },
  userInfoContent: {
    gap: 10,
  },
  userInfoTitle: { marginBottom: 10 },
});
