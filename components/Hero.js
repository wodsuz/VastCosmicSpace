import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useStatus } from "../context/statusContext";
import Swal from "sweetalert2";
import {
  getMaxMintAmount,
  getTotalSupply,
  getNftPrice,
  mintNFT,
  getSaleState,
  getCurrentWalletConnected,
  tokenofowner,
  tokenuri,
  csetalite,
} from "../utils/interact";

const Hero = () => {
  const { status, setStatus } = useStatus();
  const [count, setCount] = useState(1);
  const [count_two, setCount_two] = useState(2);
  const [count_three, setCount_three] = useState(3);
  const [maxMintAmount, setMaxMintAmount] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [nftPrice, setNftPrice] = useState("0.001");
  const [isSaleActive, setIsSaleActive] = useState(false);
  const [curconwallet, setCurconwallet] = useState("");
  const [tokenowner, setTokenowner] = useState();
  const [tokid, setTokid] = useState([]);
  const tokenids = ["-"];
  useEffect(() => {
    const prepare = async () => {
      setMaxMintAmount(await getMaxMintAmount());
      setNftPrice(await getNftPrice());
      setIsSaleActive(await getSaleState());
      setCurconwallet(await getCurrentWalletConnected());
      setTokenowner(await tokenofowner());
      await updateTotalSupply();
    };
    prepare();
  });
  const imgurl = (url) => {
    return "/images/" + url + ".png";
  };
  const updateTotalSupply = async () => {
    const mintedCount = await getTotalSupply();
    setTotalSupply(mintedCount);
  };
  const deneme = async () => {
    /*
    Object.entries(tokenowner).forEach((keyValuePair) => {
      console.log("deneme: ", keyValuePair);
    });
    */
    console.log(tokenowner.length);
    tokenids = [];
    for (let i = 1; i <= tokenowner.length; i++) {
      try {
        tokenids[i] = (await tokenuri(i)).toString();
      } catch {
        tokenids[i] = [""];
      }
    }
    setTokid(tokenids);
    console.log("id: " + tokenids);
  };

  const createSet = async (id) => {
    console.log(id === "9");
    if (id === "1") {
      const { status } = await csetalite(1);
      setStatus(status);
    } else if (id === "9") {
      const { status } = await csetalite(2);
      setStatus(status);
    } else if (id === "11") {
      const { status } = await csetalite(3);
      setStatus(status);
    } else {
      window.alert("Setalite not avaliable!");
    }
    // We minted a new planet, so we need to update the total supply
    updateTotalSupply();
  };
  const mintEmojiFace = async (id) => {
    if (id < 2) {
      const { status } = await mintNFT(count, 1);
      setStatus(status);
    } else if (id < 3) {
      const { status } = await mintNFT(count_two, 2);
      setStatus(status);
    } else {
      const { status } = await mintNFT(count_three, 3);
      setStatus(status);
    }
    // We minted a new planet, so we need to update the total supply
    updateTotalSupply();
  };
  return (
    <main id="main" className="py-16 h-min " key={"id"}>
      <div className="items-center max-w-6xl pt-4 pb-4 mx-auto ">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6">
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
                    onClick={() => {
                      if (count < maxMintAmount) setCount(count + 1);
                    }}
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
                    onClick={() => {
                      if (count > 1) setCount(count - 1);
                    }}
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
                  onClick={() => mintEmojiFace(1)}
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
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/images/9.png"
              width="270"
              height="270"
              alt="VastCosmicSpace 2"
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
                    onClick={() => {
                      if (count_two < maxMintAmount)
                        setCount_two(count_two + 1);
                    }}
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

                  <h2 className="mx-8">{count_two}</h2>

                  <button
                    className="flex items-center justify-center w-12 h-12 text-center bg-white rounded-md hover:bg-blue-200"
                    onClick={() => {
                      if (count_two > 1) setCount_two(count_two - 1);
                    }}
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
                  onClick={() => mintEmojiFace(2)}
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
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/images/11.png"
              width="270"
              height="270"
              alt="VastCosmicSpace 3"
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
                    onClick={() => {
                      if (count_three < maxMintAmount)
                        setCount_three(count_three + 1);
                    }}
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

                  <h2 className="mx-8">{count_three}</h2>

                  <button
                    className="flex items-center justify-center w-12 h-12 text-center bg-white rounded-md hover:bg-blue-200"
                    onClick={() => {
                      if (count_three > 1) setCount_three(count_three - 1);
                    }}
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
                  onClick={() => mintEmojiFace(3)}
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
          </div>
        </div>
        {/* Status */}
        {status && (
          <div className="flex items-center justify-center px-4 py-4 mt-8 font-semibold text-white bg-gray-900 rounded-md ">
            {status}
          </div>
        )}
        <div className="border-t-2 border-white mt-5"></div>
      </div>

      {curconwallet.address > 41 ? (
        <>
          <div className="flex flex-col items-center text-lg">
            {" "}
            Welcome to Vast Cosmic Space, your wallet address is:{" "}
            <div
              className="text-sky-800 hover:text-sky-600 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(curconwallet.address);
                Swal.fire({
                  icon: "success",
                  title: "Wallet address copied",
                  text: "Your wallet address has been copied succesfully.",
                  position: "top",
                  background: "white",
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  allowEnterKey: false,
                  showConfirmButton: false,
                  showCancelButton: false,
                  timer: 3000,
                });
              }}
            >
              {curconwallet.address}{" "}
            </div>
            <button
              className="px-4 py-2 mt-6 mb-6 text-center text-white uppercase bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-400 hover:border-blue-500"
              onClick={() => {
                deneme();
              }}
            >
              Get my NFTs
            </button>{" "}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-6 gap-y-10 gap-x-6">
              {tokid.map((id, index) => (
                <div
                  className="flex flex-col items-center align-center ml-3"
                  key={id.key}
                >
                  <Image
                    src={imgurl(id.substring(54, id.length - 5))}
                    width="270"
                    height="270"
                    alt="VastCosmicSpace"
                    className="rounded-md"
                    key={id.key}
                  />
                  <li key={id.key}>{index}</li>
                  <button
                    className="px-4 py-2 mt-6 mb-6 text-center text-white uppercase bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-400 hover:border-blue-500"
                    key={id.key}
                    onClick={() => {
                      {
                        createSet(id.substring(54, id.length - 5));
                      }
                    }}
                  >
                    Setalite
                  </button>{" "}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center text-lg">
          {" "}
          No wallet Connected, Please Connect your wallet in order to
          mint,create setalite and much more!{" "}
        </div>
      )}
    </main>
  );
};

export default Hero;
