import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Home() {
  // TODO: if user already connected, redirect to /profile

  return (
    <>
      <UserList />
    </>
  );
}

const UserList = () => {
  return (
    <>
      <Header></Header>
      <div className="p-6 pt-0">
        <div className="flex flex-col gap-4 pt-4">
          {/* <SearchBar /> */}
          {/* Item */}
          {[1, 2, 3].map((item) => (
            <a href="/dm/jack">
              <div key={item} className="flex items-center">
                <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
                  <img
                    className="aspect-square h-full w-full"
                    alt="Avatar"
                    src="https://dummyimage.com/200x200"
                  />
                </span>
                <div className="ml-4 max-w-[70%] space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Jack Random
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    Fugiat minim consectetur incididunt incididunt asdf
                    asdfasdff sa
                  </p>
                </div>
                <div className="ml-auto font-medium">Chat</div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <BottomNavigation></BottomNavigation>
    </>
  );
};

const SearchBar = () => {
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
        placeholder="Type a command or search..."
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
        value=""
      />
    </div>
  );
};
