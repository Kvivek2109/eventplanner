import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './AboutUs.css';
import {homeOutline} from 'ionicons/icons';

const AboutUs: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About Us</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='wrapper'>
          <h2>Event Planner</h2>
          <p>Welcome to Event Planner app, built with React Native and TypeScript. Our app is designed to make event planning easy and enjoyable, whether you're hosting or wants to join an event. With features like signup, login, create event, search event, and event details, our app has everything you need to plan your perfect event.</p>
          <p>Our signup and login functionality ensures that you can access all the features of our app securely and conveniently. Once you're logged in, you can easily create your event, with options to add details like date, time, location using indexedDB and cordova plugins.</p>
          <p>This app is built with React Native and TypeScript.I have used indexedDB for storing database for this project, but it can be integrated with other databases using node.js</p>
        </div>
        <IonFab slot='fixed' vertical='bottom' horizontal='center'>
        <IonFabButton  routerLink={"/home"}>
          <IonIcon icon={homeOutline}></IonIcon>
        </IonFabButton>
      </IonFab>
      </IonContent>
    </IonPage>
  );
}


export default AboutUs;
