import { ChatProvider } from './context/ChatContext'
import { ThemeProvider } from './context/ThemeContext'
import ChatPage from './pages/ChatPage'

export default function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <ChatPage />
      </ChatProvider>
    </ThemeProvider>
  )
}
