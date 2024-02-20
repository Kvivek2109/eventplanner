import { IonBackButton, IonButton, IonButtons, IonCard, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Profile.css';
import React from 'react';
import { logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const Profile: React.FC = () => {
  const history = useHistory();

  function handleLogOut() {
    sessionStorage.clear();
    history.push('/home');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home">
            </IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={handleLogOut} fill="clear">
              <IonIcon slot="icon-only" icon={logOutOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
            <IonCardTitle>Create Your Own Event</IonCardTitle>
            <IonButton fill="outline" routerLink="/createEvent">Create</IonButton>
          </IonCard>
          <IonCard>
            <IonCardTitle>Search and Join Events Nearby</IonCardTitle>
            <IonButton fill="outline" routerLink="/searchEvent">Explore</IonButton>
          </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
