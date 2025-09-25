import { NextResponse } from "next/server"
import OpenAI from "openai"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { message } = await request.json()
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      const reply =
        "Thanks for your message. Our AI is currently in free mode. Enable the OPENAI_API_KEY for full fintech guidance. Meanwhile, what can I help you with—subscriptions, integrations, or dashboard setup?"
      return NextResponse.json({ reply })
    }

    const openai = new OpenAI({ apiKey })
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are Nexum AI, a helpful assistant for fintech and cloud services. Be concise, actionable, and friendly. Provide steps and risk notes when relevant. Keep responses under 160 words.",
        },
        { role: "user", content: message },
      ],
    })

    const reply = completion.choices?.[0]?.message?.content ?? "I’m here to help. Could you share more details?"
    return NextResponse.json({ reply })
  } catch (err) {
    console.error("AI route error:", err)
    return NextResponse.json({ error: "AI service unavailable" }, { status: 500 })
  }
}