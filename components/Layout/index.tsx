import { ReactNode } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navigation />

      {/* Container */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-24">{children}</div>
      </div>

      <Footer />
    </div>
  );
}
