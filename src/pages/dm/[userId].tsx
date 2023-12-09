import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const App = () => {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const scrollToBottom = () => {
    scrollTo({ top: 2000, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);
      setInput("");
    }
  };

  // Log the dynamic URL
  const { userId } = router.query;
  console.log("userId:", userId);

  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col px-8 py-20">
        <div className="flex-grow overflow-y-auto px-4 pb-10 pt-72">
          <div className="flex flex-col space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-center rounded-lg px-3 py-2 shadow ${
                    message.sender === "user"
                      ? "ml-auto flex w-max max-w-[75%] flex-col gap-2 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
                      : "flex w-max max-w-[75%] flex-col gap-2 rounded-lg bg-muted px-3 py-2 text-sm"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form className="fixed bottom-0 left-0 flex w-full items-center space-x-2 border-t bg-background px-4 pb-16 pt-2">
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex h-9 w-full flex-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={input.trim() === ""}
            className="inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md bg-primary p-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <Send />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </main>
    </>
  );
};

interface Message {
  text: string;
  sender: "user" | "other";
}

export default App;
