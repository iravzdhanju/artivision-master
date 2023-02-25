import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Configuration, OpenAIApi } from "openai";
import { useMemo, useState } from "react";
import Homepage from "@/components/Homepage";
// const inter = Inter({ subsets: ["latin"] });
// const configuration = new Configuration({
//   apiKey: "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",
// });

export default function Home() {
  //   const openai = new OpenAIApi(configuration);
  //   const [userPrompt, setUserPrompt] = useState("");
  //   const [number, setNumber] = useState(1);
  //   const [size, setSize] = useState("");
  //   const [imageUrl, setImageUrl] = useState("");
  //   const handleUserPromptChange = (event) => {
  //     setUserPrompt(event.target.value);
  //   };
  // const handleNumberChange = (event) => {
  //     setNumber(event.target.value);
  //   };
  //   const handleSizeChange = (event) => {
  //     setSize(event.target.value);
  //   };
  //   const handleGenerateImage = async () => {
  //     const imageParameters = {
  //       prompt: userPrompt,
  //       n: parseInt(number),
  //       size: size,
  //     };
  //     const response = await openai.createImage(imageParameters);
  //     const urlData = response.data.data[0].url;
  //     setImageUrl(urlData);
  //   };
  return (
    <>
      <Head>
        <title>Artivision</title>
        <meta
          name="description"
          content="Artivision- An AI Based Image Generator"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logos.ico" />
      </Head>
      {/* <main className=""> */}
      <Homepage />

      {/* <> */}
      {/* <main className="App">
            {imageUrl && (
              <img src={imageUrl} className="image" alt="ai thing" />
            )}
            <input
              label={"Description"}
              value={userPrompt}
              onChange={handleUserPromptChange}
            />

            <input
              label={"Amount"}
              value={number}
              onChange={handleNumberChange}
            />
            <input label={"Size"} value={size} onChange={handleSizeChange} />
            <button
              className="main-button"
              onClick={() => handleGenerateImage()}
            >
              Generate
            </button>
          </main> */}

      {/* </> */}
      {/* </main> */}
    </>
  );
}
