import { View, Text, StyleSheet } from 'react-native'

const ChatTab = () => {
  return (
    <View style={styles.container}>
      <Text>Tab [Messages]</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ChatTab
