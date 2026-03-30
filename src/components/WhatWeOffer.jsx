import { useEffect, useState } from "react";
import "./WhatWeOffer.css";

// Import your images
import img1 from "../assets/images/tata.jpeg";
import img2 from "../assets/images/vikram.jpeg";
import img3 from "../assets/images/waaree.jpeg";
import img4 from "../assets/images/solis.jpeg";
import img5 from "../assets/images/goodwe.jpeg";
import img6 from "../assets/images/adani.jpeg";
import img7 from "../assets/images/growatt.jpeg";
import img8 from "../assets/images/polycab.jpeg";


export default function WhatWeOffer() {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  const [current, setCurrent] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="offer">

      <div className="offer-container">

        {/* LEFT TEXT */}
        <div className="offer-text">

          <h2>What We Offer</h2>

          <p>
            We provide complete solar installation services for homes,
            commercial buildings, and industrial spaces. Our expertise
            ensures reliable performance, safety, and long-term savings.
            <br></br>
            We provide top class materials and workmanship to maximize your solar investment.
            <br></br>
            <br></br>


            <strong>MODULE TYPES:</strong>
            <ul>
                <li>✔ Renwsys</li>
                <li>✔ Waaree</li>
                <li>✔ Adani</li>
                <li>✔ Tata</li>
                <li>✔ Vikram</li>

                <br></br>
                <br></br>

            <strong>INVERTER [Convert] TYPES:</strong>
            <br></br>
            
            <ul>
                <li>✔ Polycab</li>
                <li>✔ Solis</li>
                <li>✔ Deye</li>
            </ul>
            <br></br>
            <br></br>
            <strong>WIRING TYPES:</strong>
            <br></br>
            <ul>
            <li>✔ 3kw to 6kw Polycab 6sq Mm Copper Wiring </li>

            <li>✔ 7kw to 15kw Polycab 6Sq Armoured Cable For Three Phase</li>

            </ul>

           
            <br></br>
            <br></br>
            <strong>FOR SOLAR SAFTEY: </strong>
            <ul>
                <li>✔ ACDB [ MCB BOX ] 
              DCDB [ MCB BOX] </li>

              <li>✔ Lighting arrester </li>
              <li>✔ Three Earthings For 
                <ul>
                    <li><em>1. For Modules</em></li>
                    <li><em>2. For Inverter</em></li>
                    <li><em>3. For Lighting arrester</em></li>
                </ul> </li>
             <li>✔ Hot dip galvanized Structure </li>
             <li>✔ Civil works under company scope </li>
             <li>✔ Net metering under company scope</li>
            </ul>

            

            

            

            

            









            </ul>
          </p>

  
        </div>

        {/* RIGHT SLIDER */}
        <div className="offer-slider">

          <img
            src={images[current]}
            alt="Solar services"
          />

        </div>

      </div>

    </section>
  );
}