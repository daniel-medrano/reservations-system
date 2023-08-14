import { useState } from "react"
import { cn } from "@/lib/utils"

import { PaperPlaneIcon } from "@radix-ui/react-icons"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function Chatbot() {
    const [messages, setMessages] = useState([
        {
            role: "agent",
            content: "Hi, how may I help you?"
        },
        {
            role: "user",
            content: "I want to make a reservation."
        }
    ])

    return (
        <>
            <div className="space-y-4 py-4 pb-24 ">
                {messages.map((message, index) => (
                    <div key={index} className={cn(
                        "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                        message.role == "user"
                            ? "ml-auto bg-primary text-primary-foreground"
                            : "bg-muted"
                    )}>
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="fixed bottom-0 inset-x-0 container bg-background/90 backdrop-blur">
                <form onSubmit={(event) => {
                    event.preventDefault()
                    setMessages([
                        ...messages,
                        {
                            role: "user",
                            content: event.currentTarget.message.value
                        }
                    ])
                    event.currentTarget.message.value = ""
                }} className="flex w-full items-center space-x-2 py-5">
                    <Input id="message" placeholder="Type yout message..." className="flex-1" />
                    <Button type="submit" size="icon">
                        <PaperPlaneIcon className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
        </>

    )
}