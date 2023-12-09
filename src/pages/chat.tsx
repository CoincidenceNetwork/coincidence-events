import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { useEthersSigner } from "@/lib/ethers";
import { shortenEthereumAddress } from "@/lib/utils";
import {
  CachedConversationWithId,
  Client,
  useClient,
  useConversations,
  useSendMessage,
  useStartConversation,
} from "@xmtp/react-sdk";
import { Dispatch, SetStateAction, useState } from "react";
import { useAccount, useChainId } from "wagmi";

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

export default function Home() {
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
  return (
    <>
      <Header></Header>
      <div className="p-6 pt-0">
        <div className="flex flex-col gap-4 pt-4">
          {!isOnNetwork ? (
            <Button
              onClick={() => {
                initXmtpWithKeys();
              }}
            >
              Connect to XMTP
            </Button>
          ) : (
            <>
              <UserList />
            </>
          )}
        </div>
      </div>
      <BottomNavigation></BottomNavigation>
    </>
  );
}

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
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

  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* Item */}
      {filteredConversations.map((conversation, i) => (
        <a key={i} href="/dm/jack">
          <div className="flex items-center">
            <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
              <img
                className="aspect-square h-full w-full"
                alt="Avatar"
                src="https://dummyimage.com/200x200"
              />
            </span>
            <div className="ml-4 max-w-[70%] space-y-1">
              <p className="text-sm font-medium leading-none">
                {shortenEthereumAddress(conversation.peerAddress)}
              </p>
              <p className="truncate text-sm text-muted-foreground">
                {conversation.createdAt.toISOString()}
              </p>
            </div>
            <div className="ml-auto font-medium">Chat</div>
          </div>
        </a>
      ))}
    </>
  );
};

const SearchBar = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2 h-4 w-4 shrink-0 opacity-50"
      >
        <path
          d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
      <input
        className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="search chat"
        cmdk-input=""
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        aria-autocomplete="list"
        role="combobox"
        aria-expanded="true"
        aria-controls=":ran:"
        aria-labelledby=":rao:"
        id=":rap:"
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </div>
  );
};
