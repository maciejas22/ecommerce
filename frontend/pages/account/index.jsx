import MyLoader from "@/components/MyLoader";
import dynamic from "next/dynamic";

const CSRConfig = {
    ssr: false,
    loading: () => <MyLoader/>,
}

const Proxy = dynamic(() => import("./_sub-pages/index"), {...CSRConfig});

export default Proxy;