import FiveItemCarousel from "@/components/FiveItemCarousel";

export default function Home() {
  let items = [
    { name: "Iphone 14 Pro", price: "999", discount: "0" },
    { name: "Iphone 14 Pro", price: "999", discount: "0" },
    { name: "Iphone 14 Pro", price: "999", discount: "0" },
    { name: "Iphone 14 Pro", price: "999", discount: "100" },
    { name: "Iphone 14 Pro", price: "999", discount: "0" },
  ];

  return (
    <>
      <FiveItemCarousel title={"Bestsellers"} items={items} />
      <FiveItemCarousel title={"Newest"} items={items} />
      <FiveItemCarousel title={"On sale"} items={items} />
    </>
  );
}
