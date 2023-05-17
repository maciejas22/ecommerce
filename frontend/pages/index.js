import axios from "axios";

import FiveItemCarousel from "@/components/FiveItemCarousel";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getStaticProps({params}) {
  return await axios
        .get(`${BASE_URL}newest/`)
        .then((response) => {
          const data = response.data;
          return {
            props: {
              data,
            },
          }
        })
}

export default function Home({data}) {
  const {newest_products, discounted_products} = data
  let items = [
    { name: "Iphone 14 Pro", price: "999", discount: "0" },
    { name: "Iphone 14 Pro", price: "999", discount: "0" },
    { name: "Iphone 14 Pro", price: "999", discount: "0" },
    { name: "Iphone 14 Pro", price: "999", discount: "100" },
    { name: "Iphone 14 Pro", price: "999", discount: "0" },
  ];

  return (
    <>
      <FiveItemCarousel title={"Newest"} items={newest_products} />
      <FiveItemCarousel title={"On sale"} items={discounted_products} />
    </>
  );
}
