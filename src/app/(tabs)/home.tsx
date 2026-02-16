import GlobalContainer from "../../components/general/global-container";
import CarouselCardBank from "../../components/carousel-card-bank";
import DolarPriceContainer from "../../components/dolar-price-container";
import TitleCustom from "../../components/title-custom";
import GoalsContainer from "../../components/goals-container";

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
      <DolarPriceContainer />
      <GoalsContainer />
    </GlobalContainer>
  );
}

// TODO: https://dolarapi.com/docs/venezuela/operations/get-dolares.html
