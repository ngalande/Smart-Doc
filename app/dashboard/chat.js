import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'


export default function Chat() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello Welcome to IoT-Based Health Monitoring System, what would we assist you with today?',
                createdAt: new Date(),
                quickReplies: {
                  type: 'radio', // or 'checkbox',
                  keepIt: true,
                  values: [
                    {
                      title: '😋 Yes',
                      value: 'yes',
                    },
                    {
                      title: '📷 Yes, let me show you with a picture!',
                      value: 'yes_picture',
                    },
                    {
                      title: '😞 Im not feeling okay',
                      value: 'no',
                    },
                  ],
                },
                user: {
                  _id: 2,
                  avatar: 'https://previews.123rf.com/images/yupiramos/yupiramos1607/yupiramos160705616/59613224-doctor-avatar-profile-isolated-icon-vector-illustration-graphic.jpg',
                  name: 'Doctor',
                },
              },
              {
                _id: 2,
                text: 'IoT-Based Health Monitoring System',
                createdAt: new Date(),
                quickReplies: {
                  type: 'checkbox', // or 'radio',
                  values: [
                    {
                      title: 'Yes',
                      value: 'yes',
                    },
                    {
                      title: 'Yes, let me show you with a picture!',
                      value: 'yes_picture',
                    },
                    {
                      title: 'Nope. What?',
                      value: 'no',
                    },
                  ],
                },
                user: {
                  _id: 2,
                  name: 'Doctor',
                  avatar: 'https://previews.123rf.com/images/yupiramos/yupiramos1607/yupiramos160705616/59613224-doctor-avatar-profile-isolated-icon-vector-illustration-graphic.jpg',
                },
              }
        ])
      }, [])
    
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])
  return (
    <View style={{flex:1, marginBottom:130}}>
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    </View>
  )
}