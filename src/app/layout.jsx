import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Providers } from "@/redux/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Game Crm",
  description: "Game Crm",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
