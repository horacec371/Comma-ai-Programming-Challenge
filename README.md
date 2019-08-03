# Comma ai Programming Challenge

[![N|Solid](https://i.ibb.co/QfBcjqD/commaaimap.jpg)](https://nodesource.com/products/nsolid)
My solution to the comma.ai Full-stack challenge set for applicants who are applying for the  position.The challenge is requesting the following

```sh
Below are trips from our dash cam users in the SF Bay Area,
each of which is a JSON file containing an array of coordinates and speed (m/s) sampled at once per second.
Build a performant web app containing an interactive map visualizing the distribution of speeds among these trips.
All trips should be simultaneously visible on the map.
```
```sh
https://drive.google.com/file/d/0B_8NptBsAi83ZW9HZlZ1Sy1YaUE/view     
```

```sh
JSON files requested to be visualised: 527
Combined JSON files size: 70.0 MB
Individual JSON files sizes varying from 8 KB to 1,877 KB
```

# Table of contents
1. [Getting Started](#Installation)
    1. [Prerequisites](#Prerequisites)
    2. [Installation](#Installation)
    3. [Start](#Start)
2. [Usage](#Usage)
3. [Developmental Process](#Developmental_Process)
     1. [Server architecture](#Server_architecture)
     2. [Difficulties/Learning curve](#Learningcurve)
3. [Built with](#Builtwith)



# 1.Getting Started
----
 These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
## Prerequisites
----
*   npm
```sh
npm install npm@latest -g
```

## Installation
-----
1.Clone the repository
```sh
git clone https://github.com/NickKarvounakis/Comma.ai-programming-challenge.git
```

2.Run npm install inside project root directory and server directory
```sh
npm install
cd server
npm install
```

## Start
----

0.Open api.json in the src/Components/ directory and put your google maps api key
```sh
    {
        "GOOGLE_API_KEY":"ENTER YOUR KEY HERE"
    }

```


### Production Build

1.Go into the root directory and run the following
```sh
npm run build
```
2.When the build ends go into the server directory and do the following
```sh
npm run prod
```

2.Explore
```sh
type localhost:3001 in your browser and you are ready to go
```

### Development Build


2.Run the following in the server directory
```sh
npm run dev
```

3.Run the following in the root directory
```sh
npm start
```

5.Explore
```sh
wait for React to compile,type localhost:3000 in your browser and you are ready
```
---------
# 2.Usage

### Instructions
once you start the server up and visit localhost:3000 you will be prompted with the loading screen down below

[![N|Solid](https://media.giphy.com/media/H6bOlkGSABub5n0ieo/giphy.gif)](https://nodesource.com/products/nsolid)

After loading has finished(3-4 seconds average loadtime although deeply depends on your machine) you will be greeted with a map full of Red Markers

[![N|Solid](https://i.ibb.co/QfBcjqD/commaaimap.jpg)](https://nodesource.com/products/nsolid)


Now don't be discouraged by the vast amount of them,remember there are a total of 527 trips  visualised concurrently on the map.
As metioned in the loading screen earlier every [![N|Solid](https://maps.google.com/mapfiles/ms/icons/red-dot.png)](https://nodesource.com/products/nsolid) marker symbolises the start of a trip and is fully interractive but we will
get to that later,first let's explain what the two boxes positioned on top-left side  of the map actually are

##### Dashboard

[![N|Solid](https://media.giphy.com/media/J47XJopFNwl1VxtCrB/giphy.gif)]
The dashboard is displaying every trip named after it's date and trip's start-time and is fully interactive.
 let's for example click on the trips numbered   ```231-247-266```
 [![N|Solid]( https://media.giphy.com/media/f6gjZ2fNfqaiK9m1sx/giphy.gif)]
 As we can see,the map fully zooms so that the ![N|Solid](https://maps.google.com/mapfiles/ms/icons/red-dot.png) is centered and not confused with any other markers that may be next to that one

##### Help

![N|Solid](https://i.ibb.co/NWJcCsL/commaaihelp.jpg)
Help section is just a modal that pops up reminding the user the basic instructions in case they missed them on the loading screen.
![N|Solid](https://maps.google.com/mapfiles/ms/icons/blue-dot.png) and ![N|Solid](https://maps.google.com/mapfiles/ms/icons/pink-dot.png) are markers that appear only after you've clicked on the red marker and started the simulation,but we will get to that in the next section comming right after.

## Trip simulation/Car speed sampling
Now coming to the main purpose and functionality of this app,the visualization of the distribution of speed among these trips.
Zoom in one trip so that it is clearly visible click the red marker and a trip simulation start's happening
![N|Solid](https://media.giphy.com/media/dWIMWfdG9ZOr48kWVt/giphy.gif)
we can now see a "car" icon moving through the route and a window that pops-up when we first click it

![N|Solid](https://i.ibb.co/zHWMdjV/simulation3.jpg)
The above info window displays useful information about the car at that specific timeframe
but it also displays 3 buttons
the first one labeled(m/s) is pretty explanatory. It just converts the current speed to m/s
the second one labeled Start Simulation makes the other 2 markers appear as seen down bellow

![N|Solid](https://media.giphy.com/media/LkloAw3dieV3SLtkQF/giphy.gif)
every marker is sampled at a one second difference from the one previous one,displaying the same information like the infobox in  the first marker.This way we can see the speed of the car and how much it has increased-decreased every second

![N|Solid](https://media.giphy.com/media/LMibNTnMJxP4XC1Tx3/giphy.gif)
The ![N|Solid](https://maps.google.com/mapfiles/ms/icons/pink-dot.png)  displays the end of the trip and is also clickable
![N|Solid](https://i.ibb.co/bWQ0jFj/pink-marker.jpg)

### Complete Log
The Complete Log button pops-up a modal containing  all of the available information about the trip with a simple pagination system implemented displaying up to 500 coordinates per page.
```a single trip may contain up to 6000 coordinates,so implementing a pages function was the only way to keep the window clean,readable and performant   ```
![N|Solid](https://media.giphy.com/media/kC3F7GOciYGk7tPl7u/giphy.gif)

----------------------

# 3.Developmental Process
--------------------------
## Server architecture

Comming soon.

-------------------
#  Built With
## Backend
* [Node.js](https://nodejs.org/en/) + [Express.js](https://expressjs.com)
## Frontend
 * [React](https://reactjs.org/docs/getting-started.html)
