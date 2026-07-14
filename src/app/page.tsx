import "animate.css";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedItems from "@/components/home/FeaturedItems";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import HowItWorks from "@/components/home/HowItWorks";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
    return (
        <>
            <HeroBanner />
            <FeaturedItems />
            <CategoriesGrid />
            <HowItWorks />
            <Statistics />
            <Testimonials />
            <CTASection />
        </>
    );
}
