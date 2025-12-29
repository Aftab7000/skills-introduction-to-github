import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PRODUCT_CATALOG = [
  {
    title: "Perfume",
    description: "Signature sprays crafted for lasting impressions.",
    subCategories: [
      {
        name: "Premium",
        items: [
          { name: "Noor Bloom", price: 1899 },
          { name: "Velvet Amber", price: 2199 },
        ],
      },
      {
        name: "Ultra Premium",
        items: [
          { name: "Majestic Oud", price: 2899 },
          { name: "Saffron Aura", price: 3199 },
        ],
      },
      {
        name: "Rare Luxury",
        items: [
          { name: "Imperial Mist", price: 3899 },
          { name: "Royal Whisper", price: 4599 },
        ],
      },
    ],
  },
  {
    title: "Attar",
    description: "Pure oils blended with heritage richness.",
    subCategories: [
      {
        name: "Rare",
        items: [
          { name: "Itr Jannat", price: 2499 },
          { name: "Musk Jewel", price: 2699 },
        ],
      },
      {
        name: "Premium",
        items: [
          { name: "Amber Soil", price: 1799 },
          { name: "Rose Atelier", price: 1999 },
        ],
      },
    ],
  },
  {
    title: "Bakhoor",
    description: "Coming soon — artisanal incense blocks.",
    subCategories: [],
  },
];

const currency = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [cart, setCart] = useState([]);

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price, 0),
    [cart]
  );

  const handleAddToCart = (item, category, subCategory) => {
    setCart((prev) => [
      ...prev,
      {
        id: `${category}-${subCategory}-${item.name}-${prev.length}`,
        ...item,
        category,
        subCategory,
      },
    ]);
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.brand}>Rivaayat Fragrance</Text>
        <View style={styles.nav}>
          {[
            { key: "welcome", label: "Welcome" },
            { key: "products", label: "Products" },
            { key: "cart", label: `Cart (${cart.length})` },
            { key: "checkout", label: "Checkout" },
          ].map((item) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => setScreen(item.key)}
              style={
                screen === item.key
                  ? styles.navButtonActive
                  : styles.navButton
              }
            >
              <Text
                style={
                  screen === item.key
                    ? styles.navButtonTextActive
                    : styles.navButtonText
                }
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {screen === "welcome" && (
          <View style={styles.card}>
            <Text style={styles.title}>Welcome to Rivaayat</Text>
            <Text style={styles.subtitle}>
              Discover artisanal fragrances inspired by heritage rituals. Choose
              premium perfumes, rare attars, and soon, bakhoor to elevate every
              moment.
            </Text>
            <View style={styles.highlightBox}>
              <Text style={styles.highlightTitle}>Why shop with us?</Text>
              <Text style={styles.highlightText}>
                • Curated luxury blends
                {"\n"}• Authentic raw materials
                {"\n"}• Secure checkout & doorstep delivery
              </Text>
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setScreen("products")}
            >
              <Text style={styles.primaryButtonText}>Explore Products</Text>
            </TouchableOpacity>
          </View>
        )}

        {screen === "products" && (
          <View style={styles.card}>
            <Text style={styles.title}>Product Collections</Text>
            {PRODUCT_CATALOG.map((category) => (
              <View key={category.title} style={styles.categoryBlock}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.subtitle}>{category.description}</Text>
                {category.subCategories.length === 0 ? (
                  <View style={styles.comingSoon}>
                    <Text style={styles.comingSoonText}>Coming Soon</Text>
                  </View>
                ) : (
                  category.subCategories.map((sub) => (
                    <View key={sub.name} style={styles.subCategoryBlock}>
                      <Text style={styles.subCategoryTitle}>{sub.name}</Text>
                      {sub.items.map((item) => (
                        <View key={item.name} style={styles.productRow}>
                          <View>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.price}>{currency(item.price)}</Text>
                          </View>
                          <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() =>
                              handleAddToCart(item, category.title, sub.name)
                            }
                          >
                            <Text style={styles.secondaryButtonText}>
                              Add to Cart
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  ))
                )}
              </View>
            ))}
          </View>
        )}

        {screen === "cart" && (
          <View style={styles.card}>
            <Text style={styles.title}>Your Cart</Text>
            {cart.length === 0 ? (
              <Text style={styles.subtitle}>
                Your cart is empty. Add items from the product page.
              </Text>
            ) : (
              cart.map((item) => (
                <View key={item.id} style={styles.cartRow}>
                  <View>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.metaText}>
                      {item.category} • {item.subCategory}
                    </Text>
                    <Text style={styles.price}>{currency(item.price)}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemove(item.id)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
            <View style={styles.totalBox}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>{currency(cartTotal)}</Text>
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setScreen("checkout")}
            >
              <Text style={styles.primaryButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        )}

        {screen === "checkout" && (
          <View style={styles.card}>
            <Text style={styles.title}>Checkout</Text>
            <Text style={styles.subtitle}>
              Confirm your order and complete your purchase securely.
            </Text>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              <Text style={styles.summaryText}>Items: {cart.length}</Text>
              <Text style={styles.summaryText}>
                Estimated delivery: 3-5 business days
              </Text>
              <Text style={styles.summaryTotal}>{currency(cartTotal)}</Text>
            </View>
            <View style={styles.highlightBox}>
              <Text style={styles.highlightTitle}>Payment</Text>
              <Text style={styles.highlightText}>
                UPI • Credit/Debit Cards • Cash on Delivery
              </Text>
            </View>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b10",
  },
  header: {
    padding: 16,
    backgroundColor: "#161622",
  },
  brand: {
    color: "#f6e6c9",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  nav: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#303043",
  },
  navButtonActive: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#f6e6c9",
  },
  navButtonText: {
    color: "#c9c9d4",
    fontSize: 12,
  },
  navButtonTextActive: {
    color: "#0b0b10",
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: "#161622",
    padding: 20,
    borderRadius: 18,
    gap: 16,
  },
  title: {
    fontSize: 20,
    color: "#f6e6c9",
    fontWeight: "700",
  },
  subtitle: {
    color: "#c9c9d4",
    fontSize: 14,
    lineHeight: 20,
  },
  highlightBox: {
    backgroundColor: "#232338",
    padding: 16,
    borderRadius: 14,
  },
  highlightTitle: {
    color: "#f6e6c9",
    fontWeight: "600",
    marginBottom: 6,
  },
  highlightText: {
    color: "#c9c9d4",
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: "#f6e6c9",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#0b0b10",
    fontWeight: "700",
  },
  categoryBlock: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#232338",
    gap: 12,
  },
  categoryTitle: {
    color: "#f6e6c9",
    fontSize: 18,
    fontWeight: "600",
  },
  subCategoryBlock: {
    backgroundColor: "#1e1e2f",
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  subCategoryTitle: {
    color: "#f6e6c9",
    fontSize: 15,
    fontWeight: "600",
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  productName: {
    color: "#f6e6c9",
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    color: "#f2c37b",
    fontSize: 13,
  },
  secondaryButton: {
    borderColor: "#f6e6c9",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: "#f6e6c9",
    fontSize: 12,
  },
  comingSoon: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3a3a4e",
  },
  comingSoonText: {
    color: "#c9c9d4",
    fontStyle: "italic",
  },
  cartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#1e1e2f",
    padding: 12,
    borderRadius: 12,
  },
  metaText: {
    color: "#9c9cb3",
    fontSize: 12,
  },
  removeButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#704647",
  },
  removeButtonText: {
    color: "#d8a3a5",
    fontSize: 12,
  },
  totalBox: {
    borderTopWidth: 1,
    borderTopColor: "#232338",
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    color: "#c9c9d4",
    fontWeight: "600",
  },
  totalValue: {
    color: "#f6e6c9",
    fontWeight: "700",
  },
  summaryBox: {
    backgroundColor: "#1e1e2f",
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  summaryTitle: {
    color: "#f6e6c9",
    fontWeight: "600",
  },
  summaryText: {
    color: "#c9c9d4",
  },
  summaryTotal: {
    color: "#f2c37b",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },
});
