import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liam Tennis App",
  description: "Track workouts and matches",
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}