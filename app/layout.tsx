import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import BottomNavigation from "../components/BottomNavigation";

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
      <body className="bg-[#111418] h-screen">
        <main className="flex h-full w-full">
          <div className="sm:block">
            <BottomNavigation />
          </div>
          <div className="flex-grow">
            <AntdRegistry>
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
            </AntdRegistry>
          </div>
        </main>

      </body>
    </html>
  );
}
