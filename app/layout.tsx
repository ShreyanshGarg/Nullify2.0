'use client'
import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import BottomNavigation from "../components/BottomNavigation";
import { Provider } from "react-redux";
import { store } from "@/provider/redux/store";
import { AuthProvider } from "./lib/AuthProvider";

// export const metadata: Metadata = {
//   title: "PWA App",
//   description: "PWA App",
//   manifest: "/manifest.json",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#111418] h-screen flex flex-col">
        <Provider store={store}>
          <AuthProvider>
            <div className="flex-grow overflow-y-auto px-4">
              {/* Middle Content with Scroll */}
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

            {/* Bottom Navigation */}
            <div className="sm:block">
              <BottomNavigation />
            </div>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
