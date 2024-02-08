import {CardContent, Card, Stack, Typography} from '@mui/material';
import SystemArchitecture from '../assets/MQTTSystemArchitecture.png';

/**
 * Komponente, die Informationen über MQTT darstellt.
 * 
 * @param {boolean} props.showInfo - Gibt an, ob die Informationen angezeigt werden sollen.
 * 
 * @returns {JSX.Element|null} Die JSX-Elemente, die die MQTT-Informationen darstellen, oder null, wenn showInfo false ist.
 */

const MQTTInfo = ({showInfo}) => {
  return showInfo === true ? (
    <Card>
      <CardContent>
        <Stack>
          <Typography fontSize='12pt' color='text.secondary' variant='overline'>
            Was ist MQTT?
          </Typography>
          <Typography fontSize='15pt' color='text.secondary' sx={{textAlign: 'left'}}>
            <ul>
              <li>
                <strong>Leichtgewichtig</strong>: Geringe Bandbreitenanforderung und effiziente Datenübertragung, ideal für IoT-Geräte.
              </li>
              <li>
                <strong>Publish-Subscribe-Mechanismus</strong>: Ermöglicht Kommunikation über Themen, die von Geräten veröffentlicht und abonniert werden.
              </li>
              <li>
                <strong>Einfache Struktur</strong>: Verwendet grundlegende Befehle für den Nachrichtenaustausch und vereinfacht die Implementierung.
              </li>
              <li>
                <strong>Zuverlässigkeit</strong>: Bietet drei QoS-Stufen für flexible Nachrichtenübermittlung – 0, 1 und 2.
              </li>
              <li>
                <strong>Geringe Netzwerkanforderungen</strong>: Effektive Funktion auch bei instabilen Netzwerken oder niedriger Bandbreite.
              </li>
              <li>
                <strong>Sicherheit</strong>: Kann mit SSL/TLS für sichere Datenübertragungen verschlüsselt werden.
              </li>
              <li>
                <strong>Breite Anwendung</strong>: Wird in vielen Branchen eingesetzt und von zahlreichen Plattformen und Sprachen unterstützt.
              </li>
              <li>
                <strong>Energieeffizienz</strong>: Minimiert den Energieverbrauch, wichtig für batteriebetriebene IoT-Geräte.
              </li>
              <li>
                <strong>Skalierbarkeit</strong>: Geeignet für wachsende IoT-Netzwerke durch das Verbinden und Verwalten Tausender Geräte.
              </li>
            </ul>
          </Typography>
          <Typography fontSize='12pt' color='text.secondary' variant='overline'>
            Systemarchitektur
          </Typography>
          <Typography fontSize='15pt' color='text.secondary' sx={{textAlign: 'left'}}>
            <ul>
              <li>
                <strong>Temperaturdienst Innen/Außen</strong>: Publisher, die Temperaturdaten an den HiveMQ Cloud Broker senden. Einer misst die Innentemperatur und der andere die Außentemperatur.
              </li>
              <li>
                <strong>HiveMQ Cloud Broker</strong>: Als zentraler MQTT Broker empfängt er Nachrichten und leitet sie an die entsprechenden Subscriber weiter.
              </li>
              <li>
                <strong>FeelsLikeDienst</strong>: Subscriber und Publisher, der die empfangenen Temperaturdaten verarbeitet und die gefühlte Temperatur berechnet.
              </li>
              <li>
                <strong>Vorschlagsdienst</strong>: Subscriber und Publisher, der auf Basis der Temperaturdaten Handlungsempfehlungen gibt.
              </li>
              <li>
                <strong>Frontend - WebApp</strong>: Subscriber, um sie in einer Benutzeroberfläche anzuzeigen.
              </li>
              <li>
                <strong>Archivierungsdienst</strong>: Subscriber, speichert die Daten in einer MongoDB Datenbank, kommuniziert über HTTPS.
              </li>
              <li>
                <strong>Durchschnittsdienst</strong>: Publisher, veröffentlicht Durschnittsdaten aus der MongoDB Datenbank.
              </li>
              <li>
                <strong>LCD Display</strong>: Subscriber, der die Daten anzeigt, die er direkt vom Broker erhält.
              </li>
            </ul>
          </Typography>
          <img alt='MQTT System Architecture' src={SystemArchitecture}></img>
            <a  href='https://github.com/Boehri/mqtt-frontend' target='_blank' rel='noopener noreferrer' style={{marginTop: '10px'}}>
            Check mqtt-frontend on GitHub
          </a>
        </Stack>
      </CardContent>
    </Card>
  ) : null;
};

export default MQTTInfo;
