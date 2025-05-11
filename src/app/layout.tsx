
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // Changed from Unbounded
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const geistSans = GeistSans; // Changed from Unbounded
const geistMono = GeistMono; 

export const metadata: Metadata = {
  title: 'PixelsFlow Portfolio',
  description: 'Creative Design and Development by PixelsFlow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow pt-20"> {/* Add padding-top to avoid overlap with fixed navbar */}
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

