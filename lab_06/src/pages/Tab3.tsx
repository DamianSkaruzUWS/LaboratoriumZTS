import { useState } from 'react';
import {
IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, 
IonGrid,
IonHeader, IonInput, IonPage, IonRow, IonText, IonTitle, IonToolbar,
} from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import './Tab3.css';

import ExploreContainer from '../components/ExploreContainer';
type Dane = {
  imie: string;
  nazwisko: string;
  haslo: string;
  telefon: string;
  email: string;
};
const Tab3: React.FC = () => {
  const { control, handleSubmit, trigger, formState: { errors } } = useForm<Dane>({
mode: 'onChange',
defaultValues: { imie: '', nazwisko: '', haslo: '', telefon: '', email: '' },
});
const [swiper, setSwiper] = useState<SwiperType | null>(null);
const [wyslano, setWyslano] =useState<Dane | null> (null);
const dalej = async (pola: (keyof Dane)[]) => {
const ok = await trigger(pola);
if (ok) swiper?.slideNext();
};
const wyslij = (dane: Dane) => {
setWyslano(dane);
console.log(dane);
};
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rejestracja</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Rejestracja</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form onSubmit={handleSubmit(wyslij)}>
          <Swiper className="formularz" allowTouchMove={false} onSwiper={setSwiper}>
            <SwiperSlide>
              <div className="krok">
                <h2>Krok 1 z 3</h2>
                <Controller
                  name="imie"
                  control={control}
                  rules={{ required: 'Podaj imię' }}
                  render={({ field }) => (
                    <IonInput
                    label="Imię"
                    labelPlacement="floating"
                    value={field.value}
                    onIonInput={(e) => field.onChange(e.detail.value ?? '')}
                    onIonBlur={field.onBlur}
                    />
                  )}
                />
                {errors.imie && <IonText color="danger">{errors.imie.message}</IonText>}
                <Controller
                  name="nazwisko"
                  control={control}
                  rules={{ required: 'Podaj nazwisko' }}
                  render={({ field }) => (
                    <IonInput
                    label="Nazwisko"
                    labelPlacement="floating"
                    value={field.value}
                    onIonInput={(e) => field.onChange(e.detail.value ?? '')}
                    onIonBlur={field.onBlur}
                    />
                  )}
                />
                {errors.nazwisko && <IonText color="danger">{errors.nazwisko.message}</IonText>}
                <IonButton expand="block" onClick={() => dalej(['imie', 'nazwisko'])}>Dalej</IonButton>
              </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="krok">
                  <h2>Krok 2 z 3</h2>
                  <Controller
                    name="haslo"
                    control={control}
                    rules={{ required: 'Podaj hasło', minLength: { value: 8, message: 'Hasło musi mieć co najmniej 8 znaków'} }}
                    render={({ field }) => (
                      <IonInput
                      type="password"
                      label="Hasło"
                      labelPlacement="floating"
                      value={field.value}
                      onIonInput={(e) => field.onChange(e.detail.value ?? '')}
                      onIonBlur={field.onBlur}
                      />
                    )}
                  />
                  {errors.haslo && <IonText color="danger">{errors.haslo.message}</IonText>}
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonButton expand="block" fill='outline' onClick={() => swiper?.slidePrev()}>Wstecz</IonButton>
                      </IonCol>
                      <IonCol>
                        <IonButton expand="block" onClick={() => dalej(['haslo'])}>Dalej</IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </div>
              </SwiperSlide>
              <SwiperSlide>
              <div className="krok">
                <h2>Krok 3 z 3</h2>
                <Controller
                  name="telefon"
                  control={control}
                  rules={{ required: 'Podaj telefon', pattern: {value: /^\d{9}$/, message: 'Numer telefonu musi mieć 9 cyfr'} }}
                  render={({ field }) => (
                    <IonInput
                    type="tel"
                    pattern='\d{9}'
                    maxlength={9}
                    label="Telefon"
                    labelPlacement="floating"
                    value={field.value}
                    onIonInput={(e) => field.onChange(e.detail.value ?? '')}
                    onIonBlur={field.onBlur}
                    />
                  )}
                />
                {errors.telefon && <IonText color="danger">{errors.telefon.message}</IonText>}
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: 'Podaj e-mail', pattern: {value: /^\S+@\S+\.\S+$/, message: 'Niepoprawny e-mail'} }}
                  render={({ field }) => (
                    <IonInput
                    type="email"
                    label="E-mail"
                    labelPlacement="floating"
                    value={field.value}
                    onIonInput={(e) => field.onChange(e.detail.value ?? '')}
                    onIonBlur={field.onBlur}
                    />
                  )}
                />
                {errors.email && <IonText color="danger">{errors.email.message}</IonText>}
                <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonButton expand="block" fill='outline' onClick={() => swiper?.slidePrev()}>Wstecz</IonButton>
                      </IonCol>
                      <IonCol>
                        <IonButton expand="block" type="submit">Wyślij</IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
              </div>
            </SwiperSlide>
          </Swiper>
        </form>
        {wyslano && <IonCard>
          <IonCardContent></IonCardContent>
          <IonTitle>Wysłane dane</IonTitle>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol><h2>Imię:</h2></IonCol>
                <IonCol>{wyslano.imie}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><h2>Nazwisko:</h2></IonCol>
                <IonCol>{wyslano.nazwisko}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><h2>Hasło:</h2></IonCol>
                <IonCol>{'*'.repeat(wyslano.haslo.length)}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><h2>Telefon:</h2></IonCol>
                <IonCol>{wyslano.telefon}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><h2>E-mail:</h2></IonCol>
                <IonCol>{wyslano.email}</IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
          </IonCard>}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
