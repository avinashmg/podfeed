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