import React from "react";

const About = () => {
  let styles = { textAlign: "center" };
  return (
    <div>
      <h2 style={styles}>Hi, I am Rahul. </h2>
      <h2 style={styles}>A full stack web developer </h2>
      <h2>A little details about this project: </h2>
      <p>This project is built with React js, a beautiful and modern javascript library with lot's of cool features.</p>
      <p>This website provides current crypto rates and some crypto news articles.</p>
      <h2>Technical Details</h2>
      <p>
        I am fetching all the data from an outside API, thanks to <a href="https://rapidapi.com/hub">Rapidapi</a> . Then after getting all the data
        from the API i am using React to populate in the browser. for state management i am using react-redux library. and for async tasks like
        network request or fetching data from API i am using redux toolkit.
      </p>
      <p>
        For desing and icons i am using{" "}
        <a href="https://ant.design/" target="_blank" rel="noreferrer">
          antd
        </a>{" "}
        library.
      </p>
    </div>
  );
};

export default About;
