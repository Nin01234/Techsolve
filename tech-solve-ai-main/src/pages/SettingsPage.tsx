import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Key, 
  Save,
  Moon,
  Sun,
  Monitor,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { initEmailJS, sendSettingsConfirmation } from '@/lib/emailjs';

const SettingsPage = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const [settings, setSettings] = useState({
    profile: {
      fullName: user?.user_metadata?.full_name || '',
      email: user?.email || '',
      phone: user?.user_metadata?.phone || '',
      bio: user?.user_metadata?.bio || ''
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false,
      community: true
    },
    privacy: {
      profileVisibility: 'public' as const,
      showEmail: false,
      allowMessages: true,
      dataCollection: true
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Initialize EmailJS
    initEmailJS();
  }, []);

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setSaveStatus('idle');
    
    try {
      const result = await sendSettingsConfirmation(settings, user);
      if (result.success) {
        setSaveStatus('success');
        console.log('Settings confirmation email sent successfully');
      } else {
        setSaveStatus('error');
        console.error('Failed to send settings confirmation email:', result.error);
      }
    } catch (error) {
      console.error('Failed to send settings confirmation email:', error);
      setSaveStatus('error');
    } finally {
      setIsLoading(false);
      setTimeout(() => setSaveStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Settings */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback className="text-lg">
                        {user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={settings.profile.fullName}
                        onChange={(e) => handleSettingChange('profile', 'fullName', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.profile.email}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={settings.profile.phone}
                        onChange={(e) => handleSettingChange('profile', 'phone', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      value={settings.profile.bio}
                      onChange={(e) => handleSettingChange('profile', 'bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-600" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                      </div>
                                             <Switch
                         checked={Boolean(value)}
                         onCheckedChange={(checked) => handleSettingChange('notifications', key, checked)}
                       />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Profile Visibility</Label>
                    <select
                      value={settings.privacy.profileVisibility}
                      onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>

                  {Object.entries(settings.privacy).slice(1).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                      </div>
                      <Switch
                        checked={Boolean(value)}
                        onCheckedChange={(checked) => handleSettingChange('privacy', key, checked)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Theme Settings */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-blue-600" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <Button
                        variant={theme === 'light' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('light')}
                        className="flex flex-col items-center gap-1 h-auto py-3"
                      >
                        <Sun className="h-4 w-4" />
                        <span className="text-xs">Light</span>
                      </Button>
                      <Button
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('dark')}
                        className="flex flex-col items-center gap-1 h-auto py-3"
                      >
                        <Moon className="h-4 w-4" />
                        <span className="text-xs">Dark</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex flex-col items-center gap-1 h-auto py-3"
                      >
                        <Monitor className="h-4 w-4" />
                        <span className="text-xs">System</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Save className="h-5 w-5 text-blue-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save All Changes
                      </div>
                    )}
                  </Button>

                  {saveStatus === 'success' && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
                      <CheckCircle className="h-5 w-5" />
                      Settings saved successfully!
                    </div>
                  )}

                  {saveStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
                      <AlertCircle className="h-5 w-5" />
                      Failed to save settings
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Account Info */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Status</p>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
