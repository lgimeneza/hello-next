import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import Head from 'next/head';
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <div>
  <Head>
    <title>This page has a title 🤔</title>
    <meta charSet='utf-8' />
    <meta name="description" content="That's it!" />
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
  </Head>
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({show}) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
    <style jsx>
       {`
          h1, a {
            font-family: "Arial";
          }

          ul {
            padding: 0;
          }
    
          li {
            list-style: none;
            margin: 5px 0;
          }
    
          a {
            text-decoration: none;
            color: blue;
          }
    
          a:hover {
            opacity: 0.6;
          }
      `}
    </style>
  </Layout>
  </div>
)

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Index