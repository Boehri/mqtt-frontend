import React, {useState, useEffect} from 'react';
import mqtt from 'mqtt';
import {TextField, Button, List, ListItem, ListItemText, Container, Typography} from '@mui/material';

const MQTTComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [client, setClient] = useState(null);

  useEffect(() => {
    const options = {
      connectTimeout: 4000,
      // Authentifizierungsdaten
      username: 'arduino',
      password: 'ArduinoUno1',
    };
    // Erstellen Sie eine MQTT-Client-Instanz
    const mqttClient = mqtt.connect('wss://5d4607be694c4b98bdfdab8fd5f11847.s2.eu.hivemq.cloud:8884/mqtt', options);

    mqttClient.on('connect', () => {
      console.log('Connected to HiveMQ');
      mqttClient.subscribe('my/test/topic', function (err) {
        if (!err) {
          console.log('Subscription successful');
        }
      });
    });

    mqttClient.on('message', (topic, message) => {
      console.log(`Received message: ${message.toString()} on topic: ${topic}`);
      setMessages((prevMessages) => [...prevMessages, {topic, message: message.toString()}]);
    });

    mqttClient.on('error', (err) => {
      console.error('Connection error: ', err);
      mqttClient.end();
    });

    mqttClient.on('reconnect', () => {
      console.log('Reconnecting...');
    });

    mqttClient.on('offline', () => {
      console.log('Client is offline');
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  const sendMessage = () => {
    if (client) {
      client.publish('my/test/topic', inputMessage);
      console.log(`Message sent: ${inputMessage}`);
      setInputMessage('');
    }
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' gutterBottom>
        HiveMQ MQTT Client
      </Typography>
      <TextField fullWidth label='Enter Message' value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} margin='normal' variant='outlined' />
      <Button variant='contained' color='primary' onClick={sendMessage}>
        Send Message
      </Button>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={`Topic: ${msg.topic}`} secondary={`Message: ${msg.message}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default MQTTComponent;
