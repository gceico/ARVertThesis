import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from "react-redux";
import { getPlansList } from "../actions/categoryActions";
import { updateUser } from "../actions/userActions";
import TextStyles from "../styles/TextStyles";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import ButtonsStyles from "../styles/ButtonsStyles";
import Loader from "../components/Loader";
import Layout from "../constants/Layout";
import PlanStyles from "../styles/PlanStyles";
import SideSwipe from 'react-native-sideswipe';

function PlansScreen (props) {
  const [loaded, setLoaded] = useState({ plans: false });
  const [currentIndex, setCurrentIndex] = useState(0);
  const icons = ['ios-gift', 'ios-bonfire', 'ios-rocket'];
  const itemWidth = Layout.window.width - 64;
  const totalWidth = Layout.window.width;
  const offset = (totalWidth - itemWidth) / 3;

  useEffect(() => {
    if (props.userId) {
      if (!loaded.plans) {
        props.getPlansList();
        setLoaded({ ...loaded, plans: true })
      }
    }
  });

  if (!props.loading && props.plansList) {
    let data = props.plansList;
    if (data) {
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === props.user.IdPlan) {
          data[i].data['CurrentPlan'] = true;
        } else {
          data[i].data['CurrentPlan'] = false;
        }
        if (data[i].data.Name === 'Free') {
          data[i].data['Icon'] = icons[0];
        }
        if (data[i].data.Name === 'Explorer') {
          data[i].data['Icon'] = icons[1];
        }
        if (data[i].data.Name === 'Master') {
          data[i].data['Icon'] = icons[2];
        }
      }
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={PlanStyles.planIntro}>
          <Text style={[TextStyles.headerSecondary, PlanStyles.plansHeader]}>Plans</Text>
          <Text style={[TextStyles.caption, PlanStyles.plansCaption]}>Hi there! This is a cool feature – so, if you
            want to ad new ads or
            locations, you have to update your Free plan. Select one of the following plans for more
            information.</Text>
          <TouchableOpacity style={PlanStyles.Close} onPress={() => {
            props.navigation.navigate('SettingsScreen')
          }}>
            <Ionicons
              name={'ios-close'}
              size={48}
              color={Colors.black80}
            />
          </TouchableOpacity>
        </View>
        {data.length !== 0 &&
        <View style={PlanStyles.planCarouselWrapper}>
          <SideSwipe
            index={currentIndex}
            itemWidth={itemWidth}
            style={{ width: totalWidth, flex: 1 }}
            data={data}
            contentOffset={offset}
            onIndexChange={index => setCurrentIndex({ currentIndex: index })}
            renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
              <PlanItem
                updateUser={props.updateUser}
                user={props.user}
                userId={props.userId}
                {...item}
                index={itemIndex}
                currentIndex={currentIndex}
                animatedValue={animatedValue}
              />
            )}
          />
        </View>
        }
      </View>
    );
  } else {
    return (
      <Loader/>
    )
  }
}

function PlanItem (props) {
  return (
    <View style={PlanStyles.planWrapper}>
      <Text style={PlanStyles.planName}>{props.data.Name}</Text>
      <View style={PlanStyles.planIconWrapper}>
        <Ionicons
          name={props.data.Icon}
          size={28}
          color={Colors.tintColor}
        />
      </View>
      <View style={PlanStyles.separator}/>
      <View style={{ flex: 1 }}>
        <View style={PlanStyles.listItem}>
          <Ionicons
            name={'ios-checkmark-circle'}
            size={20}
            color={Colors.white}
          />
          <Text style={PlanStyles.listText}>Max ads: {props.data.MaxAds}</Text>
        </View>
        <View style={PlanStyles.listItem}>
          <Ionicons
            name={'ios-checkmark-circle'}
            size={20}
            color={Colors.white}
          />
          <Text style={PlanStyles.listText}>Max visits: {props.data.MaxVisits}</Text>
        </View>
        <View style={PlanStyles.listItem}>
          <Ionicons
            name={'ios-checkmark-circle'}
            size={20}
            color={Colors.white}
          />
          <Text style={PlanStyles.listText}>Click cost: {props.data.ClickCost}$</Text>
        </View>
      </View>
      {!props.data.CurrentPlan ?
        <TouchableOpacity style={[ButtonsStyles.primary, PlanStyles.button]}
                          onPress={() => props.updateUser({ ...props.user, ...{ IdPlan: props.id } }, props.userId)}>
          <Text style={ButtonsStyles.primaryText}>Get it now for {props.data.Price}$/month</Text>
        </TouchableOpacity>
        :
        <View style={[ButtonsStyles.primary, PlanStyles.button, { backgroundColor: Colors.white95 }]}>
          <Text style={[ButtonsStyles.primaryText, { color: Colors.tintColor }]}>Current plan</Text>
        </View>
      }
      {!props.data.CurrentPlan ?
        <TouchableOpacity style={[ButtonsStyles.primaryText, PlanStyles.buttonText]} onPress={() => {
          props.navigation.navigate('SettingsScreen')
        }}>
          <Text style={ButtonsStyles.primaryText}>Maybe Later</Text>
        </TouchableOpacity> :
        <TouchableOpacity style={[ButtonsStyles.primaryText, PlanStyles.buttonText]} onPress={() => {
          props.navigation.navigate('SettingsScreen')
        }}>
          <Text style={ButtonsStyles.primaryText}>Go back</Text>
        </TouchableOpacity>}
    </View>
  )
}

export const PlansScreenWithRedux = connect(state => ({
  ...state.userReducer,
  ...state.categoryReducer,
}), {
  getPlansList,
  updateUser
})(PlansScreen);

PlansScreenWithRedux.navigationOptions = {
  header: null,
  headerMode: 'none',
};