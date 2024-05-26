import { ThemedText } from "@/components/ThemedText";
import PageWithGoBackHeader from "@/components/page/PageWithGoBackHeader";
import { StyleSheet, View } from "react-native";

const SignUpPage = () => {
  return (
    <PageWithGoBackHeader title="Sign up">
      <View style={styles.headingText}>
        <ThemedText size="h4" weight="semiBOod">
          Nice to meet you 🙌
        </ThemedText>
        <ThemedText size="l" weight="medium" textType="description">
          One account, ton of possibilities. Plan workouts, train in live mode,
          track your progress and much more!
        </ThemedText>
      </View>
    </PageWithGoBackHeader>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  headingText: {
    gap: 5,
  },
});
