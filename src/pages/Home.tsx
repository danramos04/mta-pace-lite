import { IonButton, IonContent, IonDatetime, IonHeader, IonItem, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import './Home.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser';

const Home: React.FC = () => {
  const [showDatetimePicker, setShowDatetimePicker] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<string | null>(null);
  const [dayOfWeek, setDayOfWeek] = useState<string | null>(null); // State for the day of the week
  const today = new Date().toISOString().split('T')[0];

  const [fromStation, setFromStation] = useState<string | null>(null);
  const [toStation, setToStation] = useState<string | null>(null);

  const [browserInstance, setBrowserInstance] = useState<any>(null);

  const openMTAInfo = () => {
    // Create the in-app browser instance and store it in the state
    const browser = InAppBrowser.create('https://new.mta.info/', '_blank', {
      location: 'yes', // Show location bar
      toolbar: 'yes',  // Show toolbar
    });

    setBrowserInstance(browser); // Save the browser instance in state
  };

  const closeMTAInfo = () => {
    if (browserInstance) {
      browserInstance.close(); // Close the browser
      setBrowserInstance(null); // Reset the state after closing
    }
  };

  //handles station changes
  const handleFromChange = (value: string) => {
    setFromStation(value);
    if (value !== "pleasantville" && toStation !== "pleasantville") {
      setToStation("pleasantville");
    }
  };
  const handleToChange = (value: string) => {
    setToStation(value);
    if (value !== "pleasantville" && fromStation !== "pleasantville") {
      setFromStation("pleasantville");
    }
  };

  const history = useHistory();

  const formatDateTime = (dateTimeString: string | null) => {
    if (!dateTimeString) return 'Not Available';

    const date = new Date(dateTimeString);

    // Check if it's a valid date
    if (isNaN(date.getTime())) return 'Invalid Date';

    // Format as "hh:mm AM/PM on Month Day, Year"
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  
  //Handles all the data from the home page
  const handlePlanTrip = () => {
    const tripData = {
      fromStation,
      toStation,
      selectedDateTime,
      dayOfWeek
    };
    history.push({
      pathname: '/results',
      state: tripData,
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div>
            <img id="logo" src="MTA pace logo.png"></img>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1 id="tripplanner">Trip Planner
        </h1>
        <div>
        <IonList>
          <IonItem>
            <IonSelect value={fromStation}
                onIonChange={(e) => handleFromChange(e.detail.value)} label="From:" placeholder="Station">
              <IonSelectOption value="pleasantville">Pleasantville</IonSelectOption>
              <IonSelectOption value="grand-central">Grand Central</IonSelectOption>
              <IonSelectOption value="southeast">Southeast</IonSelectOption>
              <IonSelectOption value="brewster">Brewster</IonSelectOption>
              <IonSelectOption value="croton falls">Croton Falls</IonSelectOption>
              <IonSelectOption value="purdys">Purdys</IonSelectOption>
              <IonSelectOption value="goldens-bridge">Golden's Bridge</IonSelectOption>
              <IonSelectOption value="katonah">Katonah</IonSelectOption>
              <IonSelectOption value="bedford-hills">Bedford Hills</IonSelectOption>
              <IonSelectOption value="mt-kisco">Mt. Kisco</IonSelectOption>
              <IonSelectOption value="chappaqua">Chappaqua</IonSelectOption>
              <IonSelectOption value="hawthorne">Hawthorne</IonSelectOption>
              <IonSelectOption value="mt-pleasant">Mt. Pleasant</IonSelectOption>
              <IonSelectOption value="valhalla">Valhalla</IonSelectOption>
              <IonSelectOption value="north-white">North White Plains</IonSelectOption>
              <IonSelectOption value="white-plains">White Plains</IonSelectOption>
              <IonSelectOption value="harlem-125">Harlem 125th Street</IonSelectOption>
            </IonSelect>
          </IonItem>
          </IonList>
          <IonList>
          <IonItem>
            <IonSelect label="To:" placeholder="Station" value={toStation}
                onIonChange={(e) => handleToChange(e.detail.value)}>
            <IonSelectOption value="pleasantville">Pleasantville</IonSelectOption>
              <IonSelectOption value="grand-central">Grand Central</IonSelectOption>
              <IonSelectOption value="southeast">Southeast</IonSelectOption>
              <IonSelectOption value="brewster">Brewster</IonSelectOption>
              <IonSelectOption value="croton-falls">Croton Falls</IonSelectOption>
              <IonSelectOption value="purdys">Purdys</IonSelectOption>
              <IonSelectOption value="goldens-bridge">Golden's Bridge</IonSelectOption>
              <IonSelectOption value="katonah">Katonah</IonSelectOption>
              <IonSelectOption value="bedford-hills">Bedford Hills</IonSelectOption>
              <IonSelectOption value="mt-kisco">Mt. Kisco</IonSelectOption>
              <IonSelectOption value="chappaqua">Chappaqua</IonSelectOption>
              <IonSelectOption value="hawthorne">Hawthorne</IonSelectOption>
              <IonSelectOption value="mt-pleasant">Mt. Pleasant</IonSelectOption>
              <IonSelectOption value="valhalla">Valhalla</IonSelectOption>
              <IonSelectOption value="north-white">North White Plains</IonSelectOption>
              <IonSelectOption value="white-plains">White Plains</IonSelectOption>
              <IonSelectOption value="harlem-125">Harlem 125th Street</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonSelect
              value={dayOfWeek}
              onIonChange={(e) => setDayOfWeek(e.detail.value)}
              label="Day of the Week:"
              placeholder="Select Day"
            >
              <IonSelectOption value="monday">Monday</IonSelectOption>
              <IonSelectOption value="tuesday">Tuesday</IonSelectOption>
              <IonSelectOption value="wednesday">Wednesday</IonSelectOption>
              <IonSelectOption value="thursday">Thursday</IonSelectOption>
              <IonSelectOption value="friday">Friday</IonSelectOption>
              <IonSelectOption value="saturday">Saturday</IonSelectOption>
              <IonSelectOption value="sunday">Sunday</IonSelectOption>
            </IonSelect>
          </IonItem>

            <IonItem onClick={() => setShowDatetimePicker(!showDatetimePicker)}>
                Select Arrival Time:
              <div id="time-set">
              {formatDateTime(selectedDateTime ? new Date(selectedDateTime).toLocaleString() : "Not Selected")}
              </div>
            </IonItem>
            </IonList>
            <IonButton id="go-button" onClick={handlePlanTrip}>PLAN TRIP</IonButton>
          {showDatetimePicker && (
            <div style={{ marginTop: "1em" }}>
            <IonDatetime
              presentation="time"
              min={today}
              value={selectedDateTime || undefined}
              onIonChange={(e) => {
                const value = e.detail.value;
                setSelectedDateTime(typeof value === "string" ? value : value?.[0] || null);
              }}
            />
          </div>
          )}
        </div>

        <IonButton expand="full" onClick={openMTAInfo}>
          Open MTA Website
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
