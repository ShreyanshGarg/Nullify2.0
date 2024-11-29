import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const inter = Inter({ subsets: ["latin"] });

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
          <main className="flex-grow overflow-auto mt-[80px] sm:mt-[62px] lg:mt-[65px]">
            <ConfigProvider
              theme={{
                token: {
                  colorText: "#00224E",
                  colorPrimary: "#00224E",
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
