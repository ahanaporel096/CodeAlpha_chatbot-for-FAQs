import { useState, useEffect, useRef } from 'react'
import { useChatContext } from '../context/ChatContext'
import { useChat } from '../hooks/useChat'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ChatContainer from '../components/ChatContainer'
import InputBar from '../components/InputBar'
import SettingsModal from '../components/SettingsModal'
import DocumentsChecklistModal from '../components/DocumentsChecklistModal'
import StudentProfileModal from '../components/StudentProfileModal'
import Toast from '../components/Toast'

export default function ChatPage() {
  const { messages, clearChat, setActiveCategory, setInput } = useChatContext()
  const { sendMessage } = useChat()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // Developer Mode (Activated via ?dev=true, Ctrl+Shift+S, or triple-clicking the AIRA badge)
  const [isDevMode, setIsDevMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search || ''
      return search.includes('dev=true') || search.includes('admin=true')
    }
    return false
  })

  // Modals & Toasts
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  // Secret Dev Trigger: Triple Click Tracker
  const clickCountRef = useRef(0)
  const clickTimerRef = useRef(null)

  const showToast = (msg) => {
    setToastMessage(msg)
  }

  // Developer Secret Shortcut: Ctrl + Shift + S or Alt + S
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') || (e.altKey && e.key.toLowerCase() === 's')) {
        e.preventDefault()
        setIsDevMode(true)
        setIsSettingsOpen(true)
        showToast('🔓 Developer Mode: AI Settings Opened')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Secret Dev Trigger: Triple Click on AIRA logo badge
  const handleSecretDevTrigger = () => {
    clickCountRef.current += 1
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current)

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0
      setIsDevMode(true)
      setIsSettingsOpen(true)
      showToast('🔓 Developer Mode: AI Settings Opened')
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0
      }, 1200)
    }
  }

  const handleSendMessage = (text) => {
    if (!text?.trim()) return
    setInput('')
    sendMessage(text)
  }

  const handleQuickQuestion = (question, category) => {
    setActiveCategory(category)
    handleSendMessage(question)
    setIsSidebarOpen(false)
  }

  const handleClearChat = () => {
    clearChat()
    showToast('Chat history cleared')
  }

  // Export Transcript as clean text file
  const handleExportChat = () => {
    if (messages.length === 0) return

    let transcript = `=====================================================\n`
    transcript += `       AIRA ASSISTANT — CHAT TRANSCRIPT              \n`
    transcript += `       Date: ${new Date().toLocaleString()}          \n`
    transcript += `=====================================================\n\n`

    messages.forEach((m) => {
      const sender = m.role === 'user' ? 'YOU' : 'AIRA'
      transcript += `[${m.timestamp || ''}] ${sender}:\n`
      transcript += `${m.content}\n\n`
    })

    transcript += `=====================================================\n`
    transcript += `AIRA — AI Responsive Assistant\n`
    transcript += `=====================================================\n`

    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `AIRA_Transcript_${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    showToast('Transcript downloaded successfully!')
  }

  return (
    <div className="bg-[var(--theme-bg)] text-slate-100 min-h-screen transition-colors duration-400">
      
      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Developer Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onConfigSaved={() => showToast('AI Settings Saved Successfully')}
      />

      {/* Documents Checklist Modal */}
      <DocumentsChecklistModal
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
      />

      {/* Student Profile & Contact Modal */}
      <StudentProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onExportChat={handleExportChat}
        onClearChat={handleClearChat}
        messageCount={messages.length}
      />

      {/* Unified Layout for All Devices (Phone, Tablet, Desktop) */}
      <div className="flex min-h-screen bg-[var(--theme-bg)] transition-colors duration-400">
        
        {/* Sidebar Drawer on Mobile / Fixed on Desktop */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onQuickQuestion={handleQuickQuestion}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onSecretDevTrigger={handleSecretDevTrigger}
          isDevMode={isDevMode}
        />

        {/* Main Chat View Area */}
        <div className="lg:pl-80 flex flex-col flex-1 min-h-screen w-full">
          <Header
            onClearChat={handleClearChat}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onSecretDevTrigger={handleSecretDevTrigger}
            isDevMode={isDevMode}
          />
          <ChatContainer
            onSendMessage={handleSendMessage}
            onOpenDocsModal={() => setIsDocsModalOpen(true)}
          />
          <InputBar onSend={handleSendMessage} />
        </div>
      </div>

    </div>
  )
}
