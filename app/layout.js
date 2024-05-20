import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Admin Dashboard",
    description: "Admin Dashboard page",
};

export default function RootLayout({children}) {

    return (
        <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>{children}</body>
        </html>
    );
}
