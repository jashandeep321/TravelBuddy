import { Image, StyleSheet,Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";


const April21=()=>{
   const [destinations,setDestinations]=useState([]);
   const [loading, setLoading] = useState(true);

   // Temporary static data
  const mockDestinations = [
    {
      id: 1,
      name: "Paris",
      country: "France",
      image: "https://res.cloudinary.com/dzyb93kms/image/upload/v1746091234/paris_gvbz4j.jpg"
    },
    {
      id: 2,
      name: "Bali",
      country: "Indonesia",
      image: "https://res.cloudinary.com/dzyb93kms/image/upload/v1746125508/bali_dae02l.jpg"
    },
    {
      id: 3,
      name: "New York",
      country: "USA",
      image: "https://res.cloudinary.com/dzyb93kms/image/upload/v1746128405/newyork_jt1yt5.jpg"
    },
    {
        id: 4,
        name: "Hawaii",
        country: "USA",
        image: "https://res.cloudinary.com/dzyb93kms/image/upload/v1746130177/hawaii4_cu2qgn.webp"
      },
      {
        id: 5,
        name: "Jaipur",
        country: "India",
        image: "https://res.cloudinary.com/dzyb93kms/image/upload/v1746130179/jaipur_lmte1c.jpg"
      },
  ];

   useEffect(()=>{
    // async function callingApi(){
    //     const fetchData =await fetch('https://freetestapi.com/api/v1/destinations');
    //     const data =await fetchData.json();
    //     setDestinations(data);
    //     console.log(data);
    // }
    // callingApi();


    //temp
    // setDestinations(mockDestinations);


    const timer = setTimeout(() => {
        setDestinations(mockDestinations);
        setLoading(false); // stop loading after data is "fetched"
      }, 2000); // simulate 2 seconds delay
  
      return () => clearTimeout(timer); // cleanup on unmount
  
   },[]);

   console.log(destinations);

   destinations.map(()=>{
    console.log('hello');
   });

return(
    <ScrollView style={{width:'100%', height:'100%', }}>
        {destinations.length === 0 ? (<Loader/>):(
            destinations.map((item=>{
                return (
                    <View key={item.id} style={styles.viewStyle}>
                    <Image source={{uri:item.image}}
                        style={{width: 300, height: 300,   borderRadius: 0}}/>
                    <Text style={styles.font}>
                        {item.name}</Text>
                    {/* {' '} */}
                    {/* <Text>{item.decription}</Text> */}
                    <Text>{item.country}</Text>
                    {/* <hr/> */}
                    </View>
                )
            }))
        ) }
    </ScrollView>
);

}

export default April21;

const styles=StyleSheet.create({
    viewStyle:{
        backgroundColor: "ivory",
        width :"80%",
        // height :"100%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15, // spacing between boxes
    padding: 10,         // inner spacing
    borderRadius: 0,    // rounded corners
    alignSelf: "center", // center each box horizontally
    alignItems: "center",
    shadowColor: "#000",
    },
    font:{
        fontWeight:'900',
        fontSize: 30 ,
        fontFamily: "cursive",
        margin: 10,
    }

});
