// src/components/Home/FeatureItem.jsx
import {Icon} from "@lobehub/ui";

export function FeatureItem({  title, description, colorClasses }) {
    return (
        <div className="text-center">
            <div className={`w-16 h-16 ${colorClasses} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400"/>
            </div>
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    )
}
