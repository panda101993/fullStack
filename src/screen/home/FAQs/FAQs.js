import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,Image, SafeAreaView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// import { Colors } from '../commomStyle/commonStyle';
// import { getFontSize } from '../utils/dynamicSize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { TEALDARK,LIGHTGREY } from '@utils/colors'
import { CustomHeader } from '../../../components/header';
import { back,PlusIcon,MinusIcon,FaqBG } from '../../../assets/icon';
import { dynamicSize } from '../../../utils/dynamicSize';
import Api from '../../../api/Api'
import AsyncStorage from '@react-native-community/async-storage';


function Item({ id, title, selected, details, onSelect }) {
  return (
    <View style={{ }} >
    <View style={[styles.item]} >
      <View style={styles.wrapper}>
        <Text style={[styles.title]}>{title}</Text>
        <TouchableOpacity style={{ alignSelf: 'flex-end'}} onPress={() => onSelect(id)}>
          <Image style={{ height: 20, width: 20, }} source={selected ? MinusIcon : PlusIcon} />
        </TouchableOpacity>
      </View>
      </View>
      {selected ?
        <View style={[]} >
          <View style={styles.textWrapper} />
          <Text style={[ styles.details]}>{details}</Text>
        </View>
        : null}
  
  </View>
  );
}




export default class FAQs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected : new Map(),
      FAQdata:""
    };
  }
  
  componentDidMount() {
    AsyncStorage.getItem('token').then(resp => {
      this.setState({
        token: resp
      })
      this.FAQData()
    }
    )
  }

  FAQData = () => {
    Api(this.state.token, "static/get-faq-list", "GET")
      .then(rep => {

        if (rep.status == 200) {

          this.setState({FAQdata: rep.data.data})
          this.setState({
            modalVisible: false,
          },
          console.log("RESS==>",rep.data.data,"DATA==>",this.state.FAQdata)
           )
        }
        else if (rep.status == 400) {
          setTimeout(() => {
            alert(rep.data.message)
          }, 100);

        }
        else {
          setTimeout(() => {
            alert(rep.data.message)
          }, 101);

        }
      })
  }

  onSelect = id => {
    const newSelected = new Map( this.state.selected);
    newSelected.set(id, !this.state.selected.get(id));
 this.setState({selected : newSelected })  
  }


  render() {
    return (
        <SafeAreaView style={styles.container}>
        
         <CustomHeader text1={"FAQs"} source1={back}  onPress1={()=>this.props.navigation.goBack()} />
        
         <ScrollView style={{marginVertical:wp(5)}}>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={this.state.FAQdata}
        renderItem={({ item }) => (
          <Item
            id={item.faqId}
            title={item.question}
            details={item.answer}
            selected={!!this.state.selected.get(item.faqId)}
            onSelect={this.onSelect}
          />
        
        )}
        keyExtractor={item => item.id}
        extraData={this.state.selected}
      />
        </ScrollView>
          
    

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'red',
    // marginVertical:Platform.OS==='ios' ? wp('20%') :wp(-3),
    backgroundColor: 'white'
  },
  item: {
    backgroundColor: LIGHTGREY,
    padding: 12,
    marginVertical: 4,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    borderTopColor: "grey",
    borderBottomColor:"grey",
   
    
  },
  title: {
    fontSize:17,
    color:TEALDARK,
    marginHorizontal:wp(2),
    width:wp(80)
  },
  wrapper:{
    paddingBottom: 5,
   flexDirection: 'row',
   
  },
  textWrapper:{
    // width: '100%', 
    // borderTopColor: Colors.lightGrey, 
    // borderTopWidth: 0.2 
  },
  details: {
    fontSize:dynamicSize(14),
    marginHorizontal:wp(5),
    marginVertical:wp(2),
    width:wp(94)
  },
});