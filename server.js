const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

// Sample timetable data (you can replace it with the content of your timetable.json)
const timetables = require('./timetable.json');
app.use(bodyParser.json());
const reactions = require('./reactions.json'); // Adjust the path as needed

app.set('view engine', 'ejs');
app.use(express.static('public')); // Assuming your CSS is in a 'public' folder

// Function to calculate totals
function calculateTotals(schedule) {
  const totalPw = schedule.filter(entry => entry.test && entry.test.toLowerCase() === 'pw').length;
  const totalSo = schedule.filter(entry => entry.test && entry.test.toLowerCase() === 'so').length;
  const totalMo = schedule.filter(entry => entry.test && entry.test.toLowerCase() === 'mo').length;
  return { totalPw, totalSo, totalMo };
}

// Render the index page with a list of classes
app.get('/', (req, res) => {
  const classes = timetables.map(timetable => timetable.class);
  const selectedClass = req.query.klas.toUpperCase(); // Convert to uppercase
  const timetable = timetables.find(t => t.class === selectedClass);

  if (!timetable) {
    return res.status(404).send('Class not found');
  }

  // Calculate totals
  const totals = calculateTotals(timetable.schedule);

  res.render('index', { timetable, classes, totals });
});

// Update timetable route
app.post('/updateTimetable', (req, res) => {
  const { class: className, day, time, test } = req.body;

  // Find the timetable for the given class
  const timetable = timetables.find(t => t.class === className);

  if (!timetable) {
    return res.status(404).json({ error: 'Class not found' });
  }

  // Find the entry in the schedule for the given day and time
  const entryIndex = timetable.schedule.findIndex(e => e.day === day && e.time === time);

  if (entryIndex !== -1) {
    // Update the test value in the entry
    timetable.schedule[entryIndex].test = test;

    // Save the updated timetable to the JSON file
    fs.writeFileSync('./timetable.json', JSON.stringify(timetables, null, 2));

    // Calculate totals after updating
    const updatedTotals = calculateTotals(timetable.schedule);

    res.json({ success: true, message: 'Timetable updated successfully', totals: updatedTotals });
  } else {
    res.status(404).json({ error: 'Entry not found in the timetable' });
  }
});

// Endpoint to get initial totals
app.get('/getInitialTotals', (req, res) => {
  const requestedClass = req.query.klas.toUpperCase(); // Convert to uppercase
  // Find the timetable based on the requested class
  const timetable = timetables.find(t => t.class === requestedClass);

  if (!timetable) {
    return res.status(404).json({ error: 'Timetable not found for the specified class' });
  }

  const initialTotals = calculateTotals(timetable.schedule);
  res.json(initialTotals);
});
// Endpoint to get a random comment for a class
app.get('/getRandomText', (req, res) => {
  try {
    const nummerValue = req.query.nummer;

    // Find the item in the reactions array with the matching 'nummer' value
    const matchingItem = reactions.find(item => Object.keys(item)[0] === nummerValue);

    if (matchingItem) {
      const randomNumber = Object.keys(matchingItem)[0];
      const randomTexts = matchingItem[randomNumber];

      // Select a random text from the array
      const randomTextIndex = Math.floor(Math.random() * randomTexts.length);
      const randomText = randomTexts[randomTextIndex];

      res.json({ success: true, randomText: randomText.text, nummerValue });
    } else {
      res.json({ success: false, error: 'No matching item found for the provided number' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});