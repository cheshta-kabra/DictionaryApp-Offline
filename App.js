import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import db from 'localdb';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text:'',
      searchButton: [],
      word:'',
      examples: '',
      defination:'',
      lexicalCategory: '',
      isSearchedPressed:''
    };
  }

  getWord = (word) => {
    //define a variable searchKeyword and store the word after converting it to LowerCase
    var searchKeyword = word.toLowerCase()

    //create the URL using the API Link given in PDF and concatenate the searchKeyword to it
        var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"

            


    return fetch(url)
      .then((data) => {
        console.log(data)
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        
        var responseObject = response;
        console.log(responseObject)
        var word = responseObject.definitions[0];
        
        if (responseObject) {
          // declare a variable lexicalCategory  and store the wordtype from word;
          var wordData = responseObject.definitions[0]
          //declare a variable definition and store the description from word;
          var defination = wordData.description
          alert(defination)
          var lexicalCategory = wordData.wordtype

          this.setState({
            
            "word": this.state.text,
            "defination" : defination,
           "lexicalCategory" : lexicalCategory,
            
          });
        } else {
          this.setState({ word: this.state.text, definition: 'Not Found' });
        }
      });
  };

  render() {
    return (
     
      <View style={styles.container}>

         <Header><h1 style={{fontSize:20,justifyContent:'center',flexDirection:'row'}}>Online Dictionary App </h1>
        </Header>
          

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              searchButton: false,
              word: '',
              lexicalCategory: '',
              examples: [],
              defination: '',
            });
          }}
          value={this.state.text}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({isSearchedPressed:this.state.word})
            this.setState({ searchButton: true });
            {this.getWord(this.state.text)}
            
          }}>
          <Text
            style={{ textAlign: 'Center', fontSize: 20, fontWeight: 'bold' }}>
            SEARCH
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 50, padding: 20 }}>
          <View style={styles.outputContainer}>
            <Text style={{ fontSize: 18, color: 'blue' }}>
              {this.state.isSearchedPressed}
            </Text>
          </View>
          <View>
          </View>
         <Text style={{fontSize:20}}>
         {this.setState.isSearchedPressed && this.state.isSearchedPressed==='loading'
         ?this.state.isSearchedPressed
         :""}
         </Text>
         {
           this.state.isSearchedPressed !== 'loading'?
           (
             <View style={{justifyContent:'center',marginLeft:10}}>
             <View style={styles.detailContainer}>
             <Text style={styles.displayText}>
             Word:{''}
             </Text>
             <Text style={{fontSize:18,color:'red'}}>
             {this.state.text}
             </Text>
             </View>
             </View>
           )
           :''}
           <View style={styles.detailContainer}>
           <Text style={styles.displayText}>
             Type:{""}
             </Text>
              <Text style={{fontSize:18,color:'red'}}>
             {this.state.lexicalCategory}
             </Text>
           </View>
            <View style={styles.detailContainer}>
           <Text style={styles.displayText}>
             Defination:{""}
             </Text>
              <Text style={{fontSize:18,color:'red'}}>
             {this.state.defination}
             </Text>
           </View>
        </View>
      </View>
    );
  }
}

// Try to style as per your preference below:-

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  detailContainer:{
    flex:2,
    alignItems:'center',
    justifyContent:'center'
  },
  outputContainer:{flex:2,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'yellow'
    },
  inputBox: {
    marginTop: 20,
    width: 200,
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
  },
  searchButton: {
    width: 100,
    alignSelf: 'center',
    height: 30,
    margin: 30,
    backgroundColor: 'orange',
    borderRadius: 15,
  },
  displayText: {
    textAlign: 'left',
    fontSize: 20,
    color: 'black',
  },
  
});
