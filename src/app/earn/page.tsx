"use client"
import Navigation from '@/components/NavBar/Navigation'
import React, { useEffect, useState } from 'react'
import "./style.css"
import { Button } from '@telegram-apps/telegram-ui'
import { gsap, Back, Bounce } from "gsap"

const Page = () => {
  const value = 5115

  const animateBoxes = () => {
    const tl = gsap.timeline();
    const fillRelative = "hsl(+=360%, +=0%, +=0%)";
    const time = 3;

    // Ensure the boxes are visible before animating
    gsap.set("#box1, #box2, #box3", { autoAlpha: 1 });

    tl.add('start');

    // Box 1 animations
    tl.to('#box1', {
      duration: time,
      rotation: '85',
      transformOrigin: "center center",
      ease: "none"
    }, 'start');

    // tl.from('#box1', {
    //   duration: time,
    //   y: '-200px',
    //   ease: Bounce.easeOut
    // }, 'start');

    // tl.add('first');

    // Box 2 animations
    tl.to('#box2', {
      duration: time,
      rotation: '-80',
      transformOrigin: "center center",
      ease: "none"
    }, 'first');

    // tl.from('#box2', {
    //   duration: time,
    //   y: '-200px',
    //   ease: Bounce.easeOut
    // }, 'first');

    // tl.add('second');

    // // Box 3 animations
    tl.to('#box3', {
      duration: 0.5,
      rotation: '-87',
      transformOrigin: "center center",
      ease: "none"
    }, 'second');

    // tl.from('#box3', {
    //   duration: 0.5,
    //   y: '-200px',
    //   ease: Back.easeOut.config(1)
    // }, 'second');

    // tl.add('last');

    // // Small yoyo animations for boxes 1 and 2
    tl.to('#box1', {
      duration: 0.1,
      y: '1px',
      yoyo: true,
      repeat: 1
    }, 'last-=0.25');

    tl.to('#box2', {
      duration: 0.1,
      y: '1px',
      yoyo: true,
      repeat: 1
    }, 'last-=0.25');

    // tl.add('color');

    // // Color animation for all boxes
    // tl.to('.box', {
    //   duration: 20,
    //   fill: fillRelative,
    //   repeat: -1
    // }, 'color');
  };

  useEffect(() => {
    // Initial animation
    animateBoxes();

    // Reanimate every 10 seconds
    const interval = setInterval(() => {
      animateBoxes();
    }, 10000);

    // Cleanup interval on component unmount
    // return () => clearInterval(interval);
  }, []);

  return (
    <div className='contentFrame'>
      <svg id="cart" stroke="orange" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84.68 80.75">
        <title>mine CSTZ</title>
        <rect className="box" id="box1" x="28" y="22" width="24" height="24" fill="#99cc33" stroke="white" strokeWidth="2"/>
        <rect className="box" id="box2" x="50" y="22" width="22" height="22" fill="#3399cc" stroke="white" strokeWidth="2"/>
        <rect className="box" id="box3" x="40" y="8" width="18" height="18" fill="#cc3399" stroke="white" strokeWidth="2"/>
        <path d="M95.34,94,31.42,89.36,29,75.25H10.66v4h15L35.5,137a9.82,9.82,0,1,0,11.35,3.36h29.4a9.8,9.8,0,1,0,7.89-4H39.44l-1.5-8.73H86.11ZM44.77,146.16a5.81,5.81,0,1,1-5.8-5.82h0A5.82,5.82,0,0,1,44.77,146.16Zm45.17,0a5.81,5.81,0,1,1-5.81-5.81h0A5.82,5.82,0,0,1,89.94,146.16ZM37.26,123.61,32.12,93.43l58.07,4.18-7.13,26Z" transform="translate(-10.66 -75.25)"/>
      </svg>
      <h1>{value.toLocaleString()}</h1>

      <Button color='black'>Start Farming</Button>

      <Navigation/>
    </div>
  )
}

export default Page
