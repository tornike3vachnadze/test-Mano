import React, {FC, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Input from './Input';
import TouchableOpacityComponent from './TouchableOpacityComponent';

interface ScreenProps {
  navigation: any; // Replace with the actual type
}

const Screen: FC<ScreenProps> = ({navigation}) => {
  const [name, setName] = useState('');

  const submitName = () => {
    navigation.navigate('AnotherScreen', {name});
  };

  return (
    <View style={styles.container}>
      <Input value={name} onChangeText={text => setName(text)} />
      <TouchableOpacityComponent onPress={submitName}>
        DONE
      </TouchableOpacityComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default Screen;
