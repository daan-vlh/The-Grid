<img width="1488" height="767" alt="Preview of artwork" src="https://github.com/user-attachments/assets/abc0bc95-1e60-4164-aeb2-665d4aaa00a8" />


# The Grid
### To start up the app:
1. run npm install in the root directory ($ npm install)
2. run node on server.js ($ node server.js)
3. go to http://localhost:5000 (if the server won't start and you're working on a macOS, go to settings and disable AirPlay Receiver, as this seems to be running on port 5000 as well. ([Article](https://www.reddit.com/r/webdev/comments/qg8yt9/apple_took_over_port_5000_in_the_latest_macos/))

### Sources used
[Face API Github](https://github.com/justadudewhohacks/face-api.js)

[Minified version I used](https://github.com/robertbunch/face-api-js-starter)

[HTML Canvas DEEP DIVE](https://www.youtube.com/watch?v=uCH1ta5OUHw)

[Want To Learn Some AI With JavaScript? Let's Do Facial Recognition!](https://www.youtube.com/watch?v=NG5Vi8zrqMM&list=WL&index=5).


# Instructables

### What you need:
- Basic to intermediate Javascript and Node.js knowledge
- Some camera for camera input

### Step 1 — face api
We start this project by using the face API by justadudewhohacks ([github.com/justadudewhohacks](https://github.com/justadudewhohacks)).
To make things easier, we actually start of by using a simplified starter version ([https://github.com/robertbunch/face-api-js-starter](https://github.com/robertbunch/face-api-js-starter)).
Incase you want a more in depth tutorial — I recommend you follow this tutorial (Just like I did 😅) [Want To Learn Some AI With JavaScript? Let's Do Facial Recognition!](https://www.youtube.com/watch?v=NG5Vi8zrqMM&list=WL&index=5).
``` * Make sure to start your project with Node.js since we're going to pull information from the navigator object, this way you'll have a https connection (even for localHost). * ```

The core feature we use in the end from this project is the bounding box from the face-api. You can find this in using ```console.log(FaceAIData)```
<img width="595" height="189" alt="Screenshot 2025-08-12 at 18 15 41" src="https://github.com/user-attachments/assets/3496e5da-ba3c-4cc2-9daa-e9c373cd3e57" />

### Step 2 — artwork (with HTML Canvas)
The second most important step in this project is to create an artwork. You can pretty much create anything you'd like here, as long as it is controlable by (mouse)movement (which we switch to the face-api later on). I personally followed this tutorial [HTML Canvas DEEP DIVE](https://www.youtube.com/watch?v=uCH1ta5OUHw) untill around 32:06. But as I said — this is completely up to you.

### Step 3 — using the face detection to control the artwork
For this next, and already final step, we are going to merge the face detection with our canvas artwork. (Because of my personal Javascript knowledge level, I used ChatGPT to make this a little easier for myself.) 
In short, we pull the bounding box information and calculate the center of this bounding box (our face) to use as the cursor. Then replace this with the previous mousemove eventListener.

And that's it! Have fun!
