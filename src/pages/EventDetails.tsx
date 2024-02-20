import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Profile.css';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { openDB } from 'idb';
import { mapOutline,logOutOutline } from 'ionicons/icons'

const EventDetails: React.FC = () => {
  const [events, setEvents] = useState();
  const {id} = useParams<{ id: string; }>();
  const eventId = parseInt(id);
  const history = useHistory();

  useEffect(() => {
    const getEvents = async () => {
      const db = await openDB('my-db', 1);
      const event = await db.get('events', eventId);
      setEvents(event);
      console.log(event);
    };
    getEvents();
  }, []);

  function handleLogOut() {
    sessionStorage.clear();
    history.push('/home');
  }

  function joinEvents() {

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
      {events ? (
          <>
        <IonInput label='Event Name:' type='text' name='name' value={events.name}></IonInput>
        <IonItem>
          <IonIcon icon={mapOutline} slot="start" />
         <a href={`http://www.google.com/maps/place/${events.latitude},${events.longitude}`} >Go to Location</a>
        </IonItem>
        <IonInput label='Date: ' type='date' name='date' value={events.date}></IonInput>
        <IonInput label='Time' type='time' name='time' value={events.time}></IonInput>
        <IonTextarea label='Details' rows={3} name='details' value={events.details}/>
        <IonInput label='Required Things to Carry: ' name='required' value={events.required}></IonInput>
        <IonInput label='Maximum members: ' type='number' name='maximum' value={events.maximum}></IonInput>
        <IonButton onClick={joinEvents}>Join</IonButton>
        </>
        ) : (
          <div>Details not found
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default EventDetails;
