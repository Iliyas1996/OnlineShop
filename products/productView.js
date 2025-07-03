import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from './ProductSlice';
import PropTypes from 'prop-types';
import styles from './styles';
import { productsInCart } from './ListOfProductsInCart';

export default function ProductView() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ text: '', skip: 0 }));
  }, [dispatch]);

  const changeText = input => {
    setText(input);
  };

  const addToCart = ({ title, description, category, price, URL }) => {
    if (productsInCart.findIndex(item => item.title === title) === -1) {
      productsInCart.push({ title, description, category, price, URL });
    }
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
        onPress={() => addToCart({ title, description, category, price, URL })}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
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

  const onSearch = () => {
    dispatch(fetchProducts({ text, skip: 0 }));
  };

  const loadMore = () => {
    if (!product.loading) {
      dispatch(fetchProducts({ text, skip: product.products.length }));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>List of products</Text>
      <View style={styles.buttonView}>
        <TextInput
          style={styles.input}
          placeholder="e.g. smartphones"
          onChangeText={changeText}
          value={text}
        />
        <TouchableOpacity style={styles.button} onPress={onSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {product.error && <Text>Error: {product.error}</Text>}
      {!product.loading && product.products.length === 0 && (
        <Text>No products found for this page.</Text>
      )}

      <FlatList
        data={product.products}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            description={item.description}
            category={item.category}
            price={item.price}
            URL={item.thumbnail}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          product.loading ? (
            <ActivityIndicator
              size="small"
              color="#00897b"
              style={{ marginVertical: 12 }}
            />
          ) : null
        }
      />
    </View>
  );
}
