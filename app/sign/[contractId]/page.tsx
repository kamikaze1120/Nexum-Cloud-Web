"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignPage({ params }: { params: { contractId: string } }) {
  const [contract, setContract] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/contracts/by-id?contractId=${encodeURIComponent(params.contractId)}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error ?? "Failed to load contract")
      } else {
        setContract(data.contract)
      }
    })()
  }, [params.contractId])

  const startDraw = (e: React.MouseEvent) => {
    setIsDrawing(true)
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")!
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }
  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")!
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }
  const endDraw = () => setIsDrawing(false)

  const handleSign = async () => {
    setError(null)
    setSuccess(null)
    const dataUrl = canvasRef.current?.toDataURL("image/png")
    if (!dataUrl) {
      setError("Please provide a signature")
      return
    }
    const csrf = document.cookie.split("; ").find((c) => c.startsWith("csrf-token="))?.split("=")[1] ?? ""
    const res = await fetch("/api/contracts/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
      body: JSON.stringify({ contractId: params.contractId, signatureDataUrl: dataUrl }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data?.error ?? "Failed to sign")
    } else {
      setSuccess("Contract signed successfully.")
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Review & Sign</CardTitle>
          <CardDescription>Contract {params.contractId}</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
          {success && <Alert><AlertDescription>{success}</AlertDescription></Alert>}
          <div className="prose whitespace-pre-wrap">{contract?.contract_text ?? "Loading contract..."}</div>
          <div className="mt-6">
            <div className="mb-2 text-sm text-muted-foreground">Draw your signature below:</div>
            <canvas
              ref={canvasRef}
              width={600}
              height={200}
              className="border rounded"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
            />
            <div className="mt-3 flex gap-2">
              <Button onClick={handleSign}>Sign Contract</Button>
              <Button variant="outline" onClick={() => {
                const ctx = canvasRef.current?.getContext("2d")
                if (ctx) ctx.clearRect(0, 0, 600, 200)
              }}>Clear</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}