import axios from "axios";

import ProductSegment from "@/components/ProductSegment";

const categories = [
    {name: "TVs", slug: "tvs"},
    {name: "Audio", slug: "audio"},
    {name: "Smartphones", slug: "smartphones"},
    {name: "Computers", slug: "computers"},
    {name: "Consoles and games", slug: "consoles-and-games"},
    {name: "Fridges", slug: "fridges"},
    {name: "Microwaves", slug: "microwaves"},
    {name: "Washing machines", slug: "washing-machines"},
];

export async function getStaticPaths() {
    const paths = categories.map((cat) => ({params: {id: cat.slug}}));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/${params.id}/`);
        const data = response.data;
        return {
            props: {
                name: categories.find((category) => category.slug === params.id).name,
                data,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                name: "",
                data: [],
            },
        };
    }
}

export default function Category({name, data}) {
    return <ProductSegment title={name} items={data}/>;
}
