import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { productsInCart } from './ListOfProductsInCart';

export default function ProductCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(productsInCart);
  }, [productsInCart]);

  const handleRemove = titleToRemove => {
    const updated = cartItems.filter(item => item.title !== titleToRemove);
    setCartItems(updated);

    productsInCart.length = 0;
    productsInCart.push(...updated);
  };

  const Item = ({ title, description, category, price, URL }) => (
    <View style={styles.productCard}>
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productDescription}>{description}</Text>
      <Text style={styles.productCategory}>{category}</Text>
      <Text style={styles.productPrice}>{price}$</Text>
      <Image source={{ uri: URL }} style={styles.productImage} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRemove(title)}
      >
        <Text style={styles.buttonText}>Remove from Cart</Text>
      </TouchableOpacity>
    </View>
  );

  Item.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    URL: PropTypes.string,
  };

  return (
    <View style={styles.container}>
      {console.log(productsInCart)}
      <Text style={styles.header}>Your Products</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyMessage}>Cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              description={item.description}
              category={item.category}
              price={item.price}
              URL={item.URL}
            />
          )}
        />
      )}
    </View>
  );
}
