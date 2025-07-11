
import { useState } from 'react'
import { Calculator, Layers, InfinityIcon } from 'lucide-react'
import './App.css'

// 导入报告内容
import report2D from './assets/二维接雨水问题详细报告.md?raw'
import report3D from './assets/三维接雨水问题详细报告.md?raw'
import reportND from './assets/N维接雨水问题详细报告.md?raw'

// 导入组件
import { Navbar } from './components/Layout/Navbar.jsx'
import { Footer } from './components/Layout/Footer.jsx'
import { HomePage } from './components/Home/HomePage.jsx'
import { ReportContent } from './components/Report/ReportContent.jsx'

function App() {
    const [darkMode, setDarkMode] = useState(false)
    const [activeTab, setActiveTab] = useState('home')

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        document.documentElement.classList.toggle('dark')
    }

    const reports = [
        {
            id: '2d',
            title: '二维接雨水问题',
            description: '深入分析二维接雨水问题的数学建模、算法实现和复杂度分析',
            icon: Calculator,
            content: report2D,
            color: 'bg-blue-500'
        },
        {
            id: '3d',
            title: '三维接雨水问题',
            description: '探讨三维接雨水问题的理论框架、算法设计和工程应用',
            icon: Layers,
            content: report3D,
            color: 'bg-green-500'
        },
        {
            id: 'nd',
            title: 'N维接雨水问题',
            description: '从理论角度分析N维接雨水问题的数学意义和通用算法框架',
            icon: InfinityIcon,
            content: reportND,
            color: 'bg-purple-500'
        }
    ]

    const renderMainContent = () => {
        if (activeTab === 'home') {
            return <HomePage reports={reports} setActiveTab={setActiveTab} />
        }

        const currentReport = reports.find(report => report.id === activeTab)
        if (currentReport) {
            return <ReportContent report={currentReport} />
        }

        return null
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
            <div className="bg-background text-foreground">
                <Navbar
                    darkMode={darkMode}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    toggleDarkMode={toggleDarkMode}
                    reports={reports}
                />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {renderMainContent()}
                </main>

                <Footer />
            </div>
        </div>
    )
}

export default App