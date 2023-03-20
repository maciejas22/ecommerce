import FiveItemCarousel from "../components/FiveItemCarousel";
import img from "../assets/iphone14pro.png";

const MainPage = () => {
  let items = [
    { img: img, name: "Iphone 14 Pro", price: "999", discount: "0" },
    { img: img, name: "Iphone 14 Pro", price: "999", discount: "0" },
    { img: img, name: "Iphone 14 Pro", price: "999", discount: "0" },
    { img: img, name: "Iphone 14 Pro", price: "999", discount: "100" },
    { img: img, name: "Iphone 14 Pro", price: "999", discount: "0" },
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
