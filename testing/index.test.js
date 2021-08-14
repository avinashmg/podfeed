const Podfeed = require('../index');

test('passing arguments to constructor', () => {
  const expectedTitle = 'Some podcast title!';
  const expectedDescription = 'This is a sample podcast';
  const podfeedObj = new Podfeed({
    title: expectedTitle,
    description: expectedDescription
  });
  expect(podfeedObj.title).toBe(expectedTitle);
  expect(podfeedObj.description).toBe(expectedDescription);
})

test('passing xml file url to constructor', () => {
  const xmlFileLocation = 'testing/sample-podcast-feed.xml'; // Because the execution environment is the root of the project
  const podfeedObj = new Podfeed(xmlFileLocation);
  expect(podfeedObj.title).toBe('The Unknown Podcast');
})