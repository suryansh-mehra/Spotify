# Spotify Clone

A Spotify web player clone built using HTML, CSS and JavaScript. It loads albums and songs from local folders and plays them with a working player bar, seek bar and volume control. The layout is responsive and works on desktop and mobile.

## Features

* Spotify-style dark UI with sidebar library and album cards
* Albums loaded dynamically from the `songs` folder
* Play, pause, next and previous controls
* Seek bar and live song duration
* Volume slider with mute button
* Spacebar to play or pause
* Responsive design with hamburger menu on smaller screens

## Tech Stack

* HTML5
* CSS3
* JavaScript (Vanilla)

## Folder Structure

```
Spotify/
│
├── index.html
├── favicon.ico
├── Icon.jpg
├── css/
│   ├── style.css
│   └── utility.css
├── js/
│   └── script.js
├── img/
└── songs/
    └── Jaana/
        ├── cover.jpg
        ├── info.json
        └── song.mp3
```

## Installation

Clone the repository

```
git clone https://github.com/suryansh-mehra/Spotify.git
```

Go to project directory

```
cd Spotify
```

Open `index.html` with the VS Code Live Server extension (runs on `http://127.0.0.1:5500`).

## Preview

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/595b2c92-7ffa-44e2-91eb-f5a7a7be8bb4" />


## Concepts Used

* Flexbox for layout
* CSS variables and media queries for responsiveness
* Fetch API to load albums and songs
* DOM manipulation
* HTML5 Audio API

## Author

Suryansh Mehra
