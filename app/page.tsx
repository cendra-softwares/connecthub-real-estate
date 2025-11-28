import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { PropertyCategories } from "@/components/property-categories"
import { FeaturedProperties } from "@/components/featured-properties"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <PropertyCategories />
      <FeaturedProperties />
      <Footer />
    </div>
  )
}
