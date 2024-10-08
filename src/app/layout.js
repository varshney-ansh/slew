import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const slew_font = IBM_Plex_Sans({
  weight: ['400', '700', '500', '100', '200', '300', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin']
});

export const metadata = {
  title: "Slew Search — The Privacy-Focused Search Engine",
  description: "Discover Slew Search, the privacy-focused search engine designed to protect your data while delivering accurate results. Experience secure browsing in a new way today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={slew_font.className}>{children}<div id="windowSystem" /></body>
    </html>
  );
}
