import GlobalContainer from "../../components/ui/global-container";
import CarouselCardBank from "../../components/carousel-card-bank";
import DolarPriceContainer from "../../components/dolar-price-container";
import TitleCustom from "../../components/title-custom";
import GoalsContainer from "../../components/goals-container";
import BarsChartContainer from "../../components/charts/bars-chart-container";
import ConcentricProgressRings from "../../components/charts/concentric-progress-rings";

export default function Home() {
  return (
    <GlobalContainer>
      <TitleCustom
        title="Hi Simon!!!"
        withNotificationIcon
        library="MaterialIcons"
        name="home"
      />
      <CarouselCardBank />
      <BarsChartContainer />
      <ConcentricProgressRings />
      <DolarPriceContainer />
      <GoalsContainer />
    </GlobalContainer>
  );
}

// TODO: https://dolarapi.com/docs/venezuela/operations/get-dolares.html
