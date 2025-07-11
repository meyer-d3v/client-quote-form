import React, { useState } from 'react'
import logo from './assets/logo_nobg.png'
import './App.css'
import { LoaderCircle } from 'lucide-react'
import { db } from './firebase'
import { addDoc, collection } from 'firebase/firestore'


function App() {
  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [preferredDate, setPreferredDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const submitBooking = async (e) => {

    e.preventDefault();

    setLoading(true);

    console.log("Button click");

    //await new Promise(resolve => setTimeout(resolve, 5000));

    console.log("Button clicked");

    try{

      const newBooking = await addDoc(collection(db, "quotes"), {
          'name': fullname.trim(),
          'phone': number.trim(),
          'email': email.trim(),
          'service': service.trim(),
          'location': location.trim(),
          'preferredDate': preferredDate.trim(),
          'notes': notes.trim(),
          'status': "Pending",
          'createdAt': new Date().toLocaleDateString(),
      });

  

      
      setFullname("");
      setNumber("");
      setEmail("");
      setService("");
      setLocation("");
      setPreferredDate("");
      setNotes("");


    } catch (error) {

      console.log("Error occured: " + error);

    } finally {

      setLoading(false);


    }

  };

  return (
    <div className='mainContainer'>

      <section className='informationContainer'>

        <img src={logo} className='logo' alt='Company Logo'/>

        <div className='title'><h1>Booking Manager</h1></div>
        <div className='subtitle'><h3>Simplify Your Bookings</h3></div>
        <div className='slogan'><h5>Track requests. Manage bookings. Stay organized.</h5></div>

      </section>

      <section className='formContainer'>

        <div className='info'>Book a quote</div>

        <form className='form'>

          <label htmlFor='fullname' className='labels'>Fullname *</label>
          <input id='fullname' type='text' className='inputs' required onChange={e => setFullname(e.target.value)} value={fullname}/>

          <label htmlFor='number' className='labels'>Phone Number</label>
          <input id='number' type='text' className='inputs' required onChange={e => setNumber(e.target.value)} value={number}/>

          <label htmlFor='email' className='labels'>Email *</label>
          <input id='email' type='email' className='inputs' required onChange={e => setEmail(e.target.value)} value={email}/>

          <label htmlFor='service' className='labels'>Service *</label>
          <input id='service' type='text' className='inputs' required onChange={e => setService(e.target.value)} value={service}/>

          <label htmlFor='location' className='labels'>Location *</label>
          <input id='location' type='text' className='inputs' required onChange={e => setLocation(e.target.value)} value={location}/>

          <label htmlFor='preferredDate' className='labels'>Preferred Date *</label>
          <input id='preferredDate' type='date' className='inputs' required onChange={e => setPreferredDate(e.target.value)} value={preferredDate}/>

          <label htmlFor='notes' className='labels'>Notes</label>
          <input id='notes' type='text' className='inputs' required onChange={e => setNotes(e.target.value)} value={notes}/>

          <button type='submit' className='submitButton' onClick={submitBooking}>
            {loading ?
            (<LoaderCircle className='loading' size={24}/>)
            :
            (<div>Submit</div>)
            }
          </button>

        </form>

      </section>

    </div>
  )
}

export default App
