const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

// Sample timetable data (you can replace it with the content of your timetable.json)
const timetables = require('./timetable.json');
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public')); // Assuming your CSS is in a 'public' folder

// Function to calculate totals
function calculateTotals(schedule) {
  const totalPw = schedule.filter(entry => entry.test && entry.test.toLowerCase() === 'pw').length;
  const totalSo = schedule.filter(entry => entry.test && entry.test.toLowerCase() === 'so').length;
  return { totalPw, totalSo };
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
  const { class: className, day, time, subject, test } = req.body;

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

    res.json({ success: true, message: 'Timetable updated successfully' });
  } else {
    res.status(404).json({ error: 'Entry not found in the timetable' });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
