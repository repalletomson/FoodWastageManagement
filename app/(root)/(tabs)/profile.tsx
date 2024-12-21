import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Client, Account, Databases } from 'appwrite';
import { appwriteConfig } from '../../../config/appwrite';
const client = new Client()
  .setEndpoint('appwriteConfig.endpoint')
  .setProject('appwriteConfig.projectId');

const account = new Account(client);
const databases = new Databases(client);

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [recentDonations, setRecentDonations] = useState([]);
  const statistics = {
    carbonSaved: "125",
    foodSaved: "450",
    donationsMade: "15",
    peopleHelped: "89"
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    const fetchRecentDonations = async () => {
      try {
        const response = await databases.listDocuments('[DATABASE_ID]', '[COLLECTION_ID]', [
          'orderDesc("createdAt")',
          'limit(3)'
        ]);
        setRecentDonations(response.documents);
      } catch (error) {
        console.error("Error fetching recent donations: ", error);
      }
    };

    fetchUserData();
    fetchRecentDonations();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      router.push('/(auth)/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="bg-green-500 pt-12 pb-6 px-4">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white text-lg">Hello,</Text>
            <Text className="text-white text-2xl font-bold">
              {user?.name || 'User'}
            </Text>
          </View>
          
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity>
              <Ionicons name="settings-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <View className="w-10 h-10 rounded-full bg-white items-center justify-center">
                <Ionicons name="person" size={20} color="#10B981" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Statistics Cards */}
      <View className="flex-row flex-wrap px-4 -mt-6">
        <View className="w-1/2 p-2">
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="bg-green-100 w-10 h-10 rounded-full items-center justify-center mb-2">
              <Ionicons name="leaf-outline" size={20} color="#10B981" />
            </View>
            <Text className="text-2xl font-bold text-gray-800">
              {statistics.carbonSaved}kg
            </Text>
            <Text className="text-gray-600">Carbon Saved</Text>
          </View>
        </View>

        <View className="w-1/2 p-2">
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="bg-blue-100 w-10 h-10 rounded-full items-center justify-center mb-2">
              <Ionicons name="fast-food-outline" size={20} color="#3B82F6" />
            </View>
            <Text className="text-2xl font-bold text-gray-800">
              {statistics.foodSaved}kg
            </Text>
            <Text className="text-gray-600">Food Saved</Text>
          </View>
        </View>

        <View className="w-1/2 p-2">
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="bg-yellow-100 w-10 h-10 rounded-full items-center justify-center mb-2">
              <Ionicons name="gift-outline" size={20} color="#F59E0B" />
            </View>
            <Text className="text-2xl font-bold text-gray-800">
              {statistics.donationsMade}
            </Text>
            <Text className="text-gray-600">Donations Made</Text>
          </View>
        </View>

        <View className="w-1/2 p-2">
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="bg-purple-100 w-10 h-10 rounded-full items-center justify-center mb-2">
              <Ionicons name="people-outline" size={20} color="#8B5CF6" />
            </View>
            <Text className="text-2xl font-bold text-gray-800">
              {statistics.peopleHelped}
            </Text>
            <Text className="text-gray-600">People Helped</Text>
          </View>
        </View>
      </View>

      {/* Recent Donations */}
      <View className="px-4 mt-6">
        <Text className="text-xl font-semibold text-gray-800 mb-4">
          Your Donations
        </Text>
        
        {recentDonations.map((donation) => (
          <TouchableOpacity 
            key={donation.$id}
            className="bg-white rounded-xl p-4 mb-4 shadow-sm"
          >
            <View className="flex-row">
              <Image 
                source={{ uri: donation.images[0] }}
                className="w-20 h-20 rounded-lg"
              />
              <View className="flex-1 ml-4">
                <Text className="text-lg font-semibold text-gray-800">
                  {donation.foodItems}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {donation.createdAt}
                </Text>
                <View className="flex-row items-center mt-2">
                  <View className="bg-green-100 px-2 py-1 rounded-full">
                    <Text className="text-green-600 text-xs">
                      {donation.status}
                    </Text>
                  </View>
                  <Text className="text-gray-500 text-sm ml-2">
                    {donation.impact}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Account Actions */}
      <View className="px-4 py-6">
        <TouchableOpacity 
          className="bg-white rounded-xl p-4 flex-row items-center mb-4"
          onPress={() => router.push('/(root)/(tabs)/profile')}
        >
          <Ionicons name="person-outline" size={24} color="#6B7280" />
          <Text className="text-gray-700 ml-4">Edit Profile</Text>
          <Ionicons
            name="chevron-forward" 
            size={24} 
            color="#6B7280" 
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-white rounded-xl p-4 flex-row items-center mb-4"
          onPress={() => router.push('/(root)/(tabs)/home')}
        >
          <Ionicons name="settings-outline" size={24} color="#6B7280" />
          <Text className="text-gray-700 ml-4">Settings</Text>
          <Ionicons
            name="chevron-forward" 
            size={24} 
            color="#6B7280" 
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-red-50 rounded-xl p-4 flex-row items-center"
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#EF4444" />
          <Text className="text-red-500 ml-4">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfilePage;