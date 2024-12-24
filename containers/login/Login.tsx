"use client";

import { Button, Form, Image, Input } from "antd";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoogleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";

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

  const handleBackClick = () => {
    router.push("/auth");
  };

  return (
    <>
      <div className="text-white flex-1 flex flex-col pt-0">
        <div>
          <div className="flex items-center bg-custom p-4 pb-0 justify-between">
            <ArrowLeftOutlined
              className="text-white"
              onClick={handleBackClick}
            />
          </div>
          <div className="text-center p-4">
            <p className="text-white text-xl leading-normal">
              Welcome back to Splitwise!
            </p>
            <p className="text-gray text-sm leading-normal break-words">
              Let's get started.
            </p>
          </div>
          <div className="p-4">
            <Form
              className=""
              initialValues={{
                splitOptions: "split_equally",
              }}
              // onFinish={onFinish}
            >
              <Form.Item
                label="Email Address"
                name="email"
                rules={[{ required: true }]}
                className="!mb-2"
              >
                <Input
                  placeholder="Email"
                  //   value={expense}
                  //   onChange={(e) => setExpense(e.target.value)}
                  className=" h-10 !bg-[#283039] text-white !placeholder-[#9caaba] !border-none"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
                className="!mb-2"
              >
                <Input
                  placeholder="Minimum 6 characters"
                  //   value={expense}
                  //   onChange={(e) => setExpense(e.target.value)}
                  className=" h-10 !bg-[#283039] text-white !placeholder-[#9caaba] !border-none"
                />
              </Form.Item>
              <Form.Item label={null}>
                <Button
                  type="primary"
                  className="w-full h-12 mt-4"
                  htmlType="submit"
                >
                  Log in
                </Button>
              </Form.Item>
              <div className="text-right mb-4 text-primary">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
