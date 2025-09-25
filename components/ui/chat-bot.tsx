export function ChatBot() {
  // ... existing code ...
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const sendingText = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: sendingText }),
      })
      const data = await res.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: (data && data.reply) ? data.reply : getBotResponse(sendingText),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(sendingText),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } finally {
      setIsTyping(false)
    }
  }
}
