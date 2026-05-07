// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "@/app/globals.css";
// import Navbar from "@/components/Navbar";
// import WhatsAppButton from "@/components/WhatsAppButton";
// import { MessageCircle } from "lucide-react";
// import Footer from "@/components/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   metadataBase: new URL("https://brookncook.vercel.app"),
//   title: "Brook’n’Cook | Pâtisserie fait maison à El Mourouj 🍪",
//   description: "Découvrez nos cookies et brownies faits maison à El Mourouj. Sans conservateur, sans colorant, pur beurre. Commandez facilement sur WhatsApp.",
//   verification: {google: "yFZUA93TzaJL0KayzlPMZrA5D8qWt39dAVvMBwZWTTI",},
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
//       <body className="min-h-screen flex flex-col">
//         <main className="flex-grow">
//           <Navbar />{children}<WhatsAppButton />
//         </main>
//         <Footer />
//       </body>
//     </html>
//   );
// }

import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {children}
      </main>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}