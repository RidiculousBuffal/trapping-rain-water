// src/components/Report/ReportHeader.jsx
import { Button } from '@/components/ui/button.jsx'
import { Download } from 'lucide-react'

export function ReportHeader({ report }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${report.color} rounded-lg flex items-center justify-center`}>
                    <report.icon className="h-6 w-6 text-white"/>
                </div>
                <div>
                    <h1 className="text-3xl font-bold">{report.title}</h1>
                    <p className="text-muted-foreground">{report.description}</p>
                </div>
            </div>
            <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2"/>
                下载PDF
            </Button>
        </div>
    )
}
