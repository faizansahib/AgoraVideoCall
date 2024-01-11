import React, { useState, useEffect } from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Contacts from 'react-native-contacts';

const App = () => {
  const [videoCall, setVideoCall] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    Contacts.getAll()
      .then((contacts) => {
        setContactList(contacts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const connectionData = {
    appId: 'your Agora appId',
    channel: selectedUser ? `channel_${selectedUser.recordID}` : null,
  };

 console.log('channel name user',selectedUser)

  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
  };

  const startVideoCall = (user) => {
    setSelectedUser(user);
    setVideoCall(true);
  };

  return videoCall ? (
    <View style={{ height: '100%' }}>
      <AgoraUIKit
        connectionData={connectionData}
        rtcCallbacks={rtcCallbacks}
        styleProps={{ UIKitContainer: { height: '50%', width: '100%' } }}
      />
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={contactList}
        keyExtractor={(item) => item.recordID}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => startVideoCall(item)}>
            <Text>{item.displayName + item.id}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default App;
