import "./globals.css";
import type { Metadata } from "next";
import { ClientProviders } from "@/components/providers";

export const metadata: Metadata = {
  title: "VisionBoard",
  description: "Dashboard responsive con ECharts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {/* aquí envolvemos TODO lo cliente */}
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}