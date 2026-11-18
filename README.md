# Centoid Finder
This app lets you find the largest centroid using a combination of color and threshold fields. 

# How to setup
This program uses two programs seperate programs that utilize a backend and frontend with a framework called ffmpeg.

## FFmpeg download and setup (Mac and Linux)
- Visit the following website `https://ffmpeg.org/download.html`
- On the FFmpeg site, download the latest stable build for Mac or Linux
- Export zip to your preferred path

## FFmpeg download and setup (Windows)
- Visit the following website `https://ffmpeg.org/download.html`
- On the FFmpeg site, select gyan.dev
- Download the `ffmpeg-git-essentials.7z` version 
- Export zip to your preferred path

## Backend setup (centroid-finder)
- In the root directory, create a `.env` file
- In the .env file, add:
  - `FFMPEG_PATH=ffmpeg.exe`
  - `JAVA_PATH=java`
- For `FFMPEG_PATH`, make sure to set the path after = to your specific ffmpeg.exe path
- In a new terminal, run `cd core/server`
- Then, run `npm i` to initialize the project

## Frontend setup (centroidFinderFrontend)
- In a new terminal, run `npm i` to initialize the project

## How to run the program after setup
- In the frontend, run `npm run dev` in a new terminal
- In the backend, run `cd core/server`, then `npm run dev` in a new terminal
- In your preferred browser, copy and paste the following link `http://localhost:5173/`
- To add your own videos, navigate to the backend in centroid-finder/core/processor/sampleInput
- Drag your videos into that folder and they should show up in the opened webapp
- Once the video is added to sampleInput, you can select the video in the webapp

## Navigating the webapp
- Select `Click to preview video` to select a specific video
- Once selected, you will see the orginal video, and the binarized image
- Use the color picker to select the object you want to track
- If the object is not on screen, you can move the Time slider until it appears in the thumbnail
- Once you select your object with the color picker, move the threshold slider until the object is the main subject highlighted in white
- A red dot will be on the white subject to represent the largest centroid
- Once you have set the color and threshold, select `Process Video`
- Processing a video will allow you to download the csv file
- The csv file is stored in the backend by default, centroid-finder/core/processor/sampleOutput/jobs/JOB_ID