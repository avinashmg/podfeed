//Task to create RSS feed
class Podfeed {
  title = "";
  description = "";
  link = "";
  image = "";
  category = "";
  items = [];
  constructor(title, link, description) {
    this.title = title;
    this.link = link;
    this.description = description;
  }
  addEpisode(episode) {
    this.items.unshift({
      title: episode.title,
      description: episode.description,
      link: episode.link,
      guid: episode.guid,
      src: episode.src,
      date: episode.date,
    });
  }
  build() {
    var out = `<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">`;
    out += `<channel>`;
    out += `<title>` + this.title + `</title>`;
    out += `<link>` + this.link + `</link>`;
    out += `<description>` + this.link + `</description>`;
    out += `<docs>http://www.rssboard.org/rss-specification</docs>
    <generator>Podfeed-nodejs 1</generator>`;
    out +=
      `<image>
    <url>` +
      this.image +
      `</url>
    <title>` +
      this.title +
      `</title>
    <link>` +
      this.link +
      `</link>
    </image>
    `;
    out += `<language>en</language>`;
    out += `<lastBuildDate></lastBuildDate>`;
    out +=
      `<itunes:category text="` +
      this.category +
      `"/>
    <itunes:image href="` +
      this.image +
      `"/>
    <itunes:explicit>clean</itunes:explicit>
    <itunes:owner>
    <itunes:name>Readcast</itunes:name>
    <itunes:email>podcast@readcast.com</itunes:email>
    </itunes:owner>`;
    this.items.forEach((item) => {
      out +=
        `<item>
        <title>` +
        item.title +
        `</title>
        <link>` +
        item.link +
        `</link>
        <description>` +
        item.description +
        `</description>
        <guid isPermaLink="false">` +
        item.guid +
        `</guid>
        <enclosure url="` +
        item.src +
        `" length="1" type="audio/mpeg"/>
        <pubDate>` +
        item.date +
        `</pubDate>
        </item>`;
    });
    out += `</channel>`;
    out += `</rss>`;
    return out;
  }
}

module.exports = Podfeed;
