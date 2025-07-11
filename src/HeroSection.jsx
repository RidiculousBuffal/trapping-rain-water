// src/components/Home/HeroSection.jsx
import { Badge } from '@/components/ui/badge.jsx'

export function HeroSection() {
    return (
        <section className="text-center py-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                接雨水问题研究
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                深入探索从一维到N维接雨水问题的数学建模、算法设计与理论分析
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="text-sm px-3 py-1">算法研究</Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1">数学建模</Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1">复杂度分析</Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1">理论计算机科学</Badge>

            </div>
        </section>
    )
}
