import Layout from "../engine/component/layout/Layout";
import ParamsProvider from "../engine/context/ParamsProvider";
import "../styles/globals.css";
import "./../sass/styles.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ParamsProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ParamsProvider>
  );
}

export default MyApp;
