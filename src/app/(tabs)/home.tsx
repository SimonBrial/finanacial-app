import { StyleSheet } from "react-native";
import CardCoin from "../../components/card-balance";
import Container from "../../components/general/container";
import Typography from "../../components/general/typography";
import { BalanceCardProps, Goal } from "../../interface/interface";
import { balanceCards, exchangeRates, goals } from "../../seeds/seeds";
import Stack from "../../components/general/stack";
import GlobalContainer from "../../components/general/global-container";
import ExchangeCard from "../../components/exchanges/exchange-card";
import GoalCard from "../../components/goals/goal-card";

export default function Home() {
  // const insets = useSafeAreaInsets();
  // const [modalVisible, setModalVisible] = useState(false);

  /*const globalStyles = StyleSheet.flatten({
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    ...styles.containerGlobal,
  });*/
  return (
    <GlobalContainer>
      <Container customStyles={styles.containerTitle}>
        <Typography bold={false} variant="2xl" customStyles={styles.text}>
          😎 Hi Simon!
        </Typography>
      </Container>
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
      <Container customStyles={styles.containerTitle}>
        <Typography bold={false} variant="2xl" customStyles={styles.text}>
          😎 Goals!
        </Typography>
      </Container>
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
              period={goal.period}
              periodUnit={goal.periodUnit}
              completed={goal.completed}
            />
          ))
        }
      </Stack>
    </GlobalContainer>
  );
}

/*
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
*/

const styles = StyleSheet.create({
  text: {
    color: "#FFFFFF",
    textAlign: "left",
    marginLeft: 12,
  },

  containerTitle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: "#FFFFFF",
    paddingVertical: 20,
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
