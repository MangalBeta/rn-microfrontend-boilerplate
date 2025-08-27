import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Banner data for FlatList
  const bannerData = [
    {
      id: '1',
      title: "Rezza's Pizza place",
      subtitle: 'Buy 1, get 1',
      offer: 'FREE',
      disclaimer: '*offer valid for limited time only',
      backgroundColor: '#4CAF50',
    },
    {
      id: '2',
      title: "Mario's Burger House",
      subtitle: 'Get 50% off',
      offer: 'TODAY',
      disclaimer: '*limited time offer',
      backgroundColor: '#FF6B35',
    },
    {
      id: '3',
      title: "Sushi Master",
      subtitle: 'Free delivery',
      offer: 'NOW',
      disclaimer: '*minimum order $25',
      backgroundColor: '#6C5CE7',
    },
  ];

  const renderBannerItem = ({ item }) => (
    <View style={[styles.bannerContent, { backgroundColor: item.backgroundColor }]}>
      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerTitle}>{item.title}</Text>
        <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
        <Text style={styles.bannerFree}>{item.offer}</Text>
        <Text style={styles.bannerDisclaimer}>{item.disclaimer}</Text>
      </View>
      <View style={styles.bannerImagesContainer}>
        <View style={[styles.foodImage, styles.sushiImage]}>
          <Text style={styles.foodEmoji}>🍣</Text>
        </View>
        <View style={[styles.foodImage, styles.hotdogImage]}>
          <Text style={styles.foodEmoji}>🌭</Text>
        </View>
        <View style={[styles.foodImage, styles.hamburgerImage]}>
          <Text style={styles.foodEmoji}>🍔</Text>
        </View>
        <View style={[styles.foodImage, styles.sandwichImage]}>
          <Text style={styles.foodEmoji}>🥪</Text>
        </View>
      </View>
    </View>
  );

  const onBannerScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentBannerIndex(roundIndex);
  };

  // Icon component for services
  const ServiceIcon = ({ emoji, backgroundColor }) => (
    <View style={[styles.serviceIcon, { backgroundColor }]}>
      <Text style={styles.serviceEmoji}>{emoji}</Text>
    </View>
  );

  // Location icon component
  const LocationIcon = () => (
    <View style={styles.locationIcon}>
      <Text style={styles.locationEmoji}>📍</Text>
    </View>
  );

  // Menu icon component
  const MenuIcon = ({openDrawer}) => (
    <Pressable 
     onPress={()=>openDrawer()}
    style={styles.menuIcon}>
      <View style={styles.menuLine} />
      <View style={styles.menuLine} />
      <View style={styles.menuLine} />
    </Pressable>
  );

  // Search icon component
  const SearchIcon = () => (
    <View style={styles.searchIcon}>
      <Text style={styles.searchEmoji}>🔍</Text>
    </View>
  );

  // Dropdown icon component
  const DropdownIcon = () => (
    <View style={styles.dropdownIcon}>
      <Text style={styles.dropdownEmoji}>▼</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <LocationIcon />
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>YOUR LOCATION</Text>
              <View style={styles.locationRow}>
                <Text style={styles.locationText}>150 Feet Ring rd</Text>
                <DropdownIcon />
              </View>
            </View>
          </View>
          <MenuIcon
          openDrawer={()=>navigation.openDrawer()}
          />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food, medicines, rides etc."
            placeholderTextColor="#999"
          />
          <SearchIcon />
        </View>

        {/* Promotional Banner with FlatList */}
        <View style={styles.bannerContainer}>
          <FlatList
            data={bannerData}
            renderItem={renderBannerItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onBannerScroll}
            scrollEventThrottle={16}
          />
          <View style={styles.paginationDots}>
            {bannerData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentBannerIndex ? styles.activeDot : null,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Delivery Service Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Service</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.serviceGrid}>
            <TouchableOpacity style={styles.serviceItem}>
              <ServiceIcon emoji="🍽️" backgroundColor="#FFE5E5" />
              <Text style={styles.serviceText}>Food{'\n'}Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem}>
              <ServiceIcon emoji="🛒" backgroundColor="#E5F3FF" />
              <Text style={styles.serviceText}>Grocery{'\n'}Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem}>
              <ServiceIcon emoji="💊" backgroundColor="#F0E5FF" />
              <Text style={styles.serviceText}>Medicine{'\n'}Delivery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transport Service Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transport Service</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.serviceGrid}>
            <TouchableOpacity style={styles.serviceItem}>
              <ServiceIcon emoji="🚗" backgroundColor="#FFF3E5" />
              <Text style={styles.serviceText}>Taxi{'\n'}Ride</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem}>
              <ServiceIcon emoji="🏍️" backgroundColor="#E5F8FF" />
              <Text style={styles.serviceText}>Bike{'\n'}Ride</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem}>
              <ServiceIcon emoji="📦" backgroundColor="#FFF5E5" />
              <Text style={styles.serviceText}>Courier{'\n'}Delivery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Provider Services Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Provider Services</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIcon: {
    width: 28,
    height: 28,
    backgroundColor: '#E8F5E8',
    borderRadius: 14,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationEmoji: {
    fontSize: 14,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    marginRight: 6,
  },
  dropdownIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownEmoji: {
    fontSize: 10,
    color: '#666',
  },
  menuIcon: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  menuLine: {
    width: 16,
    height: 2,
    backgroundColor: '#333',
    marginVertical: 1.5,
    borderRadius: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  searchIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchEmoji: {
    fontSize: 16,
    color: '#666',
  },
  bannerContainer: {
    marginBottom: 30,
  },
  bannerContent: {
    width: width - 40,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 6,
    opacity: 0.9,
  },
  bannerSubtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 4,
  },
  bannerFree: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bannerDisclaimer: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
    fontStyle: 'italic',
  },
  bannerImagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  foodImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginLeft: -8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  foodEmoji: {
    fontSize: 20,
  },
  sushiImage: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  hotdogImage: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  hamburgerImage: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  sandwichImage: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
    width: 24,
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  serviceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceItem: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceEmoji: {
    fontSize: 28,
  },
  serviceText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 18,
  },
});

export default HomeScreen;

