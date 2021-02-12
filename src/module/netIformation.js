import NetInfo from "@react-native-community/netinfo";



// Subscribe
const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });
  
  // Unsubscribe
  unsubscribe();

//   Get the network state once:

NetInfo.fetch().then(state => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});