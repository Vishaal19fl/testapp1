import React, { useRef } from "react";
import { useEffect, useState } from "react";
import "./Home.scss";

import { Link, useLocation } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { LogisticDetails } from "../logisticDetails/LogisticDetails";
import Marquee from "react-fast-marquee";


function Home() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef(0);
  const maxRef = useRef(10000);

  const { search } = useLocation();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const textItems = [
    "Innovation", "Technology", "Creativity", "Future", "Design", "Efficiency", "Performance", "Speed", "Collaboration", "Solutions"
  ];

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data);



  return (
    <div className="home">

    <LogisticDetails /> 
    
    <div className="marquee-container">
      <Marquee className="marquee black-bg" speed={40} direction="left" autoFill>
        {textItems.map((text, index) => (
          <div key={index} className="marquee-item">{text}</div>
        ))}
      </Marquee>
      <Marquee className="marquee orange-bg" speed={30} direction="right" autoFill>
        {textItems.map((text, index) => (
          <div key={index} className="marquee-item">{text}</div>
        ))}
      </Marquee>
    </div>
  
   

  <div className="features">
  <div className="container">
    <div className="item">
      <h1>Join Us in Revolutionizing Learning with NEXUS</h1>
      <div className="title">
        Collaborative Learning
      </div>
      <p>
        NEXUS fosters collaboration among students by providing community forums, study groups, and one-on-one mentoring, helping you learn and grow together.
      </p>
      <div className="title">
        Skill Development
      </div>
      <p>
        Our platform empowers students to upskill by offering personalized learning paths, skill gap analysis, and access to workshops and events tailored to your goals.
      </p>
      <div className="title">
        Gamified Motivation
      </div>
      <p>
        NEXUS keeps you motivated with a gamified system that rewards participation, achievements, and mentorship, making learning fun and engaging.
      </p>
      <button className="btn1">Join the NEXUS Community</button>
    </div>
    <div className="item">
      <video src="/img/bgvidd2.mp4" autoPlay muted loop playsInline />
    </div>
  </div>
</div>
  



     

     
  <div className="features dark">
    <div className="container">
      <div className="item">
        <h1>Enhance Disaster Response with <strong>Revive.</strong></h1>
        <img src="./img/revivead.png" alt="" />
      </div>
      <div className="item">
        <h1>
          Revive: Empowering Communities, Connecting Responders, Saving Lives
        </h1>
        <p>
          Ready to revolutionize disaster relief efforts? Discover LifeLine, where we enhance communication and resource coordination during critical times.
        </p>
        <div className="title">
          <img src="./img/check.png" alt="" />
          Deploy resilient LoRa mesh networks for reliable communication
        </div>
        <div className="title">
          <img src="./img/check.png" alt="" />
          Use our mobile app to send and receive emergency assistance requests
        </div>
        <div className="title">
          <img src="./img/check.png" alt="" />
          Coordinate effectively with real-time data and AI-powered optimization
        </div>
        <div className="title">
          <img src="./img/check.png" alt="" />
          Manage resources and donations seamlessly through our platform
        </div>
        <Link className="link" to="/product"><button 
        
        onclick="window.location.href='/product'">
        Buy Now
      </button></Link>
      </div>
     
    </div>
  </div>


    
  
      
      
    </div>
  );
}

export default Home;
