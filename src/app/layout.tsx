import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duuude",
  description: "Focus duuuuuuude",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ margin: 0, padding: 0, overflow: "hidden", height: "100vh" }}
      >
        {children}
      </body>
    </html>
  );
}
