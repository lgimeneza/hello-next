import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

const Post =  (props) => {
  const { show: { name, summary, image } } = props
  return (
    <Layout>
       <h1>{name}</h1>
       <p>{summary.replace(/<[/]?p>/g, '')}</p>
       <img src={image.medium}/>
       <style jsx>
        {`
            h1, p {
              font-family: "Arial";
            }
        `}
      </style>
    </Layout>
)}

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Post