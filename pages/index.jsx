import { useState } from "react";

const SHORTEN_URL = `${process.env.SOURCE}/api/shorten`;

const IndexPage = () => {
  const [url, setUrl] = useState("")
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${SHORTEN_URL}?url=${url}`)
      .then(response => response.json())
      .then(record => {
        setShortenedUrl(`${process.env.SOURCE}/${record.code}`)
      })
      .catch(error => {
        console.log("Error getting the shortened url code:")
        console.log(error)
      })
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={event => setUrl(event.target.value)} />
        <button type="submit">Shorten</button>
      </form>

      {
        shortenedUrl
        && (
          <div className="results__container">
            <a className="results__link" target="_blank" href={shortenedUrl}>{shortenedUrl}</a>
          </div>
        )
      }
    </div>
  );
};

export default IndexPage;
