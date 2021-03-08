import React, { useState }from 'react';
import '../style/AddResidenceStyle.css';



const AddResidence = () => {

  const [guests, setGuests] = useState(1);

  const incGuestHandler = () => {
      setGuests(guests + 1); 
  }

  const decGuestHanlder = () => {
    if (guests <= 1) {
      setGuests(1);
    } else {
      setGuests(guests-1);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
  }

  return (
    <div className="addResWrapper">
      <form onSubmit={submitHandler}>
      <h3>What type of recidense would you like to host?</h3>
      <select className="optionBar">
      <option class="optValue" value="" disabled="disabled" selected="selected">Choose</option>
        <option value="1">House</option>
        <option value="2">Apartment</option>
        <option value="3">Cabin</option>
        <option value="4">Tent</option>
        <option value="5">Mansion</option>
        <option value="6">Igloo</option>
      </select>
     
      
        <div className="guestDiv">
        <button className="incGuests" onClick={incGuestHandler}>＋</button>
        <span className="numberOfGuests">Guests: {guests}</span>
        <button className="decGuests" onClick={decGuestHanlder}>－</button>
        </div>

        <p className="advTitle">Advertisment title</p>
        <input className="inputTitle" type="text" placeholder="exmaple: 'Luxuary Cabin with jazuzzi'" />

      <div class="checkbox">
        <label>
            <input type="checkbox" /><i class="helper"></i>First-Aid Kit
        </label>
          <label>
            <input type="checkbox" /><i class="helper"></i>Shower
        </label>
          <label>
            <input type="checkbox" /><i class="helper"></i>Parking
        </label>
          <label>
            <input type="checkbox" /><i class="helper"></i>Stove
        </label>
          <label>
            <input type="checkbox" /><i class="helper"></i>Oven
        </label>
          <label>
            <input type="checkbox" /><i class="helper"></i>Microwave
        </label>
          <label>
            <input type="checkbox" /><i class="helper"></i>Tv
        </label>
          <label>
            <input type="checkbox" /><i class="helper"></i>Coffee maker
        </label>
          <label>
            <input type="checkbox" /><i class="helper"></i>WIFI
        </label>
          <label>
            <input type="checkbox" /><i class="helper"></i>Balcony
        </label>
          <label>
            <input type="checkbox" /><i class="helper"></i>Iron
        </label>
          <label>
            <input type="checkbox" /><i class="helper"></i>Pool
        </label>
          <label>
            <input type="checkbox" /><i class="helper"></i>Fridge
        </label>
          <label>
            <input type="checkbox" /><i class="helper"></i>Dishwasher
        </label>
        </div>
        
        <p>Country</p>
        <input className="inputTitle" type="text" placeholder="Country" />

        <p>City</p>
        <input className="inputTitle" type="text" placeholder="City" />

        <p>Adress</p>
        <input className="inputTitle" type="text" placeholder="Adress" />

         <p>Upload image-links</p> 
        <input className="inputTitle" type="text" placeholder="image 1" />

        <input className="inputTitle" type="text" placeholder="image 2" />

        <input className="inputTitle" type="text" placeholder="image 3" />

        <input className="inputTitle" type="text" placeholder="image 4" />

        <input className="inputTitle" type="text" placeholder="image 5" />
      </form>
    </div>
  )
}


export default AddResidence;