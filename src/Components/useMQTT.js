import {useEffect, useState, useRef} from 'react';
import mqtt from 'mqtt';

/**
 * Eine benutzerdefinierte Hook-Funktion, die eine Verbindung zu einem MQTT-Broker herstellt und MQTT-Daten abruft.
 * @returns {{
 *   indoorData: {
 *     temperature: number | null,
 *     avgTemperature: number | null,
 *     humidity: number | null,
 *     avgHumidity: number | null,
 *     pressure: number | null,
 *     avgPressure: number | null,
 *     feelsLike: number | null,
 *     dataPoints: Array<{time: Date, temperature: number, humidity: number}>,
 *     lastUpdated: Date | null
 *   },
 *   outdoorData: {
 *     temperature: number | null,
 *     humidity: number | null,
 *     pressure: number | null,
 *     feelsLike: number | null,
 *     dataPoints: Array<{time: Date, temperature: number, humidity: number}>,
 *     lastUpdated: Date | null,
 *     suggestion: string | null
 *   }
 * }}
 */


export const useMQTT = () => {
  const [indoorTemperature, setIndoorTemperature] = useState(null);
  const [indoorAverageTemperature, setIndoorAverageTemperature] = useState(null);
  const [indoorHumidity, setIndoorHumidity] = useState(null);
  const [indoorAverageHumidity, setIndoorAverageHumidity] = useState(null);
  const [indoorPressure, setIndoorPressure] = useState(null);
  const [indoorAveragePressure, setIndoorAveragePressure] = useState(null);
  const [indoorFeelsLike, setIndoorFeelsLike] = useState(null);
  const [indoorDataPoints, setIndoorDataPoints] = useState([]);
  const [indoorLastUpdated, setIndoorLastUpdated] = useState(null);

  // Außen-Daten
  const [outdoorTemperature, setOutdoorTemperature] = useState(null);
  const [outdoorHumidity, setOutdoorHumidity] = useState(null);
  const [outdoorPressure, setOutdoorPressure] = useState(null);
  const [outdoorFeelsLike, setOutdoorFeelsLike] = useState(null);
  const [outdoorDataPoints, setOutdoorDataPoints] = useState([]);
  const [outdoorLastUpdated, setOutdoorLastUpdated] = useState(null);
  const [suggestion, setSuggestion] = useState(null);

  // useRef, um den aktuellen Wert von Temperatur und Luftfeuchtigkeit zu speichern
  const currentIndoorTemperature = useRef(null);
  const currentIndoorHumidity = useRef(null);
  const currentOutdoorTemperature = useRef(null);
  const currentOutdoorHumidity = useRef(null);

  const subscribtionTopics = ['#'];

  useEffect(() => {
    const mqttClient = mqtt.connect('wss://5d4607be694c4b98bdfdab8fd5f11847.s2.eu.hivemq.cloud:8884/mqtt', {
      connectTimeout: 4000,
      username: process.env.REACT_APP_HIVEMQ_USERNAME,
      password: process.env.REACT_APP_HIVEMQ_PASSWORD,
    });

    mqttClient.on('connect', () => {
      mqttClient.subscribe(subscribtionTopics);
      console.log('Connected to MQTT Broker');
    });

    mqttClient.on('error', (error) => {
      console.error('MQTT Connection Error:', error);
    });

    mqttClient.on('message', (topic, message) => {
      try {
        const value = JSON.parse(message.toString());
        const now = new Date();

        switch (topic) {
          // Innen-Daten
          case 'raspi/in/temp':
            setIndoorTemperature(value.temperature.toFixed(1));
            currentIndoorTemperature.current = value.temperature;
            setIndoorLastUpdated(now);
            break;
          case 'raspi/in/humi':
            setIndoorHumidity(value.humidity.toFixed(1));
            currentIndoorHumidity.current = value.humidity;
            if (currentIndoorHumidity.current && currentIndoorTemperature.current) {
              setIndoorDataPoints((points) => [...points, {time: now, temperature: currentIndoorTemperature.current, humidity: currentIndoorHumidity.current}]);
            }
            break;
          case 'raspi/in/press':
            setIndoorPressure(Math.round(value.pressure));
            break;
          case 'raspi/in/temp/feelsLike':
            setIndoorFeelsLike(value.feelsLike.toFixed(1));
            break;
          // Außen-Daten
          case 'raspi/out/temp':
            setOutdoorTemperature(value.temperature.toFixed(1));
            currentOutdoorTemperature.current = value.temperature;
            setOutdoorLastUpdated(now);
            break;
          case 'raspi/out/humi':
            setOutdoorHumidity(value.humidity.toFixed(1));
            currentOutdoorHumidity.current = value.humidity;
            if (currentOutdoorHumidity.current && currentOutdoorTemperature.current) {
              setOutdoorDataPoints((points) => [...points, {time: now, temperature: currentOutdoorTemperature.current, humidity: currentOutdoorHumidity.current}]);
            }
            break;
          case 'raspi/out/press':
            setOutdoorPressure(Math.round(value.pressure));
            break;
          case 'raspi/out/temp/feelsLike':
            setOutdoorFeelsLike(value.feelsLike.toFixed(1));
            break;
          case 'raspi/in/temp/avg':
            setIndoorAverageTemperature(value.avgTemperature.toFixed(1));
            break;
          case 'raspi/in/humi/avg':
            setIndoorAverageHumidity(value.avgHumidity.toFixed(1));
            break;
          case 'raspi/in/press/avg':
            setIndoorAveragePressure(Math.round(value.avgPressure));
            break;
          case 'raspi/out/sug':
            setSuggestion(value.suggestion);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error parsing MQTT message:', error);
      }
    });

    return () => {
      mqttClient.end();
    };
  }, []); // Leeres Array als Abhängigkeiten, um den Hook nur beim Mounten auszuführen

  

  return {
    indoorData: {temperature: indoorTemperature, avgTemperature: indoorAverageTemperature, humidity: indoorHumidity, avgHumidity: indoorAverageHumidity, pressure: indoorPressure, avgPressure: indoorAveragePressure, feelsLike: indoorFeelsLike, dataPoints: indoorDataPoints, lastUpdated: indoorLastUpdated},
    outdoorData: {temperature: outdoorTemperature, humidity: outdoorHumidity, pressure: outdoorPressure, feelsLike: outdoorFeelsLike, dataPoints: outdoorDataPoints, lastUpdated: outdoorLastUpdated, suggestion: suggestion},
  };
};
