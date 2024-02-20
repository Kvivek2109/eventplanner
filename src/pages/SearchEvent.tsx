import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Profile.css';
import React, { useEffect, useState } from 'react';
import { openDB } from 'idb';
import { logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const SearchEvent: React.FC = () => {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getEvents = async () => {
      const db = await openDB('my-db', 1);
      const events = await db.getAll('events');
      setEvents(events);
    };
    getEvents();
  }, []);

  function handleLogOut() {
    sessionStorage.clear();
    history.push('/home');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profile">
            </IonBackButton>
          </IonButtons>
          <IonTitle>Search Event</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogOut} fill="clear">
              <IonIcon slot="icon-only" icon={logOutOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonList>
          {events.map((events, index:number) => (
            <IonItem key={events.id} routerLink={`/eventDetails/${events.id}`}>
              <IonLabel>
                <h2>{events.name}</h2>
                <p>Date: {events.date}</p>
                <p>Time: {events.time}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SearchEvent;
