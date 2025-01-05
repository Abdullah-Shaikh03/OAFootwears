import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import SessionProvider from "@/components/SessionProvider";
import ThemeProvider from "@/components/theme-provider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "OAFootwears",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(authOptions)) as Session & { expires: string };

  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body
        className={`${montserrat.className} min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800`}
      >
        <ThemeProvider>
          <SessionProvider session={session}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
              <footer className="bg-white dark:bg-gray-800 shadow-lg mt-auto">
                <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-300">
                  &copy; {new Date().getFullYear()} OAFootwears. All
                  rights reserved.
                </div>
              </footer>
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
