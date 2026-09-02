import { useState, useEffect } from 'react'
import {
  PROVIDERS,
  AVAILABLE_MODELS,
  DEFAULT_MODELS,
  getAIConfig,
  saveAIConfig,
  testConnection,
} from '../lib/aiService'

export default function SettingsModal({ isOpen, onClose, onConfigSaved }) {
  const [config, setConfig] = useState(getAIConfig())
  const [showKey, setShowKey] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setConfig(getAIConfig())
      setTestResult(null)
      setSaveSuccess(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleProviderChange = (provider) => {
    setConfig((prev) => ({
      ...prev,
      provider,
      model: DEFAULT_MODELS[provider] || AVAILABLE_MODELS[provider][0].id,
    }))
    setTestResult(null)
  }

  const handleTest = async () => {
    if (!config.apiKey?.trim()) {
      setTestResult({
        success: false,
        message: 'Please enter an API key first before testing.',
      })
      return
    }

    setTesting(true)
    setTestResult(null)

    try {
      const response = await testConnection(config)
      setTestResult({
        success: true,
        message: `Connection Successful! Model responded: "${response.slice(0, 60)}..."`,
      })
    } catch (err) {
      setTestResult({
        success: false,
        message: err.message || 'Connection failed. Please verify your API key and model.',
      })
    } finally {
      setTesting(false)
    }
  }

  const handleSave = () => {
    saveAIConfig(config)
    setSaveSuccess(true)
    onConfigSaved?.(config)
    setTimeout(() => {
      onClose()
    }, 600)
  }

  const isGemini = config.provider === PROVIDERS.GEMINI
  const providerModels = AVAILABLE_MODELS[config.provider] || []

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-[fadeInUp_0.2s_ease-out]">
      <div className="bg-[#0f172a] text-slate-100 w-full max-w-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <span className="material-symbols-outlined text-white text-[22px]">
                neurology
              </span>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-white">AI Intelligence Settings</h3>
              <p className="text-[12px] text-slate-400">
                Configure Google Gemini or Groq Cloud API for smart generative answers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[19px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          
          {/* Master Enable Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-white/10">
            <div>
              <span className="font-bold text-white text-[14px] block">
                Enable AI Assistant
              </span>
              <span className="text-[12px] text-slate-400">
                Generates answers when queries are outside the standard FAQ dataset
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.enabled}
                onChange={(e) => setConfig((prev) => ({ ...prev, enabled: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Provider Selection Tabs */}
          <div>
            <label className="block text-[13px] font-bold text-slate-300 mb-2">
              Select AI Provider
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleProviderChange(PROVIDERS.GEMINI)}
                className={`p-4 rounded-2xl border flex flex-col items-start gap-2 text-left transition-all ${
                  isGemini
                    ? 'border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/30'
                    : 'border-white/10 bg-slate-900/50 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-[14px] text-white flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[19px] text-indigo-400">
                      auto_awesome
                    </span>
                    Google Gemini
                  </span>
                  {isGemini && (
                    <span className="material-symbols-outlined text-indigo-400 text-[18px]">
                      check_circle
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 leading-tight">
                  Free tier via Google AI Studio. Models: Flash 2.0, 1.5 Pro.
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleProviderChange(PROVIDERS.GROQ)}
                className={`p-4 rounded-2xl border flex flex-col items-start gap-2 text-left transition-all ${
                  !isGemini
                    ? 'border-cyan-500 bg-cyan-500/10 ring-2 ring-cyan-500/30'
                    : 'border-white/10 bg-slate-900/50 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-[14px] text-white flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[19px] text-cyan-400">
                      bolt
                    </span>
                    Groq Cloud
                  </span>
                  {!isGemini && (
                    <span className="material-symbols-outlined text-cyan-400 text-[18px]">
                      check_circle
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 leading-tight">
                  Ultra-fast inference. Models: Llama 3.3 70B, Mixtral 8x7B.
                </span>
              </button>
            </div>
          </div>

          {/* API Key Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[13px] font-bold text-slate-300">
                {isGemini ? 'Google Gemini API Key' : 'Groq Cloud API Key'}
              </label>
              <a
                href={
                  isGemini
                    ? 'https://aistudio.google.com/app/apikey'
                    : 'https://console.groq.com/keys'
                }
                target="_blank"
                rel="noreferrer"
                className="text-[12px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                Get Free API Key <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            </div>
            <div className="relative flex items-center">
              <input
                type={showKey ? 'text' : 'password'}
                value={config.apiKey}
                onChange={(e) => setConfig((prev) => ({ ...prev, apiKey: e.target.value }))}
                placeholder={isGemini ? 'AIzaSy...' : 'gsk_...'}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none font-mono text-[13px] text-white pr-12 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 text-slate-400 hover:text-white p-1"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showKey ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-[13px] font-bold text-slate-300 mb-2">
              Select AI Model
            </label>
            <select
              value={config.model}
              onChange={(e) => setConfig((prev) => ({ ...prev, model: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-[13px] text-white transition-all"
            >
              {providerModels.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Mode Selector */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
            <span className="font-bold text-[13px] text-white block">AI Response Mode</span>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="aiMode"
                checked={config.useAsFallbackOnly}
                onChange={() => setConfig((prev) => ({ ...prev, useAsFallbackOnly: true }))}
                className="mt-1 text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <span className="text-[13px] font-semibold text-white block">
                  NLP First, AI Fallback (Recommended)
                </span>
                <span className="text-[11.5px] text-slate-400">
                  Queries matching the FAQ dataset return official answers; unmatched questions trigger AI.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer pt-2 border-t border-white/10">
              <input
                type="radio"
                name="aiMode"
                checked={!config.useAsFallbackOnly}
                onChange={() => setConfig((prev) => ({ ...prev, useAsFallbackOnly: false }))}
                className="mt-1 text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <span className="text-[13px] font-semibold text-white block">
                  AI Enhanced (RAG Mode)
                </span>
                <span className="text-[11.5px] text-slate-400">
                  Synthesizes answers dynamically using all campus FAQs as real-time context.
                </span>
              </div>
            </label>
          </div>

          {/* Test Status Feedback Banner */}
          {testResult && (
            <div
              className={`p-3.5 rounded-xl text-[13px] flex items-start gap-2.5 ${
                testResult.success
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] flex-shrink-0 mt-0.5">
                {testResult.success ? 'check_circle' : 'error'}
              </span>
              <span className="flex-1">{testResult.message}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-slate-900/80">
          <button
            type="button"
            onClick={handleTest}
            disabled={testing || !config.apiKey}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-[13px] font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className={`material-symbols-outlined text-[17px] ${testing ? 'animate-spin' : ''}`}>
              {testing ? 'progress_activity' : 'network_check'}
            </span>
            {testing ? 'Testing...' : 'Test Connection'}
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-[13px] font-bold transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-[13px] font-bold shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center gap-1.5"
            >
              {saveSuccess ? (
                <>
                  <span className="material-symbols-outlined text-[17px]">done</span>
                  Saved!
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
