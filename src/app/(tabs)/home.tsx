import GlobalContainer from "../../components/ui/global-container";
import CarouselCardBank from "../../components/carousel-card-bank";
import DolarPriceContainer from "../../components/dolar-price-container";
import TitleCustom from "../../components/title-custom";
import GoalsContainer from "../../components/goals-container";
import BarsChartContainer from "../../components/charts/bars-chart-container";
import ConcentricProgressRings from "../../components/charts/concentric-progress-rings";
import { ScrollView } from "react-native";

export default function Home() {
  return (
    <GlobalContainer>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <TitleCustom
          title="Hi Simon!!!"
          withNotificationIcon
          library="MaterialIcons"
          name="home"
          showIconBalance
        />
        <CarouselCardBank />
        <BarsChartContainer />
        <ConcentricProgressRings />
        <DolarPriceContainer />
        <GoalsContainer />
      </ScrollView>
    </GlobalContainer>
  );
}

// TODO: https://dolarapi.com/docs/venezuela/operations/get-dolares.html
