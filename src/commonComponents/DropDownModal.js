import React from 'react'
import { Text, View, TouchableOpacity, Modal,StyleSheet,FlatList } from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp}  from 'react-native-responsive-screen'

const Drop_Down_Modal =(props) =>(
    <Modal
        animationType='none'
        transparent={true}
        visible={props.visible}>
        <View  style={style.mainContainer}>
        <TouchableOpacity onPressIn={()=>props.onPressClose()} >
          <View style={style.Modalcontainer}>
            <FlatList
              data={props.data}
              onRequestClose={() => console.log("modal has been closeds")}
              showsVerticalScrollIndicator={false}
              keyExtracter={(item, index) => index.toString()}
              renderItem={({ item, index }) =>
                <TouchableOpacity
                  onPress={() => props.onPress(item)
                  }
                  style={{
                    width: wp("70%"),
                    alignItems: 'center',
                    height: hp("6%"),
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >

                  <Text style={{ 
                      color: 'black' }}>
                    {item.title}
                  </Text>
                 
                </TouchableOpacity>
              
              }
             
            />
          
          </View>
        </TouchableOpacity>
        </View>
      </Modal>
)

export{
    Drop_Down_Modal
}
const style=StyleSheet.create({
   
    mainContainer:{
 
    alignItems: "center",
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    opacity:0.8

    },
    Modalcontainer:{
        borderRadius: 8,
        borderWidth: 1,
        borderColor:'rgb(224 ,163, 84)',
        marginTop: hp("35%"),
        alignItems: "center",
        alignSelf: 'center',
        width: wp("82%"),
        backgroundColor: "white",
        height:hp("28%"),
        marginBottom: hp("25%"),
    }
})