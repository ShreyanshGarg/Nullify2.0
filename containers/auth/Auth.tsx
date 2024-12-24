"use client";

import { Button, Image } from "antd";
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

const AuthPage = () => {
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
        {/* <div>
          <Image
            src="/image.jpeg"
            alt="App Logo"
            width={250}
            height={200}
            className="mb-18 mr-3"
          />
        </div> */}

        {/* <Button type="primary" onClick={installApp}>
          Download the App
        </Button> */}
        {status === "unauthenticated" && (
          <div className="mt-[10rem]">
          <Button
          size="large"
          className="mt-4 !bg-[#B57EDC] !border-[#283039] w-full"
          onClick={() => router.push('/signup')}
        >
          Sign Up
        </Button>
        <Button
        size="large"
        className="mt-4 !bg-[#283039] !border-[#283039] w-full"
        onClick={() => router.push('/login')}
      >
        Log in
      </Button>
          <Button
          size="large"
            className="mt-4 !bg-[#283039] !border-[#283039] w-full"
            onClick={() => signIn("google")}
          >
            <GoogleOutlined />
            Sign in with Google
          </Button> 
          </div>
         
        )}
      </div>
    </>
  );
};

export default AuthPage;
