import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '../../components/ui/sidebar';
import AppSidebar from '../../components/AppSidebar';
import SidebarHeader from '../../components/SidebarHeader';
import { Mic, Paperclip, Send, Smile } from 'lucide-react';

const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeContact, setActiveContact] = useState('Aditya Admission Couseller');
  const [message, setMessage] = useState('');
  
  const contacts = [
    {
      id: 1,
      name: 'Shrey Admin',
      avatar: '/public/profile.svg',
      lastMessage: 'Hello, how can I help you?',
      lastMessageTime: '10:30',
      unread: 0,
    },
    {
      id: 2,
      name: 'Aditya Admission Couseller',
      avatar: '/public/profile.svg',
      lastMessage: 'Can you tell me the problem in detail you are having?',
      lastMessageTime: '16:05',
      unread: 2,
    },
  ];

  const Chat = [
    {
      id: 1,
      sender: 'Dr. Rahul',
      content: 'Hi, Good Afternoon Dr. Rahul...',
      time: '16:30',
      isOutgoing: false
    },
    {
      id: 2,
      sender: 'Aditya',
      content: 'I am Aditya, I have problem in my Immune System.',
      time: '16:30',
      isOutgoing: false
    },
    {
      id: 3,
      sender: 'Dr. Rahul',
      content: 'Hello Good Afternoon too Aditya',
      time: '16:40',
      isOutgoing: true
    },
    {
      id: 4,
      sender: 'Dr. Rahul',
      content: 'Can you tell me the problem in detail you are having?',
      time: '16:45',
      isOutgoing: true
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Add message handling logic here
      setMessage('');
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar isSidebarOpen={isSidebarOpen} />
        
        <SidebarInset>
          <SidebarHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          
          <main className="flex-1 w-full overflow-hidden bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-xl font-semibold text-gray-800 mb-6">Message Center</h1>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden flex" style={{ height: 'calc(100vh - 180px)' }}>
                {/* Contacts Panel */}
                <div className="w-1/4 border-r border-gray-100 overflow-y-auto">
                  <div className="p-4 border-b border-gray-100">
                    <h2 className="text-lg font-medium">Inbox</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {contacts.map((contact) => (
                      <div 
                        key={contact.id}
                        className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${activeContact === contact.name ? 'bg-gray-50' : ''}`}
                        onClick={() => setActiveContact(contact.name)}
                      >
                        <div className="flex-shrink-0">
                          <img src={contact.avatar} alt={contact.name} className="h-10 w-10 rounded-full bg-gray-200" />
                        </div>
                        <div className="ml-3 flex-grow">
                          <p className="text-sm font-medium">{contact.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Chat Panel */}
                <div className="flex-1 flex flex-col">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      02 Mar 2025
                    </div>
                  </div>
                  
                  {/* Chat */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {Chat.map((msg) => (
                      <div 
                        key={msg.id}
                        className={`flex ${msg.isOutgoing ? 'justify-start' : 'justify-end'}`}
                      >
                        <div 
                          className={`rounded-lg p-3 max-w-xs md:max-w-md ${
                            msg.isOutgoing 
                              ? 'bg-gray-100 text-gray-800' 
                              : 'bg-primary-1 text-white'
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p className={`text-xs mt-1 text-right ${msg.isOutgoing ? 'text-gray-500' : 'text-white/80'}`}>{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message Input */}
                  <div className="border-t border-gray-100 p-4">
                    <form onSubmit={handleSubmit} className="flex items-center gap-2">
                      <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <Smile className="h-5 w-5" />
                      </button>
                      <div className="relative flex-grow">
                        <input
                          type="text"
                          placeholder="Type your Message..."
                          className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 pr-10"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Paperclip className="h-5 w-5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <Mic className="h-5 w-5" />
                      </button>
                      <button
                        type="submit"
                        className="p-2 bg-primary-1 text-white rounded-full hover:bg-green-700"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Chat;