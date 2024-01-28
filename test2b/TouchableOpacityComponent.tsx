import React, {FC} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

interface TouchableOpacityComponentProps extends TouchableOpacityProps {
  onPress: () => void;
}

const TouchableOpacityComponent: FC<TouchableOpacityComponentProps> = ({
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.touchableOpacity}>
      <Text style={styles.title}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
});

export default TouchableOpacityComponent;
