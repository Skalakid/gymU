import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import ThemedText from '@/components/ThemedText';
import fetchApi from '@/api/fetch';
import UserItem from '@/components/userProfile/UserItem';

const AllUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getAllUsers = async () => {
    try {
      const result = await fetchApi('/user/all', 'GET');
      if (!result.ok) {
        return;
      }
      const data = await result.json();
      setUsers(data);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <PageWithGoBackHeader title="All Users">
      <View style={{ paddingBottom: 10 }}>
        <ThemedText weight="semiBold" size="l">
          Search for friends and other gym lovers!
        </ThemedText>
      </View>

      <FlatList
        data={users}
        renderItem={({ item }) => <UserItem user={item} avatarUrl={''} />}
        keyExtractor={(item, index) => `${item.email}${index}`}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
    </PageWithGoBackHeader>
  );
};

export default AllUsersPage;

const styles = StyleSheet.create({
  container: {},
});
