import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Send, PaperclipIcon, Users, Plus, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(1);
  
  const conversations = [
    {
      id: 1,
      name: 'John Doe',
      avatar: '',
      lastMessage: 'I\'ve submitted my SOP for Harvard.',
      timestamp: '10:32 AM',
      unread: 2
    },
    {
      id: 2,
      name: 'Emma Wilson',
      avatar: '',
      lastMessage: 'When is the deadline for Stanford?',
      timestamp: 'Yesterday',
      unread: 0
    },
    {
      id: 3,
      name: 'Michael Brown',
      avatar: '',
      lastMessage: 'Thanks for your feedback on my essay!',
      timestamp: 'Oct 20',
      unread: 0
    },
    {
      id: 4,
      name: 'Sophia Garcia',
      avatar: '',
      lastMessage: 'Can you review my application?',
      timestamp: 'Oct 19',
      unread: 0
    },
    {
      id: 5,
      name: 'MBA 2024 Applicants',
      avatar: '',
      lastMessage: 'William: I have a question about...',
      timestamp: 'Oct 18',
      unread: 5,
      isGroup: true
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'John Doe',
      content: 'Hello, I wanted to check on the status of my Harvard application.',
      timestamp: '10:12 AM',
      isFromUser: false
    },
    {
      id: 2,
      sender: 'Admin',
      content: 'Hi John, we\'re currently reviewing your application. All documents have been received.',
      timestamp: '10:15 AM',
      isFromUser: true
    },
    {
      id: 3,
      sender: 'John Doe',
      content: 'Great! I\'ve just submitted my Statement of Purpose for Harvard.',
      timestamp: '10:30 AM',
      isFromUser: false
    },
    {
      id: 4,
      sender: 'John Doe',
      content: 'Should I make any additional changes before the deadline?',
      timestamp: '10:32 AM',
      isFromUser: false
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Communication</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Message
        </Button>
      </div>

      <Tabs defaultValue="direct">
        <TabsList className='max-w-full overflow-x-auto justify-start'>
          <TabsTrigger value="direct">Direct Messages</TabsTrigger>
          <TabsTrigger value="groups">Group Chats</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="direct" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
            <Card className="md:col-span-1">
              <CardHeader className="px-4 py-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search conversations..."
                    className="pl-8 w-full"
                  />
                </div>
              </CardHeader>
              <CardContent className="px-2 pb-0">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted ${
                        activeConversation === conversation.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setActiveConversation(conversation.id)}
                    >
                      <Avatar>
                        <AvatarFallback>
                          {conversation.isGroup ? (
                            <Users className="h-5 w-5" />
                          ) : (
                            conversation.name.charAt(0)
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm truncate">{conversation.name}</h4>
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 flex flex-col">
              {activeConversation ? (
                <>
                  <CardHeader className="px-4 py-3 flex flex-row items-center border-b">
                    <div className="flex items-center flex-1">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>
                          {
                            conversations.find(c => c.id === activeConversation)?.name.charAt(0)
                          }
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">
                          {
                            conversations.find(c => c.id === activeConversation)?.name
                          }
                        </CardTitle>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <ScrollArea className="flex-1 p-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex mb-4 ${
                          message.isFromUser ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {!message.isFromUser && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.isFromUser
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-xs">
                              {message.sender}
                            </span>
                            <span className="text-xs opacity-70 ml-2">
                              {message.timestamp}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <CardFooter className="p-4 border-t">
                    <div className="flex w-full items-center gap-2">
                      <Button variant="outline" size="icon" className="shrink-0">
                        <PaperclipIcon className="h-4 w-4" />
                      </Button>
                      <Textarea 
                        placeholder="Type your message..." 
                        className="min-h-10 flex-1"
                        rows={1}
                      />
                      <Button size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Select a conversation to start messaging
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="groups">
          <Card>
            <CardHeader>
              <CardTitle>Group Chats</CardTitle>
              <CardDescription>Manage group conversations with students</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Group chats interface - similar structure to direct messages */}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="announcements">
          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>Send announcements to all students or specific groups</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Announcements interface */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;