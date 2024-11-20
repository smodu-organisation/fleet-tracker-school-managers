import React, { useState } from 'react'
import { Camera, Phone, Send, Menu } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Contact {
  id: string
  name: string
  role: 'parent' | 'driver'
  avatar: string
  lastMessage: string
}

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
}

const contacts: Contact[] = [
  { id: '1', name: 'Alice Smith', role: 'parent', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'Can you confirm the pickup time?' },
  { id: '2', name: 'Bob Johnson', role: 'driver', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'Ill be there in 10 minutes.' },
  { id: '3', name: 'Carol Williams', role: 'parent', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'Thank you for the update.' },
]

const initialMessages: Message[] = [
  { id: '1', senderId: '1', text: 'Hello, can you confirm the pickup time for today?', timestamp: '10:30 AM' },
  { id: '2', senderId: 'school', text: 'The pickup time is scheduled for 3:30 PM today.', timestamp: '10:32 AM' },
  { id: '3', senderId: '1', text: 'Great, thank you!', timestamp: '10:33 AM' },
]

export const Messages = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  const [showContacts, setShowContacts] = useState(true)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === '') return

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'school',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const toggleContacts = () => {
    setShowContacts(!showContacts)
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#2B2B2B] text-gray-200">
      {/* Contacts List */}
      <div className={`${showContacts ? 'block' : 'hidden'} md:block w-full md:w-1/3 bg-[#333333] border-r border-[#444444] overflow-y-auto`}>
        <h2 className="text-xl font-semibold p-4 border-b border-[#444444]">Contacts</h2>
        {contacts.map(contact => (
          <div
            key={contact.id}
            className="flex items-center p-4 hover:bg-[#3A3A3A] cursor-pointer"
            onClick={() => {
              setSelectedContact(contact)
              setShowContacts(false)
            }}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h3 className="font-semibold">{contact.name}</h3>
              <p className="text-sm text-gray-400">{contact.role}</p>
              <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#2B2B2B]">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="bg-[#333333] border-b border-[#444444] p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleContacts}>
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle contacts</span>
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                  <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="ml-4 text-xl font-semibold">{selectedContact.name}</h2>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" disabled>
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="sr-only">Call</span>
                </Button>
                <Button variant="ghost" size="icon" disabled>
                  <Camera className="h-5 w-5 text-gray-400" />
                  <span className="sr-only">Send picture</span>
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 'school' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.senderId === 'school' ? 'bg-[#4A4A4A] text-white' : 'bg-[#3A3A3A] text-gray-200'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="bg-[#333333] border-t border-[#444444] p-4 flex items-center">
              <Input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 mr-4 bg-[#3A3A3A] text-gray-200 border-[#444444] focus:border-[#5A5A5A]"
              />
              <Button type="submit" variant="ghost">
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#2B2B2B]">
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleContacts}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle contacts</span>
            </Button>
            <p className="text-xl text-gray-400">Select a contact to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}