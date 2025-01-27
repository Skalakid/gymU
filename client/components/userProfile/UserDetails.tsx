import { StyleSheet, View } from 'react-native';
import React from 'react';
import Tile from '../common/Tile';
import ThemedText from '../ThemedText';
import LabeledText from '../common/LabeledText';

type UserDetailsType = {
  userDetails: UserDetails | null;
};

const UserDetails = ({ userDetails }: UserDetailsType) => {
  return (
    <Tile style={styles.tile}>
      <ThemedText size="l" weight="semiBold" style={styles.userInfoTitle}>
        General info
      </ThemedText>
      <View style={styles.userInfoContent}>
        <LabeledText label="Username" text={userDetails?.username ?? '-'} />
        {userDetails?.email && (
          <LabeledText label="Email" text={userDetails?.email ?? '-'} />
        )}

        <LabeledText
          label="Description"
          text={userDetails?.description ?? '-'}
        />
      </View>
    </Tile>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  tile: { width: '100%' },
  userInfoContent: { gap: 5 },
  userInfoTitle: { marginBottom: 10 },
});
