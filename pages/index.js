import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import Game from '../src/components/game'

const StarMatch = () => {

  const [gameId,setGameId] = useState(1);

  return <Game key={gameId} starNewGame = {() => setGameId(gameId + 1)}/>;


}

export default StarMatch;
