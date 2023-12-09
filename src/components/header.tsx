import { Croissant, User } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
    >
      <nav className="container flex h-14 items-center justify-between">
        <Link className="flex flex-row gap-2" href="/">
          <Croissant />
          <div className="font-bold">Coincidence</div>
        </Link>
        <Link href="/profile">
          <User />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
