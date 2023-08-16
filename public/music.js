document.addEventListener('DOMContentLoaded', () => {
  const audioPlayer = document.getElementById('audioPlayer');
  let currentSongIndex = 0;
  let songs = [];

  async function fetchSongs() {
    try {
      const response = await fetch('http://localhost:5000/getsongs');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Assuming data is an object with a property called "finaldata" containing the array of song objects
      const songsArray = data.data.finaldata;
      if (!Array.isArray(songsArray)) {
        console.error('Invalid response format: songs is not an array.');
        return [];
      }
      return songsArray;
    } catch (error) {
      console.error('Error fetching songs:', error);
      return []; // Return an empty array if there's an error
    }
  }

  async function updateSongList() {
    songs = await fetchSongs();
    if (songs.length === 0) {
      console.error('No songs found.');
      return;
    }
    playSong();
  }

  function playSong() {
    const songUrl = songs[currentSongIndex].song;
    audioPlayer.src = songUrl;
    console.log(songUrl)

    // Check if the media element is paused and if it requires user interaction to play
    if (audioPlayer.paused && audioPlayer.readyState >= 3) {
      // The play() method is called in response to a user interaction event
      audioPlayer.play();
    }
  }

  function pauseSong() {
    audioPlayer.pause();
  }

  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong();
  }

  function handleSongEnded() {
    // Automatically play the next song when the current song ends
    nextSong();
  }
  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong();
  }


  const playButton = document.querySelector('.btn-play');
  const pauseButton = document.querySelector('.btn-pause');
  const prevButton = document.querySelector('.btn-prev');
  const nextButton = document.querySelector('.btn-next');


  function addAudioPlayerEventListeners() {
    // Add a click event listener to the play button
    if (playButton) {
      playButton.addEventListener('click', () => {
        playSong();
      });
    }

    // Add a user interaction event listener (e.g., click) to play the audio
    audioPlayer.addEventListener('click', () => {
      playSong();
    });

    // Add an event listener to handle the end of the audio (song ended)
    audioPlayer.addEventListener('ended', handleSongEnded);
  }

  // Add event listeners to the pause and previous buttons
  if (pauseButton) {
    pauseButton.addEventListener('click', () => {
      pauseSong();
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      prevSong();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      nextSong();
    });
  }
  // ... Your pauseSong, nextSong, and prevSong functions ...

  updateSongList();

  addAudioPlayerEventListeners();
});