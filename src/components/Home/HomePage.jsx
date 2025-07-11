// src/components/Home/HomePage.jsx
import { HeroSection } from '@/HeroSection.jsx'
import { ReportsSection } from '@/ReportsSection.jsx'
import { FeaturesSection } from '@/FeaturesSection.jsx'

export function HomePage({ reports, setActiveTab }) {
    return (
        <div className="space-y-12">
            <HeroSection />
            <ReportsSection reports={reports} setActiveTab={setActiveTab} />
            <FeaturesSection />
        </div>
    )
}
