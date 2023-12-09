import { Link, MessageCircle, User } from "lucide-react";

const BottomNavigation = ({ disable }: { disable?: boolean }) => {
  if (disable) return <></>;

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <a href="/connect" className="flex flex-col items-center">
        <Link />
        <span className="text-xs">Connect</span>
      </a>
      <a href="/chat" className="flex flex-col items-center">
        <MessageCircle />
        <span className="text-xs">Chat</span>
      </a>
      <a href="/profile" className="flex flex-col items-center">
        <User />
        <span className="text-xs">Profile</span>
      </a>
    </nav>
  );
};

export default BottomNavigation;
