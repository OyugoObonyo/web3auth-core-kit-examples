import { useEffect, useState } from "react";
import { IdTokenLoginParams, parseToken, COREKIT_STATUS } from "@web3auth/mpc-core-kit";
import Web3 from 'web3';
import type { provider } from "web3-core";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { FirebaseService } from "../lib/firebase";
import { coreKitInstance } from "../lib/mpcCore";
import { uiConsole } from "../lib/utils";
import { Link } from "react-router-dom";

const firebaseSerive = new FirebaseService();

export default function Home() {
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [web3, setWeb3] = useState<any>(undefined)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [senderAddress, setSenderAddress ] = useState("")
  const [receiverAddress, setReceiverAddress ] = useState("")
  const [amount, setAmount] = useState("") 

  useEffect(() => {
    const init = async () => {
      await coreKitInstance.init();
     
      if (coreKitInstance.provider) {
        setProvider(coreKitInstance.provider);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (provider) {
      const web3 = new Web3(provider as provider);
      setWeb3(web3);
    }
  }, [provider])

  const getAccount = async () => {
    if (!web3) {
      alert("web3 not initialized yet");
      return;
    }
    const address = (await web3.eth.getAccounts())[0];
    alert(`Your wallet address is: ${address}`)
    return address;
  };

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const loggedInUser = await firebaseSerive.loginWithEmailAndPassword(
      email,
      password
    );
    const userIdToken = await loggedInUser.getIdToken(true);
    const parsedToken = parseToken(userIdToken);
    const idTokenLoginParams: IdTokenLoginParams = {
      verifier: "web3auth-firebase-demo-oyugo",
      verifierId: parsedToken.sub!,
      idToken: userIdToken,
    };
    await coreKitInstance.loginWithJWT(idTokenLoginParams);
    if (coreKitInstance.provider) {
        setProvider(coreKitInstance.provider);
    }
  }

  async function handleLogout(){
    if (!coreKitInstance) {
      throw new Error("coreKitInstance not found");
    }
    await coreKitInstance.logout();
    setProvider(null);
  }

  async function sendTransaction(e: React.FormEvent) {
    e.preventDefault();
    if (!web3) {
      uiConsole("web3 not initialized yet");
      return;
    }
    const receipt = await web3.eth.sendTransaction({
      from: senderAddress,
      to: receiverAddress,
      value: web3.utils.toWei(amount),
    });
    alert(`Your transaction summary: ${receipt}`);
  }

  async function getBalance () {
    if (!web3) {
      uiConsole("web3 not initialized yet");
      return;
    }
    const address = (await web3.eth.getAccounts())[0];
    const balance = web3.utils.fromWei(
      await web3.eth.getBalance(address)
    );
    alert(`Your account balance: ${balance}`);
    return balance;
  };

  const unauthenticatedView = 
    <div className="flex flex-col justify-center min-h-screen items-center m-auto p-3">
      <form
        onSubmit={handleLogin}
        className="border-y-2 border-green-400 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="email"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-green-400  hover:bg-green-700 text-black font-bold py-2  px-4 rounded  focus:outline-none  focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
      <span className="hover:text-green-400">
       No account? <Link to="/signup">Register</Link>
      </span>
    </div>
    

    const authenticatedView = 
    <div>
      <header className="flex space-x-4">
        <button onClick={getAccount} className="text-black text-center p-2 bg-green-400">Wallet Address</button>
        <button onClick={getBalance} className="text-black text-center p-2  bg-green-400">Wallet Balance</button>
        <button onClick={handleLogout} className="text-black text-center p-2  bg-green-400">Log Out</button>
      </header>
      <div className="flex justify-center min-h-screen items-center m-auto p-3">
    <form
      onSubmit={sendTransaction}
      className="w-3/6 border-y-2 border-green-400 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="senderAddress"
        >
          From
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id="senderAddress"
          type="text"
          placeholder="0xCfE80B560b5760bb0016183b392f42aE1832e931"
          onChange={(e) => {
            setSenderAddress(e.target.value);
          }}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="receiverAddress"
        >
          To
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id="receiverAddress"
          type="text"
          placeholder="0xD611E20Db42d95fEcBf2FE38Dba10599b2b3187e"
          onChange={(e) => {
            setReceiverAddress(e.target.value);
          }}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="amount"
        >
          Amount
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id="amount"
          type="text"
          placeholder="0.001"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-green-400  hover:bg-green-700 text-black font-bold py-2  px-4 rounded  focus:outline-none  focus:shadow-outline"
          type="submit"
        >
          Send Tokens
        </button>
      </div>
    </form>
  </div>
    </div>

  return provider? authenticatedView : unauthenticatedView
}
