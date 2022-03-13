import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useStatus } from "../context/statusContext";
import { connectWallet, getCurrentWalletConnected } from "../utils/interact";
import {
  TiSocialLinkedinCircular,
  TiSocialGithubCircular,
  TiSocialAtCircular,
} from "react-icons/ti";
const Header = () => {
  const { setStatus } = useStatus();
  const [walletAddress, setWalletAddress] = useState("");
  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWalletAddress(walletResponse.address);
    setStatus(walletResponse.status);
    console.log("setWalletAd" + walletResponse.address);
  };

  useEffect(() => {
    const prepare = async () => {
      const walletResponse = await getCurrentWalletConnected();
      setWalletAddress(walletResponse.address);
      setStatus(walletResponse.status);
      addWalletListener();
    };
    prepare();
  }, []);

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setStatus("");
        } else {
          setWalletAddress("");
          setStatus("🦊 Connect to Metamask using Connect Wallet button.");
        }
      });
    }
  };

  return (
    <>
      <Head>
        <title>Vast Cosmic Space NFT by ongundemirag</title>
        <meta name="description" content="Nft Buy & Space with Space" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="sticky inset-x-0 top-0 z-10 h-20 min-w-full text-white bg-blue-400 bg-opacity-30">
        <div className="container flex items-center justify-between h-full mx-auto max-w-7xl">
          {/* Logo */}
          <Link href="#">
            <a className="text-2xl font-bold">
              <span className="pr-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-700 to-pink-500">
                Vast Cosmic
              </span>
              Space
            </a>
          </Link>

          {/* Navigation */}

          <nav aria-label="Main Menu">
            <ul className="flex items-center space-x-8">
              <li className="text-white hover:text-blue-400 text-semibold">
                <Link href="#gallery">
                  <a>The Gallery</a>
                </Link>
              </li>

              <li className="px-4 py-2 text-xl text-white border border-white cursor-pointer rounded-2xl hover:text-blue-400 hover:border-blue-400">
                <a
                  className=""
                  id="walletConnectButton"
                  onClick={connectWalletPressed}
                >
                  {walletAddress.length > 0 ? (
                    "Connected: " +
                    String(walletAddress).substring(0, 2) +
                    String(walletAddress).substring(2, 10).toUpperCase() +
                    "..." +
                    String(walletAddress).substring(38).toUpperCase()
                  ) : (
                    <span>Connect Wallet</span>
                  )}
                </a>
              </li>
            </ul>
          </nav>

          {/* Opensea Twitter Discord Links */}
          <nav aria-label="Contact Menu">
            <ul className="flex items-center space-x-6 ">
              <li>
                <a
                  href="https://www.linkedin.com/in/ongun-demirag/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TiSocialLinkedinCircular className="w-12 h-12 hover:text-blue-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/wodsuz"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TiSocialGithubCircular className="w-12 h-12 hover:text-blue-400" />
                </a>
              </li>

              <li>
                <a
                  href="mailto:ongun.demirag@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TiSocialAtCircular className="w-12 h-12 hover:text-blue-400" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
