import GlobalContainer from "../../components/ui/global-container";
import CarouselCardBank from "../../components/carousel-card-bank";
import DolarPriceContainer from "../../components/dolar-price-container";
import TitleCustom from "../../components/title-custom";
import GoalsContainer from "../../components/goals-container";
import BarsChartContainer from "../../components/charts/bars-chart-container";
import { ScrollView, View } from "react-native";
import { House } from "lucide-react-native";

export default function Home() {
  return (
    <GlobalContainer>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <TitleCustom
          title="Hi Simon!!!"
          withNotificationIcon
          as={House}
          showIconBalance
        />
        <CarouselCardBank />
        <View className="flex-col gap-5 pt-2">
          <BarsChartContainer />
          {/* <ConcentricProgressRings /> */}
          <DolarPriceContainer />
          <GoalsContainer />
        </View>
      </ScrollView>
    </GlobalContainer>
  );
}

// TODO: https://dolarapi.com/docs/venezuela/operations/get-dolares.html
