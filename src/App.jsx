import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { InlineMath, BlockMath } from 'react-katex'
import Prism from 'prismjs'
import { 
  BookOpen, 
  Calculator, 
  Layers, 
  Infinity, 
  Download,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react'
import './App.css'
import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-cpp'

// 导入报告内容
import report2D from './assets/二维接雨水问题详细报告.md?raw'
import report3D from './assets/三维接雨水问题详细报告.md?raw'
import reportND from './assets/N维接雨水问题详细报告.md?raw'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // 高亮代码块
    Prism.highlightAll()
  }, [activeTab])

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
      icon: Infinity,
      content: reportND,
      color: 'bg-purple-500'
    }
  ]

  const renderMarkdown = (content) => {
    const lines = content.split('\n')
    const result = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // 处理代码块
      if (line.startsWith('```')) {
        const language = line.slice(3).trim() || 'text'
        const codeLines = []
        i++ // 跳过开始标记

        // 收集代码块内容
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i])
          i++
        }

        const codeContent = codeLines.join('\n')
        result.push(
          <div key={i} className="my-6">
            <pre className="rounded-lg overflow-x-auto bg-gray-900 p-4">
              <code className={`language-${language}`} style={{ color: '#f8f8f2' }}>
                {codeContent}
              </code>
            </pre>
          </div>
        )

        i++ // 跳过结束标记
        continue
      }

      // 处理其他内容
      if (line.startsWith('# ')) {
        result.push(<h1 key={i} className="text-4xl font-bold mb-6 text-primary">{line.slice(2)}</h1>)
      } else if (line.startsWith('## ')) {
        result.push(<h2 key={i} className="text-3xl font-semibold mb-4 mt-8 text-primary">{line.slice(3)}</h2>)
      } else if (line.startsWith('### ')) {
        result.push(<h3 key={i} className="text-2xl font-semibold mb-3 mt-6 text-primary">{line.slice(4)}</h3>)
      } else if (line.startsWith('#### ')) {
        result.push(<h4 key={i} className="text-xl font-semibold mb-2 mt-4 text-primary">{line.slice(5)}</h4>)
      } else if (line.startsWith('**') && line.endsWith('**')) {
        result.push(<p key={i} className="font-bold mb-2">{line.slice(2, -2)}</p>)
      } else if (line.startsWith('$$') && line.endsWith('$$')) {
        const math = line.slice(2, -2).trim()
        try {
          result.push(
            <div key={i} className="my-6 flex justify-center">
              <BlockMath math={math} />
            </div>
          )
        } catch (e) {
          result.push(
            <div key={i} className="my-4 p-4 bg-muted rounded-lg">
              <code className="text-sm font-mono">{math}</code>
            </div>
          )
        }
      } else if (line.includes('$') && !line.startsWith('$$')) {
        // 行内数学公式
        const parts = line.split('$')
        result.push(
          <p key={i} className="mb-2">
            {parts.map((part, j) => 
              j % 2 === 1 ? 
                <InlineMath key={j} math={part} /> : 
                part
            )}
          </p>
        )
      } else if (line.trim() === '') {
        result.push(<br key={i} />)
      } else if (line.startsWith('| ')) {
        // 表格行
        const cells = line.split('|').slice(1, -1)
        if (!cells.some(cell => cell.includes('---'))) {
          result.push(
            <div key={i} className="grid grid-cols-5 gap-2 mb-1 text-sm">
              {cells.map((cell, j) => (
                <div key={j} className="p-2 border rounded">{cell.trim()}</div>
              ))}
            </div>
          )
        }
      } else if (line.trim() !== '') {
        result.push(<p key={i} className="mb-2 leading-relaxed">{line}</p>)
      }

      i++
    }

    return result
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground">
        {/* 导航栏 */}
        <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <BookOpen className="h-8 w-8 text-primary" />
                <h1 className="text-xl font-bold">接雨水问题研究</h1>
              </div>
              
              {/* 桌面导航 */}
              <div className="hidden md:flex items-center space-x-6">
                <Button 
                  variant={activeTab === 'home' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('home')}
                >
                  首页
                </Button>
                {reports.map(report => (
                  <Button 
                    key={report.id}
                    variant={activeTab === report.id ? 'default' : 'ghost'}
                    onClick={() => setActiveTab(report.id)}
                  >
                    {report.title}
                  </Button>
                ))}
                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>

              {/* 移动端菜单按钮 */}
              <div className="md:hidden flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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

        {/* 主要内容 */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'home' && (
            <div className="space-y-12">
              {/* 英雄区域 */}
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
                  <Badge variant="secondary" className="text-sm px-3 py-1">代码高亮</Badge>
                </div>
              </section>

              {/* 报告卡片 */}
              <section>
                <h2 className="text-3xl font-bold mb-8 text-center">研究报告</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {reports.map((report) => {
                    const IconComponent = report.icon
                    return (
                      <Card key={report.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                        <CardHeader>
                          <div className={`w-12 h-12 ${report.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <CardTitle className="text-xl">{report.title}</CardTitle>
                          <CardDescription>{report.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button 
                            className="w-full"
                            onClick={() => setActiveTab(report.id)}
                          >
                            阅读报告
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </section>

              {/* 特性介绍 */}
              <section className="py-12">
                <h2 className="text-3xl font-bold mb-8 text-center">研究特色</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold mb-2">数学建模</h3>
                    <p className="text-sm text-muted-foreground">严格的数学建模和理论分析</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Layers className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold mb-2">算法设计</h3>
                    <p className="text-sm text-muted-foreground">多种算法方案的设计与实现</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Infinity className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold mb-2">维度扩展</h3>
                    <p className="text-sm text-muted-foreground">从低维到高维的理论扩展</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="font-semibold mb-2">代码高亮</h3>
                    <p className="text-sm text-muted-foreground">专业的代码高亮和数学公式渲染</p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* 报告内容 */}
          {reports.map(report => (
            activeTab === report.id && (
              <div key={report.id} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${report.color} rounded-lg flex items-center justify-center`}>
                      <report.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold">{report.title}</h1>
                      <p className="text-muted-foreground">{report.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    下载PDF
                  </Button>
                </div>
                
                <Separator />
                
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    {renderMarkdown(report.content)}
                  </div>
                </ScrollArea>
              </div>
            )
          ))}
        </main>

        {/* 页脚 */}
        <footer className="bg-muted/50 border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-muted-foreground">
                © 2025 接雨水问题研究. 由 Manus AI 创建 - 现已支持代码高亮
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App

