import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      <body>
        <div id="loader"></div>
        <div id="modal"></div>
        <ThemeProvider enableSystem={true} attribute="class">
          <Toaster position="bottom-center" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
