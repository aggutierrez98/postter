# Postter

## Nexjts project in which several of the features of [Twitter](https://twitter.com) are replicated

### Made with

React, NextJS, Typescript, Tailwind & Firebase

#### Made by: Agustin Gutierrez

## Features replicated

- Visual style replicated with some personal-taste changes
- Twitts and replies with the name of postwitts
- Image upload and emoji adding to postwitts message
- Hashtags in postwitts messages
- Retwitts with the name of reposts
- Like postwitts and likes counter saving
- Add postwitt as a bookmark and copy postwitt link to share it
- Delete postwitts
- Pin postwitts on feed
- Bookmarks page where all bookmarked postwitts can be found
- Explore page where most popular hashtags used can be found to search all postwitts where are used
- Profile page (most common kwnow as feed) where you data is shown
- Profile data can be editted. You can edit name, biography, location and birthdate
- Profile images can be editted too. You can upload a new profile and banner images
- 4 tabs to order postwitts as which are in twitter. Postwitts, answers, media and likes
- You can follow other users and they can follow you aswell
- Follwing and followed counters included in profile page too
- Seach bar when you can search postwitts by hashtag and visualuze them in explore pages

### Other added features

- User authorization and authentication using next-auth with Google, github and credentials providers
- Firebase auth included to save email and password
- Gracefully client error caching with react-error-boundary
- Form validation with react-hook-form
- Infinite scrolling pages using intersection observer
- Emoji picker in postwitts creation using emoji-mart
- Mui icons implementation
- Headless-ui components implementations
- Light/Dark mode using tailwind theme variables and custom hooks
- Language selection between english and spanish made with no extra-packages
- React context used to handle minimal global states for users and postwitts handling
- SEO optimizations with all possible custom metatags and og:metatags for different pages

## Scripts

```json
"scripts": {
    "dev": "xdg-open http://localhost:3000 & next dev",
    "build": "next build",
    "start": "next start -p ${PORT:=3000}",
    "lint": "eslint . --fix",
    "prettier": "prettier . --write",
    "prepare": "husky install"
},
```

## Installation & Set Up

1. Install project dependecies

   ```sh
   npm install
   ```

2. Start the client development server

   ```sh
   npm dev
   ```

## Deployment

Project is deployed using vercel and pages are generated using nextjs lambda functions.

### Demo

[Postter](https://postter.vercel.app/)
