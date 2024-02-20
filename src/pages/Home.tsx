import { IonButton, IonCard, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import React from 'react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardTitle>Want to Join Picnic?</IonCardTitle>
          <IonButton fill="outline" routerLink="/login">Log In</IonButton>
        </IonCard>
        <IonCard>
          <IonCardTitle>Don't have an account?</IonCardTitle>
          <IonButton fill="outline" routerLink="/signup">Register</IonButton>
        </IonCard>
        <IonCard>
          <IonCardTitle>About Us</IonCardTitle>
          <IonButton fill="outline" routerLink="/aboutus">About Us</IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
