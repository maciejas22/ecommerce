import { useState, useEffect } from "react";

import axios from "axios";

import ProductSegment from "@/components/ProductSegment";

export async function getServerSideProps({ query }) {
  const searchQuery = query.q || "";

  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/search/`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        search: searchQuery,
      },
    });
    return {
      props: {
        searchQuery: searchQuery,
        data: response.data,
      },
    };
  } catch {
    console.log("error");
    return {
      props: {
        searchQuery: "",
        data: [],
      },
    };
  }
}

const index = ({ searchQuery, data }) => {
  return (
    <ProductSegment
      title={'Search results for: "' + searchQuery + '"'}
      items={data}
    />
  );
};

export default index;
