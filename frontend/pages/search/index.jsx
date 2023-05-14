import axios from "axios";

import ProductSegment from "@/components/ProductSegment";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL

export async function getServerSideProps({query}) {
    const searchQuery = query.q || "";

    try {
        const response = await axios.get(`${BASEURL}search/`, {
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

const index = ({searchQuery, data}) => {
    return (
        <ProductSegment
            title={'Search results for: "' + searchQuery + '"'}
            items={data}
        />
    );
};

export default index;
