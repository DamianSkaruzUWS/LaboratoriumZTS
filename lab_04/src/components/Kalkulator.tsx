import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow } from '@ionic/react';
import { useState } from 'react';

const cyfry = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
];

const Kalkulator: React.FC = () => {
  const [wyswietlacz, setWyswietlacz] = useState<string>('0');
  const [poprzednia, setPoprzednia] = useState<number | null>(null);
  const [dzialanie, setDzialanie] = useState<string | null>(null);
  const [nowaLiczba, setNowaLiczba] = useState<boolean>(false);

  const policz = (a: number, b: number, znak: string): number | null => {
    switch (znak) {
      case '+':
        return a + b;
      case '−':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return b === 0 ? null : a / b;
      default:
        return b;
    }
  };

  const pokazBlad = () => {
    setWyswietlacz('Nie można dzielić przez zero');
    setPoprzednia(null);
    setDzialanie(null);
    setNowaLiczba(true);
  };

  const wynikNaTekst = (wynik: number) => String(parseFloat(wynik.toFixed(10)));

  const wpiszCyfre = (cyfra: string) => {
    if (nowaLiczba || wyswietlacz === '0') {
      setWyswietlacz(cyfra);
      setNowaLiczba(false);
      return;
    }
    setWyswietlacz(wyswietlacz + cyfra);
  };

  const wpiszKropke = () => {
    if (nowaLiczba) {
      setWyswietlacz('0.');
      setNowaLiczba(false);
      return;
    }
    if (wyswietlacz.includes('.')) {
      return;
    }
    setWyswietlacz(wyswietlacz + '.');
  };

  const wybierzDzialanie = (znak: string) => {
    const liczba = parseFloat(wyswietlacz);
    if (isNaN(liczba)) {
      return;
    }
    if (poprzednia !== null && dzialanie !== null && !nowaLiczba) {
      const wynik = policz(poprzednia, liczba, dzialanie);
      if (wynik === null) {
        pokazBlad();
        return;
      }
      setWyswietlacz(wynikNaTekst(wynik));
      setPoprzednia(wynik);
    } else {
      setPoprzednia(liczba);
    }
    setDzialanie(znak);
    setNowaLiczba(true);
  };

  const oblicz = () => {
    const liczba = parseFloat(wyswietlacz);
    if (poprzednia === null || dzialanie === null || isNaN(liczba)) {
      return;
    }
    const wynik = policz(poprzednia, liczba, dzialanie);
    if (wynik === null) {
      pokazBlad();
      return;
    }
    setWyswietlacz(wynikNaTekst(wynik));
    setPoprzednia(null);
    setDzialanie(null);
    setNowaLiczba(true);
  };

  const wyczysc = () => {
    setWyswietlacz('0');
    setPoprzednia(null);
    setDzialanie(null);
    setNowaLiczba(false);
  };

  const przycisk = (etykieta: string, akcja: () => void) => (
    <IonCol size="3" key={etykieta}>
      <IonButton onClick={akcja}>{etykieta}</IonButton>
    </IonCol>
  );

  return (
    <IonCard>
      <IonCardContent>
        <h1>{wyswietlacz}</h1>
        <IonGrid>
          <IonRow>
            {cyfry[0].map((c) => przycisk(c, () => wpiszCyfre(c)))}
            {przycisk('÷', () => wybierzDzialanie('÷'))}
          </IonRow>
          <IonRow>
            {cyfry[1].map((c) => przycisk(c, () => wpiszCyfre(c)))}
            {przycisk('×', () => wybierzDzialanie('×'))}
          </IonRow>
          <IonRow>
            {cyfry[2].map((c) => przycisk(c, () => wpiszCyfre(c)))}
            {przycisk('−', () => wybierzDzialanie('−'))}
          </IonRow>
          <IonRow>
            {przycisk('C', wyczysc)}
            {przycisk('0', () => wpiszCyfre('0'))}
            {przycisk('.', wpiszKropke)}
            {przycisk('+', () => wybierzDzialanie('+'))}
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton onClick={oblicz}>=</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default Kalkulator;
