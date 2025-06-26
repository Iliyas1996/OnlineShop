import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { fetchProducts } from './productSlice';
import PropTypes from 'prop-types';
import styles from './styles';
import { productsInCart } from './listOfProductsInCart';

export default function productView() {
  const product = useSelector(state => state.product) || {
    loading: false,
    posts: [],
    error: '',
  };
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts({ page, text }));
  }, [dispatch, page, text]);

  function nextPage() {
    if (page < 19) setPage(prev => prev + 1);
  }

  function previousPage() {
    if (page > 0) setPage(prev => prev - 1);
  }

  const [text, setText] = useState('');

  function changeText(text) {
    setText(text);
    console.log(text);
  }

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

  const navigation = useNavigation();

  function addToCart({ title, description, category, price, URL }) {
    if (productsInCart.findIndex(item => item.title === title) === -1) {
      productsInCart.push({ title, description, category, price, URL });
    } else return;
  }

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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setPage(0);
            dispatch(fetchProducts({ page, text }));
          }}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CartScreen')}
        >
          <Text style={styles.buttonText}>Cart</Text>
        </TouchableOpacity>
      </View>
      {product.loading && <Text>Loading...</Text>}
      {!product.loading && product.error && <Text>Error: {product.error}</Text>}
      {!product.loading && product.products?.length === 0 && (
        <Text>No products found for this page.</Text>
      )}
      {!product.loading && product.products?.length > 0 && (
        <FlatList
          data={product.products}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={({ item }) => (
            <Item
              title={item.title}
              description={item.description}
              category={item.category}
              price={item.price}
              URL={item.thumbnail}
            />
          )}
        />
      )}
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={previousPage}>
          <Text style={styles.buttonText}>Prev Page</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={nextPage}>
          <Text style={styles.buttonText}>Next Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
