import { StatusBar, StyleSheet, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CardCoin from "./components/card-balance";
import Container from "./components/general/container";
import ExchangeCard from "./components/exchange-card";
import Stack from "./components/general/stack";
import Typography from "./components/general/typography";
import GoalCard from "./components/goal-card";
import Col from "./components/general/col";
import Row from "./components/general/row";

export default function App() {
  const insets = useSafeAreaInsets();

  const globalStyles = StyleSheet.flatten({
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    ...styles.containerGlobal,
  });

  return (
    <ScrollView>
      <View style={globalStyles}>
        <View style={styles.containerTitle}>
          <Typography bold={false} variant="2xl" style={styles.text}>
            😎 Hi Simon!
          </Typography>
        </View>
        <Stack>
          <Stack
          // style={{ width: "100%", display: "flex", alignItems: "center", gap: 8 }}
          >
            <CardCoin />
            <CardCoin />
          </Stack>
          <Container>
            <ExchangeCard dolarRate={333.67} exchangeName="Paralelo" />
            <ExchangeCard dolarRate={238.84} exchangeName="Oficial" />
            <ExchangeCard dolarRate={286.26} exchangeName="Promedio" />
          </Container>
        </Stack>
        <View style={styles.containerTitle}>
          <Typography bold={false} variant="2xl" style={styles.text}>
            😎 Goals!
          </Typography>
        </View>
        <Stack>
          <Row>
            <Col numRows={1}>
              <GoalCard
                title="Learn React Native"
                description="Complete the course on Udemy"
              />
            </Col>
            <Col numRows={1}>
              <GoalCard
                title="Build a Portfolio"
                description="Create a portfolio website using React"
              />
            </Col>
          </Row>
          <Row>
            <Col numRows={1}>
              <GoalCard
                title="Learn TypeScript"
                description="Understand TypeScript and its benefits"
              />
            </Col>
            <Col numRows={1}>
              <GoalCard
                title="Practice Coding"
                description="Solve coding challenges on LeetCode"
              />
            </Col>
          </Row>
        </Stack>
        <StatusBar barStyle={"dark-content"} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#FFFFFF",
    fontSize: 30,
    textAlign: "left",
    width: "100%",
  },
  containerGlobal: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 8,
  },
  containerTitle: {
    width: "100%",
    borderColor: "#FFFFFF",
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
});

// TODO: https://dolarapi.com/docs/venezuela/operations/get-dolares.html
