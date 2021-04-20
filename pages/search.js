import Head from 'next/head';
import Header from '../components/Header';
import { API_KEY, CONTEXT_KEY } from '../keys';
import { useRouter } from 'next/router';
import SearchResults from '../components/SearchResults';

function Search({results}) {
  const router = useRouter();
  console.log(results);
  return (
    <div>
      <Head>
        <title>{router.query.term} - Google Search</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      {/* Header */}
      <Header />
      
      {/* Search Results */}
      <SearchResults results={results} />
    </div>
  )
}

export default Search;

export async function getServerSideProps(context) {
  const useDummyData = false;
  

  const data = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}`)
  .then((response) => response.json())
  

  //After the SERVER has rendered, pass the results to the client
  return {
    props: {
      results: data,
    },
  };
}
