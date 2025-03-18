import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "pii.email — Yönetici ",
  description: "Güvenli, hızlı ve özel bulut depolama çözümü. Verilerinizi güvenle saklayın ve paylaşın.",
};

export default function BulutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
} 