const { xml2js } = require("xml-js");

class Podfeed {
  title = "";
  description = "";
  link = "";
  image = "";
  category = "";
  owner = { title: "", email: "" };
  explicit = "clean";
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
  read(xml) {
    var obj = xml2js(xml, { compact: true, spaces: 4 }).rss.channel;
    this.title = obj.title._text;
    this.description = obj.description._text;
    this.link = obj.link._text;
    this.image = obj.image.url._text;
    this.category = obj["itunes:category"]._attributes.text;
    this.explicit = obj["itunes:explicit"]._text;
    this.owner.title = obj["itunes:owner"]["itunes:name"]._text;
    this.owner.email = obj["itunes:owner"]["itunes:email"]._text;
    this.items = [];
    if (Array.isArray(obj.item)) {
      obj.item.forEach((i) => {
        const properties = {
          title: i.title._text,
          description: i.description._text,
          link: i.link._text,
          guid: i.guid._text,
          src: i.enclosure._attributes.url,
          date: i.pubDate._text,
        };
        this.items.push(properties);
      });
    } else if (obj.item) {
      this.items.push({
        title: obj.item.title._text,
        description: obj.item.description._text,
        link: obj.item.link._text,
        guid: obj.item.guid._text,
        src: obj.item.enclosure._attributes.url,
        date: obj.item.pubDate._text,
      });
    }
  }
  build() {
    var out = `<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">`;
    out += `<channel>`;
    out += `<title>` + this.title + `</title>`;
    out += `<link>` + this.link + `</link>`;
    out += `<description>` + this.description + `</description>`;
    out += `<docs>http://www.rssboard.org/rss-specification</docs>
    <generator>Podfeed-nodejs V.1</generator>`;
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
    <itunes:explicit>${this.explicit}</itunes:explicit>
    <itunes:owner>
    <itunes:name>${this.owner.title}</itunes:name>
    <itunes:email>${this.owner.email}</itunes:email>
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
