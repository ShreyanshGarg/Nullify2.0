"use client";

import { Button } from "antd";
import { useEffect, useState } from "react";
import { AndroidOutlined } from "@ant-design/icons";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;

  prompt(): Promise<void>;
}

const InstallButton = () => {
  const [prompt, setPrompt] = useState<Event | null>(null);

  const installApp = () => {
    console.log(prompt);
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

  return (
    <>
      <Button
        className="h-10 p-4 mt-1 !bg-[#283039] !border-[#283039] !text-white text-sm font-bold leading-normal tracking-[0.015em]"
        onClick={installApp}
      >
        <AndroidOutlined />
        Get the App
      </Button>
    </>
  );
};

export default InstallButton;
