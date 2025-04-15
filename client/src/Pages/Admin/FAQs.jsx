  
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Edit, Plus, FilePlus } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DashboardLayout } from './components/layout/DashboardLayout';

const FAQs = () => {
  const faqCategories = [
    {
      id: 'application',
      name: 'Application Process',
      count: 8
    },
    {
      id: 'visa',
      name: 'Visa Guidance',
      count: 6
    },
    {
      id: 'documents',
      name: 'Required Documents',
      count: 5
    },
    {
      id: 'financial',
      name: 'Financial Aid',
      count: 4
    },
    {
      id: 'admissions',
      name: 'Admissions Timeline',
      count: 3
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'What are the basic requirements for applying to universities abroad?',
      answer: 'Basic requirements typically include academic transcripts, standardized test scores (SAT, GRE, GMAT, etc.), English proficiency test scores (TOEFL, IELTS), Statement of Purpose, recommendation letters, and a resume. Specific requirements vary by university and program.',
      category: 'application'
    },
    {
      id: 2,
      question: 'When should I start the university application process?',
      answer: 'It\'s best to start the application process at least 12-18 months before your intended enrollment date. This gives you ample time to prepare for standardized tests, craft strong application materials, and meet application deadlines.',
      category: 'application'
    },
    {
      id: 3,
      question: 'How many universities should I apply to?',
      answer: 'We typically recommend applying to 6-8 universities: 2-3 reach schools, 2-3 target schools, and 2 safety schools. This balanced approach maximizes your chances of admission while managing application costs.',
      category: 'application'
    },
    {
      id: 4,
      question: 'What is the difference between F1 and J1 student visas?',
      answer: 'F1 visas are for full-time students attending academic institutions or language programs. J1 visas are for exchange visitors participating in programs that promote cultural exchange, including students, scholars, and professors. F1 visas have more flexible employment options during and after studies.',
      category: 'visa'
    },
    {
      id: 5,
      question: 'When should I apply for my student visa?',
      answer: 'You should apply for your student visa as soon as you receive your acceptance letter and I-20/DS-2019 form from your university. The visa application process can take 2-8 weeks depending on the country and time of year.',
      category: 'visa'
    }
  ];

  const knowledgeArticles = [
    {
      id: 1,
      title: 'Complete Guide to the Common Application',
      description: 'A comprehensive walkthrough of the Common Application platform used by many US universities.',
      category: 'application',
      dateUpdated: '2023-09-15'
    },
    {
      id: 2,
      title: 'Writing an Effective Statement of Purpose',
      description: 'Tips and strategies for crafting a compelling statement of purpose that stands out to admissions committees.',
      category: 'application',
      dateUpdated: '2023-09-20'
    },
    {
      id: 3,
      title: 'Navigating F1 Visa Interview Questions',
      description: 'Common questions asked in F1 visa interviews and how to prepare effective answers.',
      category: 'visa',
      dateUpdated: '2023-08-30'
    },
    {
      id: 4,
      title: 'Understanding Financial Aid Options for International Students',
      description: 'A breakdown of scholarships, grants, and loan opportunities available to international students.',
      category: 'financial',
      dateUpdated: '2023-09-05'
    },
    {
      id: 5,
      title: 'How to Obtain Official Academic Transcripts',
      description: 'Step-by-step process for requesting and securing official academic transcripts from your institutions.',
      category: 'documents',
      dateUpdated: '2023-08-25'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">FAQs & Knowledge Base</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Add FAQ
            </Button>
            <Button>
              <FilePlus className="mr-2 h-4 w-4" /> New Article
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for FAQs and articles..."
            className="pl-8 w-full"
          />
        </div>

        <Tabs defaultValue="faqs">
          <TabsList>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          </TabsList>
          
          <TabsContent value="faqs" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-md px-3 py-2 bg-muted font-medium cursor-pointer">
                        <span>All Categories</span>
                        <Badge variant="secondary">{faqCategories.reduce((acc, cat) => acc + cat.count, 0)}</Badge>
                      </div>
                      {faqCategories.map((category) => (
                        <div 
                          key={category.id} 
                          className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-muted cursor-pointer"
                        >
                          <span>{category.name}</span>
                          <Badge variant="outline">{category.count}</Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Common questions from students about studying abroad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq) => (
                      <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                        <div className="flex items-center justify-between">
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <Button variant="ghost" size="icon" className="mr-4">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="knowledge" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-md px-3 py-2 bg-muted font-medium cursor-pointer">
                        <span>All Categories</span>
                        <Badge variant="secondary">{faqCategories.reduce((acc, cat) => acc + cat.count, 0)}</Badge>
                      </div>
                      {faqCategories.map((category) => (
                        <div 
                          key={category.id} 
                          className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-muted cursor-pointer"
                        >
                          <span>{category.name}</span>
                          <Badge variant="outline">{category.count}</Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Knowledge Base Articles</CardTitle>
                  <CardDescription>
                    In-depth guides and resources for students and advisors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {knowledgeArticles.map((article) => (
                      <Card key={article.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline">{article.category}</Badge>
                              <span className="text-xs text-muted-foreground">
                                Updated: {article.dateUpdated}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              {article.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Button variant="outline" size="sm">Read More</Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FAQs;
