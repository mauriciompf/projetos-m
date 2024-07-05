import HomeFooter from "../components/homePage/HomeFooter";
import HomeHeader from "../components/homePage/HomeHeader";
import HomeMain from "../components/homePage/HomeMain";

function HomePage() {
  return (
    <div className="mx-auto grid h-screen w-[70%] gap-10 py-12">
      <HomeHeader />
      <HomeMain />
      <HomeFooter />
    </div>
  );
}

export default HomePage;
