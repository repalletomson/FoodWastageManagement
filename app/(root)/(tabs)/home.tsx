import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Client, Databases, Account,} from 'appwrite'; // Import Appwrite SDK
import {appwriteConfig} from '../../../config/appwrite'
import DonationsList from '../../../components/DonationsList';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint('appwriteConfig.endpoint') // Your Appwrite endpoint
  .setProject('appwriteConfig.projectId'); // Your project ID

const account = new Account(client);
const databases = new Databases(client);

const HomePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [recentDonations, setRecentDonations] = useState([]);

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
        const response = await databases.listDocuments('appwriteConfig.databaseId', 'appwriteConfig.donationsCollectionId', [
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeContent}>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>{user?.name || 'User'} 👋</Text>
            </View>
            <TouchableOpacity 
              onPress={() => router.push("/profile")}
              style={styles.profileButton}
            >
              <Ionicons name="person" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search nearby food donations..."
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Donate Section */}
        <View style={styles.donateSection}>
          <View style={styles.donateContent}>
            <Image
              source={require('../../../assets/images/onboarding2.jpg')}
              style={styles.donateImage}
            />
            <Text style={styles.donateTitle}>Have excess food?</Text>
            <Text style={styles.donateSubtitle}>
              Your donation can make a difference in someone's life
            </Text>
            <TouchableOpacity 
              style={styles.donateButton}
              onPress={() => router.push("/create")}
            >
              <Text style={styles.donateButtonText}>Donate Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Motivational Quote Section */}
        <View style={styles.quoteSection}>
          <View style={styles.quoteContent}>
            <Text style={styles.quoteText}>
              "In a world where many go hungry, sharing food is not just an act of kindness—it's a responsibility."
            </Text>
            <Text style={styles.quoteSubText}>
              Join us in making a difference, one meal at a time.
            </Text>
          </View>
        </View>

        {/* Recent Donations Section */}
        <View style={styles.recentDonationsSection}>
          <Text style={styles.sectionTitle}>Recent Donations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {recentDonations.map(donation => (
              <View key={donation.$id} style={styles.donationCard}>
                <Image source={{ uri: donation.images[0] }} style={styles.donationImage} />
                <Text style={styles.donationTitle}>{donation.foodItems}</Text>
                <Text style={styles.donationLocation}>{donation.location}</Text>
              </View>
            ))}
            <TouchableOpacity onPress={() => router.push("/")} style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View More Donations</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  welcomeSection: {
    backgroundColor: '#FC8019',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  welcomeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSection: {
    paddingHorizontal: 16,
    marginTop: -10,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#333333',
  },
  donateSection: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  donateContent: {
    backgroundColor: '#E0F7FA',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  donateImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  donateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796B',
    textAlign: 'center',
  },
  donateSubtitle: {
    color: '#004D40',
    textAlign: 'center',
    marginTop: 8,
  },
  donateButton: {
    backgroundColor: '#00796B',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  donateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quoteSection: {
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  quoteContent: {
    backgroundColor: '#F0F0F5',
    borderRadius: 16,
    padding: 24,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333333',
    textAlign: 'center',
  },
  quoteSubText: {
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
  },
  recentDonationsSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  donationCard: {
    width: 150,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  donationImage: {
    width: '100%',
    height: 100,
  },
  donationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 8,
  },
  donationLocation: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 8,
    marginBottom: 8,
  },
  viewMoreButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FC8019',
    borderRadius: 8,
  },
  viewMoreText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default HomePage;