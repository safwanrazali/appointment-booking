// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

// import "@/styles/globals.scss";

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }
import Head from "next/head";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Klinik Migrasi PQC</title>

        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
