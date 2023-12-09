import {
  CachedConversationWithId,
  Client,
  useConversations,
  useSendMessage,
  useStartConversation,
} from "@xmtp/react-sdk"; // import the required SDK hooks

import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEthersSigner } from "@/lib/ethers";
import { useClient } from "@xmtp/react-sdk";
import { useCallback, useState } from "react";
import { useAccount, useChainId } from "wagmi";

import type { CachedConversation, DecodedMessage } from "@xmtp/react-sdk";
import { useMessages } from "@xmtp/react-sdk";

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
  const [peerAddress, setPeerAddress] = useState<string>();
  const [selectedConversation, setSelectedConversation] =
    useState<CachedConversationWithId>();
  const { client, error, isLoading, initialize, disconnect } = useClient();
  const [isOnNetwork, setIsOnNetwork] = useState(false);

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
    async (message: string) => {
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
      if (newConversation && newConversation.cachedConversation) {
        setSelectedConversation(newConversation.cachedConversation);
      }
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
      alert("sending message");
      await sendMessage(conversation, newMessage);
    } else {
      alert("No conversation selected");
    }
  };

  const initXmtpWithKeys = async () => {
    const options = { env: getEnv() };
    console.log("initXmtpWithKeys1");

    if (!address) return;
    let keys: Uint8Array | null = null; // Initialize keys as null

    console.log("initXmtpWithKeys2");

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

    setIsOnNetwork(true);
    console.log("initXmtpWithKeys3");

    if (keys) {
      await initialize({ keys, options, signer });
    }
  };

  const canStartConversation = async (address: string) => {
    console.log(client?.address);
    console.log(address);
    const canMessageStatus = await client?.canMessage(address);
    if (canMessageStatus) {
      setPeerAddress(address);
      // setCanMessage(true);
      alert("Address is on the network ✅");
    } else {
      alert("Address is not on the network ❌");
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

        {conversations && conversations[0] && (
          <Messages conversation={conversations[0]} />
        )}

        <div className="flex flex-col gap-4">
          <Button
            onClick={() => {
              console.log(
                "🚀 ~ file: xmtp.tsx:201 ~ ProfilePage ~ filteredConversations:",
                conversations,
              );
            }}
          >
            filteredConversations
          </Button>

          {!isOnNetwork ? (
            <Button
              onClick={() => {
                initXmtpWithKeys();
              }}
            >
              initXmtpWithKeys
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  canStartConversation(
                    "0x5052936D3c98d2d045da4995d37B0DaE80C6F07f",
                  );
                }}
              >
                canStartConversation && createNewConversation
              </Button>
            </>
          )}

          <Separator />

          <Button
            onClick={() => {
              handleStartConversation("Hello");
            }}
          >
            handleStartConversation
          </Button>

          <Button
            onClick={() => {
              handleSendMessage("Hello");
            }}
          >
            handleSendMessage
          </Button>
        </div>
      </main>
      <BottomNavigation></BottomNavigation>
    </>
  );
};

export default ProfilePage;

const Messages = ({ conversation }: { conversation: CachedConversation }) => {
  // error callback
  const onError = useCallback((err: Error) => {
    // handle error
  }, []);

  // messages callback
  const onMessages = useCallback((msgs: DecodedMessage[]) => {
    // do something with messages
  }, []);

  const { error, messages, isLoading } = useMessages(conversation, {
    onError,
    onMessages,
  });

  if (error) {
    return (
      <div className="text-red-500">
        An error occurred while loading messages
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-blue-500">Loading messages...</div>;
  }

  return (
    <div className="mx-auto my-4 max-w-md rounded-lg bg-gray-100 p-4">
      <ul className="space-y-4">
        {messages.map((message) => (
          <li key={message.id} className="rounded-md bg-white p-4 shadow-md">
            <p className="text-gray-800">{message.content}</p>
            {/* Add more details or styles as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};
