import { useState } from 'react'
import { useChatContext } from '../context/ChatContext'
import { useChat } from '../hooks/useChat'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ChatContainer from '../components/ChatContainer'
import InputBar from '../components/InputBar'
import MobileChatPage from '../components/MobileChatPage'
import MobileNav from '../components/MobileNav'
import SettingsModal from '../components/SettingsModal'
import DocumentsChecklistModal from '../components/DocumentsChecklistModal'
import StudentProfileModal from '../components/StudentProfileModal'
import Toast from '../components/Toast'

function useIsMobile() {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

export default function ChatPage() {
  const { messages, clearChat, setActiveCategory, setInput } = useChatContext()
  const { sendMessage } = useChat()
  const [mobileTab, setMobileTab] = useState('chat')
  const [isMobile] = useState(useIsMobile)
  
  // Modals & Toasts
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (msg) => {
    setToastMessage(msg)
  }

  const handleSendMessage = (text) => {
    if (!text?.trim()) return
    setInput('')
    sendMessage(text)
  }

  const handleQuickQuestion = (question, category) => {
    setActiveCategory(category)
    handleSendMessage(question)
  }

  const handleClearChat = () => {
    clearChat()
    showToast('Chat history cleared')
  }

  // Export Transcript as clean text file
  const handleExportChat = () => {
    if (messages.length === 0) return

    let transcript = `=====================================================\n`
    transcript += `       CAMPUS FAQ ASSISTANT — CHAT TRANSCRIPT         \n`
    transcript += `       Date: ${new Date().toLocaleString()}          \n`
    transcript += `=====================================================\n\n`

    messages.forEach((m, idx) => {
      const sender = m.role === 'user' ? 'STUDENT' : 'CAMPUS ASSISTANT'
      transcript += `[${m.timestamp || ''}] ${sender}:\n`
      transcript += `${m.content}\n\n`
    })

    transcript += `=====================================================\n`
    transcript += `For official inquiries, contact admin@college.edu\n`
    transcript += `=====================================================\n`

    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Campus_FAQ_Transcript_${new Date().toISOString().slice(0, 10)}.txt`
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

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onConfigSaved={() => showToast('AI Settings Saved')}
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

      {isMobile ? (
        <>
          <MobileChatPage
            onSendMessage={handleSendMessage}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
          <MobileNav
            activeTab={mobileTab}
            onTabChange={(tab) => {
              setMobileTab(tab)
              if (tab === 'topics' || tab === 'saved') {
                setIsDocsModalOpen(true)
              }
            }}
          />
        </>
      ) : (
        <div className="flex min-h-screen bg-[var(--theme-bg)] transition-colors duration-400">
          <Sidebar
            onQuickQuestion={handleQuickQuestion}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />

          <div className="pl-80 flex flex-col flex-1 min-h-screen">
            <Header
              onClearChat={handleClearChat}
              onOpenProfile={() => setIsProfileOpen(true)}
            />
            <ChatContainer
              onSendMessage={handleSendMessage}
              onOpenDocsModal={() => setIsDocsModalOpen(true)}
            />
            <InputBar onSend={handleSendMessage} />
          </div>
        </div>
      )}
    </div>
  )
}
