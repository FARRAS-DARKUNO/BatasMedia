import AboutUs from "@/components/AboutUs";
import CategoriesSection from "@/components/CategoriesSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LatestNewsSection from "@/components/LatestNewsSection";
import LifestyleSection from "@/components/LifestyleSection";
// Import lainnya

export default function HomePage() {
  return (
    <main
      className="w-full min-h-screen bg-[url('/bg2.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <Header />
      <div className="container mx-auto px-4 max-w-screen-xl">
        <HeroSection />
        <LatestNewsSection />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <LifestyleSection />
          </div>
          <div className="space-y-10">
            <CategoriesSection />
            <AboutUs />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}








