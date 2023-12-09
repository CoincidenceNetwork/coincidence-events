import {
  Client,
  useConversations,
  useSendMessage,
  useStartConversation,
} from "@xmtp/react-sdk"; // import the required SDK hooks

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { useEthersSigner } from "@/lib/ethers";
import { useClient } from "@xmtp/react-sdk";
import { useCallback, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import BottomNavigation from "@/components/bottom-navigation";

type Environment = "dev" | "production" | "local";

const ENCODING = "binary";

export const getEnv = () => {
  // "dev" | "production" | "local"

  return "dev" as Environment;
  // return typeof process !== undefined && process.env.REACT_APP_XMTP_ENV
  //   ? process.env.REACT_APP_XMTP_ENV
  //   : "production";
};
export const buildLocalStorageKey = (walletAddress: string) => {
  return walletAddress ? `xmtp:${getEnv()}:keys:${walletAddress}` : "";
};

export const loadKeys = (walletAddress: string) => {
  const val = localStorage.getItem(buildLocalStorageKey(walletAddress));
  return val ? Buffer.from(val, ENCODING) : null;
};

export const storeKeys = (walletAddress: string, keys: Uint8Array) => {
  localStorage.setItem(
    buildLocalStorageKey(walletAddress),
    Buffer.from(keys).toString(ENCODING),
  );
};

export const wipeKeys = (walletAddress: string) => {
  localStorage.removeItem(buildLocalStorageKey(walletAddress));
};

const ProfilePage = () => {
  const { address } = useAccount();
  const chainId = useChainId();
  const signer = useEthersSigner({ chainId: chainId });
  const [searchTerm, setSearchTerm] = useState("");
  const [peerAddress, setPeerAddress] = useState();
  const [selectedConversation, setSelectedConversation] = useState<any>();
  const { client, error, isLoading, initialize, disconnect } = useClient();

  const { startConversation } = useStartConversation();
  const { conversations } = useConversations();

  // const { messages, isLoading } = useMessages(conversation);
  const { sendMessage } = useSendMessage();

  const filteredConversations = conversations.filter(
    (conversation, index, array) => {
      return conversation.peerAddress
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    },
  );

  const handleStartConversation = useCallback(
    async (message: string, peerAddress: string) => {
      console.log(message);
      if (!message.trim()) {
        alert("Empty message");
        return;
      }
      if (!peerAddress) {
        alert("No peer address provided");
        return;
      }
      const newConversation = await startConversation(peerAddress, message);
    },
    [peerAddress, startConversation],
  );

  const handleSendMessage = async (newMessage: string) => {
    if (!newMessage.trim()) {
      alert("empty message");
      return;
    }

    const conversation = conversations[0];

    if (conversation && conversation.peerAddress) {
      await sendMessage(conversation, newMessage);
    }
  };

  const createNewConversation = async () => {
    setSelectedConversation({ messages: [] });
  };

  const initXmtpWithKeys = async () => {
    const options = { env: getEnv() };

    if (!address) return;
    let keys: Uint8Array | null = null; // Initialize keys as null

    if (!keys && signer) {
      keys = await Client.getKeys(signer, {
        ...options,
        skipContactPublishing: true,
        persistConversations: false,
      });
      if (keys) {
        storeKeys(address, keys);
      }
      storeKeys(address, keys);
    }

    if (keys) {
      await initialize({ keys, options, signer });
    }
  };

  return (
    <>
      <Header></Header>
      <main className="container flex min-h-[calc(100vh-64px)] w-full flex-col px-8 py-4">
        {conversations.map((conversation, index) => (
          <li
            key={index}
            className="cursor-pointer border-b p-4 hover:bg-gray-100"
            onClick={() => {
              // selectConversation(conversation);
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold">
                  {conversation.peerAddress.substring(0, 6) +
                    "..." +
                    conversation.peerAddress.slice(-4)}
                </span>
                <span className="text-xs text-gray-500">...</span>
              </div>
              <div className="text-xs text-gray-500">
                {/* {getRelativeTimeLabel(conversation.createdAt)} */}
              </div>
            </div>
          </li>
        ))}

        <Button
          onClick={() => {
            handleStartConversation(
              "Hello",
              "0x746368499d51521eeAEE57cF007382d8C39E511a",
            );
          }}
        >
          handleStartConversation
        </Button>

        <Button
          onClick={() => {
            createNewConversation();
          }}
        >
          createNewConversation
        </Button>

        <Button
          onClick={() => {
            handleSendMessage("Hello");
          }}
        >
          handleSendMessage
        </Button>
      </main>
      <BottomNavigation></BottomNavigation>
    </>
  );
};

export default ProfilePage;
