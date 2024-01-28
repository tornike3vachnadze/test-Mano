import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import ProductList from '../components/ProductList';

const HomeScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from API
    axios
      .post(
        'https://staging-api.manoapp.com/api/v1/users/products',
        {},
        {
          headers: {
            StoreID: '2',
            UserAddressID: '49769',
          },
        },
      )
      .then(response => {
        console.log('response');

        setProducts(response.data.data.items);
      })
      .catch(error => console.error(error));
  }, []);

  const handlePressItem = productId => {
    navigation.navigate('ItemDetails', {productId});
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <ProductList data={products} onPressItem={handlePressItem} />
    </View>
  );
};

export default HomeScreen;
