import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import "./Sponsors.css"
import nike from "../assets/nike.jpg"
import Ubereats from "../assets/Ubereats.png";
import amazon from "../assets/amazon.png";
import google from "../assets/Google.png"; 
import starbucks from "../assets/starbucks.png";
import netflix from "../assets/netflix.png";
import apple from  "../assets/apple.png";
import mircosoft from "../assets/mircosoft.png";
import adidas from "../assets/adidas.png";
import cocacola from '../assets/cocacola.png';
import target from "../assets/target.png";
import samsung from "../assets/samsung.png";
import groupon from "../assets/groupon.png";
import walmart from "../assets/walmart.png";
import mcdonald from "../assets/mcdonald.png";
import bestbuy from "../assets/bestbuy.png";
import burgerking from "../assets/burgerking.png";
import uber from "../assets/uber.png";
import temu from "../assets/temu.png";
import crest from "../assets/crest.png";

const Sponsors = ({ user, token }) => {
  const { userprofile_id } = useParams();
  const [goalsCompleted, setGoalsCompleted] = useState([]);
  const [discountsEarned, setDiscountsEarned] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const trueGoallength=goalsCompleted
  .filter((goal) => goal.userprofile_id === user.userprofile_id)

  const sponsors = [
    { company: 'Nike',image: `${nike}`, category: 'Shopping', discount: '10% off membership' },
    { company: 'Amazon', image: `${amazon}`, category: 'Shopping', discount: 'Free Prime membership' },
    { company: 'Google',image: `${google}`, category: 'Technology', discount: '20% off Google products' },
    { company: 'Starbucks',image: `${starbucks}`, category: 'Food & Beverage', discount: 'Free coffee for a month' },
    { company: 'Netflix',image: `${netflix}`, category: 'Entertainment', discount: '1 month free subscription' },
    { company: 'Apple',image: `${apple}`, category: 'Technology', discount: 'Special pricing on Apple products' },
    
    { company: 'Microsoft',image: `${mircosoft}`, category: 'Technology', discount: '10% off Microsoft products' },
    { company: 'Adidas',image: `${adidas}`, category: 'Shopping', discount: '15% off membership' },
    { company: 'Coca-Cola',image: `${cocacola}`, category: 'Food & Beverage', discount: 'Free soda for a month' },
    { company: 'Samsung',image: `${samsung}`, category: 'Technology', discount: '20% off Samsung products' },
    { company: 'Groupon',image: `${groupon}`, category: 'miscellaneous', discount: '30% off groupon items' },
    { company: 'Target',image: `${target}`, category: 'Shopping', discount: 'Free gift card' },
    { company: 'Walmart',image:`${walmart}`, category: 'Shopping', discount: 'Discounts on select items' },
    { company: 'McDonalds',image:`${mcdonald}`, category: 'Food & Beverage', discount: 'Free fries with purchase' },
    { company: 'Burger King',image:`${burgerking}`, category: 'Food & Beverage', discount: 'Buy one, get one free' },
    { company: 'BestBuy',image:`${bestbuy}`, category: 'Technology', discount: '15% percent of BestBuy products' },
    { company: 'UberEats', image: `${Ubereats}`, category: 'Food and Beverage', discount: '30% off Ubereats order' },
    { company: 'Uber',image: `${uber}`,category: 'Transportation', discount: 'Discounted rides' },
    { company: 'Temu',image: `${temu}`, category: 'Entertainment', discount: '50% off Temu items' },
    { company: 'Crest',image: `${crest}`,category: 'Hygenie', discount: '50% off Crest product' },
  ];

  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  useEffect(() => {
    fetchCompletedGoals(); // Fetch completed goals when the component mounts
  }, []);

  const fetchCompletedGoals = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/allgoals`, { headers });
      const completedGoals = response.data;
      setGoalsCompleted(completedGoals);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching completed goals:', error);
    }
  };

  const handleGoalCompletion = async () => {
    try {
      const goalId = Math.floor(Math.random() * 1000); // Generate a random goal ID
      if (!goalsCompleted.includes(goalId)) {
        // Perform the logic for completing the goal
        // ...
        const completedGoals = [...goalsCompleted, goalId];
        setGoalsCompleted(completedGoals);
        if (completedGoals.length > 10) {
          const discount = getDiscountFromSponsorCompany();
          setDiscountsEarned([...discountsEarned, discount]);
        }
      }
    } catch (error) {
      console.log('Error completing goal:', error);
    }
  };

  const getDiscountFromSponsorCompany = () => {
    const randomIndex = Math.floor(Math.random() * sponsors.length);
    return sponsors[randomIndex];
  };

  return (
    <div id="sponsor-container">

      {/* <h1>Goal Tracker</h1> */}
      {/* <button onClick={handleGoalCompletion}>Complete Goal</button> */}
      <h2 className='goalcompleted'>Goals Completed</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
        {goalsCompleted
                    .filter((goal) => goal.userprofile_id === user.userprofile_id)
                    .map((goal, goalIndex) => (
                      <p id="prizes"key={goalIndex}>💯% {goal.description}</p>
                    ))}
        </ul>
      )}

      {trueGoallength.length > 1 && (
        <>
        {/* <div className='discount'> */}
          <h2 className='discountsearned'>Discounts Earned</h2>
          <ul>
            <div className="honeycomb-container">
            {sponsors.map((sponsor, index) => (
              <li className="flashing-animation" key={index}>
                <div className='website-id'>
    <img id="sponsor-img"src={sponsor.image} alt={sponsor.company} />
<a className='websites' href= {`http://www.${sponsor.company}.com`}>{sponsor.company}</a>
                </div>
    <br></br>
    {/* <a href={`http://www.${sponsor.company}.com`}> */}
      {sponsor.company}: {sponsor.category} - {sponsor.discount}
    {/* </a> */}
  </li>
))}
            {/* {sponsors.map((discount, index) => (
              <li className="flashing-animation" key={index}>
              {discount.company}:{discount.image} {discount.category} - {discount.discount}
              
              </li>
            ))} */}

            </div>
          </ul >       
          {/* </div> */}
            </>
      )}
    </div>
  );
};

export default Sponsors;