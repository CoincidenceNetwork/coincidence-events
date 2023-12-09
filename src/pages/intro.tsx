import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";

export default function Home() {


  // TODO: if user already connected, redirect to /profile
  

  return (
    <>
      <main
        className="flex min-h-[calc(100vh-64px)] w-full flex-col px-8 py-20"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww)`,
        }}
      >
        <div className="min-h-screen bg-cover bg-center">
          {/* The content of your app */}
          <div className="container flex w-full flex-col gap-4 py-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              WELCOME TO COINCIDENCE!
            </h1>
            <h2 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              How it works
            </h2>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              <li>
                Coincidence helps with team formation, connecting with new
                friends and collaborators
              </li>
              <li>add your interests</li>
              <li>connect with people sharing these interests</li>
              <li>chat with your new friends</li>
            </ul>
            <Button
              onClick={() => {
                // TODO: web3auth connect
                alert("hello");
              }}
            >
              Connect
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
