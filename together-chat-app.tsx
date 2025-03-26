import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Search, 
  Image, 
  Code, 
  Zap, 
  Shield 
} from 'lucide-react';

// Mock AI models configuration
const AI_MODELS = {
  DEEPSEEK_R1: {
    name: 'DeepSeek R1',
    type: 'research',
    icon: <Search />,
    description: 'Advanced reasoning and research'
  },
  FLUX: {
    name: 'Flux',
    type: 'image',
    icon: <Image />,
    description: 'Instant image generation'
  },
  QWEN_CODER: {
    name: 'Qwen Coder 32B',
    type: 'code',
    icon: <Code />,
    description: 'Professional coding assistance'
  },
  LLAMA: {
    name: 'Llama 3.1 8B',
    type: 'quick',
    icon: <Zap />,
    description: 'Lightning-fast answers'
  }
};

// Main App Component
const TogetherChatApp = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isSearchIntegrated, setIsSearchIntegrated] = useState(false);

  // Simulate AI response (would be replaced with actual API calls)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: userInput,
      sender: 'user',
      model: selectedModel ? selectedModel.name : 'No Model Selected'
    };

    // Simulate AI response
    const aiResponse = {
      id: Date.now() + 1,
      text: `Simulated response from ${newMessage.model}: Processing your query about "${userInput}"`,
      sender: 'ai',
      model: newMessage.model
    };

    setChatHistory(prev => [...prev, newMessage, aiResponse]);
    setUserInput('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Shield className="mr-2 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Together Chat</h1>
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              checked={isSearchIntegrated}
              onChange={() => setIsSearchIntegrated(!isSearchIntegrated)}
              className="mr-2"
            />
            Web Search Integration
          </label>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex">
        {/* Model Selection Sidebar */}
        <div className="w-64 bg-white border-r p-4">
          <h2 className="text-xl font-semibold mb-4">AI Models</h2>
          {Object.values(AI_MODELS).map((model) => (
            <button
              key={model.name}
              onClick={() => setSelectedModel(model)}
              className={`w-full flex items-center p-3 mb-2 rounded 
                ${selectedModel?.name === model.name 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-100'}`}
            >
              {model.icon}
              <span className="ml-2">{model.name}</span>
            </button>
          ))}
        </div>

        {/* Chat Interface */}
        <div className="flex-grow flex flex-col">
          {/* Chat History */}
          <div className="flex-grow overflow-y-auto p-4">
            {chatHistory.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 p-3 rounded max-w-xl 
                  ${message.sender === 'user' 
                    ? 'bg-blue-100 self-end ml-auto' 
                    : 'bg-gray-200 self-start'}`}
              >
                <p>{message.text}</p>
                <small className="text-xs text-gray-600 block mt-1">
                  {message.model}
                </small>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
            <div className="flex">
              <select 
                value={selectedModel?.name || ''}
                onChange={(e) => {
                  const model = Object.values(AI_MODELS)
                    .find(m => m.name === e.target.value);
                  setSelectedModel(model);
                }}
                className="mr-2 p-2 border rounded"
              >
                <option value="">Select Model</option>
                {Object.values(AI_MODELS).map((model) => (
                  <option key={model.name} value={model.name}>
                    {model.name}
                  </option>
                ))}
              </select>
              <input 
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={
                  selectedModel 
                    ? `Ask ${selectedModel.name}...` 
                    : 'Select a model first'
                }
                className="flex-grow p-2 border rounded"
                disabled={!selectedModel}
              />
              <button 
                type="submit" 
                className="ml-2 bg-blue-500 text-white p-2 rounded"
                disabled={!selectedModel || !userInput.trim()}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md p-4 text-center">
        <p className="text-sm text-gray-600">
          © 2024 Together Chat | Securely Hosted in North America
        </p>
      </footer>
    </div>
  );
};

export default TogetherChatApp;
