import React from 'react'

const Contacts = () => {
  return (
    <div>
       <div className="map-container">
      <div className='row'>
        <div className='col-md-6'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.862921055295!2d76.9419737406419!3d8.50270831462417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbbeae2acd9b%3A0x4d6c81bc718417e2!2sPalayam%2C%20Thiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1714208081087!5m2!1sen!2sin" style={{'width':'600px', 'height':'450px', 'border':'0', 'loading':'lazy'}}></iframe>
        </div>
        <div className='col-md-6'>
          <h4>CONTACT FORM</h4>
          <form/>
    <label for="name">Name:</label><br/>
    <input type="text" id="name" name="name" required/><br/>
    <label for="email">Email:</label><br/>
    <input type="email" id="email" name="email" required/><br/>
    <label for="phone">Phone:</label><br/>
    <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/><br/>

    <label for="help">Phone:</label><br/>
    <input type="text" id="inquiry" name="inquiry"  required/><br/>
    <br/>
    <input type="submit" value="Submit"/>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Contacts
