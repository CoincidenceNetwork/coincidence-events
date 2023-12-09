import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const CardList = () => {
  const cards = [
    {
      id: 1,
      title: "Card 1",
      interests: ["Waku", "Public Good"],
      image: "https://dummyimage.com/200x200",
    },
    {
      id: 2,
      title: "Card 2",
      interests: ["Network State"],
      image: "https://dummyimage.com/200x200",
    },
    {
      id: 3,
      title: "Card 3",
      interests: ["Ethereum Attestation Service", "Public Good"],
      image: "https://dummyimage.com/200x200",
    },
    {
      id: 4,
      title: "Card 4",
      interests: ["Waku", "Public Good", "Network State"],
      image: "https://dummyimage.com/200x200",
    },
    {
      id: 5,
      title: "Card 5",
      interests: ["Waku", "Ethereum Attestation Service"],
      image: "https://dummyimage.com/200x200",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <a href="/profile">
          <Button>Create Profile</Button>
        </a>
      </div>
      {cards.map((card) => (
        <div
          key={card.id}
          className="rounded-xl border bg-card text-card-foreground shadow"
        >
          <div className="flex flex-col items-start space-y-1.5 p-6">
            <div className="flex w-full flex-row items-center justify-between space-x-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img
                    className="aspect-square h-full w-full"
                    alt="Image"
                    src="https://placeholder.com/200x200" // Replace with the actual image URL
                  />
                </span>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {card.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    description or bio
                  </p>
                </div>
              </div>
              <button
                className="ml-auto inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-full border border-input bg-transparent text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                data-state="closed"
              >
                <MessageCircle />
                <span className="sr-only">New message</span>
              </button>
            </div>

            {/* Interests Tabs */}
            <div className=" ml-2 flex flex-col">
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Common Interests
              </p>
              <div className="mt-2 flex gap-2">
                {card.interests.map((interest) => (
                  <Badge variant="secondary" key={interest}>
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProfilePage = () => {
  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col px-8 py-20">
        <CardList />
      </main>
      <BottomNavigation></BottomNavigation>
    </>
  );
};

export default ProfilePage;
