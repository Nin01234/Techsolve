import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { HeroSlider } from '@/components/HeroSlider'
import { 
  Shield, 
  Wrench, 
  Network, 
  Monitor, 
  Zap, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react'

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Solutions",
      description: "Advanced security protocols and threat detection systems"
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Hardware Repair",
      description: "Expert hardware diagnostics and repair services"
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Network Solutions",
      description: "Comprehensive network infrastructure and optimization"
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Software Support",
      description: "Software installation, updates, and troubleshooting"
    }
  ]

  const benefits = [
    "24/7 Expert Support",
    "Real-time Diagnostics",
    "Secure Data Protection",
    "Fast Response Times",
    "Professional Technicians",
    "Comprehensive Solutions"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive technical solutions covering all aspects of modern technology challenges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Tech Solutions AI?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their technology needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 text-white">
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of tech enthusiasts and get expert help whenever you need it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105">
                Create Free Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="h-12 px-8 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-all duration-200">
                Sign In Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
