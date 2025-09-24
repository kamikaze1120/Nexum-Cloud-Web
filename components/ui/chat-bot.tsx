"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Send, Bot, User, X, Minimize2 } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const botResponses = {
  greeting:
    "Hello! I'm your Nexum Cloud support assistant. I can help you with basic technical questions, account issues, and service information. How can I assist you today?",

  // Account related
  login:
    "If you're having trouble logging in, please check your email and password. You can reset your password using the 'Forgot Password' link on the login page. If you continue having issues, I can connect you with our technical team.",

  password:
    "To reset your password: 1) Go to the login page 2) Click 'Forgot Password' 3) Enter your email address 4) Check your email for reset instructions. If you don't receive the email within 5 minutes, please check your spam folder.",

  account:
    "For account-related questions, I can help with basic settings, subscription information, and profile updates. What specific account issue are you experiencing?",

  // Technical issues
  api: "For API-related questions: 1) Check our API documentation 2) Verify your API keys are correct 3) Ensure you're using the correct endpoints. For complex API issues, I'll connect you with our technical team.",

  integration:
    "Integration issues can often be resolved by: 1) Checking your API credentials 2) Verifying webhook URLs 3) Testing connection endpoints. What specific integration are you working with?",

  error:
    "I can help troubleshoot common errors. Please share the specific error message you're seeing, and I'll provide guidance on resolving it.",

  // Billing
  billing:
    "For billing questions, I can provide basic information about your subscription. For detailed billing issues, payment problems, or plan changes, I'll connect you directly with our billing team.",

  subscription:
    "I can help with basic subscription information. To upgrade, downgrade, or cancel your subscription, please contact our billing team at info@nexumcloud.co.site or call 630-812-9169.",

  // Default responses
  default:
    "I understand you need help with that. For complex technical issues or specific account problems, I recommend contacting our support team directly at info@nexumcloud.co.site or calling 630-812-9169 for immediate assistance.",

  human:
    "I'll connect you with a human agent right away. Please call 630-812-9169 or email info@nexumcloud.co.site, and our team will assist you personally. Is there anything else I can help you with in the meantime?",
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: botResponses.greeting,
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("login") || message.includes("sign in")) return botResponses.login
    if (message.includes("password") || message.includes("reset")) return botResponses.password
    if (message.includes("account") || message.includes("profile")) return botResponses.account
    if (message.includes("api") || message.includes("endpoint")) return botResponses.api
    if (message.includes("integration") || message.includes("connect")) return botResponses.integration
    if (message.includes("error") || message.includes("bug") || message.includes("problem")) return botResponses.error
    if (message.includes("billing") || message.includes("payment") || message.includes("invoice"))
      return botResponses.billing
    if (message.includes("subscription") || message.includes("plan") || message.includes("upgrade"))
      return botResponses.subscription
    if (message.includes("human") || message.includes("agent") || message.includes("person")) return botResponses.human
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) return botResponses.greeting

    return botResponses.default
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(
      () => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(inputValue),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce z-50 hover-lift"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card
      className={`fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 transition-all duration-300 hover-lift ${isMinimized ? "h-14" : ""}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-lg flex items-center">
          <Bot className="h-5 w-5 mr-2 animate-pulse3d" />
          Nexum Support Bot
        </CardTitle>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 h-[350px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fadeInUp3d`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user" ? "bg-primary text-primary-foreground ml-4" : "bg-muted mr-4"
                  } hover-lift`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 text-primary animate-pulse3d" />}
                    {message.sender === "user" && <User className="h-4 w-4 mt-0.5" />}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-fadeInUp3d">
                <div className="bg-muted p-3 rounded-lg mr-4 hover-lift">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-primary animate-pulse3d" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 hover-lift"
              />
              <Button onClick={handleSendMessage} size="icon" className="hover-lift">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  )
}
