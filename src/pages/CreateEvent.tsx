import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Profile.css';
import React from 'react';
import { useState } from 'react';
import { openDB } from 'idb';
import { useHistory } from 'react-router-dom';
import { Geolocation } from '@ionic-native/geolocation';
import { logOutOutline } from 'ionicons/icons';

const CreateEvent: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    latitude: '',
    longitude:'',
    date: '',
    time:'',
    details:'',
    required:'',
    maximum:'', 
  });
  const history = useHistory();

  const handleForm = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  } 

  const handleSubmit = async () => {
    const db = await openDB('my-db', 1,);
    await db.add('events', form);
    history.push('/profile');
  }

  const setLocation = () => {
    Geolocation.getCurrentPosition().then((resp) => {
      const latitude = resp.coords.latitude;
      const longitude = resp.coords.longitude;
      setForm({
        ...form,
        latitude: `${latitude}`,
        longitude: `${longitude}`
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  const handleLogOut = () => {
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
          <IonTitle>Create Event</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogOut} fill="clear">
              <IonIcon slot="icon-only" icon={logOutOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonInput label='Event Name:' type='text' name='name' value={form.name} onIonInput={handleForm}></IonInput>
        <IonButton onClick={setLocation}>Set Location</IonButton>
        {form.latitude &&
          <div>
            <p>Latitude: {form.latitude}</p>
            <p>Longitude: {form.longitude}</p>
          </div>
        }
        <IonInput label='Date: ' type='date' name='date' value={form.date} onIonInput={handleForm}></IonInput>
        <IonInput label='Time' type='time' name='time' value={form.time} onIonInput={handleForm}></IonInput>
        <IonTextarea label='Details' rows={3} name='details' value={form.details} onIonInput={handleForm} />
        <IonInput label='Required Things to Carry: ' name='required' value={form.required} onIonInput={handleForm}></IonInput>
        <IonInput label='Maximum members: ' type='number' name='maximum' value={form.maximum} onIonInput={handleForm}></IonInput>
        <IonButton type="submit" expand="block" color="primary" fill="solid" size="large" onClick={handleSubmit}>Create</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CreateEvent;
