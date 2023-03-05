import { useAccount, useProvider } from "wagmi";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Op3n, NFT } from "../../contracts.json";
import { abi as OP3N_ABI } from "../../artifacts/contracts/Op3n.sol/Op3n.json";
import { abi as NFT_ABI } from "../../artifacts/contracts/NFT.sol/NFT.json";
import InboxComponent from "../components/InboxComponent";
import Sidebar from "../components/Sidebar";
import { Button } from "@chakra-ui/react";
import { AiOutlineSend, MdMessage } from "react-icons/md";
import Link from "next/link";

function Messages() {
  const provider = useProvider();
  const { address } = useAccount();

  const [tokenIds, setTokenIds] = useState([]);
  const [tokenURIs, setTokenURIs] = useState([]);
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  async function renderInbox() {
    setDate(localStorage.getItem("date"));
    const op3nContract = new ethers.Contract(Op3n, OP3N_ABI, provider);
    let tokenIdArray = [];
    tokenIdArray = await op3nContract.getInbox(address);
    for (let i = 0; i < tokenIdArray.length; i++) {
      tokenIds.push(tokenIdArray[i].toNumber());
    }
    const nftContract = new ethers.Contract(NFT, NFT_ABI, provider);
    for (let i = 0; i < tokenIds.length; i++) {
      let uri = await nftContract.tokenURI(tokenIds[i]);
      tokenURIs.push(uri);
      let response = await fetch(uri);
      console.log(uri);
      response = await response.json();
      //response.date = date;
      data.push(response);
      console.log(response);
      console.log(data);
    }
  }

  useEffect(() => {
    renderInbox();
  }, []);

  return (
    <div>
      <Sidebar />
      {/*<section>
        <div>
          <h2>Messages</h2>
          <Link href="/SendMessage">
            <Button
              color="#001f8d"
              variant="solid"
              rightIcon={<AiOutlineSend />}
            >
              Compose
            </Button>
          </Link>
        </div>
        <InboxComponent data={data} />
  </section>*/}
    </div>
  );
}

export default Messages;
