import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

export const metadata: Metadata = {
  title: "PWA App",
  description: "PWA App",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <main className="flex-grow overflow-auto bg-[#111418]">
            <ConfigProvider
              theme={{
                token: {
                  colorText: "#FFFFFF",
                  colorPrimary: "#B57EDC",
                },
              }}
            >
              {children}
            </ConfigProvider>
          </main>
        </AntdRegistry>
      </body>
    </html>
  );
}
