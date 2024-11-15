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
