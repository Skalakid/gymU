import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import ThemedText from '@/components/ThemedText';
import UserItem from '@/components/userProfile/UserItem';
import usePagination from '@/hooks/usePagination';

const AllUsersPage = () => {
  const { loadingMore, initialLoader, data, loadMore } =
    usePagination('/user/all');

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator size="small" />;
  };

  return (
    <PageWithGoBackHeader title="All Users">
      <View style={{ paddingBottom: 10 }}>
        <ThemedText weight="semiBold" size="l">
          Search for friends and other gym lovers!
        </ThemedText>
      </View>

      {initialLoader ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <UserItem user={item} avatarUrl={''} />}
          keyExtractor={(item, index) => `${item.username}${index}`}
          style={styles.container}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      )}
    </PageWithGoBackHeader>
  );
};

export default AllUsersPage;

const styles = StyleSheet.create({
  container: {},
});
