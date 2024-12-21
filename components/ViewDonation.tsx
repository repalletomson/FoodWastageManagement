import React from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const DetailViewDonation = () => {
  const router = useRouter();
  
  const donation = {
    id: '1',
    title: 'Winter Clothing Drive',
    image: 'https://example.com/donation-image.jpg',
    status: 'Active',
    location: '123 Main St, New York, NY',
    items: [
      { name: 'Winter Jackets', quantity: 10 },
      { name: 'Warm Blankets', quantity: 15 },
      { name: 'Gloves', quantity: 20 },
    ],
    description: 'We are collecting winter clothing items for those in need during the cold season.',
    donor: {
      name: 'Sarah Johnson',
      contact: '+1 (555) 123-4567',
      email: 'sarah.j@email.com'
    },
    datePosted: '2024-03-20',
    pickupInstructions: 'Available for pickup Monday-Friday, 9 AM - 5 PM'
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header Image */}
      <View className="relative">
        <Image
          source={{ uri: donation.image }}
          className="w-full h-72"
          resizeMode="cover"
        />
        <Pressable 
          className="absolute top-12 left-4 p-2 bg-white rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </Pressable>
      </View>

      {/* Content */}
      <View className="p-4 -mt-6 bg-white rounded-t-3xl">
        {/* Title and Status */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-gray-800 flex-1">
            {donation.title}
          </Text>
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-600 font-medium">
              {donation.status}
            </Text>
          </View>
        </View>

        {/* Location */}
        <View className="flex-row items-center mb-6">
          <Ionicons name="location" size={20} color="#6B7280" />
          <Text className="ml-2 text-gray-600 text-lg">
            {donation.location}
          </Text>
        </View>

        {/* Items */}
        <View className="mt-6">
          <Text className="text-lg font-semibold mb-3 text-gray-800">
            Items Needed
          </Text>
          {donation.items.map((item, index) => (
            <View key={index} className="flex-row items-center mb-2">
              <Ionicons name="checkmark-circle" size={20} color="#34D399" />
              <Text className="ml-2 text-gray-700">
                {item.name} ({item.quantity} pieces)
              </Text>
            </View>
          ))}
        </View>

        {/* Description */}
        <View className="mt-6">
          <Text className="text-lg font-semibold mb-2 text-gray-800">
            Description
          </Text>
          <Text className="text-gray-600 leading-6">
            {donation.description}
          </Text>
        </View>

        {/* Pickup Instructions */}
        <View className="mt-6">
          <Text className="text-lg font-semibold mb-2 text-gray-800">
            Pickup Instructions
          </Text>
          <Text className="text-gray-600">
            {donation.pickupInstructions}
          </Text>
        </View>

        {/* Donor Information */}
        <View className="mt-6 bg-gray-50 p-4 rounded-xl">
          <Text className="text-lg font-semibold mb-3 text-gray-800">
            Donor Information
          </Text>
          <View className="space-y-2">
            <View className="flex-row items-center">
              <Ionicons name="person" size={18} color="#6B7280" />
              <Text className="ml-2 text-gray-700">{donation.donor.name}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="call" size={18} color="#6B7280" />
              <Text className="ml-2 text-gray-700">{donation.donor.contact}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="mail" size={18} color="#6B7280" />
              <Text className="ml-2 text-gray-700">{donation.donor.email}</Text>
            </View>
          </View>
        </View>

        {/* Contact Button */}
        <Pressable className="bg-green-500 py-4 rounded-xl mt-6 mb-6">
          <Text className="text-white text-center font-semibold text-lg">
            Contact Donor
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default DetailViewDonation;