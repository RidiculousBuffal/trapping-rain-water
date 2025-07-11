// src/components/Layout/Navbar.jsx
import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { BookOpen, Sun, Moon, Menu, X } from 'lucide-react'

export function Navbar({ 
    darkMode, 
    activeTab, 
    setActiveTab, 
    toggleDarkMode, 
    reports 
}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                        <BookOpen className="h-8 w-8 text-primary"/>
                        <h1 className="text-xl font-bold">接雨水问题研究</h1>
                    </div>

                    {/* 桌面导航 */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Button
                            style={{cursor: 'pointer'}}
                            variant={activeTab === 'home' ? 'default' : 'ghost'}
                            onClick={() => setActiveTab('home')}
                        >
                            首页
                        </Button>
                        {reports.map(report => (
                            <Button
                                style={{cursor: 'pointer'}}
                                key={report.id}
                                variant={activeTab === report.id ? 'default' : 'ghost'}
                                onClick={() => setActiveTab(report.id)}
                            >
                                {report.title}
                            </Button>
                        ))}
                        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                            {darkMode ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
                        </Button>
                    </div>

                    {/* 移动端菜单按钮 */}
                    <div className="md:hidden flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                            {darkMode ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
                        </Button>
                    </div>
                </div>
            </div>

            {/* 移动端菜单 */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-background border-t">
                    <div className="px-4 py-2 space-y-2">
                        <Button
                            variant={activeTab === 'home' ? 'default' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => {
                                setActiveTab('home')
                                setMobileMenuOpen(false)
                            }}
                        >
                            首页
                        </Button>
                        {reports.map(report => (
                            <Button
                                key={report.id}
                                variant={activeTab === report.id ? 'default' : 'ghost'}
                                className="w-full justify-start"
                                onClick={() => {
                                    setActiveTab(report.id)
                                    setMobileMenuOpen(false)
                                }}
                            >
                                {report.title}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}
