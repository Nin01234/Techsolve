import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Clock, 
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  User,
  Building,
  Globe,
  Heart,
  Star,
  Users,
  Award
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { initEmailJS, sendContactEmail } from '@/lib/emailjs';

const ContactPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Initialize EmailJS
    initEmailJS();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const result = await sendContactEmail(formData, user?.id);
      
      if (result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: user?.user_metadata?.full_name || '',
          email: user?.email || '',
          subject: '',
          message: '',
          priority: 'medium'
        });
        
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      
      // Clear error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/', color: 'bg-blue-600' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/', color: 'bg-sky-500' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/', color: 'bg-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/', color: 'bg-blue-700' },
    { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/', color: 'bg-red-600' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/', color: 'bg-gray-800' }
  ];

  const supportOptions = [
    {
      title: 'Live Chat Support',
      description: 'Get instant help from our support team',
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      available: true,
      responseTime: 'Instant'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      available: true,
      responseTime: 'Within 24 hours'
    },
    {
      title: 'Phone Support',
      description: 'Call us directly for urgent issues',
      icon: Phone,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      available: true,
      responseTime: 'Immediate'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Head of Support',
      avatar: '/api/placeholder/60/60',
      email: 'sarah@techsolveai.com',
      expertise: 'Technical Support, Customer Success'
    },
    {
      name: 'Mike Chen',
      role: 'Senior Developer',
      avatar: '/api/placeholder/60/60',
      email: 'mike@techsolveai.com',
      expertise: 'Software Development, API Integration'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Community Manager',
      avatar: '/api/placeholder/60/60',
      email: 'emily@techsolveai.com',
      expertise: 'Community Building, User Engagement'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're here to help! Reach out to our support team for any questions, 
              technical issues, or feedback about TechSolve AI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Name
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Priority
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </div>
                      )}
                    </Button>

                                         {submitStatus === 'success' && (
                       <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
                         <CheckCircle className="h-5 w-5" />
                         Message sent successfully! We'll get back to you soon via email.
                       </div>
                     )}

                     {submitStatus === 'error' && (
                       <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
                         <AlertCircle className="h-5 w-5" />
                         Failed to send message. Please check your connection and try again.
                       </div>
                     )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Email</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">support@techsolveai.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Address</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        123 Tech Street<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Business Hours</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Mon-Fri: 9AM-6PM PST<br />
                        Sat: 10AM-4PM PST
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    Follow Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.color} text-white p-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
                      >
                        <social.icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{social.name}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Support Options */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Support Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportOptions.map((option) => (
                <Card key={option.title} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-lg ${option.bgColor}`}>
                        <option.icon className={`h-6 w-6 ${option.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{option.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{option.responseTime}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{option.description}</p>
                    <Button className="w-full" variant="outline">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.name} className="shadow-lg border-0 text-center">
                  <CardContent className="p-6">
                    <Avatar className="w-16 h-16 mx-auto mb-4">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{member.expertise}</p>
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {member.email}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">10K+</div>
                <div className="text-blue-100">Happy Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Support Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-blue-100">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">2.3s</div>
                <div className="text-blue-100">Avg Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
