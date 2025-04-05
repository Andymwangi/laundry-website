'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Phone, MapPin, Truck, CreditCard, Bell } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Define proper types that match your auth context
interface Profile {
  phoneNumber?: string;
  address?: string;
  apartment?: string;
  city?: string;
  postalCode?: string;
  defaultPickupInstructions?: string;
}

interface User {
  name: string;
  email: string;
  profile?: Profile;
}

export default function ProfilePage() {
  const { user, loading, updateUser, updateProfile } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    defaultPickupInstructions: ''
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  // Update form data when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.profile?.phoneNumber || '',
        address: user.profile?.address || '',
        apartment: user.profile?.apartment || '',
        city: user.profile?.city || '',
        postalCode: user.profile?.postalCode || '',
        defaultPickupInstructions: user.profile?.defaultPickupInstructions || ''
      });
    }
  }, [user]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      // Update user basic data
      await updateUser({
        name: formData.name,
        email: formData.email
      });
      
      // Update profile data - create a profile object structure
      await updateProfile({
        profile: {
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          postalCode: formData.postalCode,
          defaultPickupInstructions: formData.defaultPickupInstructions
        }
      });
      
      setIsEditing(false);
      toast.success("Profile updated", {
        description: "Your profile information has been saved successfully."
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error("Error", {
        description: "Failed to update your profile. Please try again."
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleCancel = () => {
    // Reset form data to current user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.profile?.phoneNumber || '',
        address: user.profile?.address || '',
        apartment: user.profile?.apartment || '',
        city: user.profile?.city || '',
        postalCode: user.profile?.postalCode || '',
        defaultPickupInstructions: user.profile?.defaultPickupInstructions || ''
      });
    }
    setIsEditing(false);
  };
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        <Tabs defaultValue="personal">
          <TabsList className="mb-6">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Manage your personal details</CardDescription>
                  </div>
                  {!isEditing && (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isEditing ? (
                  <>
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="" alt={user?.name} />
                        <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                          {user?.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-4 flex-1">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-gray-500">Full Name</span>
                          </div>
                          <p className="font-medium">{user?.name}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm text-gray-500">Email Address</span>
                          </div>
                          <p className="font-medium">{user?.email}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-gray-500">Phone Number</span>
                          </div>
                          <p className="font-medium">{user?.profile?.phoneNumber || 'Not set'}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="" alt={formData.name} />
                        <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                          {formData.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-2 flex-1">
                        <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
                          Upload Photo
                        </Button>
                        <p className="text-xs text-gray-500">PNG, JPG or GIF, max 2MB</p>
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input 
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              {isEditing && (
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Delivery Addresses</CardTitle>
                    <CardDescription>Manage your delivery locations</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setIsEditing(true)}>Add Address</Button>
                </div>
              </CardHeader>
              <CardContent>
                {user?.profile?.address ? (
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">Home Address</h3>
                          <p className="text-sm text-gray-500">Default delivery address</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                          <div>
                            <p>{user.profile.address}, {user.profile.apartment || ''}</p>
                            <p>{user.profile.city}, {user.profile.postalCode || ''}</p>
                          </div>
                        </div>
                        
                        {user.profile.defaultPickupInstructions && (
                          <div className="flex items-start gap-3">
                            <Truck className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Pickup Instructions:</p>
                              <p className="text-sm text-gray-600">{user.profile.defaultPickupInstructions}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 mb-4">You haven't added any addresses yet</p>
                    <Button onClick={() => setIsEditing(true)}>Add Your First Address</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment options</CardDescription>
                  </div>
                  <Button variant="outline">Add Method</Button>
                </div>
              </CardHeader>
              <CardContent>
                {user?.profile?.phoneNumber ? (
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">M-Pesa</h3>
                          <p className="text-sm text-gray-500">Default payment method</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{user.profile.phoneNumber}</p>
                          <p className="text-sm text-gray-500">Mobile Money</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 mb-4">You haven't added any payment methods yet</p>
                    <Button>Add Payment Method</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive updates and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-gray-500">Receive notifications about your order status</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="order-updates" className="sr-only">Order Updates</Label>
                      <input
                        type="checkbox"
                        id="order-updates"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        defaultChecked
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Promotional Emails</p>
                        <p className="text-sm text-gray-500">Receive offers and updates from us</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="promo-emails" className="sr-only">Promotional Emails</Label>
                      <input
                        type="checkbox"
                        id="promo-emails"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}