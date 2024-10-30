import { LoginButton } from "../components/auth/login-button";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { Poppins } from "next/font/google";
import { FaLock } from "react-icons/fa";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main>
      <div className="space-y-6 text-center">
        <div
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md flex items-center gap-4 justify-center",
            font.className
          )}
        >
          <FaLock className="aria-hidden" />
          <h1>Auth</h1>
        </div>

        <p className="text-white text-lg">A simple auth service</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
