import { IonAlert, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Profile.css';
import {useState } from 'react';
import { useHistory } from 'react-router';
import { openDB } from 'idb';

const Login: React.FC = () => {
  const [form, setForm] = useState({email:'', password:''});
  const history = useHistory();
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleForm = (e: any) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name] : e.target.value
    });
  }

  const handleSubmit = async () => {
    const db = await openDB('my-db', 1);
    const user = await db.get('users', form.email);
    if(!form.email || !form.password) {
      setAlertMessage('Enter valid credentials.');
      setShowAlert(true);
      return;
    }
    if (user && user.password === form.password) {
      sessionStorage.setItem('username', user.name);
      sessionStorage.setItem('email', form.email);
      history.push(`/profile`);
    } else {
      setAlertMessage('Invalid email or password.');
      setShowAlert(true);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home">
            </IonBackButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput type="email" aria-label="email" name="email" value={form.email} onIonInput={handleForm}/>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput type="password" aria-label="password" name="password" value={form.password} onIonInput={handleForm}/>
          </IonItem>
          <IonButton type="submit" expand="block" color="primary" fill="solid" size="large" onClick={handleSubmit}>Login</IonButton>
          <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Log In'}
          message={alertMessage}
          buttons={['OK']}
        />
          <h2>Don't have an account yet?</h2>
          <IonButton expand="block" color="primary" fill="outline" size="large" routerLink='/signup'>Signup</IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Login;