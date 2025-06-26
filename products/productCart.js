import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import PropTypes from 'prop-types';
import { productsInCart } from './listOfProductsInCart';

function removeFromCart(titleToRemove) {
  const updatedCart = productsInCart.filter(
    item => item.title !== titleToRemove,
  );
  productsInCart.length = 0;
  productsInCart.push(...updatedCart);
  return updatedCart;
}

export default function ProductCart() {
  const [cartItems, setCartItems] = useState(productsInCart);

  const Item = ({ title, description, category, price, URL }) => (
    <View style={styles.productCard}>
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productDescription}>{description}</Text>
      <Text style={styles.productCategory}>{category}</Text>
      <Text style={styles.productPrice}>{price}$</Text>
      <Image source={{ uri: URL }} style={styles.productImage} />
    </View>
  );

  Item.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    URL: PropTypes.string,
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your products</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <Item
              title={item.title}
              description={item.description}
              category={item.category}
              price={item.price}
              URL={item.URL}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                const updated = removeFromCart(item.title);
                setCartItems([...updated]);
              }}
            >
              <Text style={styles.buttonText}>Remove from Cart</Text>
            </TouchableOpacity>
          </>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProductView')}
      >
        <Text style={styles.buttonText}>Return to Shop</Text>
      </TouchableOpacity>
    </View>
  );
}
