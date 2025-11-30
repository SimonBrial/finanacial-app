import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Pressable,
  Modal,
  Alert,
  View,
} from "react-native";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { Link } from "expo-router";
import CardCoin from "../components/card-balance";
import ExchangeCard from "../components/exchange-card";
import Container from "../components/general/container";
import Typography from "../components/general/typography";
import GoalCard from "../components/goal-card";
import { BalanceCardProps, Goal } from "../interface/interface";
import { balanceCards, exchangeRates, goals } from "../seeds/seeds";
import Stack from "../components/general/stack";

export default function Home() {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);

  const globalStyles = StyleSheet.flatten({
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    ...styles.containerGlobal,
  });
  return (
    <ScrollView>
      <SafeAreaView /* style={centerView.centeredView} */>
        <View style={globalStyles}>
          <View style={styles.containerTitle}>
            <Typography bold={false} variant="2xl" customStyles={styles.text}>
              😎 Hi Simon!
            </Typography>
          </View>
          <Stack>
            <Stack>
              {
                /* Card Balance Section */
                balanceCards.map((card: BalanceCardProps) => (
                  <CardCoin
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    amount={card.amount}
                    currency={card.currency}
                    started={card.started}
                    spent={card.spent}
                    lastEntry={card.lastEntry}
                  />
                ))
              }
            </Stack>
            <Link href="/home" asChild>
              <Pressable>
                <Typography
                  customStyles={{
                    color: "white",
                    borderColor: "white",
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderWidth: 1,
                  }}
                >
                  Home
                </Typography>
              </Pressable>
            </Link>
            <Container>
              {
                /* Exchange Rates Section */
                exchangeRates.map((e) => (
                  <ExchangeCard
                    key={e.exchangeName}
                    dolarRate={e.value}
                    exchangeName={e.exchangeName}
                    todayDate={e.todayDate}
                  />
                ))
              }
            </Container>
          </Stack>
          <View style={styles.containerTitle}>
            <Typography bold={false} variant="2xl" customStyles={styles.text}>
              😎 Goals!
            </Typography>
          </View>
          <Stack gap={8}>
            {
              /* Goals Section */
              goals.map((goal: Goal) => (
                <GoalCard
                  key={goal.id}
                  title={goal.title}
                  description={goal.description}
                  color={goal.color}
                  currentValue={goal.currentValue}
                  goalValue={goal.goalValue}
                  icon={goal.icon}
                  id={goal.id}
                />
              ))
            }
          </Stack>
          <StatusBar barStyle={"dark-content"} />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Typography bold variant="xl" customStyles={styles.textStyle}>
                Hide Modal
              </Typography>
            </Pressable>
          </View>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#FFFFFF",
    textAlign: "left",
    marginLeft: 12,
  },
  containerGlobal: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 8,
  },
  containerTitle: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    borderColor: "#FFFFFF",
    paddingTop: 10,
    paddingBottom: 10,
  },
  //************************************************* */
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

// TODO: https://dolarapi.com/docs/venezuela/operations/get-dolares.html
