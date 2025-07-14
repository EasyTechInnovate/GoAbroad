
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const [selectedCategory, setSelectedCategory] = useState('masters');
  const navigate = useNavigate();

  const handleSelectPlan = (planType, price, category) => {
    navigate('/checkout', {
      state: {
        planType,
        price,
        category,
        planDetails: getPlanDetails(planType, category)
      }
    });
  };

  const getPlanDetails = (planType, category) => {
    const plans = {
      masters: {
        basic: {
          name: 'UpBroad Basic',
          price: 24999,
          features: [
            'Help you shortlist universities',
            'Prepare and Assess Your Admissions Documents Tailored for 1 Unique University'
          ]
        },
        pro: {
          name: 'UpBroad Pro',
          price: 39999,
          features: [
            'Help you shortlist universities',
            'Prepare and Assess Your Admissions Documents Tailored for 3 Unique Universities',
            'Become Your Mentors',
            'Help You Crack Interviews',
            'Guide You Through Scholarships'
          ]
        },
        premier: {
          name: 'UpBroad Premier',
          price: 59999,
          features: [
            'Help you shortlist universities',
            'Prepare and Assess Your Admissions Documents Tailored for 5 Unique Universities',
            'Become Your Mentors',
            'Help You Crack Interviews',
            'Guide You Through Scholarships',
            'US Job Market Masterclass',
            'GRE Help',
            'Give You Visa Assistance',
            'Guide You Pre-Departure',
            'Connect You to a Community'
          ]
        }
      },
      bachelors: {
        basic: {
          name: 'UpBroad Basic',
          price: 44999,
          features: [
            'One (1) Statement of Purpose (SOP) preparation',
            'University shortlisting (limited to the US)',
            'One (1) Letter of Recommendation (LOR) preparation'
          ]
        },
        pro: {
          name: 'UpBroad Pro',
          price: 69999,
          features: [
            'Help in shortlisting universities (US)',
            'Preparation and assessment of admissions documents',
            'Mentorship & interview preparation',
            'Guidance on available scholarships'
          ]
        },
        premier: {
          name: 'UpBroad Premier',
          price: 84999,
          features: [
            'Help in shortlisting universities (US)',
            'Preparation and assessment of admissions documents',
            'Mentorship & interview preparation',
            'Job Market Masterclass',
            'Visa assistance',
            'Pre-departure guidance'
          ]
        }
      },
      mba: {
        basic: {
          name: 'UpBroad Basic',
          price: 44999,
          features: [
            'Help you shortlist universities',
            'Prepare and assess your admissions documents tailored for 1 unique university'
          ]
        },
        pro: {
          name: 'UpBroad Pro',
          price: 59999,
          features: [
            'Help you shortlist universities',
            'Prepare and assess your admissions documents tailored for 3 unique universities',
            'Become your mentors',
            'Help you crack interviews',
            'Guide you through scholarships'
          ]
        },
        premier: {
          name: 'UpBroad Premier',
          price: 79999,
          features: [
            'Help you shortlist universities',
            'Prepare and assess your admissions documents tailored for 5 unique universities',
            'Become your mentors',
            'Help you crack interviews',
            'Guide you through scholarships',
            'US job market masterclass',
            'GRE help',
            'Give you visa assistance',
            'Guide you pre-departure',
            'Connect you to a community'
          ]
        }
      }
    };
    return plans[category][planType];
  };

  const currentPlans = getPlanDetails('basic', selectedCategory);
  const basicPlan = getPlanDetails('basic', selectedCategory);
  const proPlan = getPlanDetails('pro', selectedCategory);
  const premierPlan = getPlanDetails('premier', selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-[#145044]/5 to-[#145044]/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <Badge className="bg-[#145044] text-white px-4 py-2 text-sm font-medium mb-6">
              🎓 Choose Your Plan
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Invest in Your
              <br />
              <span style={{ color: '#145044' }}>Academic Future</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Choose the perfect plan for your academic journey. From basic guidance to comprehensive support, we have everything you need to succeed.
            </p>

            {/* Category Selection */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Button
                variant={selectedCategory === 'masters' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('masters')}
                className={selectedCategory === 'masters' ? 'bg-[#145044] hover:bg-[#145044]/90' : 'border-[#145044] text-[#145044] hover:bg-[#145044]/10'}
                size="lg"
              >
                Masters
              </Button>
              <Button
                variant={selectedCategory === 'bachelors' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('bachelors')}
                className={selectedCategory === 'bachelors' ? 'bg-[#145044] hover:bg-[#145044]/90' : 'border-[#145044] text-[#145044] hover:bg-[#145044]/10'}
                size="lg"
              >
                Bachelors
              </Button>
              <Button
                variant={selectedCategory === 'mba' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('mba')}
                className={selectedCategory === 'mba' ? 'bg-[#145044] hover:bg-[#145044]/90' : 'border-[#145044] text-[#145044] hover:bg-[#145044]/10'}
                size="lg"
              >
                MBA
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {/* Basic Plan */}
              <Card className="border-2 border-gray-200 hover:border-[#145044]/30 transition-colors">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">{basicPlan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold" style={{ color: '#145044' }}>₹{basicPlan.price.toLocaleString('en-IN')}</span>
                    <span className="text-gray-500 ml-2">/ one-time</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 mb-8">
                    {basicPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#145044' }} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-[#145044] hover:bg-[#145044]/90 text-white"
                    size="lg"
                    onClick={() => handleSelectPlan('basic', basicPlan.price, selectedCategory)}
                  >
                    Choose Basic
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="border-2 border-[#145044] relative transform scale-105 shadow-xl">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[#145044] text-white px-4 py-2">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">{proPlan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold" style={{ color: '#145044' }}>₹{proPlan.price.toLocaleString('en-IN')}</span>
                    <span className="text-gray-500 ml-2">/ one-time</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 mb-8">
                    {proPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#145044' }} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-[#145044] hover:bg-[#145044]/90 text-white"
                    size="lg"
                    onClick={() => handleSelectPlan('pro', proPlan.price, selectedCategory)}
                  >
                    Choose Pro
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>

              {/* Premier Plan */}
              <Card className="border-2 border-gray-200 hover:border-[#145044]/30 transition-colors">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">{premierPlan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold" style={{ color: '#145044' }}>₹{premierPlan.price.toLocaleString('en-IN')}</span>
                    <span className="text-gray-500 ml-2">/ one-time</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 mb-8">
                    {premierPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#145044' }} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-[#145044] hover:bg-[#145044]/90 text-white"
                    size="lg"
                    onClick={() => handleSelectPlan('premier', premierPlan.price, selectedCategory)}
                  >
                    Choose Premier
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Add-Ons Section */}
            <div className="text-center">
              <Card className="max-w-2xl mx-auto border-2 border-orange-200 bg-orange-50">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Add-Ons</h3>
                  <div className="text-3xl font-bold mb-4" style={{ color: '#145044' }}>₹7,000 / university</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-3">
                      <CheckCircle className="w-5 h-5" style={{ color: '#145044' }} />
                      <span>If you wish to apply to more universities than those included</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <CheckCircle className="w-5 h-5" style={{ color: '#145044' }} />
                      <span>We offer additional document preparation services at an extended price</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ or Trust Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Why Choose UpBroad?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#145044' }}>
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
                <p className="text-gray-600">Our experienced counselors have helped thousands of students achieve their dreams</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#145044' }}>
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Proven Success</h3>
                <p className="text-gray-600">95% of our students get accepted into their preferred universities</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#145044' }}>
                  <ArrowRight className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">End-to-End Support</h3>
                <p className="text-gray-600">From application to visa, we're with you every step of the way</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
