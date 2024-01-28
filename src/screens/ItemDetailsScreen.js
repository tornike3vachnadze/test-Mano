import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const ItemDetailsScreen = ({route}) => {
  const [product, setProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const scale = useSharedValue(1);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: event => {
      scale.value = event.scale;
    },
    onEnd: () => {
      scale.value = withSpring(1);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  useEffect(() => {
    // Fetch product details from API
    axios
      .get(
        `https://staging-api.manoapp.com/api/v1/users/products/${route.params.productId}`,
        {
          headers: {
            StoreID: '2',
            UserAddressID: '49769',
          },
        },
      )
      .then(response => {
        console.log('cccccc', response.data.data);
        setProduct(response.data.data);
      })
      .catch(error => console.error(error));
    // }, [route.params.productId]);
  }, []);

  const handleImagePress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      {product && (
        <View
          style={{
            borderColor: 'grey',
            borderWidth: 1,
            borderRadius: 10,
            margin: 20,
          }}>
          <TouchableOpacity
            style={{
              borderBottomColor: 'blue',
              borderBottomWidth: 1,
            }}
            onPress={handleImagePress}>
            <Image
              source={{uri: product?.images[0]?.original}}
              style={{width: 200, height: 200, alignSelf: 'center'}}
            />
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {product?.title}
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: 'green',
              marginTop: 5,
            }}>
            $ {product?.price}
          </Text>

          <Text
            style={{
              alignSelf: 'center',
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 5,
              marginBottom: 5,
            }}>
            BRAND: {product?.brand}
          </Text>
        </View>
      )}
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          style={{
            width: '80%',
            height: 50,
            backgroundColor: 'blue',
            borderRadius: 10,
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              justifyContent: 'center',
              fontSize: 18,
            }}>
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>

      {/* <Modal visible={modalVisible} onRequestClose={handleCloseModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'rgba(0, 0, 255, 0.5)', // Semi-transparent blue background
          }}>
          <Image
            source={{uri: product?.images[0]?.original}}
            style={{width: 300, height: 300}}
          />
          <TouchableOpacity
            onPress={handleCloseModal}
            style={{position: 'absolute', top: 40, right: 15}}>
            <Text>close</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
      <Modal visible={modalVisible} onRequestClose={handleCloseModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <PinchGestureHandler onGestureEvent={pinchHandler}>
            <Animated.View style={animatedStyle}>
              <Image
                source={{uri: product?.images[0]?.original}}
                style={{width: 300, height: 300}}
              />
            </Animated.View>
          </PinchGestureHandler>

          <TouchableOpacity
            onPress={handleCloseModal}
            style={{position: 'absolute', top: 40, right: 15}}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ItemDetailsScreen;
