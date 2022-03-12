import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useStatus } from "../context/statusContext";

import {
  getMaxMintAmount,
  getTotalSupply,
  getNftPrice,
  mintNFT,
  getSaleState,
} from "../utils/interact";

const Hero = () => {
  const { status, setStatus } = useStatus();

  const [count, setCount] = useState(1);
  const [maxMintAmount, setMaxMintAmount] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [nftPrice, setNftPrice] = useState("0.001");
  const [isSaleActive, setIsSaleActive] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      setMaxMintAmount(await getMaxMintAmount());
      setNftPrice(await getNftPrice());
      setIsSaleActive(await getSaleState());
      await updateTotalSupply();
    };

    prepare();
  });

  const updateTotalSupply = async () => {
    const mintedCount = await getTotalSupply();
    setTotalSupply(mintedCount);
  };

  const incrementCount = () => {
    if (count < maxMintAmount) setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const mintEmojiFace = async () => {
    const { status } = await mintNFT(count);
    setStatus(status);
    // We minted a new emoji face, so we need to update the total supply
    updateTotalSupply();
  };

  return (
    <main id="main" className="py-16 h-min ">
      <div className="items-center max-w-6xl pt-4 pb-4 mx-auto ">
        <div className="grid grid-cols-3 gap-4"></div>
        <div className="flex flex-col items-center">
          <Image
            src="/images/1.png"
            width="270"
            height="270"
            alt="VastCosmicSpace 1"
            className="rounded-md"
          />
          {isSaleActive ? (
            <>
              {/* Minted NFT Ratio */}
              <p className="px-3 py-1 my-4 text-lg font-extrabold text-gray-800 bg-gray-100 rounded-md">
                <span className="text-lg text-blue-600">{`${totalSupply}`}</span>{" "}
                / ∞
              </p>

              <div className="flex items-center mt-6 text-3xl font-bold text-gray-200">
                <button
                  className="flex items-center justify-center w-12 h-12 text-center text-black bg-white rounded-md hover:bg-blue-200"
                  onClick={incrementCount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>

                <h2 className="mx-8">{count}</h2>

                <button
                  className="flex items-center justify-center w-12 h-12 text-center bg-white rounded-md hover:bg-blue-200"
                  onClick={decrementCount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
              </div>

              <h4 className="mt-2 font-semibold text-center text-white">
                {nftPrice} ETH{" "}
                <span className="text-sm text-white"> + GAS</span>
              </h4>

              {/* Mint Button */}
              <button
                className="px-4 py-2 mt-6 text-center text-white uppercase bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-400 hover:border-blue-500"
                onClick={mintEmojiFace}
              >
                Mint now!
              </button>
            </>
          ) : (
            <p className="mt-8 text-2xl text-white">
              {" "}
              😥 Sale is not active yet!
            </p>
          )}

          {/* Status */}

          {status && (
            <div className="flex items-center justify-center px-4 py-4 mt-8 font-semibold text-white bg-gray-900 rounded-md ">
              {status}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/images/1.png"
            width="270"
            height="270"
            alt="VastCosmicSpace 1"
            className="rounded-md"
          />
          {isSaleActive ? (
            <>
              {/* Minted NFT Ratio */}
              <p className="px-3 py-1 my-4 text-lg font-extrabold text-gray-800 bg-gray-100 rounded-md">
                <span className="text-lg text-blue-600">{`${totalSupply}`}</span>{" "}
                / ∞
              </p>

              <div className="flex items-center mt-6 text-3xl font-bold text-gray-200">
                <button
                  className="flex items-center justify-center w-12 h-12 text-center text-black bg-white rounded-md hover:bg-blue-200"
                  onClick={incrementCount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>

                <h2 className="mx-8">{count}</h2>

                <button
                  className="flex items-center justify-center w-12 h-12 text-center bg-white rounded-md hover:bg-blue-200"
                  onClick={decrementCount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
              </div>

              <h4 className="mt-2 font-semibold text-center text-white">
                {nftPrice} ETH{" "}
                <span className="text-sm text-white"> + GAS</span>
              </h4>

              {/* Mint Button */}
              <button
                className="px-4 py-2 mt-6 text-center text-white uppercase bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-400 hover:border-blue-500"
                onClick={mintEmojiFace}
              >
                Mint now!
              </button>
            </>
          ) : (
            <p className="mt-8 text-2xl text-white">
              {" "}
              😥 Sale is not active yet!
            </p>
          )}

          {/* Status */}

          {status && (
            <div className="flex items-center justify-center px-4 py-4 mt-8 font-semibold text-white bg-gray-900 rounded-md ">
              {status}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/images/1.png"
            width="270"
            height="270"
            alt="VastCosmicSpace 1"
            className="rounded-md"
          />
          {isSaleActive ? (
            <>
              {/* Minted NFT Ratio */}
              <p className="px-3 py-1 my-4 text-lg font-extrabold text-gray-800 bg-gray-100 rounded-md">
                <span className="text-lg text-blue-600">{`${totalSupply}`}</span>{" "}
                / ∞
              </p>

              <div className="flex items-center mt-6 text-3xl font-bold text-gray-200">
                <button
                  className="flex items-center justify-center w-12 h-12 text-center text-black bg-white rounded-md hover:bg-blue-200"
                  onClick={incrementCount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>

                <h2 className="mx-8">{count}</h2>

                <button
                  className="flex items-center justify-center w-12 h-12 text-center bg-white rounded-md hover:bg-blue-200"
                  onClick={decrementCount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
              </div>

              <h4 className="mt-2 font-semibold text-center text-white">
                {nftPrice} ETH{" "}
                <span className="text-sm text-white"> + GAS</span>
              </h4>

              {/* Mint Button */}
              <button
                className="px-4 py-2 mt-6 text-center text-white uppercase bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-400 hover:border-blue-500"
                onClick={mintEmojiFace}
              >
                Mint now!
              </button>
            </>
          ) : (
            <p className="mt-8 text-2xl text-white">
              {" "}
              😥 Sale is not active yet!
            </p>
          )}

          {/* Status */}

          {status && (
            <div className="flex items-center justify-center px-4 py-4 mt-8 font-semibold text-white bg-gray-900 rounded-md ">
              {status}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Hero;
