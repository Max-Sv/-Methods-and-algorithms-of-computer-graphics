# CLI image to rgba text file
CLI reates a text file containing the rgb color of each pixel in the specified image.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
node index.js <your options>
```

CLI tool should accept 4 options (short alias and full name):

1.  **-i, --input**: an input image file
2.  **-o, --output**: a output image file (./newIMG.png' by default)
3.  **-c, --create**: an input text file
4.  **-a, --action**: an output text file (./rgba.txt by default)
