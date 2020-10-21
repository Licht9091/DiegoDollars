import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

const SimpleModal = ({ children }) => {
  const s = {
    container: {
      flex: 0,
      flexDirection: 'column',
      justfyContent: 'center',
      alignItems: 'center',
    },
    card: {
      width: 300,
      height: 150,
      backgroundColor: 'white',
      padding: 30,
      borderRadius: 5,
    },
  };

  return (
    <Modal isVisible>
      <View style={s.container}>
        <View style={s.card}>{children ? children : null}</View>
      </View>
    </Modal>
  );
};

export default SimpleModal;
