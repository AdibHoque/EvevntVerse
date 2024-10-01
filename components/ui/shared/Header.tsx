import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import {Button} from "../button";

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={38}
          ></Image>
        </Link>
        <div className="flex justify-end gap-3 w-36">
          <SignedIn>
            <UserButton afterSwitchSessionUrl="/"></UserButton>
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
