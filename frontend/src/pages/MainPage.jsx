import FiveItemCarousel from "../components/FiveItemCarousel";
import img from "../assets/donwload.png";

const MainPage = () => {
  let items = [
    { img: img, name: "Iphone 14 pro", price: "999", discount: "0" },
    { img: img, name: "Iphone 14 pro Max", price: "1099", discount: "0" },
    { img: img, name: "Iphone 14", price: "999", discount: "0" },
    { img: img, name: "Iphone 14 Max", price: "999", discount: "100" },
    { img: img, name: "Iphone 14 Max", price: "999", discount: "0" },
  ];

  return (
    <>
      <FiveItemCarousel title={"Bestsellers"} items={items} />
      <FiveItemCarousel title={"Newest"} items={items} />
      <FiveItemCarousel title={"On sale"} items={items} />
    </>
  );
};

export default MainPage;
