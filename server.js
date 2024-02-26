const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

const timetables = require('./timetable.json');
app.use(bodyParser.json());
const reactions = require('./reactions.json');

app.set('view engine', 'ejs');
app.use(express.static('public'));

function calculateTotals(schedule) {
    const totalPw = schedule.filter(entry => entry.test && entry.test.toLowerCase() === 'pw').length;
    const totalSo = schedule.filter(entry => entry.test && entry.test.toLowerCase() === 'so').length;
    const totalMo = schedule.filter(entry => entry.test && entry.test.toLowerCase() === 'mo').length;
    return {
        totalPw,
        totalSo,
        totalMo
    };
}

app.get('/', (req, res) => {
    const classes = timetables.map(timetable => timetable.class);
    const selectedClass = req.query.klas.toUpperCase();
    const timetable = timetables.find(t => t.class === selectedClass);

    if (!timetable) {
        return res.status(404).send('Class not found');
    }

    const totals = calculateTotals(timetable.schedule);

    res.render('index', {
        timetable,
        classes,
        totals
    });
});

app.post('/updateTimetable', (req, res) => {
    const {
        class: className,
        day,
        time,
        test
    } = req.body;
    const timetable = timetables.find(t => t.class === className);

    if (!timetable) {
        return res.status(404).json({
            error: 'Class not found'
        });
    }

    const entryIndex = timetable.schedule.findIndex(e => e.day === day && e.time === time);

    if (entryIndex !== -1) {
        timetable.schedule[entryIndex].test = test;
        fs.writeFileSync('./timetable.json', JSON.stringify(timetables, null, 2));
        const updatedTotals = calculateTotals(timetable.schedule);

        res.json({
            success: true,
            message: 'Timetable updated successfully',
            totals: updatedTotals
        });
    } else {
        res.status(404).json({
            error: 'Entry not found in the timetable'
        });
    }
});

app.get('/getInitialTotals', (req, res) => {
    const requestedClass = req.query.klas.toUpperCase();
    const timetable = timetables.find(t => t.class === requestedClass);

    if (!timetable) {
        return res.status(404).json({
            error: 'Timetable not found for the specified class'
        });
    }

    const initialTotals = calculateTotals(timetable.schedule);
    res.json(initialTotals);
});

app.get('/getRandomText', (req, res) => {
    try {
        const nummerValue = req.query.nummer;
        const matchingItem = reactions.find(item => Object.keys(item)[0] === nummerValue);

        if (matchingItem) {
            const randomNumber = Object.keys(matchingItem)[0];
            const randomTexts = matchingItem[randomNumber];
            const randomTextIndex = Math.floor(Math.random() * randomTexts.length);
            const randomText = randomTexts[randomTextIndex];

            res.json({
                success: true,
                randomText: randomText.text,
                nummerValue
            });
        } else {
            res.json({
                success: false,
                error: 'No matching item found for the provided number'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});