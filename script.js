const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

// Passing the joke to speech api
const tellMe = async (joke) => {
  // VoiceRSS.speech({
  //   key: "7798042e83dc4b7692aa980ba7a3e227",
  //   src: joke,
  //   hl: "en-us",
  //   v: "Linda",
  //   r: 0,
  //   c: "mp3",
  //   f: "44khz_16bit_stereo",
  //   ssml: false
  // });
  try {
    await fetch('/.netlify/functions/voice', {
      method: 'POST',
      headers: {
        'Content-Type:': 'application/json'
      },
      body: JSON.stringify({
        joke: joke
      })
    });
  } catch (error) {
    console.log(error);
  }
};

// Get the joke!
const getJokes = async () => {
  let joke = '';
  try {
    const apiUrl = 'https://api.icndb.com/jokes/random';
    // const apiUrl =
    //   "https://sv443.net/jokeapi/v2/joke/Miscellaneous,Dark,Pun?blacklistFlags=religious,political,racist,sexist";
    const res = await fetch(apiUrl);
    const data = await res.json();
    // if (data.type === "twopart") {
    //   joke = `${data.setup}... ${data.delivery}`;
    // } else {
    //   joke = data.joke;
    // }
    joke = data.value.joke;
    console.log(joke);
    // Text-to-speech
    await tellMe(joke);
    // Disable button
    toggleButton();
  } catch (error) {
    console.log(error);
  }
};

// Eventlistener for button
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
