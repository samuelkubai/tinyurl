import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const RETRIEVE_URL = `${process.env.SOURCE}/api/retrieve`;

const RedirectPage = () => {
  const router = useRouter();
  const [routeNotMatched, setRouteNotMatched] = useState(false);

  useEffect(() => {
    const { code } = router.query;

    if (code) {
      fetch(`${RETRIEVE_URL}?code=${code}`)
        .then(response => {
          if (response.ok) return response.json();

          throw new Error("Code does not match any record");
        })
        .then(record => {
          window.location.replace(record.destination)
        })
        .catch(error => {
          setRouteNotMatched(true)
        })
    }
  })

  return (
    <div className="container" >
      {
        routeNotMatched
        && (
          <div className="not-found-message">
            The route cannot be matched
          </div>
        )
      }
    </div>
  );
}

export default RedirectPage;
