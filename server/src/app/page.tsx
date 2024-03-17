import Image from "next/image";
import Head from "next/head";

import Homepaage from '../app/homePage/page';
export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Homepaage/>
    </>
  );
}
