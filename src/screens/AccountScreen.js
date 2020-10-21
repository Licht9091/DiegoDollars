import React, { useContext, useEffect, useState } from 'react';
import { STYLESHEET } from '../styles/stylesheet';
import { Text, View, Dimensions } from 'react-native';
import Colors from '../styles/colors';
import BottomBar from '../components/BottomBar';
import AppContext from '../helper/context';

const style = {
  transactionView: {
    backgroundColor: Colors.White,
    width: Dimensions.get('window').width - 40,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 20,
    padding: 30,
    flex: 0,
    alignItems: 'center',

    ...STYLESHEET.shadowNormal,
  },
  defaultHeader: {
    fontSize: 28,
    textAlign: 'center',
    color: Colors.Primary,
  },
};

export default function AccountScreen({ navigation }) {
  const Context = useContext(AppContext);
  const [account, setAccount] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const setupAccount = async () => {
    const acc = await Context.User.account;
    setAccount(acc);
  };

  useEffect(() => {
    if (!loaded) {
      setupAccount();
      setLoaded(true);
    }
  });

  return (
    <View style={STYLESHEET.defaultView}>
      <View style={style.transactionView}>
        <Text style={style.defaultHeader}>Total Account Value</Text>
        <Text style={style.defaultHeader}>
          ${account && account.totalBalance}
        </Text>
      </View>
      <View style={style.transactionView}>
        <Text style={style.defaultHeader}>Graph goes here</Text>
      </View>
      <BottomBar navigation={navigation} />
    </View>
  );
}
