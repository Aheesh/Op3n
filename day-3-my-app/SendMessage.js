import { useProvider, useSigner, useAccount } from "wagmi";
import { Op3n } from "../../contracts.json";
import { abi } from "../../artifacts/contracts/Op3n.sol/Op3n.json";
import { ethers } from "ethers";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Blob, NFTStorage } from "nft.storage";
import axios from "axios";

// this page is to send a message
function SendMessage() {
  // 3 different fields
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const provider = useProvider();
  const [loading, setLoading] = useState(false);
  const { data: signer } = useSigner();
  const { address } = useAccount();

  // when the form is submitted, this function is called
  const submitHandler = async (e) => {
    e.preventDefault();

    if (to === "") {
      window.alert("You must send the message to someone");
      return;
    }

    setLoading(true);

    //reate the ipfs url and store the image
    // const NFT_STORAGE_TOKEN =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAxMkNmMjIzMGUxZTFhOGJEMTZGMzI1QjYzOTc1NTg0MEJFOThiNkUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3Nzc5NTY2NTUzMCwibmFtZSI6Ik1lc3NhZ2UifQ.eIKMZ_Okk4T7cqJOeVij8-PTU6rA_nTA2iha8Xk74hU";
    // const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
    // //const someData = `{\n"from": "${address}",\n"subject": "${subject}",\n"message": "${message}"\n}`;
    var someData = JSON.stringify({
      from: address,
      subject: subject,
      message: message,
    });
    // let response = await fetch("https://api.nft.storage/store", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${NFT_STORAGE_TOKEN}`,
    //   },

    //   body: formData,
    // });
    // response = await response.json();
    // console.log(response);
    // // date = Date.now();
    // // localStorage.setItem("date", date);
    // // // const time = new Date(Date.now() * 1000).toString();
    // // // console.log(time);
    // // // const cid = await client.storeBlob(someData);
    // const myObj = JSON.parse(someData);
    // console.log("Json for IPFS", myObj);

    // //Pinata function to pin the JSON to IPFS
    // //Variable to access return from Pinata API outside of fetch .then response scope
    // const response = await fetch(
    //   "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    //   {
    //     method: "POST", // or 'PUT'
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization:
    //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2NGU4ODA1Mi1iMzk0LTRhOTEtYThhYS1hYmJmM2MxYjA3MmYiLCJlbWFpbCI6ImFoZWVzaEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDJjZTRhMmQ4YjRiYjJhNzYzMTEiLCJzY29wZWRLZXlTZWNyZXQiOiJhYWEzNzY4NTNmNzUwYTU2NDUzOTEzMDE4NTUxNGQyZjkwOTY4ZGM0YTFjNDZjMjNmZmI0NDEyZGQ3NmVmODM3IiwiaWF0IjoxNjc3OTgzNDI1fQ.1PKgkQJyubgse_ceziT2BTqKTZazLDQTuGGKZBAmJCE",
    //       // pinata_api_key: "02ce4a2d8b4bb2a76311",
    //       // pinata_secret_api_key:
    //       //   "aaa376853f750a564539130185514d2f90968dc4a1c46c23ffb4412dd76ef837",
    //     },
    //     data: JSON.stringify(myObj),
    //   }
    // );
    // const responseJson = await response.json();
    // const time = responseJson.Timestamp.toString();
    // const date = time.substring(0, 10);
    // const cid = responseJson.IpfsHash;
    // localStorage.setItem("date", date);

    //Callback to wait for the pinata api to return ipfshash before moving to the next step.
    var config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: "02ce4a2d8b4bb2a76311",
        pinata_secret_api_key:
          "aaa376853f750a564539130185514d2f90968dc4a1c46c23ffb4412dd76ef837",
      },
      data: someData,
    };

    const res = await axios(config);

    console.log(res.data.I);
    const url = `https://ipfs.io/ipfs/${cid}`;
    console.log(url);

    // Mint NFT
    await mintImage(url);
    setLoading(false);
  };

  // this will call the addtoinbox in op3n contract
  const mintImage = async (tokenURI) => {
    try {
      const op3nContract = new ethers.Contract(Op3n, abi, signer);
      const tx = await op3nContract.sendMessage(to, tokenURI);
      const txReceipt = await tx.wait(1);

      // from
      //console.log(txReceipt.events[1].args[0].toString());
      // const timeStamp = txReceipt.events[1].args[3].toString();
      console.log("Sent");
    } catch (err) {
      console.error(err);
      return <div>Rejected Transaction!</div>;
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={submitHandler}>
        <label>
          To:
          <Input
            placeholder="0x..."
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>
        <label>
          Subject:
          <Input
            placeholder="NFT in your inventory"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>
        <label>
          Message:
          <Input
            placeholder="Hey, I really like that NFT in your inventory...want to trade?"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        {!loading ? (
          <div>
            <Button colorScheme="blue" type="submit">
              Send
            </Button>
          </div>
        ) : (
          <div>
            <Button
              isLoading
              loadingText="Minting"
              colorScheme="teal"
              variant="outline"
            />
          </div>
        )}
      </form>
    </>
  );
}

export default SendMessage;
