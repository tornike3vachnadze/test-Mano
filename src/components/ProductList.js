import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');
const itemWidth = (width - 30) / 2; // Calculate item width based on screen width

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    justifyContent: 'space-between',
    padding: 10,
  },
  itemContainer: {
    width: itemWidth,
    height: 300, // Fixed height for each item
    marginBottom: 20,
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  itemImage: {
    width: '100%',
    height: 100,
  },
});

const ProductList = ({data, onPressItem}) => {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => {
        return (
          <TouchableOpacity onPress={() => onPressItem(item.id)}>
            <View style={styles.itemContainer}>
              <View style={{padding: 20}}>
                <Image
                  source={{uri: item?.images[0]?.original}}
                  style={styles.itemImage}
                />
              </View>

              <Text style={{fontSize: 12, marginBottom: 5}}>{item?.title}</Text>
              <Text>{item?.description}</Text>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                ${item?.original_price}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default ProductList;
