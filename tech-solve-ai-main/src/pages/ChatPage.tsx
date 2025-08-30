import { useState, useRef, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Mic, 
  Paperclip, 
  Bot, 
  User, 
  Lightbulb,
  Zap,
  Clock,
  CheckCircle,
  Image,
  X,
  Upload,
  Camera
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'solution' | 'suggestion' | 'image';
  imageUrl?: string;
  imageAnalysis?: string;
}

const suggestedQuestions = [
  "My computer won't start, what should I check?",
  "Blue screen error on Windows 11",
  "iPhone not charging properly",
  "WiFi keeps disconnecting",
  "Laptop running very slow",
  "Graphics card not detected",
  "Upload screenshot of error message",
  "Show me this hardware issue"
];

export const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI troubleshooting assistant. Describe your tech problem and I'll help you solve it step by step. You can also upload screenshots or images for quick analysis and solutions.",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        sender: 'ai',
        timestamp: new Date(),
        type: 'solution'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string, hasImage: boolean = false): string => {
    const input = userInput.toLowerCase();
    
    if (hasImage) {
      return "I can see the image you've uploaded! Based on what I can observe, here's my analysis and solution:\n\n**Image Analysis**: I can see the technical issue in your screenshot.\n\n**Recommended Solution**:\n1. **Immediate Action**: [Specific step based on image]\n2. **Diagnostic Check**: [What to verify]\n3. **Prevention**: [How to avoid this in future]\n\n**Next Steps**:\n- Try the solution above\n- If the problem persists, let me know the results\n- I can provide additional troubleshooting steps\n\nWould you like me to explain any of these steps in more detail?";
    }
    
    if (input.includes('blue screen') || input.includes('bsod')) {
      return "I'll help you fix the Blue Screen error. Here's what we'll do:\n\n**Immediate Steps**:\n1. **Restart in Safe Mode**: Hold Shift while clicking Restart\n2. **Check for recent changes**: Any new hardware or software?\n3. **Run Memory Test**: Windows Memory Diagnostic\n4. **Update drivers**: Especially graphics and system drivers\n\n**Advanced Solutions**:\n- Check system logs in Event Viewer\n- Run SFC scan: `sfc /scannow`\n- Update BIOS/UEFI firmware\n\n**Prevention**:\n- Keep drivers updated\n- Avoid overclocking\n- Monitor system temperatures\n\nLet me know if you need detailed steps for any of these!";
    }
    
    if (input.includes('computer') && (input.includes("won't start") || input.includes("not starting"))) {
      return "Let's troubleshoot your startup issue systematically:\n\n**Power Issues**:\n1. **Check power connections**: Ensure all cables are secure\n2. **Test the power button**: Try holding for 10 seconds\n3. **Check power supply**: Listen for fan sounds\n\n**Hardware Issues**:\n4. **Remove external devices**: Unplug USB drives, external drives\n5. **Check RAM**: Reseat memory modules\n6. **Listen for beeps**: Any error codes?\n\n**Software Issues**:\n7. **Try Safe Mode**: F8 during boot\n8. **Last Known Good Configuration**: Advanced boot options\n9. **System Restore**: If available\n\nWhich step would you like to try first?";
    }
    
    if (input.includes('slow') || input.includes('performance')) {
      return "I can help speed up your system with these proven methods:\n\n**Quick Fixes**:\n1. **Check Task Manager**: Look for high CPU/memory usage\n2. **Disable startup programs**: msconfig > Startup\n3. **Run Disk Cleanup**: Free up storage space\n4. **Check for malware**: Run Windows Defender scan\n\n**Advanced Optimization**:\n5. **Update drivers**: Ensure all drivers are current\n6. **Defragment HDD**: (Not needed for SSDs)\n7. **Check for Windows updates**: Keep system updated\n8. **Increase virtual memory**: System Properties > Advanced\n\n**Hardware Upgrades**:\n- Add more RAM\n- Upgrade to SSD\n- Clean dust from fans\n\nShall we start with checking what's using your resources?";
    }
    
    if (input.includes('wifi') || input.includes('internet') || input.includes('network')) {
      return "Let's fix your network connectivity issues:\n\n**Basic Troubleshooting**:\n1. **Restart router/modem**: Unplug for 30 seconds\n2. **Check WiFi password**: Ensure it's correct\n3. **Move closer to router**: Reduce interference\n4. **Check device WiFi**: Turn off/on WiFi\n\n**Advanced Solutions**:\n5. **Update network drivers**: Device Manager\n6. **Reset network settings**: Windows Settings\n7. **Check router settings**: Admin panel\n8. **Change WiFi channel**: Reduce interference\n\n**Hardware Checks**:\n- Test with different device\n- Check router lights\n- Try Ethernet cable\n\nWhich step should we try first?";
    }
    
    if (input.includes('battery') || input.includes('charging')) {
      return "Let's solve your battery/charging issues:\n\n**For Laptops**:\n1. **Check power adapter**: Try different outlet\n2. **Remove battery**: Clean contacts\n3. **Update power drivers**: Device Manager\n4. **Check power settings**: Control Panel\n\n**For Mobile Devices**:\n1. **Try different cable/charger**: Rule out hardware\n2. **Clean charging port**: Remove debris\n3. **Restart device**: Soft reset\n4. **Check for updates**: System updates\n\n**Battery Health**:\n- Check battery health in settings\n- Consider battery replacement if old\n- Avoid extreme temperatures\n\nWhat type of device are you having issues with?";
    }
    
    return "I understand your issue. Let me provide a comprehensive approach to solve this:\n\n**Step-by-Step Process**:\n1. **Gather Information**: Let's understand your specific setup\n2. **Identify Root Cause**: Determine what's causing the problem\n3. **Apply Solutions**: Guide you through the most likely fixes\n4. **Verify Results**: Test each step to ensure it works\n\n**What I Need to Know**:\n- What device/operating system are you using?\n- When did this problem start?\n- What were you doing when it occurred?\n- Have you made any recent changes?\n\n**Upload an Image**: If you have a screenshot of the error or issue, upload it for faster, more accurate help!\n\nCan you provide more details about your specific situation?";
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setShowImageUpload(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendImageMessage = () => {
    if (!selectedImage || !imagePreview) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: "I've uploaded an image showing my tech problem. Can you help me analyze it?",
      sender: 'user',
      timestamp: new Date(),
      type: 'image',
      imageUrl: imagePreview
    };

    setMessages(prev => [...prev, userMessage]);
    setSelectedImage(null);
    setImagePreview(null);
    setShowImageUpload(false);
    setIsTyping(true);

    // Simulate AI response with image analysis
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse("", true),
        sender: 'ai',
        timestamp: new Date(),
        type: 'solution',
        imageAnalysis: "Based on the uploaded image, I can see the technical issue clearly. The error message/visual problem indicates [specific analysis]. Here's the most effective solution..."
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setShowImageUpload(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16 h-screen flex flex-col">
        {/* Header */}
        <div className="border-b border-border/20 bg-muted/30 px-6 py-4">
          <div className="container mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Troubleshooting Assistant</h1>
                <p className="text-sm text-foreground/60">Online • Ready to help</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Badge variant="outline" className="bg-success/20 text-success">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  98% Success Rate
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <div className="container mx-auto h-full flex">
            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'ai' && (
                      <div className="p-2 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-2xl ${message.sender === 'user' ? 'order-1' : ''}`}>
                      <Card className={`p-4 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'glass border-border/20'
                      }`}>
                        {message.type === 'image' && message.imageUrl && (
                          <div className="mb-3">
                            <img 
                              src={message.imageUrl} 
                              alt="Uploaded problem" 
                              className="max-w-full h-auto rounded-lg border border-border/20"
                              style={{ maxHeight: '300px' }}
                            />
                          </div>
                        )}
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        {message.type === 'solution' && message.sender === 'ai' && (
                          <div className="mt-3 pt-3 border-t border-border/20 flex gap-2">
                            <Button size="sm" variant="outline">
                              <Lightbulb className="w-4 h-4 mr-1" />
                              Helpful
                            </Button>
                            <Button size="sm" variant="outline">
                              Need More Help
                            </Button>
                          </div>
                        )}
                      </Card>
                      <p className="text-xs text-foreground/50 mt-1 px-2">
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>

                    {message.sender === 'user' && (
                      <div className="p-2 rounded-full bg-muted flex-shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-4">
                    <div className="p-2 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <Card className="p-4 glass border-border/20">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-foreground/60">AI is thinking...</span>
                      </div>
                    </Card>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-border/20 bg-muted/30 p-6">
                <div className="container mx-auto">
                  {/* Suggested Questions */}
                  {messages.length === 1 && (
                    <div className="mb-4">
                      <p className="text-sm text-foreground/60 mb-3">Try asking:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedQuestions.map((question, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestedQuestion(question)}
                            className="text-left h-auto py-2 px-3 whitespace-normal"
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Image Upload Preview */}
                  {showImageUpload && imagePreview && (
                    <div className="mb-4 p-4 bg-muted/50 rounded-lg border border-border/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Image Preview</span>
                        <Button size="sm" variant="ghost" onClick={removeImage}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-16 h-16 object-cover rounded border border-border/20"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-foreground/70">
                            {selectedImage?.name} ({(selectedImage?.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                          <p className="text-xs text-foreground/50">
                            Upload this image for AI analysis
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={sendImageMessage}
                          className="bg-gradient-to-r from-primary to-secondary"
                        >
                          <Upload className="w-4 h-4 mr-1" />
                          Send Image
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-end gap-3">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Describe your tech problem or upload an image..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                        className="pr-20 min-h-[48px] glass border-border/20"
                        disabled={isTyping}
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={() => fileInputRef.current?.click()}
                          title="Upload Image"
                        >
                          <Image className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Voice Input">
                          <Mic className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Button 
                      onClick={() => sendMessage(inputValue)}
                      disabled={!inputValue.trim() || isTyping}
                      className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-secondary"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-80 border-l border-border/20 bg-muted/30 p-6 hidden lg:block">
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    window.location.href = '/diagnostics';
                  }}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Run Diagnostics
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    // Show chat history
                    const history = messages.filter(m => m.sender === 'user');
                    if (history.length > 0) {
                      alert(`Chat History (${history.length} messages):\n${history.map(m => `- ${m.content}`).join('\n')}`);
                    } else {
                      alert('No chat history yet');
                    }
                  }}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  View History
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    if (confirm('Are you sure you want to reset the conversation?')) {
                      setMessages([{
                        id: '1',
                        content: "Hello! I'm your AI troubleshooting assistant. Describe your tech problem and I'll help you solve it step by step. You can also upload screenshots or use voice input.",
                        sender: 'ai',
                        timestamp: new Date(),
                        type: 'text'
                      }]);
                    }
                  }}
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Reset Conversation
                </Button>
              </div>

              <div className="mt-8">
                <h3 className="font-bold mb-4">Quick Tips</h3>
                <div className="space-y-3">
                  <Card className="p-3 glass border-border/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Camera className="w-4 h-4 text-primary" />
                      <h4 className="font-medium text-sm">Upload Images</h4>
                    </div>
                    <p className="text-xs text-foreground/60">
                      Screenshots help me provide faster, more accurate solutions
                    </p>
                  </Card>
                  <Card className="p-3 glass border-border/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      <h4 className="font-medium text-sm">Be Specific</h4>
                    </div>
                    <p className="text-xs text-foreground/60">
                      Include device model, OS version, and when the problem started
                    </p>
                  </Card>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-bold mb-4">Related Guides</h3>
                <div className="space-y-3">
                  <Card className="p-3 glass border-border/20">
                    <h4 className="font-medium text-sm">Blue Screen Fix Guide</h4>
                    <p className="text-xs text-foreground/60 mt-1">Step-by-step BSOD solution</p>
                  </Card>
                  <Card className="p-3 glass border-border/20">
                    <h4 className="font-medium text-sm">Startup Troubleshooting</h4>
                    <p className="text-xs text-foreground/60 mt-1">Computer won't boot solutions</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};