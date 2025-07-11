// src/components/Report/ReportContent.jsx
import { Separator } from '@/components/ui/separator.jsx'
import { Markdown } from '@lobehub/ui'
import { ReportHeader } from '@/ReportHeader.jsx'
export function ReportContent({ report }) {
    return (
        <div className="space-y-6">
            <ReportHeader report={report} />
            <Separator/>
            <Markdown 
                allowHtml={true}
                fontSize={16}
                fullFeaturedCodeBlock={true}
                headerMultiple={1}
                lineHeight={1.8}
                marginMultiple={2}
                enableLatex={true}
            >
                {report.content}
            </Markdown>
        </div>
    )
}
