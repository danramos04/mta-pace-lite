import { useLocation } from 'react-router-dom';
import {IonButton, IonContent, IonDatetime, IonHeader, IonItem, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import './Results.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

  
  const Results: React.FC = () => {
    const location = useLocation<{ fromStation: string; toStation: string; selectedDateTime: string | null; dayOfWeek: string | null}>();
    const { fromStation, toStation, selectedDateTime, dayOfWeek} = location.state || {};
  
    const history = useHistory();
    const [bestShuttle, setBestShuttle] = useState({ depart: '', arrive: '' });

    const shuttleData = {
      "memorial-plaza": {
        "depart-times": {
          "mon-fri": [
            "6:40", "7:00", "7:20", "7:40", "8:00", "8:20", "8:40", "9:00", "9:20", "9:40", "10:00", "10:20", "11:20", "11:40", "12:00", "12:20", "12:40", "13:00", "13:20", "13:40", "14:00", "14:20", "14:40", "15:00", "15:20", "16:00", "16:20", "16:40", "17:00", "17:20", "17:40", "18:10", "18:40", "19:10", "19:40", "20:10", "20:40", "21:10"
          ],
          "sat-sun": [
            "11:10", "11:40", "12:10", "12:40", "13:10", "13:40", "14:10", "14:40", "15:10", "15:40", "16:10", "16:40"
          ]
        },
        "arrival-length": {
          "morning-afternoon": 5,
          "evening": 18
        }
      }
    };

      useEffect(() => {
        if (shuttleData && dayOfWeek && selectedDateTime) {
          findBestShuttle();
        }
      }, [dayOfWeek, selectedDateTime]);
    
      const findBestShuttle = () => {
        if (!shuttleData || !dayOfWeek || !selectedDateTime) return;
      
        const parsedDate = new Date(selectedDateTime);
        const userTime = parsedDate.getHours() * 60 + parsedDate.getMinutes(); // Convert to minutes
        const isWeekend = ['sat', 'sun'].some((day) => dayOfWeek.toLowerCase().includes(day));
        const timesKey = isWeekend ? 'sat-sun' : 'mon-fri';
        const times = shuttleData['memorial-plaza']['depart-times'][timesKey];
      
        let closestTime = '';
        let closestArrival = '';
      
        for (const time of times) {
          const [hours, minutes] = time.split(':').map(Number); // Parse military time
          const shuttleTime = hours * 60 + minutes;
      
          if (shuttleTime >= userTime) {
            const departureDate = new Date();
            departureDate.setHours(hours, minutes, 0);
            closestTime = departureDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            });
      
            const arrivalLength = isWeekend
              ? shuttleData['memorial-plaza']['arrival-length']['evening'] // Use evening duration for weekends
              : shuttleTime >= 18 * 60 // Evening logic for weekdays
                ? shuttleData['memorial-plaza']['arrival-length']['evening']
                : shuttleData['memorial-plaza']['arrival-length']['morning-afternoon'];
      
            const arrivalDate = new Date();
            arrivalDate.setHours(0, shuttleTime + arrivalLength, 0, 0);
            closestArrival = arrivalDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            });
            break;
          }
        }
      
        setBestShuttle({ depart: closestTime || 'No shuttles available', arrive: closestArrival || 'N/A' });
      };
      
      

    const handleLogoClick = () => {
      history.push('/home');
    };

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

    function getShuttle(){
        let shuttleData = "public/data/pace-shuttle.json"
    axios.get(shuttleData).then(
      (response: any) => {
        console.log(response, response.data);
      }
    );
    }
    getShuttle();
  
    function getReadableStationName(value: any) {
      switch (value) {
        case "pleasantville":
          return "Pleasantville";
        case "grand-central":
          return "Grand Central";
        case "southeast":
          return "Southeast";
        case "brewster":
          return "Brewster";
        case "croton-falls":
          return "Croton Falls";
        case "purdys":
          return "Purdys";
        case "goldens-bridge":
          return "Golden's Bridge";
        case "katonah":
          return "Katonah";
        case "bedford-hills":
          return "Bedford Hills";
        case "mt-kisco":
          return "Mt. Kisco";
        case "chappaqua":
          return "Chappaqua";
        case "hawthorne":
          return "Hawthorne";
        case "mt-pleasant":
          return "Mt. Pleasant";
        case "valhalla":
          return "Valhalla";
        case "north-white":
          return "North White Plains";
        case "white-plains":
          return "White Plains";
        case "harlem-125":
          return "Harlem 125th Street";
      }
    }
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <div onClick={handleLogoClick}>
              <img id="logo" src="MTA pace logo.png" alt="Logo" />
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent forceOverscroll={false}>
          <h1 id="tripplanner">Your Trip</h1>
        <div>
          <img id="logoresults" src ="MTA_NYC_logo.svg.png"></img>
          <h2>Metro North Details</h2>
        </div>
        <div>
          <h1>───────────</h1>
          <p><strong>From:</strong> {getReadableStationName(fromStation)}</p>
          <p><strong>To:</strong> {getReadableStationName(toStation)}</p>
          <p><strong>Train Arrives:</strong> {formatDateTime(selectedDateTime)}</p>
          <div>
              <img id="logoresults" src ="setter_logo.webp"></img>
              <h2>Pace Shuttle Details</h2>
              <h1>───────────</h1>
          </div>
        </div>
          <p><strong>From:</strong> Memorial Plaza</p>
          <p><strong>To:</strong> Martin Circle</p>
          <p><strong>Shuttle Departs:</strong> {bestShuttle.depart}</p>
          <p><strong>Shuttle Arrives:</strong> {bestShuttle.arrive}</p>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Results;