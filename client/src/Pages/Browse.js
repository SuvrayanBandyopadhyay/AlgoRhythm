import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import SongList from '../Components/SongList/SongList';

export default function Browse() {
  const [status, setStatus] = useState('loading'); // loading | error | ok
  const [results, setResults] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

    //Text for the trending section
    const Text=
    {
        fontFamily:"Arial",
        color: "black",
        
        marginLeft:"2vw",
        fontSize:"3vw",
        marginTop:"3vh",
        fontWeight:"100",
    }

  useEffect(() => {
    async function fetchResults() {
      setStatus('loading');

      const response = await fetch(`http://localhost:5000/browse`);
      if (!response.ok) {
        setStatus('error');
        return;
      }

      const data = await response.json();

      setStatus('ok');
      setResults(data.results);
    }

 
      fetchResults();
 
  }, []);

  
  return <>
    {
      status === 'loading' ?
        'Loading...'
      : status === 'error' ?
        'Error'
      : status === 'ok' ?
      <>
      <div style={Text}>Browse Your Favorite Tunes</div>
      
      <SongList list={results}/>
      </>
        //results.map((obj) => {
        //  return <div>{obj.title}</div>
        //})
      : `BUG: unhandled status '${status}'`
    }
  </>;
}
