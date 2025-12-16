import Container from "../../components/general/container";
import GlobalContainer from "../../components/general/global-container";
import Typography from "../../components/general/typography";
import { StyleSheet } from "react-native";
import ExpanseCard from "../../components/transactions/expanse-card";
import Stack from "../../components/general/stack";
import { constExpense } from "../../seeds/seeds";

export default function Transactions() {
  return (
    <GlobalContainer>
      <Container customStyles={styles.containerTitle}>
        <Typography bold={false} variant="2xl" customStyles={styles.text}>
          😎 Transactions!
        </Typography>
      </Container>
      <Container customStyles={styles.internalContainer} wrap>
        <Typography bold={false} variant="2xl" customStyles={styles.text}>
          Monthly
        </Typography>
        <Stack
          gap={6}
          customStyles={{
            paddingTop: 10,
          }}
        >
          {constExpense.map((expense) => (
            <ExpanseCard
              key={expense.id}
              color={expense.color}
              completed={expense.completed}
              description={expense.description}
              expenseValue={expense.expenseValue}
              icon={expense.icon}
              id={expense.id}
              title={expense.title}
            />
          ))}
        </Stack>
      </Container>
    </GlobalContainer>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: "#FFFFFF",
    paddingVertical: 20,
  },
  text: {
    color: "#FFFFFF",
    textAlign: "left",
    marginLeft: 12,
  },
  internalContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: "#1a1a1a",
    backgroundColor: "#2A2A2A",
    borderLeftWidth: 6,
    borderLeftColor: "#2bf35d",
    borderRadius: 8,
    padding: 16,
  },
});
