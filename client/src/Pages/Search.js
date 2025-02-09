import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import SongList from '../Components/SongList/SongList';

export default function SearchResults() {
  const [status, setStatus] = useState('loading'); // loading | error | ok
  const [results, setResults] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  useEffect(() => {
    async function fetchResults() {
      setStatus('loading');

      const response = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        setStatus('error');
        return;
      }

      const data = await response.json();

      setStatus('ok');
      setResults(data.results);
    }

    if (query) {
      fetchResults();
    }
  }, [query]);

  return <>
    {
      status === 'loading' ?
        'Loading...'
      : status === 'error' ?
        'Error'
      : status === 'ok' ?
        <SongList list={results}/>
        //results.map((obj) => {
        //  return <div>{obj.title}</div>
        //})
      : `BUG: unhandled status '${status}'`
    }
  </>;
}
