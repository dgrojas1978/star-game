import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import Utils from '../utils'
import PlayNumber from '../playnumber'
import StarsDisplay from '../starsdisplay'
import PlayAgain from '../playagain'

const Game = (props) => {

  const [stars,setStars] = useState(Utils.random(1,9));
  const [avaiableNumbs,setAvaiableNums] = useState(Utils.range(1,9));
  const [candidateNumbs,setCandidateNumbs] = useState([]);
  const [secondsLeft,setSecondLefts] = useState(10);

  const candidatesAreWrong = Utils.sum(candidateNumbs) > stars;
  //const gameIsDone = avaiableNumbs.length === 0;
  const gameStatus = avaiableNumbs.length === 0 ? "won" :
  secondsLeft === 0 ? "lost" :
  "active";

  useEffect(() => {
    if(secondsLeft > 0 && avaiableNumbs.length > 0){
    const timerId =  setTimeout(() =>{
        setSecondLefts(secondsLeft - 1);
      },1000);

      return () => clearTimeout(timerId);
    }

  });

  const numberStatus = (number) => {

    if (!avaiableNumbs.includes(number)){
      return "used";
    }
    if (candidateNumbs.includes(number)){
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "avaiable";
  }

  const onNumberClick = (number, currentStatus) => {

    console.log(currentStatus);

    if(gameStatus !== "active" || currentStatus == "used"){

      return;
    }

    const newCandidateNums =
    currentStatus === "avaiable"
    ? candidateNumbs.concat(number)
    : candidateNumbs.filter(cn => cn !== number);
    //candidateNumbs.concat(number);

    if (Utils.sum(newCandidateNums) != stars){

      setCandidateNumbs(newCandidateNums);
    }else{

      const newAvaiableNums = avaiableNumbs.filter(
         n => !newCandidateNums.includes(n)
      );

      setStars(Utils.randomSumIn(newAvaiableNums,9));
      setAvaiableNums(newAvaiableNums);
      setCandidateNumbs([]);
    }

  }

  return (
    <div className="container">
      <div className="game">
         <div className="help">
           Pick 1 or more numbers that sum to the number of stars
         </div>
         <div className="body">
           <div className="left">
            { gameStatus !== "active" ? (
              <PlayAgain
              onClick={props.starNewGame} gameStatus={gameStatus} />
            ) : (
             <StarsDisplay count={stars} />
            )
            }

           </div>
           <div className="right">

           {  Utils.range(1,9).map(number =>

              <PlayNumber key={number}
              status = {numberStatus(number)}
              onClick = {onNumberClick}
              number= {number} />
            )}

           </div>
         </div>
         <div className="timer">Time Remaining: {secondsLeft}</div>
       </div>

        <style jsx>{`
          .game {
            max-width: 500px;
            margin: 0 auto;
          }
          .body {
            display: flex;
          }
          .help {
            color: #666;
            margin: 10px;
            text-align: center;
          }
          .left {
            text-align: center;
            width: 50%;
            border: thin solid #ddd;
            padding-top:20px;
          }

          .right {
            text-align: center;
            padding: 10px;
            width: 50%;
            border: thin solid #ddd;
          }
          .star {
            margin: 15px 15px;
          }

          .timer {
           	color: #666;
            margin-top: 3px;
            margin-left: 3px;
          }

          .game-done .message {
            font-size: 250%;
            font-weight: bold;
            margin: 15px;
          }
          `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          }

          * {
            box-sizing: border-box;
          }
          svg {
            margin:5px;
          }
          .container {

            margin: 100px auto;
          }
          .number {
            background-color: #eee;
            border: thin solid #ddd;
            width: 45px;
            height: 45px;
            margin: 10px;
            font-size: 25px;
          }
          .number:focus, .number:active {
            outline: none;
            border: thin solid #ddd;
          }
          .game-done .message {
          font-size: 250%;
          font-weight: bold;
          margin: 15px;
          }

          .button {
            background-color: #eee;
            border: thin solid #ddd;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 25px;
            cursor: pointer;
          }          

        `}</style>
      </div>
  );
};
export default Game;
