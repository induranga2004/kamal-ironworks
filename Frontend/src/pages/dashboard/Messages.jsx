import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Phone,
  Video,
  Image as ImageIcon,
  Paperclip,
  MoreVertical,
  User,
  Clock,
  Check,
  CheckCheck
} from 'lucide-react';

const Messages = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [chats, setChats] = useState([]);
  const messagesEndRef = useRef(null);
  
  // Sample data - would come from API in production
  const sampleChats = [
    {
      id: 'chat-1',
      type: 'support',
      contact: {
        id: 'support-1',
        name: 'Kamal Support',
        avatar: null,
        role: 'support',
        isOnline: true,
        lastSeen: new Date()
      },
      lastMessage: {
        text: "How can I help you with your metal gate design?",
        time: '10:30 AM',
        isRead: true,
        sender: 'them'
      },
      unreadCount: 0,
      messages: [
        {
          id: 'msg-1-1',
          text: "Hello! Welcome to Kamal Iron Works customer support. How can I assist you today?",
          time: '10:15 AM',
          sender: 'them',
          status: 'read'
        },
        {
          id: 'msg-1-2',
          text: "Hi, I'm interested in getting a custom metal gate for my home.",
          time: '10:20 AM',
          sender: 'me',
          status: 'read'
        },
        {
          id: 'msg-1-3',
          text: "Great! I'd be happy to help you with that. Do you have any specific design in mind or would you like to see some of our previous work?",
          time: '10:25 AM',
          sender: 'them',
          status: 'read'
        },
        {
          id: 'msg-1-4',
          text: "I'd like to see some examples please.",
          time: '10:28 AM',
          sender: 'me',
          status: 'read'
        },
        {
          id: 'msg-1-5',
          text: "How can I help you with your metal gate design?",
          time: '10:30 AM',
          sender: 'them',
          status: 'read'
        }
      ]
    },
    {
      id: 'chat-2',
      type: 'quote',
      contact: {
        id: 'sales-1',
        name: 'Amal Perera',
        avatar: 'https://i.pravatar.cc/300?img=11',
        role: 'sales',
        isOnline: false,
        lastSeen: new Date(Date.now() - 3600000) // 1 hour ago
      },
      lastMessage: {
        text: "Thank you for your interest in our security bars. I've attached the quotation.",
        time: 'Yesterday',
        isRead: false,
        sender: 'them'
      },
      unreadCount: 1,
      messages: [
        {
          id: 'msg-2-1',
          text: "Hello, I'm Amal from Kamal Iron Works. I understand you're interested in our security bar installation.",
          time: 'Yesterday',
          sender: 'them',
          status: 'read'
        },
        {
          id: 'msg-2-2',
          text: "Yes, I need security bars for 5 windows in my house.",
          time: 'Yesterday',
          sender: 'me',
          status: 'read'
        },
        {
          id: 'msg-2-3',
          text: "Thank you for your interest in our security bars. I've attached the quotation.",
          time: 'Yesterday',
          sender: 'them',
          status: 'delivered'
        }
      ]
    },
    {
      id: 'chat-3',
      type: 'project',
      contact: {
        id: 'project-1',
        name: 'Nimal Silva',
        avatar: 'https://i.pravatar.cc/300?img=12',
        role: 'project_manager',
        isOnline: true,
        lastSeen: new Date()
      },
      lastMessage: {
        text: "We've finished the initial measurements. The installation team will arrive on Monday at 9 AM.",
        time: '2 days ago',
        isRead: true,
        sender: 'them'
      },
      unreadCount: 0,
      messages: [
        {
          id: 'msg-3-1',
          text: "Hello! I'm Nimal, your project manager for the metal railing installation.",
          time: '3 days ago',
          sender: 'them',
          status: 'read'
        },
        {
          id: 'msg-3-2',
          text: "Hi Nimal, nice to meet you. When can we expect the installation to begin?",
          time: '3 days ago',
          sender: 'me',
          status: 'read'
        },
        {
          id: 'msg-3-3',
          text: "We need to do some measurements first. Can our team visit this Friday?",
          time: '2 days ago',
          sender: 'them',
          status: 'read'
        },
        {
          id: 'msg-3-4',
          text: "Yes, Friday works for me. What time should I expect them?",
          time: '2 days ago',
          sender: 'me',
          status: 'read'
        },
        {
          id: 'msg-3-5',
          text: "We've finished the initial measurements. The installation team will arrive on Monday at 9 AM.",
          time: '2 days ago',
          sender: 'them',
          status: 'read'
        }
      ]
    }
  ];

  useEffect(() => {
    // Load chats (in a real app, this would come from an API)
    setChats(sampleChats);
    
    // Set the first chat as active by default
    if (sampleChats.length > 0 && !activeChat) {
      setActiveChat(sampleChats[0].id);
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change or when changing chat
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat, chats]);

  // Filter chats based on search term
  const filteredChats = chats.filter(chat => 
    chat.contact.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Get the active chat data
  const activeChatData = chats.find(chat => chat.id === activeChat);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Create a new message object
    const message = {
      id: `msg-${Date.now()}`,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      status: 'sent'
    };
    
    // Update the chats state with the new message
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === activeChat
          ? {
              ...chat,
              messages: [...chat.messages, message],
              lastMessage: {
                text: newMessage,
                time: message.time,
                isRead: false,
                sender: 'me'
              }
            }
          : chat
      )
    );
    
    // Clear the input field
    setNewMessage('');
    
    // Simulate a reply after a delay (for demo purposes)
    if (activeChatData) {
      setTimeout(() => {
        const replyMessage = {
          id: `msg-${Date.now() + 1}`,
          text: "Thank you for your message. Our team will get back to you shortly.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sender: 'them',
          status: 'delivered'
        };
        
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id === activeChat
              ? {
                  ...chat,
                  messages: [...chat.messages, replyMessage],
                  lastMessage: {
                    text: replyMessage.text,
                    time: replyMessage.time,
                    isRead: false,
                    sender: 'them'
                  },
                  unreadCount: 1
                }
              : chat
          )
        );
      }, 2000);
    }
  };

  // Get message status icon
  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('messages.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('messages.pageDescription')} />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('messages.title')}</h1>
          <p className="text-muted-foreground">{t('messages.subtitle')}</p>
        </div>
        <Separator className="my-6" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chats List */}
          <div className="lg:col-span-1">
            <Card className="h-[calc(80vh-120px)]">
              <CardHeader className="border-b p-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder={t('messages.searchPlaceholder')}
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0 overflow-auto h-[calc(80vh-180px)]">
                {filteredChats.length > 0 ? (
                  <div className="divide-y">
                    {filteredChats.map((chat) => (
                      <div
                        key={chat.id}
                        className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
                          activeChat === chat.id ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => {
                          setActiveChat(chat.id);
                          // Mark as read when opening chat
                          setChats(prevChats => 
                            prevChats.map(c => 
                              c.id === chat.id
                                ? { ...c, unreadCount: 0 }
                                : c
                            )
                          );
                        }}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            {chat.contact.avatar ? (
                              <AvatarImage src={chat.contact.avatar} alt={chat.contact.name} />
                            ) : (
                              <AvatarFallback>{chat.contact.name[0]}</AvatarFallback>
                            )}
                          </Avatar>
                          {chat.contact.isOnline && (
                            <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
                          )}
                        </div>
                        <div className="ml-3 flex-1 overflow-hidden">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">{chat.contact.name}</h4>
                            <span className="text-xs text-gray-500">{chat.lastMessage.time}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500 truncate">
                              {chat.lastMessage.sender === 'me' && 'You: '}
                              {chat.lastMessage.text}
                            </p>
                            {chat.unreadCount > 0 && (
                              <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                {chat.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-gray-500">{t('messages.noChats')}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Chat Area */}
          <div className="lg:col-span-2">
            {activeChatData ? (
              <Card className="h-[calc(80vh-120px)] flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b p-4 flex flex-row items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      {activeChatData.contact.avatar ? (
                        <AvatarImage src={activeChatData.contact.avatar} alt={activeChatData.contact.name} />
                      ) : (
                        <AvatarFallback>{activeChatData.contact.name[0]}</AvatarFallback>
                      )}
                    </Avatar>
                    <div className="ml-3">
                      <CardTitle className="text-base">{activeChatData.contact.name}</CardTitle>
                      <div className="flex items-center text-xs text-gray-500">
                        {activeChatData.contact.isOnline ? (
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                            {t('messages.online')}
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {t('messages.lastSeen')}: {new Date(activeChatData.contact.lastSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                
                {/* Messages */}
                <CardContent className="flex-1 overflow-auto p-4 space-y-4">
                  {activeChatData.messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === 'me' 
                            ? 'bg-black text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <div 
                          className={`flex items-center mt-1 text-xs ${
                            message.sender === 'me' ? 'text-gray-300 justify-end' : 'text-gray-500'
                          }`}
                        >
                          <span>{message.time}</span>
                          {message.sender === 'me' && (
                            <span className="ml-1">
                              {getMessageStatusIcon(message.status)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </CardContent>
                
                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                    <div className="flex-1">
                      <Textarea
                        placeholder={t('messages.typePlaceholder')}
                        className="min-h-10 resize-none"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                    </div>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-[calc(80vh-120px)] flex flex-col items-center justify-center text-center p-8">
                <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium mb-2">{t('messages.noActiveChat')}</h3>
                <p className="text-gray-500 mb-6 max-w-md">
                  {t('messages.selectChatMessage')}
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
