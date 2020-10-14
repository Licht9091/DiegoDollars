import React, { useReducer } from 'react';
import NewFortnight from './NewFortnight';
import PaychecksReceived from './PaychecksReceived';
import PeriodSummary from './PeriodSummary';
import Modal from 'react-native-modal';

const RefreshModal = ({ onClose }) => {
  const reducer = (state, action) => {
    if (action.mode === 'review-paychecks') {
      return {
        ...state,
        mode: 'review-paychecks',
      };
    } else if (action.mode === 'review-period') {
      return {
        ...state,
        mode: 'review-period',
      };
    } else if (action.mode === 'init-period') {
      return {
        ...state,
        mode: 'init-period',
      };
    } else {
      return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    mode: 'review-paychecks',
  });

  return (
    <Modal isVisible onPress={onClose}>
      {/* Review Paychecks */}
      {state && state.mode === 'review-paychecks' && (
        <PaychecksReceived
          onClose={onClose}
          onComplete={() => dispatch({ mode: 'review-period' })}
        ></PaychecksReceived>
      )}

      {/* Review Fortnight Summary */}
      {state && state.mode === 'review-period' && (
        <Modal isVisible>
          <PeriodSummary
            onComplete={() => dispatch({ mode: 'init-period' })}
          ></PeriodSummary>
        </Modal>
      )}

      {/* Initialise New Fortnight */}
      {state && state.mode === 'init-period' && (
        <Modal isVisible>
          <NewFortnight onComplete={onClose}></NewFortnight>
        </Modal>
      )}
    </Modal>
  );
};

export default RefreshModal;
