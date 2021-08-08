# podfeed

Generate and parse podcast syndication easily

You can use this library to create podcast rss feeds and to read existing podcast rss feeds inorder to make changes into that.

## Installation 

```
$ npm install podfeed
```
Or 
```
$ yarn install podfeed
```
## How to use Podfeed
### Import Podfeed
```javascript
const Podfeed = require("podfeed")
```
### Create a Podcast Feed Object
```javascript
 const feed = Podfeed()
```
### Provide podcast info
```javascript
feed.title= "Title of the Podcast"
feed.description="Description of the Podcast"
feed.link = "https://link-of-the-podcast.tld"
feed.image = "https://image.link.of.the.podcast"
feed.category = "Category of your podcast"
```
### Provide podcast owner info
```javascript
const owner = { 
  title: 'JRE', 
  email:'example@mail.com' 
}
feed.owner = owner
```

### Add an episode to the podcast 
```javascript
const episode = {
      title: 'Episode Title',
      description: 'Episode Description',
      link: 'https://podcast.tld/episode',
      guid: 'Unique Identifier for this episode',
      src: 'https://public-link-to-audio-file-hosted-online.tld',
      date: 'Date in UTC string'
}
feed.addEpisode(episode)
```

### Build Podcast RSS feed
```javascript
feed.build() // Returns a string with rss feed content. can be stored to a file
```

### Read an existing podcast rss feed
```javascript
feed.read(rss_feed) // Pass rss feed content
```

## Statuts of the project
More work are to be done to this project, if encountered with any issues report it [here](https://github.com/avinashmg/podfeed/issues)
