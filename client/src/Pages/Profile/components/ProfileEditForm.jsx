import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { updateUserProfile, uploadFile } from "@/services/api.services";
import { toast } from "sonner";
import { Upload, Loader2 } from "lucide-react";

const ProfileEditForm = ({ userData, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({    name: userData?.name || "",
    phoneNumber: userData?.phoneNumber || "",
    profilePicture: userData?.profilePicture || "",
    personalDetails: {
      dob: userData?.personalDetails?.dob ? new Date(userData.personalDetails.dob) : null,
      gender: userData?.personalDetails?.gender || "",
      address: userData?.personalDetails?.address || "",
      profession: userData?.personalDetails?.profession || ""
    },
    programDetails: {
      program: userData?.programDetails?.program || "",
      validity: userData?.programDetails?.validity ? new Date(userData.programDetails.validity) : null,
    },
    collegeDetails: {
      branch: userData?.collegeDetails?.branch || "",
      highestDegree: userData?.collegeDetails?.highestDegree || "",
      university: userData?.collegeDetails?.university || "",
      college: userData?.collegeDetails?.college || "",
      gpa: userData?.collegeDetails?.gpa || "",
      toppersGPA: userData?.collegeDetails?.toppersGPA || "",
      noOfBacklogs: userData?.collegeDetails?.noOfBacklogs || "",
      admissionTerm: userData?.collegeDetails?.admissionTerm || "",
      coursesApplying: userData?.collegeDetails?.coursesApplying?.join(", ") || ""
    },
    greDetails: {
      grePlane: userData?.greDetails?.grePlane ? new Date(userData.greDetails.grePlane) : null,
      greDate: userData?.greDetails?.greDate ? new Date(userData.greDetails.greDate) : null,
      greScore: {
        verbal: userData?.greDetails?.greScore?.verbal || "",
        quant: userData?.greDetails?.greScore?.quant || "",
        awa: userData?.greDetails?.greScore?.awa || "",
      },
      retakingGRE: userData?.greDetails?.retakingGRE || ""
    },
    ieltsDetails: {
      ieltsPlan: userData?.ieltsDetails?.ieltsPlan ? new Date(userData.ieltsDetails.ieltsPlan) : null,
      ieltsDate: userData?.ieltsDetails?.ieltsDate ? new Date(userData.ieltsDetails.ieltsDate) : null,
      ieltsScore: {
        reading: userData?.ieltsDetails?.ieltsScore?.reading || "",
        writing: userData?.ieltsDetails?.ieltsScore?.writing || "",
        speaking: userData?.ieltsDetails?.ieltsScore?.speaking || "",
        listening: userData?.ieltsDetails?.ieltsScore?.listening || "",
      },
      retakingIELTS: userData?.ieltsDetails?.retakingIELTS || ""
    },
    toeflDetails: {
      toeflPlan: userData?.toeflDetails?.toeflPlan ? new Date(userData.toeflDetails.toeflPlan) : null,
      toeflDate: userData?.toeflDetails?.toeflDate ? new Date(userData.toeflDetails.toeflDate) : null,
      toeflScore: {
        reading: userData?.toeflDetails?.toeflScore?.reading || "",
        writing: userData?.toeflDetails?.toeflScore?.writing || "",
        speaking: userData?.toeflDetails?.toeflScore?.speaking || ""
      },
      retakingTOEFL: userData?.toeflDetails?.retakingTOEFL || ""
    },
    visa: {
      countriesPlanningToApply: userData?.visa?.countriesPlanningToApply?.join(", ") || "",
      visaInterviewDate: userData?.visa?.visaInterviewDate ? new Date(userData.visa.visaInterviewDate) : null,
      visaInterviewLocation: userData?.visa?.visaInterviewLocation || ""
    }
  });

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const handleInputChange = (section, field, value) => {
    if (section) {
      if (field.includes(".")) {
        const [subSection, subField] = field.split(".");
        setFormData({
          ...formData,
          [section]: {
            ...formData[section],
            [subSection]: {
              ...formData[section][subSection],
              [subField]: value
            }
          }
        });
      } else {
        setFormData({
          ...formData,
          [section]: {
            ...formData[section],
            [field]: value
          }
        });
      }
    } else {      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      setImageUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', 'profile');      const response = await uploadFile(formData);      if (response.data && response.data.url) {
        setFormData(prev => ({
          ...prev,
          profilePicture: response.data.url
        }));
        toast.success('Profile image uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const safeNumber = (value) => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
      };
      
      const stringToArray = (str) => {
        return str && typeof str === 'string' 
          ? str.split(',').map(item => item.trim()).filter(Boolean)
          : Array.isArray(str) ? str : [];
      };
      
      const fallbackValue = (value, fallback = "N/A") => {
        return value || fallback;
      };      const processedFormData = {
        name: fallbackValue(formData.name),
        email: userData?.email,
        phoneNumber: fallbackValue(formData.phoneNumber),
        profilePicture: formData.profileImage,
        personalDetails: {
          dob: formData.personalDetails.dob,
          gender: fallbackValue(formData.personalDetails.gender),
          address: fallbackValue(formData.personalDetails.address),
          profession: fallbackValue(formData.personalDetails.profession)
        },
        programDetails: {
          program: fallbackValue(formData.programDetails.program),
          validity: formData.programDetails.validity
        },
        collegeDetails: {
          branch: fallbackValue(formData.collegeDetails.branch),
          highestDegree: fallbackValue(formData.collegeDetails.highestDegree),
          university: fallbackValue(formData.collegeDetails.university),
          college: fallbackValue(formData.collegeDetails.college),
          gpa: safeNumber(formData.collegeDetails.gpa),
          toppersGPA: safeNumber(formData.collegeDetails.toppersGPA),
          noOfBacklogs: safeNumber(formData.collegeDetails.noOfBacklogs),
          admissionTerm: fallbackValue(formData.collegeDetails.admissionTerm),
          coursesApplying: stringToArray(formData.collegeDetails.coursesApplying)
        },
        greDetails: {
          grePlane: formData.greDetails.grePlane,
          greDate: formData.greDetails.greDate,
          greScore: {
            verbal: safeNumber(formData.greDetails.greScore.verbal),
            quant: safeNumber(formData.greDetails.greScore.quant),
            awa: safeNumber(formData.greDetails.greScore.awa)
          },
          retakingGRE: fallbackValue(formData.greDetails.retakingGRE, "No")
        },
        ieltsDetails: {
          ieltsPlan: formData.ieltsDetails.ieltsPlan,
          ieltsDate: formData.ieltsDetails.ieltsDate,
          ieltsScore: {
            reading: safeNumber(formData.ieltsDetails.ieltsScore.reading),
            writing: safeNumber(formData.ieltsDetails.ieltsScore.writing),
            speaking: safeNumber(formData.ieltsDetails.ieltsScore.speaking),
            listening: safeNumber(formData.ieltsDetails.ieltsScore.listening)
          },
          retakingIELTS: fallbackValue(formData.ieltsDetails.retakingIELTS, "No")
        },
        toeflDetails: {
          toeflPlan: formData.toeflDetails.toeflPlan,
          toeflDate: formData.toeflDetails.toeflDate,
          toeflScore: {
            reading: safeNumber(formData.toeflDetails.toeflScore.reading),
            writing: safeNumber(formData.toeflDetails.toeflScore.writing),
            speaking: safeNumber(formData.toeflDetails.toeflScore.speaking)
          },
          retakingTOEFL: fallbackValue(formData.toeflDetails.retakingTOEFL, "No")
        },
        visa: {
          countriesPlanningToApply: stringToArray(formData.visa.countriesPlanningToApply),
          visaInterviewDate: formData.visa.visaInterviewDate,
          visaInterviewLocation: fallbackValue(formData.visa.visaInterviewLocation)
        }
      };

      const response = await updateUserProfile(processedFormData);
      
      if (response.status) {
        toast.success("Profile updated successfully");
        if (onSuccess) {
          await onSuccess(); // Wait for onSuccess to complete
        }
        if (onClose) {
          onClose(); // Close modal after success callback
        }
        // Use a timeout to ensure the UI updates before reload
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-h-[70vh] overflow-y-auto pr-2">
      <Card>
        <CardHeader>
          <CardTitle>Profile Image</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100">              <img
                src={formData.profilePicture || "/profile-full.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>            <div>
              <Button
                variant="outline"
                type="button"
                disabled={imageUploading}
                className="gap-2 cursor-pointer"
                onClick={() => document.getElementById('profileImageInput').click()}
              >
                {imageUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Change Photo
                  </>
                )}
              </Button>
              <input
                id="profileImageInput"
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImageUpload}
                className="hidden"
                disabled={imageUploading}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange(null, "name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={userData?.email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input 
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange(null, "phoneNumber", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <DatePicker
                date={formData.personalDetails.dob}
                onDateChange={(date) => handleInputChange("personalDetails", "dob", date)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={formData.personalDetails.gender} 
                onValueChange={(value) => handleInputChange("personalDetails", "gender", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profession">Profession</Label>
              <Input 
                id="profession"
                value={formData.personalDetails.profession}
                onChange={(e) => handleInputChange("personalDetails", "profession", e.target.value)}
              />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea 
                id="address"
                value={formData.personalDetails.address}
                onChange={(e) => handleInputChange("personalDetails", "address", e.target.value)}
                rows={3}
              />
            </div>      </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Program Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="program">Program</Label>
              <Input 
                id="program"
                value={formData.programDetails.program}
                onChange={(e) => handleInputChange("programDetails", "program", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="validity">Validity</Label>
              <DatePicker
                date={formData.programDetails.validity}
                onDateChange={(date) => handleInputChange("programDetails", "validity", date)}
              />
            </div>      </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>College Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input 
                id="branch"
                value={formData.collegeDetails.branch}
                onChange={(e) => handleInputChange("collegeDetails", "branch", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="highestDegree">Highest Degree</Label>
              <Input 
                id="highestDegree"
                value={formData.collegeDetails.highestDegree}
                onChange={(e) => handleInputChange("collegeDetails", "highestDegree", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Input 
                id="university"
                value={formData.collegeDetails.university}
                onChange={(e) => handleInputChange("collegeDetails", "university", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="college">College</Label>
              <Input 
                id="college"
                value={formData.collegeDetails.college}
                onChange={(e) => handleInputChange("collegeDetails", "college", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gpa">GPA</Label>
              <Input 
                id="gpa"
                type="number"
                step="0.01"
                value={formData.collegeDetails.gpa}
                onChange={(e) => handleInputChange("collegeDetails", "gpa", e.target.value)}
              />
            </div>            <div className="space-y-2">
              <Label htmlFor="toppersGPA">Topper&apos;s GPA</Label>
              <Input 
                id="toppersGPA"
                type="number"
                step="0.01"
                value={formData.collegeDetails.toppersGPA}
                onChange={(e) => handleInputChange("collegeDetails", "toppersGPA", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="noOfBacklogs">Number of Backlogs</Label>
              <Input 
                id="noOfBacklogs"
                type="number"
                value={formData.collegeDetails.noOfBacklogs}
                onChange={(e) => handleInputChange("collegeDetails", "noOfBacklogs", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admissionTerm">Admission Term</Label>
              <Input 
                id="admissionTerm"
                value={formData.collegeDetails.admissionTerm}
                onChange={(e) => handleInputChange("collegeDetails", "admissionTerm", e.target.value)}
              />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label htmlFor="coursesApplying">Courses Applying (comma separated)</Label>
              <Textarea 
                id="coursesApplying"
                value={formData.collegeDetails.coursesApplying}
                onChange={(e) => handleInputChange("collegeDetails", "coursesApplying", e.target.value)}
                rows={2}
              />
            </div>      </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>GRE Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grePlane">GRE Plan Date</Label>
              <DatePicker
                date={formData.greDetails.grePlane}
                onDateChange={(date) => handleInputChange("greDetails", "grePlane", date)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="greDate">GRE Exam Date</Label>
              <DatePicker
                date={formData.greDetails.greDate}
                onDateChange={(date) => handleInputChange("greDetails", "greDate", date)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="verbal">Verbal Score</Label>
              <Input 
                id="verbal"
                type="number"
                value={formData.greDetails.greScore.verbal}
                onChange={(e) => handleInputChange("greDetails", "greScore.verbal", e.target.value)}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quant">Quantitative Score</Label>
              <Input 
                id="quant"
                type="number"
                value={formData.greDetails.greScore.quant}
                onChange={(e) => handleInputChange("greDetails", "greScore.quant", e.target.value)}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="awa">AWA Score</Label>
              <Input 
                id="awa"
                type="number"
                step="0.5"
                value={formData.greDetails.greScore.awa}
                onChange={(e) => handleInputChange("greDetails", "greScore.awa", e.target.value)}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retakingGRE">Retaking GRE</Label>
              <Select 
                value={formData.greDetails.retakingGRE} 
                onValueChange={(value) => handleInputChange("greDetails", "retakingGRE", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>      </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>IELTS Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ieltsPlan">IELTS Plan Date</Label>
              <DatePicker
                date={formData.ieltsDetails.ieltsPlan}
                onDateChange={(date) => handleInputChange("ieltsDetails", "ieltsPlan", date)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ieltsDate">IELTS Exam Date</Label>
              <DatePicker
                date={formData.ieltsDetails.ieltsDate}
                onDateChange={(date) => handleInputChange("ieltsDetails", "ieltsDate", date)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ieltsReading">Reading Score</Label>
              <Input 
                id="ieltsReading"
                type="number"
                step="0.5"
                value={formData.ieltsDetails.ieltsScore.reading}
                onChange={(e) => handleInputChange("ieltsDetails", "ieltsScore.reading", e.target.value)}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ieltsWriting">Writing Score</Label>
              <Input 
                id="ieltsWriting"
                type="number"
                step="0.5"
                value={formData.ieltsDetails.ieltsScore.writing}
                onChange={(e) => handleInputChange("ieltsDetails", "ieltsScore.writing", e.target.value)}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ieltsSpeaking">Speaking Score</Label>
              <Input 
                id="ieltsSpeaking"
                type="number"
                step="0.5"
                value={formData.ieltsDetails.ieltsScore.speaking}
                onChange={(e) => handleInputChange("ieltsDetails", "ieltsScore.speaking", e.target.value)}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ieltsListening">Listening Score</Label>
              <Input 
                id="ieltsListening"
                type="number"
                step="0.5"
                value={formData.ieltsDetails.ieltsScore.listening}
                onChange={(e) => handleInputChange("ieltsDetails", "ieltsScore.listening", e.target.value)}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retakingIELTS">Retaking IELTS</Label>
              <Select 
                value={formData.ieltsDetails.retakingIELTS} 
                onValueChange={(value) => handleInputChange("ieltsDetails", "retakingIELTS", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>      </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>TOEFL Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="toeflPlan">TOEFL Plan Date</Label>
              <DatePicker
                date={formData.toeflDetails.toeflPlan}
                onDateChange={(date) => handleInputChange("toeflDetails", "toeflPlan", date)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toeflDate">TOEFL Exam Date</Label>
              <DatePicker
                date={formData.toeflDetails.toeflDate}
                onDateChange={(date) => handleInputChange("toeflDetails", "toeflDate", date)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toeflReading">Reading Score</Label>
              <Input 
                id="toeflReading"
                type="number"
                value={formData.toeflDetails.toeflScore.reading}
                onChange={(e) => handleInputChange("toeflDetails", "toeflScore.reading", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toeflWriting">Writing Score</Label>
              <Input 
                id="toeflWriting"
                type="number"
                value={formData.toeflDetails.toeflScore.writing}
                onChange={(e) => handleInputChange("toeflDetails", "toeflScore.writing", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toeflSpeaking">Speaking Score</Label>
              <Input 
                id="toeflSpeaking"
                type="number"
                value={formData.toeflDetails.toeflScore.speaking}
                onChange={(e) => handleInputChange("toeflDetails", "toeflScore.speaking", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retakingTOEFL">Retaking TOEFL</Label>
              <Select 
                value={formData.toeflDetails.retakingTOEFL} 
                onValueChange={(value) => handleInputChange("toeflDetails", "retakingTOEFL", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>      </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visa Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label htmlFor="countriesPlanningToApply">Countries Planning to Apply (comma separated)</Label>
              <Textarea 
                id="countriesPlanningToApply"
                value={formData.visa.countriesPlanningToApply}
                onChange={(e) => handleInputChange("visa", "countriesPlanningToApply", e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visaInterviewDate">Visa Interview Date</Label>
              <DatePicker
                date={formData.visa.visaInterviewDate}
                onDateChange={(date) => handleInputChange("visa", "visaInterviewDate", date)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visaInterviewLocation">Visa Interview Location</Label>
              <Input 
                id="visaInterviewLocation"
                value={formData.visa.visaInterviewLocation}
                onChange={(e) => handleInputChange("visa", "visaInterviewLocation", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
        <Button type="submit" disabled={loading} className="bg-primary-1 cursor-pointer">
          {loading && <span className="mr-2 h-4 w-4 animate-spin">⏳</span>}
          Save Changes
        </Button>
      </div>
    </form>
  );
};

ProfileEditForm.propTypes = {
  userData: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default ProfileEditForm;
