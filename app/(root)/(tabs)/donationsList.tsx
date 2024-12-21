// import React, { useEffect, useState } from 'react';
// // import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
// // import { useRouter } from 'expo-router';
// // import { Ionicons } from '@expo/vector-icons';
// // import { db } from '../../../firebaseConfig';
// // import { collection, getDocs } from 'firebase/firestore';

// const DonationsList = () => {
// //   const [donations, setDonations] = useState([]);
// //   const router = useRouter();

// //   useEffect(() => {
// //     const fetchDonations = async () => {
// //       const querySnapshot = await getDocs(collection(db, 'donations'));
// //       const donationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //       setDonations(donationsData);
// //     };

// //     fetchDonations();
// //   }, []);

//   return (
//     <>
//     </>
// //     <SafeAreaView style={styles.container}>
// //       {/* Header */}
// //       <View style={styles.header}>
// //         <Text style={styles.headerTitle}>Available Donations</Text>
// //         <Text style={styles.headerSubtitle}>Find food donations in your area</Text>
// //       </View>

// //       {/* Donations List */}
// //       <FlatList
// //         data={donations}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => (
// //           <TouchableOpacity 
// //             style={styles.card}
// //             onPress={() => {
// //               router.push({
// //                 pathname: "./ViewDonation",
// //                 params: { id: item.id }
// //               });
// //             }}
// //           >
// //             <Image
// //               source={{ uri: item.images[0] }}
// //               style={styles.cardImage}
// //               resizeMode="cover"
// //             />
// //             <View style={styles.cardContent}>
// //               <Text style={styles.cardTitle}>{item.foodItems}</Text>
// //               <View style={styles.cardLocation}>
// //                 <Ionicons name="location-outline" size={16} color="#6B7280" />
// //                 <Text style={styles.cardLocationText}>{item.location}</Text>
// //               </View>
// //             </View>
// //           </TouchableOpacity>
// //         )}
// //         contentContainerStyle={styles.listContent}
// //         showsVerticalScrollIndicator={false}
// //       />
// //     </SafeAreaView>
//   );
// };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F9F9F9',
// //   },
// //   header: {
// //     backgroundColor: '#FFFFFF',
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#E0E0E0',
// //     paddingHorizontal: 16,
// //     paddingVertical: 12,
// //   },
// //   headerTitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: '#333333',
// //   },
// //   headerSubtitle: {
// //     fontSize: 14,
// //     color: '#666666',
// //     marginTop: 4,
// //   },
// //   card: {
// //     backgroundColor: '#FFFFFF',
// //     borderRadius: 8,
// //     marginHorizontal: 16,
// //     marginBottom: 16,
// //     overflow: 'hidden',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   cardImage: {
// //     width: '100%',
// //     height: 200,
// //   },
// //   cardContent: {
// //     padding: 16,
// //   },
// //   cardTitle: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     color: '#333333',
// //   },
// //   cardLocation: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginTop: 8,
// //   },
// //   cardLocationText: {
// //     marginLeft: 4,
// //     fontSize: 14,
// //     color: '#666666',
// //   },
// //   listContent: {
// //     paddingVertical: 16,
// //   },
// // });

// export default DonationsList;