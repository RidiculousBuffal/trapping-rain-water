// src/components/Home/ReportCard.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'

export function ReportCard({ report, setActiveTab }) {
    const IconComponent = report.icon
    
    return (
        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader>
                <div
                    className={`w-12 h-12 ${report.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-6 w-6 text-white"/>
                </div>
                <CardTitle className="text-xl">{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button
                    style={{cursor: 'pointer'}}
                    className="w-full"
                    onClick={() => setActiveTab(report.id)}
                >
                    阅读报告
                </Button>
            </CardContent>
        </Card>
    )
}
