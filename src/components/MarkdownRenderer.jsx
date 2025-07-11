import React, { useEffect } from 'react'
import { InlineMath, BlockMath } from 'react-katex'
import Prism from 'prismjs'
import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'

const MarkdownRenderer = ({ content }) => {
  useEffect(() => {
    // 延迟执行高亮，确保DOM已渲染
    setTimeout(() => {
      Prism.highlightAll()
    }, 100)
  }, [content])

  const renderLine = (line, index) => {
    // 处理标题
    if (line.startsWith('# ')) {
      return <h1 key={index} className="text-4xl font-bold mb-6 mt-8 text-primary">{line.slice(2)}</h1>
    }
    if (line.startsWith('## ')) {
      return <h2 key={index} className="text-3xl font-semibold mb-4 mt-8 text-primary">{line.slice(3)}</h2>
    }
    if (line.startsWith('### ')) {
      return <h3 key={index} className="text-2xl font-semibold mb-3 mt-6 text-primary">{line.slice(4)}</h3>
    }
    if (line.startsWith('#### ')) {
      return <h4 key={index} className="text-xl font-semibold mb-2 mt-4 text-primary">{line.slice(5)}</h4>
    }

    // 处理独立数学公式
    if (line.startsWith('$$') && line.endsWith('$$')) {
      const math = line.slice(2, -2).trim()
      try {
        return (
          <div key={index} className="my-6 flex justify-center">
            <BlockMath math={math} />
          </div>
        )
      } catch (e) {
        return (
          <div key={index} className="my-4 p-4 bg-muted rounded-lg">
            <code className="text-sm font-mono">{math}</code>
          </div>
        )
      }
    }

    // 处理表格
    if (line.startsWith('| ') && line.includes(' | ')) {
      const cells = line.split('|').slice(1, -1).map(cell => cell.trim())
      const isHeader = cells.some(cell => cell.includes('---'))
      
      if (isHeader) {
        return null // 跳过表格分隔行
      }
      
      return (
        <div key={index} className="grid gap-2 mb-1 text-sm border-b pb-2" style={{gridTemplateColumns: `repeat(${cells.length}, 1fr)`}}>
          {cells.map((cell, i) => (
            <div key={i} className="p-2 font-medium">{renderInlineContent(cell)}</div>
          ))}
        </div>
      )
    }

    // 处理粗体文本
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={index} className="font-bold mb-3 text-lg">{line.slice(2, -2)}</p>
    }

    // 处理空行
    if (line.trim() === '') {
      return <div key={index} className="h-2" />
    }

    // 处理普通段落
    return <p key={index} className="mb-3 leading-relaxed text-foreground">{renderInlineContent(line)}</p>
  }

  const renderInlineContent = (text) => {
    // 处理行内代码
    const codeRegex = /`([^`]+)`/g
    const parts = text.split(codeRegex)
    
    return parts.map((part, i) => {
      // 奇数索引是代码内容
      if (i % 2 === 1) {
        return (
          <code key={i} className="bg-muted px-2 py-1 rounded text-sm font-mono border">
            {part}
          </code>
        )
      }
      
      // 处理数学公式
      const mathParts = part.split(/(\$[^$]+\$)/g)
      return mathParts.map((mathPart, j) => {
        if (mathPart.startsWith('$') && mathPart.endsWith('$') && mathPart.length > 2) {
          const math = mathPart.slice(1, -1)
          try {
            return <InlineMath key={`${i}-${j}`} math={math} />
          } catch (e) {
            return <code key={`${i}-${j}`} className="bg-muted px-1 rounded text-sm font-mono">{math}</code>
          }
        }
        
        // 处理粗体
        if (mathPart.includes('**')) {
          const boldParts = mathPart.split(/(\*\*[^*]+\*\*)/g)
          return boldParts.map((boldPart, k) => {
            if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
              return <strong key={`${i}-${j}-${k}`}>{boldPart.slice(2, -2)}</strong>
            }
            return boldPart
          })
        }
        
        return mathPart
      })
    })
  }

  // 处理代码块
  const processCodeBlocks = (content) => {
    const lines = content.split('\n')
    const result = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

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
        result.push({
          type: 'code',
          language,
          content: codeContent,
          index: result.length
        })

        i++ // 跳过结束标记
      } else {
        result.push({
          type: 'text',
          content: line,
          index: result.length
        })
        i++
      }
    }

    return result
  }

  const blocks = processCodeBlocks(content)
  
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {blocks.map((block) => {
        if (block.type === 'code') {
          return (
            <div key={block.index} className="my-6">
              <pre className="rounded-lg overflow-x-auto bg-gray-900 p-4">
                <code className={`language-${block.language}`} style={{ color: '#f8f8f2' }}>
                  {block.content}
                </code>
              </pre>
            </div>
          )
        } else {
          return renderLine(block.content, block.index)
        }
      })}
    </div>
  )
}

export default MarkdownRenderer

