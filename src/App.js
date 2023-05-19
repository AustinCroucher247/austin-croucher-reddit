import Header from '../src/components/header/header'

import './App.scss'
import Card from './components/card/card';
import React, { useState } from 'react';

function App() {
  const [selectedSubreddit, setSelectedSubreddit] = useState(null);

  const handleSubredditSelect = subreddit => {
    setSelectedSubreddit(subreddit);
  };

  return (
    <div>
      <Header onSubredditSelect={handleSubredditSelect} />
      <Card selectedSubreddit={selectedSubreddit} />
    </div>
  );
}

export default App;