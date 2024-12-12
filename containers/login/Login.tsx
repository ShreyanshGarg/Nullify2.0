"use client";

import { Button } from "antd";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoogleOutlined } from "@ant-design/icons";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;

  prompt(): Promise<void>;
}

const LoginPage = () => {
  const [prompt, setPrompt] = useState<Event | null>(null);
  const { data: session, status } = useSession();
  console.log(status);
  const router = useRouter();

  const installApp = () => {
    if (!prompt) return;
    (prompt as BeforeInstallPromptEvent)?.prompt();
  };

  useEffect(() => {
    const handlePrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handlePrompt);
    return () =>
      window.removeEventListener("beforeinstallprompt", handlePrompt);
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/friends");
    }
  }, [status, router]);

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-custom">
        <Button type="primary" onClick={installApp}>
          Download the App
        </Button>
        {status === "unauthenticated" && (
          <Button
            className="mt-4 !bg-[#283039] !border-[#283039]"
            onClick={() => signIn("google")}
          >
            <GoogleOutlined />
            Login with Google
          </Button>
        )}
      </div>
    </>
  );
};

export default LoginPage;