import ThresholdKey from '@tkey/core';
import SecurityQuestionsModule from '@tkey/security-questions';
import SFAServiceProvider from '@tkey/service-provider-sfa';
import TorusStorageLayer from '@tkey/storage-layer-torus';
import {ShareTransferModule} from '@tkey/share-transfer';
import {ShareSerializationModule} from '@tkey/share-serialization';
import {EthereumPrivateKeyProvider} from '@web3auth/ethereum-provider';
import {ReactNativeStorageModule} from '@tkey/react-native-storage';
import * as SecureStore from "expo-secure-store";

const clientId =
  'BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk'; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainId: '0x1',
  rpcTarget: 'https://rpc.ankr.com/eth',
  displayName: 'mainnet',
  blockExplorer: 'https://etherscan.io/',
  ticker: 'ETH',
  tickerName: 'Ethereum',
};

const web3AuthOptions: any = {
  clientId, // Get your Client ID from Web3Auth Dashboard
  chainConfig,
  web3AuthNetwork: 'testnet', // ["cyan", "testnet"]
};

// Configuration of Service Provider
const serviceProvider = new SFAServiceProvider({web3AuthOptions});

export const ethereumPrivateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig,
  },
});

// Instantiation of Storage Layer
const storageLayer = new TorusStorageLayer({
  hostUrl: 'https://metadata.tor.us',
});

// Configuration of Modules
const reactNativeStorageModule = new ReactNativeStorageModule(SecureStore);
const shareTransferModule = new ShareTransferModule();
const shareSerializationModule = new ShareSerializationModule();
const securityQuestionsModule = new SecurityQuestionsModule();

// Instantiation of tKey
export const tKeyInstance = new ThresholdKey({
  serviceProvider,
  storageLayer,
  modules: {
    reactNativeStorage: reactNativeStorageModule,
    shareTransfer: shareTransferModule,
    securityQuestions: securityQuestionsModule,
    shareSerialization: shareSerializationModule,
  },
});
