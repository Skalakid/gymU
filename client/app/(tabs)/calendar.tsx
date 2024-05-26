import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

const CalendarPage = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Calendar page</ThemedText>
    </ThemedView>
  );
};

export default CalendarPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
