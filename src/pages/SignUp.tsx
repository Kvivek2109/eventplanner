import { IonAlert, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './SignUp.css';
import { useState } from 'react';
import { openDB } from 'idb';
import { useHistory } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [form, setForm] = useState({ email: '', name: '', password: '' });
  const history = useHistory();
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleForm = (e: any) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  } 

  const handleSubmit = async () => {
    if(!form.name || !form.email || !form.password) {
      setAlertMessage('Enter valid credentials');
      setShowAlert(true);
      return;
    }
    const db = await openDB('my-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('users')) {
          const store = db.createObjectStore('users', { keyPath: 'email' });
          store.createIndex('email', 'email', { unique: true });
          db.createObjectStore('events', { keyPath: "id", autoIncrement: true, });
        }

      },
    });
    await db.add('users', form);
    sessionStorage.setItem('username', form.name);
    sessionStorage.setItem('email', form.email);
    history.push('/profile');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home">
            </IonBackButton>
          </IonButtons>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput type="email" aria-label="email" name='email' value={form.email} onIonInput={handleForm}/>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput type="text" aria-label="name"  name='name' value={form.name} onIonInput={handleForm}/>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput type="password" aria-label="password" name='password' value={form.password} onIonInput={handleForm}/>
          </IonItem>
          <IonButton type="submit" expand="block" color="primary" fill="solid" size="large" onClick={handleSubmit}>Signup</IonButton>
          <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Sign Up'}
          message={alertMessage}
          buttons={['OK']}
        />
          <h2>Already a member?</h2>
          <IonButton expand="block" color="primary" fill="outline" size="large" routerLink='/login'>Log In</IonButton>
      </IonContent>
    </IonPage>
  );
}

export default SignUp;
