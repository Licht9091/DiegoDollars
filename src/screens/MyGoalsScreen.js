import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Alert,
  TextInput,
  Picker,
} from "react-native";
import { STYLESHEET } from "../styles/stylesheet";
import Colors from "../styles/colors";
import BottomBar from "../components/BottomBar";
import Pill from "../components/Pill";
import transactionStyles from "./Transactions/TransactionsScreen.style";
import { SearchBar } from "react-native-elements";
import AppContext from "../helper/context";
import { FONT_FAMILY_LIGHT, FONT_FAMILY_SEMIBOLD } from "../styles/typography";
import navigateAndReset from "../helper/functions";
import TransactionListComponent from "../components/TransactionListComponent";
import Diego from "../assets/Diego.svg";
import Rocket from "../assets/rocket.svg";
import Pencil from "../assets/pencil.svg";
import NewGoal from "../components/NewGoal";
import Modal from "react-native-modal";
import TransactionsFilter from "../components/TransactionsFilter";
import s from "./MyGoals.style.js";
import SimpleModal from "../components/SimpleModal";
import DatePicker from "react-native-datepicker";

function setButtonValue(value, set, incomeOrExpense, navigatedState) {
  if (value) {
    set(false);
    navigatedState = "all";
  } else {
    set(true);
    if (incomeOrExpense) {
      navigatedState = "income";
    } else {
      navigatedState = "expense";
    }
  }
}

function setValues(
  goalName,
  typeName,
  startDate,
  finishDate,
  setGoalName,
  setTypeName,
  setstartDate,
  setfinishDate,
  setEditGoal
) {
  setGoalName(goalName);
  setTypeName(typeName);
  setstartDate(startDate);
  setfinishDate(finishDate);
  setEditGoal(false);
}

export default function MyGoals({ navigation, route }) {
  const [allTransactions, setAllTransactions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { goalId } = route.params;

  const User = useContext(AppContext).User;
  const goals = User.goals;
  const goal = goals.find((g) => g.id === goalId);

  const getTransactionList = () => {
    const loadedTransactions = User.account.allTransactions;

    setAllTransactions(loadedTransactions.filter((t) => t.id === goal.id));
    setLoaded(true);
  };

  useEffect(() => {
    getTransactionList();
  }, []);

  //All distances need to add up to 150, so percentages are used
  const [spentDistance, setSpentDistance] = useState(0);
  const [savedDistance, setSavedDistance] = useState(150 * goal.percent);
  // const [goalDistance, setGoalDistanceDistance] = useState(
  //   150 * (1 - goal.percent)
  // );

  // const [state.goal.description, setGoalName] = useState(goal.description);
  // const [state.goal.type, setTypeName] = useState(goal.type);
  // const [state.goal.startDate, setstartDate] = useState(goal.startDate);
  // const [state.goal.endDate, setfinishDate] = useState(goal.endDate);

  const setGoal = async (newGoal) => {
    // newGoal.description ? newGoal.description : goal.description,
    // newGoal.goalAmount ? newGoal.goalAmount : goal.goalAmount,
    // goal.fortnightlyContribution,
    // newGoal.endDate ? newGoal.endDate : goal.endDate

    const resp = await User.editGoal(newGoal);

    if (!resp) {
      alert("Something broke");
    }
  };

  const deleteGoal = async () => {
    const success = await User.deleteGoal(goal);

    if (success) {
      navigateAndReset(navigation, "Main");
    }
  };

  const reducer = (state, action) => {
    if (action.type === "editMode") {
      return {
        ...state,
        mode: "edit",
      };
    } else if (action.type === "viewMode") {
      return {
        ...state,
        mode: "view",
      };
    } else if (action.type === "popModal") {
      return {
        ...state,
        modal: action.modal,
      };
    } else if (action.type === "closeModal") {
      return {
        ...state,
        modal: undefined,
      };
    } else if (action.type === "setGoalType") {
      return {
        ...state,
        newGoalType: action.value,
      };
    } else if (action.type === "setGoalEnd") {
      return {
        ...state,
        newGoalEnd: action.endDate,
      };
    } else if (action.type === "deleteGoal") {
      deleteGoal();
      return {
        ...state,
        modal: undefined,
      };
    } else if (action.type === "saveChanges") {
      // apply changes
      const newGoal = {
        ...state.goal,
        type: state.newGoalType ? state.newGoalType : state.goal.type,
        endDate: state.newGoalEnd ? state.newGoalEnd : state.goal.endDate,
      };

      setGoal(newGoal);

      return {
        mode: "view",
        goal: newGoal,
      };
    } else {
      alert(`invalid action ${action.type} in MyGoalsScreen.js`);
      return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    mode: "view",
    goal,
  });

  return (
    <View>
      {/* New goal modal */}
      {state.modal === "createGoal" && (
        <Modal isVisible>
          <NewGoal
            onClose={() => dispatch({ type: "closeModal" })}
            goal={state.goal.description}
            navigation={navigation}
          />
        </Modal>
      )}

      {/* Delete goal modal */}
      {state.modal === "delete" && (
        <SimpleModal>
          <>
            <Text style={s.modalTitleText}>Delete this goal?</Text>
            <Text style={s.modalBodyText}>
              You won't be able to get it back
            </Text>
            <View style={s.modalButtonWrapper}>
              <TouchableOpacity
                onPress={() => dispatch({ type: "closeModal" })}
              >
                <Text style={s.modalButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch({ type: "deleteGoal" })}
              >
                <Text style={[s.modalButton, { color: "#D02121" }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </SimpleModal>
      )}

      <View style={s.goalView}>
        <View style={s.goalHeader}>
          <Text style={[s.title]}>My Goals</Text>

          <TouchableOpacity
            style={s.createButton}
            onPress={() => dispatch({ type: "popModal", modal: "createGoal" })}
          >
            <Text style={s.createButtonText}>Create New</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: Colors.Primary,
            height: Dimensions.get("window").height * 0.1,
            marginTop: -Dimensions.get("window").height * 0.59,
            marginBottom: Dimensions.get("window").height * 0.33,
          }}
        ></View>

        <View style={s.goalContainer}>
          <View style={s.goalSummary}>
            {/* Title */}
            <Text style={s.goalTitle}>{state.goal.description}</Text>

            {/* Info Row 1 */}
            <View style={s.flexRow}>
              <View style={[s.flexCol]}>
                {/* Label */}
                <Text style={s.goalLabel}>TYPE</Text>
                {/* Picker */}
                {state.mode === "view" && (
                  <Text style={s.goalValue}>{state.goal.type}</Text>
                )}
                {state.mode === "edit" && (
                  <View style={s.flexRow}>
                    <Picker
                      selectedValue={
                        state.newGoalType ? state.newGoalType : state.goal.type
                      }
                      style={s.picker}
                      itemStyle={s.pickerItem}
                      text
                      useNativeAndroidPickerStyle={false}
                      onValueChange={(value) =>
                        dispatch({ type: "setGoalType", value })
                      }
                    >
                      <Picker.Item label="One-Off" value="One Off" />
                      <Picker.Item label="Continuous" value="Continuous" />
                    </Picker>
                  </View>
                )}
              </View>
            </View>

            {/* Info Row 2 */}
            <View style={[s.flexRow, { marginBottom: 30 }]}>
              <View style={[s.flexCol]}>
                <Text style={s.goalLabel}>STARTED</Text>
                <Text style={s.goalValue}>{state.goal.startDate}</Text>
              </View>
              <View style={[s.flexCol, { marginRight: 30 }]}>
                <Text style={s.goalLabel}>FINISHING</Text>
                {(state.mode === "view" || goal.type === "Continuous") && (
                  <Text style={s.goalValue}>{state.goal.endDate}</Text>
                )}
                {state.mode === "edit" && goal.type === "One Off" && (
                  <View style={s.flexRow}>
                    <DatePicker
                      mode="date"
                      placeholder={"Select Date"}
                      format="DD-MM-YYYY"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      date={
                        state.newGoalEnd ? state.newGoalEnd : state.goal.endDate
                      }
                      showIcon={false}
                      style={{ left: -30, top: -9 }}
                      customStyles={{
                        dateInput: {
                          borderWidth: 0,
                          color: "white",
                        },
                        dateText: {
                          fontFamily: FONT_FAMILY_LIGHT,
                          color: "white",
                          fontSize: 16,
                        },
                        disabled: {
                          height: 0,
                        },
                      }}
                      onDateChange={(date) =>
                        dispatch({ type: "setGoalEnd", endDate: date })
                      }
                    />
                    <Pencil style={s.pencil} />
                  </View>
                )}
              </View>
            </View>

            {/* Button Row */}
            {state.mode === "view" && (
              <View style={[s.flexRow]}>
                <TouchableOpacity
                  style={[s.button, { marginRight: 7 }]}
                  onPress={() => dispatch({ type: "editMode" })}
                >
                  <View>
                    <Text style={[s.buttonText]}>Edit Goal</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[s.button, s.deleteButton]}
                  onPress={() =>
                    dispatch({ type: "popModal", modal: "delete" })
                  }
                >
                  <View>
                    <Text style={[s.buttonText, { color: "white" }]}>
                      Delete
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {state.mode === "edit" && (
              <View style={[s.flexRow]}>
                <TouchableOpacity
                  style={[
                    s.button,
                    { marginRight: 7, backgroundColor: "#FF6A6A" },
                  ]}
                  onPress={() => dispatch({ type: "viewMode" })}
                >
                  <View>
                    <Text style={[s.buttonText, { color: "white" }]}>
                      Cancel
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[s.button, { backgroundColor: "#1F79D3" }]}
                  onPress={() => dispatch({ type: "saveChanges" })}
                >
                  <View>
                    <Text style={[s.buttonText, { color: "white" }]}>Save</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/* Rocket Ship */}
            <View style={[s.rocketContainer]}>
              <View style={[s.progress]}></View>
              <View
                style={[
                  s.progress,
                  {
                    opacity: 1,
                    borderLeftColor: "#0092F2",
                    height: Math.max(20, goal.percent * 220),
                  },
                ]}
              ></View>
              {/* <View style={[s.progress, {}]}></View> */}
              <Rocket
                style={[s.rocket, { bottom: goal.percent * 220 }]}
              ></Rocket>
              <Text
                style={{
                  borderLeftColor: Colors.PrimaryLight,
                  borderLeftWidth: 10,
                  height: savedDistance,
                }}
              ></Text>
              <Text
                style={{
                  borderLeftColor: Colors.Teal,
                  borderLeftWidth: 10,
                  height: spentDistance,
                }}
              ></Text>
            </View>
          </View>

          {/* Transactions and filter */}
          <View style={s.whiteBubbleView}>
            <TransactionsFilter
              transactionList={allTransactions}
              loading={!loaded}
              onSelect={() => {}}
              style={s.filterStyle}
            />
          </View>
        </View>
      </View>
      <BottomBar navigation={navigation} />
    </View>
  );
}
