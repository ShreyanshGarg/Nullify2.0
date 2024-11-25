export const metadata = {
  title: "Nullify",
  description: "Bill Splitting made easy",
  manifest: "/manifest.json",
  icons: {
    apple: "/img.png",
  },
  themeColor: "#ffffff",
  applicationName: "Nullify",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>{children}</body>
    </html>
  );
}
