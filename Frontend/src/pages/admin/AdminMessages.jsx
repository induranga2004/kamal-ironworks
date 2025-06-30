import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { 
  Search, 
  Send, 
  UserPlus,
  Phone, 
  Mail,
  ArrowLeft,
  MoreVertical,
  Paperclip,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

const AdminMessages = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  
  // Sample data - would come from API in production
  const chats = [
    {
      id: 'chat-001',
      user: {
        id: 'user-001',
        name: 'Amal Perera',
        avatar: 'https://i.pravatar.cc/300?img=5',
        email: 'amal@example.com',
        phone: '+94 77 123 4567',
        lastSeen: '2025-06-23T08:45:00'
      },
      unreadCount: 3,
      lastMessage: {
        content: 'When can I expect delivery of my order?',
        timestamp: '2025-06-23T09:30:00',
        isFromUser: true
      },
      messages: [
        {
          id: 'msg-001',
          content: 'Hello, I recently placed an order for a custom metal gate.',
          timestamp: '2025-06-22T14:30:00',
          isFromUser: true
        },
        {
          id: 'msg-002',
          content: 'Hi Amal, thank you for your order! How can I assist you today?',
          timestamp: '2025-06-22T14:35:00',
          isFromUser: false,
          staffName: 'Kamal Admin'
        },
        {
          id: 'msg-003',
          content: 'I was wondering about the timeline for installation.',
          timestamp: '2025-06-22T14:40:00',
          isFromUser: true
        },
        {
          id: 'msg-004',
          content: 'For custom gates, we typically need 2-3 weeks for fabrication, and then we can schedule the installation.',
          timestamp: '2025-06-22T14:45:00',
          isFromUser: false,
          staffName: 'Kamal Admin'
        },
        {
          id: 'msg-005',
          content: 'That sounds good. When can I expect delivery of my order?',
          timestamp: '2025-06-23T09:30:00',
          isFromUser: true
        }
      ]
    },
    {
      id: 'chat-002',
      user: {
        id: 'user-002',
        name: 'Priya Dissanayake',
        avatar: 'https://i.pravatar.cc/300?img=6',
        email: 'priya@example.com',
        phone: '+94 77 234 5678',
        lastSeen: '2025-06-23T10:15:00'
      },
      unreadCount: 0,
      lastMessage: {
        content: 'Thank you for the information!',
        timestamp: '2025-06-22T16:45:00',
        isFromUser: true
      },
      messages: [
        {
          id: 'msg-101',
          content: 'I\'m interested in getting a quote for security grills.',
          timestamp: '2025-06-22T15:30:00',
          isFromUser: true
        },
        {
          id: 'msg-102',
          content: "Hello Priya, we'd be happy to provide a quotation. Could you please provide the dimensions and quantity needed?",
          timestamp: '2025-06-22T15:45:00',
          isFromUser: false,
          staffName: 'Kamal Admin'
        },
        {
          id: 'msg-103',
          content: 'I need 4 windows secured, each approximately 4ft x 3ft.',
          timestamp: '2025-06-22T16:00:00',
          isFromUser: true
        },
        {
          id: 'msg-104',
          content: 'Thank you for the details. Our standard rate for security grills is Rs. 2,000 per square foot. For your windows, a rough estimate would be around Rs. 96,000 for all four. We can schedule a site visit for a precise quotation if you'd like.',
          timestamp: '2025-06-22T16:30:00',
          isFromUser: false,
          staffName: 'Kamal Admin'
        },
        {
          id: 'msg-105',
          content: 'Thank you for the information!',
          timestamp: '2025-06-22T16:45:00',
          isFromUser: true
        }
      ]
    },
    {
      id: 'chat-003',
      user: {
        id: 'user-003',
        name: 'Lasith Malinga',
        avatar: 'https://i.pravatar.cc/300?img=7',
        email: 'lasith@example.com',
        phone: '+94 77 345 6789',
        lastSeen: '2025-06-21T17:30:00'
      },
      unreadCount: 1,
      lastMessage: {
        content: 'Can you provide some samples of your previous staircase work?',
        timestamp: '2025-06-23T08:15:00',
        isFromUser: true
      },
      messages: [
        {
          id: 'msg-201',
          content: 'Hi there, I\'m planning to build a new house and need a metal staircase.',
          timestamp: '2025-06-21T11:30:00',
          isFromUser: true
        },
        {
          id: 'msg-202',
          content: 'Hello Lasith! Congratulations on your new house project. We specialize in custom metal staircases. Do you have any specific design in mind?',
          timestamp: '2025-06-21T13:45:00',
          isFromUser: false,
          staffName: 'Kamal Admin'
        },
        {
          id: 'msg-203',
          content: 'I\'m thinking of a modern spiral design, but I\'m open to suggestions.',
          timestamp: '2025-06-21T14:30:00',
          isFromUser: true
        },
        {
          id: 'msg-204',
          content: 'Spiral staircases are one of our specialties! They're elegant and space-saving. We can design one that fits your home's aesthetic perfectly.',
          timestamp: '2025-06-21T15:15:00',
          isFromUser: false,
          staffName: 'Kamal Admin'
        },
        {
          id: 'msg-205',
          content: 'Can you provide some samples of your previous staircase work?',
          timestamp: '2025-06-23T08:15:00',
          isFromUser: true
        }
      ]
    },
    {
      id: 'chat-004',
      user: {
        id: 'user-004',
        name: 'Samantha Jayasuriya',
        avatar: 'https://i.pravatar.cc/300?img=8',
        email: 'samantha@example.com',
        phone: '+94 77 456 7890',
        lastSeen: '2025-06-23T07:45:00'
      },
      unreadCount: 0,
      lastMessage: {
        content: 'We\'ll have your railings repaired by next Wednesday. Is that timeline acceptable?',
        timestamp: '2025-06-22T18:10:00',
        isFromUser: false,
        staffName: 'Kamal Admin'
      },
      messages: [
        {
          id: 'msg-301',
          content: 'Hello, I need to repair some damaged railings on my balcony.',
          timestamp: '2025-06-22T17:30:00',
          isFromUser: true
        },
        {
          id: 'msg-302',
          content: 'Hi Samantha, we can definitely help with railing repairs. Could you send some photos of the damage so we can assess the situation?',
          timestamp: '2025-06-22T17:45:00',
          isFromUser: false,
          staffName: 'Kamal Admin'
        },
        {
          id: 'msg-303',
          content: 'I\'ve attached photos of the damaged sections.',
          timestamp: '2025-06-22T17:55:00',
          isFromUser: true,
          hasAttachment: true
        },
        {
          id: 'msg-304',
          content: 'Thank you for the photos. Based on what I can see, this is a relatively straightforward repair job. We can send a technician to fix it next week.',
          timestamp: '2025-06-22T18:05:00',
          isFromUser: false,
          staffName: 'Kamal Admin'
        },
        {
          id: 'msg-305',
          content: 'We\'ll have your railings repaired by next Wednesday. Is that timeline acceptable?',
          timestamp: '2025-06-22T18:10:00',
          isFromUser: false,
          staffName: 'Kamal Admin'
        }
      ]
    }
  ];

  // Filter chats based on search term
  const filteredChats = chats.filter(chat => {
    return (
      chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    // In a real app, you would send this to your API
    console.log('Sending message to', selectedChat.user.name, ':', newMessage);
    
    // Clear the input after sending
    setNewMessage('');
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>{t('adminMessages.title')} | Kamal Iron Works</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('adminMessages.title')}</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          {t('adminMessages.newConversation')}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Chat list */}
        <Card className={`overflow-hidden ${selectedChat ? 'hidden lg:block' : ''}`}>
          <CardHeader className="px-4 py-3 border-b">
            <div className="relative">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('adminMessages.searchConversations')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto" style={{ height: 'calc(100vh - 280px)' }}>
            {filteredChats.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {t('adminMessages.noConversations')}
              </div>
            ) : (
              <div className="divide-y">
                {filteredChats.map((chat) => (
                  <div 
                    key={chat.id} 
                    className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${selectedChat?.id === chat.id ? 'bg-gray-100' : ''}`}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <div className="flex items-start">
                      <div className="relative mr-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={chat.user.avatar} />
                          <AvatarFallback>{chat.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {chat.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h4 className="font-medium truncate">{chat.user.name}</h4>
                          <span className="text-xs text-gray-500">
                            {format(new Date(chat.lastMessage.timestamp), 'h:mm a')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {chat.lastMessage.isFromUser ? '' : '✓ '}
                          {chat.lastMessage.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Chat area */}
        {selectedChat ? (
          <Card className="lg:col-span-2 overflow-hidden flex flex-col">
            {/* Chat header */}
            <CardHeader className="px-4 py-3 border-b flex flex-row items-center justify-between">
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mr-2 lg:hidden"
                  onClick={() => setSelectedChat(null)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={selectedChat.user.avatar} />
                  <AvatarFallback>{selectedChat.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedChat.user.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {t('adminMessages.lastSeen')} {format(new Date(selectedChat.user.lastSeen), 'h:mm a')}
                  </p>
                </div>
              </div>
              <div className="flex">
                <Button variant="ghost" size="sm" className="ml-1">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="ml-1">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="ml-1">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            {/* Messages */}
            <CardContent 
              className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4" 
              style={{ height: 'calc(100vh - 390px)' }}
            >
              {selectedChat.messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.isFromUser && (
                    <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                      <AvatarImage src="/admin-avatar.png" />
                      <AvatarFallback>KA</AvatarFallback>
                    </Avatar>
                  )}
                  <div 
                    className={`max-w-[75%] p-3 rounded-lg ${
                      message.isFromUser 
                        ? 'bg-black text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {!message.isFromUser && (
                      <p className="text-xs text-gray-500 mb-1">{message.staffName}</p>
                    )}
                    <p>{message.content}</p>
                    {message.hasAttachment && (
                      <div className="mt-2 p-2 bg-gray-200 rounded flex items-center text-xs text-gray-700">
                        <Paperclip className="h-3 w-3 mr-1" />
                        <span>image-attachment.jpg</span>
                      </div>
                    )}
                    <p className="text-xs text-right mt-1">
                      {format(new Date(message.timestamp), 'h:mm a')}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
            
            {/* Message input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Textarea 
                  placeholder={t('adminMessages.typeMessage')}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[44px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="lg:col-span-2 flex items-center justify-center">
            <CardContent className="text-center p-6">
              <h3 className="text-xl font-medium mb-2">{t('adminMessages.selectConversation')}</h3>
              <p className="text-gray-500">{t('adminMessages.noActiveChat')}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
