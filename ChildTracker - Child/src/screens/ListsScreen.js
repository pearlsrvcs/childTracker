import React, {Component} from 'react';
import { Text, StyleSheet, View, FlatList, TouchableWithoutFeedback } from 'react-native';

class ListsScreen extends Component{
  constructor(props) {
    super(props)       
  }

  pressedName(item) {
    if (item !== undefined){          
      db.collection('child').where("key", "==", item.key).get()
      .then( (snapshot) => {        
        this.props.navigation.navigate('Details', item, this.db)
      })
      .catch( (error) => {
        console.log('Error retrieving info')
      })
    
    }
    
  }
  render() {
    return (
      <FlatList 
        key={this.props.navigation.state.params.key}
        data={this.props.navigation.state.params}  
        showsHorizontalScrollIndicator={false}
        onPress = {this.pressedName()}
        renderItem={({item}) => (

          <TouchableWithoutFeedback onPress={ () => this.pressedName(item)}>
            <Text style={styles.children}>{item.name}</Text>            
         </TouchableWithoutFeedback>
     )}
  /> 
    )
  };
}

const styles = StyleSheet.create({  
  children: {
    fontSize: 24,
    paddingLeft: 30,
    paddingBottom: 10,
    marginVertical: 5,
    borderBottomWidth: 2
  }
});

export default ListsScreen;