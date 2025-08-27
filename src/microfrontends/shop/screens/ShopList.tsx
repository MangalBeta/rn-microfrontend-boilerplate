import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 60) / 2; // 2 columns with margins

const ShopList = () => {
  // Dummy product data
  const products = [
    {
      id: '1',
      title: 'Wireless Bluetooth Headphones',
      price: '$29.99',
      originalPrice: '$49.99',
      discount: '40% OFF',
      rating: 4.8,
      reviews: 1234,
      image: '🎧',
      backgroundColor: '#FFE5E5',
    },
    {
      id: '2',
      title: 'Smart Fitness Watch',
      price: '$89.99',
      originalPrice: '$129.99',
      discount: '31% OFF',
      rating: 4.6,
      reviews: 856,
      image: '⌚',
      backgroundColor: '#E5F3FF',
    },
    {
      id: '3',
      title: 'Portable Phone Charger',
      price: '$19.99',
      originalPrice: '$34.99',
      discount: '43% OFF',
      rating: 4.7,
      reviews: 2341,
      image: '🔋',
      backgroundColor: '#F0E5FF',
    },
    {
      id: '4',
      title: 'LED Ring Light with Stand',
      price: '$24.99',
      originalPrice: '$39.99',
      discount: '38% OFF',
      rating: 4.9,
      reviews: 567,
      image: '💡',
      backgroundColor: '#FFF3E5',
    },
    {
      id: '5',
      title: 'Skincare Set - Vitamin C',
      price: '$34.99',
      originalPrice: '$59.99',
      discount: '42% OFF',
      rating: 4.5,
      reviews: 1789,
      image: '🧴',
      backgroundColor: '#E5F8FF',
    },
    {
      id: '6',
      title: 'Wireless Phone Stand',
      price: '$15.99',
      originalPrice: '$24.99',
      discount: '36% OFF',
      rating: 4.4,
      reviews: 923,
      image: '📱',
      backgroundColor: '#FFF5E5',
    },
    {
      id: '7',
      title: 'Bluetooth Speaker Mini',
      price: '$22.99',
      originalPrice: '$35.99',
      discount: '36% OFF',
      rating: 4.6,
      reviews: 1456,
      image: '🔊',
      backgroundColor: '#E8F5E8',
    },
    {
      id: '8',
      title: 'Gaming Mouse Pad XL',
      price: '$12.99',
      originalPrice: '$19.99',
      discount: '35% OFF',
      rating: 4.7,
      reviews: 678,
      image: '🖱️',
      backgroundColor: '#FFE5F5',
    },
  ];

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productCard} activeOpacity={0.8}>
      {/* Discount Badge */}
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{item.discount}</Text>
      </View>

      {/* Product Image */}
      <View style={[styles.productImageContainer, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.productEmoji}>{item.image}</Text>
      </View>

      {/* Product Details */}
      <View style={styles.productDetails}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        
        {/* Rating and Reviews */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>

        {/* Price Section */}
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>{item.price}</Text>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>TikTok Shop</Text>
      <Text style={styles.headerSubtitle}>Trending Products</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  row: {
    justifyContent: 'space-between',
  },
  separator: {
    height: 16,
  },
  productCard: {
    width: itemWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF3B5C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productImageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  productEmoji: {
    fontSize: 48,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#FF8C00',
    fontWeight: '600',
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#999',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B5C',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ShopList;

