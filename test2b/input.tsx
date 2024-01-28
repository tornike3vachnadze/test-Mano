import React, {FC, InputHTMLAttributes} from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';

interface InputProps extends TextInputProps {}

const Input: FC<InputProps> = props => {
  return <TextInput {...props} style={styles.input} />;
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    paddingVertical: 5,
  },
});

export default Input;
