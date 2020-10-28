import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import AppContext from '../helper/context';
import Paycheck from './Paycheck';
import paycheckStyle from './PaychecksReceived.style';
import moment from 'moment';

// Icon assets
import CloudOne from '../assets/cloud.svg';
import CloudTwo from '../assets/cloud2.svg';
import Sun from '../assets/sun.svg';
import { User } from '../helper/api';

const PaychecksReceived = ({ onClose, onComplete }) => {
  const Context = useContext(AppContext);
  const [paychecks, setPaychecks] = useState([]);
  const [notPaycheck, setNotPaycheck] = useState([]);

  const getPaychecks = async () => {
    const account = await Context.User.account;
    const paychecks = account.allTransactions
      .filter((t) => t.isIncome && moment(t.date) > moment(account.periodStart))
      .map((t) => ({ ...t, description: t.description.replace(/\s+/g, ' ') }))
      .slice(0, 2);

    setPaychecks(paychecks);
  };

  const removePaycheck = (paycheckId) => {
    if (!notPaycheck.includes(paycheckId)) {
      const newNotPaycheck = [...notPaycheck];
      newNotPaycheck.push(paycheckId);
      setNotPaycheck(newNotPaycheck);
    }
  };

  useEffect(() => {
    getPaychecks();
  }, []);

  return (
    <View style={paycheckStyle.card}>
      <View style={paycheckStyle.header}>
        <Text style={paycheckStyle.headerText}>New Paychecks Received</Text>
        <CloudOne style={paycheckStyle.cloudOne} width={80} height={80} />
        <CloudTwo style={paycheckStyle.cloudTwo} width={80} height={80} />
        <Sun style={paycheckStyle.sun} width={60} height={60} />
      </View>
      <View style={paycheckStyle.info}>
        <Text style={paycheckStyle.infoText}>
          Verify that these are indeed your paychecks to record them as income,
          and to move onto the next fortnight.
        </Text>
      </View>
      <View style={paycheckStyle.content}>
        <Text style={paycheckStyle.title}>Paychecks</Text>

        <View style={paycheckStyle.paycheckWrapper}>
          {paychecks
            .filter((t) => !notPaycheck.includes(t.id))
            .map((pc) => (
              <Paycheck
                key={pc.id}
                transaction={pc}
                removePaycheck={removePaycheck}
              />
            ))}
        </View>
        <View style={paycheckStyle.buttonWrapper}>
          <TouchableOpacity style={paycheckStyle.touchable} onPress={onClose}>
            <View style={[paycheckStyle.button, paycheckStyle.cancelButton]}>
              <Text style={paycheckStyle.buttonText}>Not Yet</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={paycheckStyle.touchable}
            onPress={() => onComplete([paychecks.map((p) => p.id)])}
          >
            <View style={[paycheckStyle.button, paycheckStyle.completeButton]}>
              <Text style={paycheckStyle.buttonText}>Complete Fortnight</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PaychecksReceived;
