import { ThemedText } from "@/components/ThemedText";
import PageWithGoBackHeader from "@/components/page/PageWithGoBackHeader";

import { StyleSheet, View } from "react-native";

const LoginPage = () => {
  return (
    <PageWithGoBackHeader>
      <View style={styles.headingText}>
        <ThemedText size="h4" weight="semiBOod">
          Hello 👋
        </ThemedText>
        <ThemedText size="l" weight="medium" textType="description">
          Welcome back! You have been missed during this time
        </ThemedText>
      </View>
    </PageWithGoBackHeader>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  headingText: {
    gap: 5,
  },
});
