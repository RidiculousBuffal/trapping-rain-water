// src/components/Home/ReportsSection.jsx
import { ReportCard } from './ReportCardComponent.jsx'

export function ReportsSection({ reports, setActiveTab }) {
    return (
        <section>
            <h2 className="text-3xl font-bold mb-8 text-center">研究报告</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {reports.map((report) => (
                    <ReportCard 
                        key={report.id} 
                        report={report} 
                        setActiveTab={setActiveTab} 
                    />
                ))}
            </div>
        </section>
    )
}
