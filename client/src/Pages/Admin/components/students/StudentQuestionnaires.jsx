import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock questionnaires data
const mockQuestionnaires = [
  {
    id: 1,
    title: 'Initial Student Assessment',
    status: 'completed',
    submittedDate: '2023-09-15',
    responses: [
      { question: 'What are your top 3 university choices?', answer: 'Stanford, MIT, Harvard' },
      { question: 'What is your preferred study location?', answer: 'United States, United Kingdom' },
      { question: 'What majors are you interested in?', answer: 'Computer Science, Data Science' },
      { question: 'Do you require financial aid?', answer: 'Yes, partial scholarship' }
    ]
  },
  {
    id: 2,
    title: 'University Preference Form',
    status: 'completed',
    submittedDate: '2023-10-02',
    responses: [
      { question: 'Preferred university size?', answer: 'Large (15,000+ students)' },
      { question: 'Urban or rural campus preference?', answer: 'Urban' },
      { question: 'Importance of university ranking (1-10)', answer: '8' },
      { question: 'Interested in research opportunities?', answer: 'Yes, especially in AI and machine learning' }
    ]
  },
  {
    id: 3,
    title: 'Financial Aid Application',
    status: 'pending',
    submittedDate: null,
    responses: []
  },
  {
    id: 4,
    title: 'Post-Admission Survey',
    status: 'not-started',
    submittedDate: null,
  }
];


export function StudentQuestionnaires() {
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  
  const handleViewQuestionnaire = (questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
    setIsViewOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'not-started':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Not Started</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Questionnaires</CardTitle>
        <CardDescription>
          View questionnaires submitted by this student
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockQuestionnaires.map((questionnaire) => (
            <div 
              key={questionnaire.id} 
              className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">{questionnaire.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {questionnaire.submittedDate 
                      ? `Submitted on ${questionnaire.submittedDate}` 
                      : questionnaire.status === 'pending' 
                        ? 'Not submitted yet' 
                        : 'Not started'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(questionnaire.status)}
                {questionnaire.status === 'completed' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewQuestionnaire(questionnaire)}
                  >
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedQuestionnaire?.title}</DialogTitle>
            <DialogDescription>
              Submitted on {selectedQuestionnaire?.submittedDate}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Tabs defaultValue="responses">
              <TabsList className="w-full">
                <TabsTrigger value="responses" className="flex-1">Responses</TabsTrigger>
                <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
              </TabsList>
              <TabsContent value="responses" className="mt-4">
                <div className="space-y-4">
                  {selectedQuestionnaire?.responses.map((response, index) => (
                    <div key={index} className="border-b pb-3 last:border-0">
                      <h3 className="font-medium text-sm">{response.question}</h3>
                      <p className="text-sm mt-1">{response.answer}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="summary" className="mt-4">
                <div className="text-sm">
                  <p>Questionnaire completed on {selectedQuestionnaire?.submittedDate}</p>
                  <p className="mt-2">Total questions: {selectedQuestionnaire?.responses.length}</p>
                  <p className="mt-2">Key insights:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Student is interested in {selectedQuestionnaire?.responses.find(r => r.question.includes('majors'))?.answer}</li>
                    <li>Preferred universities: {selectedQuestionnaire?.responses.find(r => r.question.includes('university choices'))?.answer}</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}


  
StudentQuestionnaires.propTypes = {
  studentId: PropTypes.string.isRequired,
};