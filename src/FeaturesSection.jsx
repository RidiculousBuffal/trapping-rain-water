// src/components/Home/FeaturesSection.jsx
import { Calculator, Layers, InfinityIcon, BookOpen } from 'lucide-react'
import { FeatureItem } from './FeatureItem.jsx'

export function FeaturesSection() {
    const features = [
        {
            icon: Calculator,
            title: '数学建模',
            description: '严格的数学建模和理论分析',
            colorClasses: 'bg-blue-100 dark:bg-blue-900'
        },
        {
            icon: Layers,
            title: '算法设计',
            description: '多种算法方案的设计与实现',
            colorClasses: 'bg-green-100 dark:bg-green-900'
        },
        {
            icon: InfinityIcon,
            title: '维度扩展',
            description: '从低维到高维的理论扩展',
            colorClasses: 'bg-purple-100 dark:bg-purple-900'
        },
        {
            icon: BookOpen,
            title: '代码高亮',
            description: '专业的代码高亮和数学公式渲染',
            colorClasses: 'bg-orange-100 dark:bg-orange-900'
        }
    ]

    return (
        <section className="py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">研究特色</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature) => (
                    <FeatureItem
                        key={feature.title}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        colorClasses={feature.colorClasses}
                    />
                ))}
            </div>
        </section>
    )
}
