import { DashboardLayout } from './components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Bell, 
  Shield, 
  Users, 
  LogOut, 
  Mail,  
  Smartphone,
  ExternalLink,
  Check,
  Loader2,
  Calendar,
  Plus,
  Laptop,
  MessageSquare,
  FileText
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        </div>

        <Tabs defaultValue="profile">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-64 w-full">
              <TabsList className="flex flex-col w-full h-full space-y-1 bg-transparent p-0">
                <TabsTrigger value="profile" className="justify-start w-full">
                  <User className="mr-2 h-4 w-4" /> Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className="justify-start w-full">
                  <Bell className="mr-2 h-4 w-4" /> Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="justify-start w-full">
                  <Shield className="mr-2 h-4 w-4" /> Security
                </TabsTrigger>
                <TabsTrigger value="team" className="justify-start w-full">
                  <Users className="mr-2 h-4 w-4" /> Team Members
                </TabsTrigger>
                <TabsTrigger value="integrations" className="justify-start w-full">
                  <ExternalLink className="mr-2 h-4 w-4" /> Integrations
                </TabsTrigger>
              </TabsList>
              <Separator className="my-4" />
              <Button variant="outline" className="w-full justify-start text-destructive">
                <LogOut className="mr-2 h-4 w-4" /> Log Out
              </Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal information and profile settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-lg">JD</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-medium">Profile Picture</h3>
                        <p className="text-sm text-muted-foreground">
                          Upload a picture to personalize your account
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">Change</Button>
                          <Button size="sm" variant="outline" className="text-destructive">Remove</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input id="bio" defaultValue="Education Consultant with 10+ years of experience" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Email Notifications</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-new-applications" className="text-sm font-normal">
                              New Application Submissions
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Receive notifications when students submit new applications
                            </p>
                          </div>
                          <Switch id="email-new-applications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-document-uploads" className="text-sm font-normal">
                              Document Uploads
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Get notified when students upload new documents
                            </p>
                          </div>
                          <Switch id="email-document-uploads" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-task-completion" className="text-sm font-normal">
                              Task Completions
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Get notified when tasks are completed
                            </p>
                          </div>
                          <Switch id="email-task-completion" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">In-App Notifications</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="app-messages" className="text-sm font-normal">
                              New Messages
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Show notifications for new messages and chats
                            </p>
                          </div>
                          <Switch id="app-messages" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="app-deadlines" className="text-sm font-normal">
                              Approaching Deadlines
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Show alerts for upcoming application deadlines
                            </p>
                          </div>
                          <Switch id="app-deadlines" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="app-system" className="text-sm font-normal">
                              System Updates
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Get notified about system maintenance and updates
                            </p>
                          </div>
                          <Switch id="app-system" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Notification Delivery</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="notification-summary">Daily Summary</Label>
                          <Select defaultValue="end-of-day">
                            <SelectTrigger id="notification-summary">
                              <SelectValue placeholder="Select timing" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Don&apos;t send summary</SelectItem>
                              <SelectItem value="morning">Morning (8 AM)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (2 PM)</SelectItem>
                              <SelectItem value="end-of-day">End of Day (6 PM)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and login preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Change Password</h3>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button className="w-fit">Update Password</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">Enable two-factor authentication for enhanced security</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Protect your account with an extra layer of security
                          </p>
                        </div>
                        <Switch id="two-factor" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Session Management</h3>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Review and manage your active sessions across different devices.
                        </p>
                        <div className="border rounded-md">
                          <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 p-2 rounded-full">
                                <Laptop className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Current Device - MacBook Pro</p>
                                <p className="text-xs text-muted-foreground">Last active: Just now</p>
                              </div>
                            </div>
                            <Badge>Current</Badge>
                          </div>
                          <Separator />
                          <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 p-2 rounded-full">
                                <Smartphone className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">iPhone 13</p>
                                <p className="text-xs text-muted-foreground">Last active: Yesterday</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Sign Out</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="team" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Team Members</CardTitle>
                      <CardDescription>
                        Manage team access and permissions
                      </CardDescription>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Member
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">John Doe</span>
                          </TableCell>
                          <TableCell>john.doe@example.com</TableCell>
                          <TableCell>
                            <Badge className="bg-purple-500">Admin</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-green-500 border-green-500">Active</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Edit</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>EW</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">Emma Wilson</span>
                          </TableCell>
                          <TableCell>emma.w@example.com</TableCell>
                          <TableCell>
                            <Badge>Editor</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-green-500 border-green-500">Active</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Edit</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>MB</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">Michael Brown</span>
                          </TableCell>
                          <TableCell>m.brown@example.com</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Viewer</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-amber-500 border-amber-500">Invited</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Edit</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Role Permissions</CardTitle>
                    <CardDescription>
                      Define access levels for different user roles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Permission</TableHead>
                          <TableHead className="text-center">Admin</TableHead>
                          <TableHead className="text-center">Editor</TableHead>
                          <TableHead className="text-center">Viewer</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">View Dashboard</TableCell>
                          <TableCell className="text-center"><Check className="mx-auto h-4 w-4 text-green-500" /></TableCell>
                          <TableCell className="text-center"><Check className="mx-auto h-4 w-4 text-green-500" /></TableCell>
                          <TableCell className="text-center"><Check className="mx-auto h-4 w-4 text-green-500" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Edit Student Profiles</TableCell>
                          <TableCell className="text-center"><Check className="mx-auto h-4 w-4 text-green-500" /></TableCell>
                          <TableCell className="text-center"><Check className="mx-auto h-4 w-4 text-green-500" /></TableCell>
                          <TableCell className="text-center">-</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Manage Users</TableCell>
                          <TableCell className="text-center"><Check className="mx-auto h-4 w-4 text-green-500" /></TableCell>
                          <TableCell className="text-center">-</TableCell>
                          <TableCell className="text-center">-</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">View Reports</TableCell>
                          <TableCell className="text-center"><Check className="mx-auto h-4 w-4 text-green-500" /></TableCell>
                          <TableCell className="text-center"><Check className="mx-auto h-4 w-4 text-green-500" /></TableCell>
                          <TableCell className="text-center">-</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="integrations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Connected Services</CardTitle>
                    <CardDescription>
                      Manage integrations with external services and platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Email Service</h3>
                          <p className="text-sm text-muted-foreground">Connect to send automated emails</p>
                        </div>
                      </div>
                      <Button className="gap-1" variant="outline">
                        <Check className="h-4 w-4 text-green-500" /> Connected
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <FileText className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Document Storage</h3>
                          <p className="text-sm text-muted-foreground">Sync with cloud storage service</p>
                        </div>
                      </div>
                      <Button>Connect</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-amber-100 p-2 rounded-full">
                          <Calendar className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Calendar</h3>
                          <p className="text-sm text-muted-foreground">Sync deadlines with calendar service</p>
                        </div>
                      </div>
                      <Button>Connect</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <MessageSquare className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Communication Service</h3>
                          <p className="text-sm text-muted-foreground">Connect messaging platform</p>
                        </div>
                      </div>
                      <Button variant="outline" className="gap-1">
                        <Loader2 className="h-4 w-4 animate-spin" /> Connecting
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;