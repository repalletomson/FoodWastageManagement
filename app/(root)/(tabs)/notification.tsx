import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock notifications data
const notifications = [
  {
    id: '1',
    type: 'like',
    message: 'John Doe liked your donation post',
    time: '2m ago',
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    message: 'Sarah left a comment: "Thank you for the donation!"',
    time: '1h ago',
    read: true,
  },
  {
    id: '3',
    type: 'request',
    message: 'New donation request from Michael',
    time: '3h ago',
    read: false,
  },
  {
    id: '4',
    type: 'donation',
    message: 'Your donation was successfully delivered',
    time: '1d ago',
    read: true,
  },
  // Add more notifications as needed
];

const NotificationItem = ({ item }) => {
  // Helper function to get icon based on notification type
  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return 'heart';
      case 'comment':
        return 'chatbubble';
      case 'request':
        return 'hand-left';
      case 'donation':
        return 'gift';
      default:
        return 'notifications';
    }
  };

  // Helper function to get icon background color
  const getIconBgColor = (type) => {
    switch (type) {
      case 'like':
        return 'bg-red-100';
      case 'comment':
        return 'bg-blue-100';
      case 'request':
        return 'bg-yellow-100';
      case 'donation':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  // Helper function to get icon color
  const getIconColor = (type) => {
    switch (type) {
      case 'like':
        return '#EF4444'; // red-500
      case 'comment':
        return '#3B82F6'; // blue-500
      case 'request':
        return '#F59E0B'; // yellow-500
      case 'donation':
        return '#10B981'; // green-500
      default:
        return '#6B7280'; // gray-500
    }
  };

  return (
    <TouchableOpacity 
      className={`flex-row p-4 border-b border-gray-100 ${
        !item.read ? 'bg-blue-50' : 'bg-white'
      }`}
    >
      <View className={`h-10 w-10 rounded-full items-center justify-center mr-3 ${getIconBgColor(item.type)}`}>
        <Ionicons 
          name={getIcon(item.type)} 
          size={20} 
          color={getIconColor(item.type)}
        />
      </View>
      
      <View className="flex-1">
        <Text className={`text-gray-800 ${!item.read ? 'font-medium' : 'font-normal'}`}>
          {item.message}
        </Text>
        <Text className="text-gray-500 text-sm mt-1">
          {item.time}
        </Text>
      </View>

      {!item.read && (
        <View className="w-2 h-2 rounded-full bg-blue-500 self-center" />
      )}
    </TouchableOpacity>
  );
};

const Notifications = () => {
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-3 border-b border-gray-100">
        <Text className="text-xl font-semibold text-gray-800">
          Notifications
        </Text>
      </View>

      {/* Notification Filters */}
      <View className="flex-row px-4 py-2 border-b border-gray-100">
        <TouchableOpacity className="bg-blue-500 px-4 py-1 rounded-full mr-2">
          <Text className="text-white">All</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-100 px-4 py-1 rounded-full mr-2">
          <Text className="text-gray-600">Unread</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-100 px-4 py-1 rounded-full">
          <Text className="text-gray-600">Read</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-4"
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-8">
            <Ionicons name="notifications-off" size={48} color="#9CA3AF" />
            <Text className="text-gray-500 mt-4">No notifications yet</Text>
          </View>
        }
      />

      {/* Mark All as Read Button */}
      <TouchableOpacity 
        className="m-4 py-3 bg-gray-100 rounded-lg"
        onPress={() => {
          // Add your mark all as read logic here
          console.log('Mark all as read');
        }}
      >
        <Text className="text-center text-gray-600 font-medium">
          Mark all as read
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Notifications;