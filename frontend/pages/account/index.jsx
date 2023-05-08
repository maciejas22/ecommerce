import MyLoader from "@/components/MyLoader";
import dynamic from "next/dynamic";
import withAuth from "@/utils/withAuth";

const CSRConfig = {
    ssr: false,
    loading: () => <MyLoader/>,
}

const Proxy = dynamic(() => import("./_sub-pages/index"), {...CSRConfig});

export default withAuth(Proxy);