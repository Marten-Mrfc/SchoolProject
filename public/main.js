const toggleTheme = () => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    root.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
};
  
  // Attach this function to a button click or similar event
document.querySelector('#themeToggle').addEventListener('click', toggleTheme);

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

function getQueryStringValue(key) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(key);
  }
  document.addEventListener('DOMContentLoaded', function () {
    // Fetch initial totals from the server
    const currentKlas = getQueryStringValue('klas');
    console.log(currentKlas);
    fetch(`/getInitialTotals?klas=${currentKlas}`)
      .then(response => response.json())
      .then(initialTotals => {
        // Call calculateAndDisplayValues with the initial totals
        calculateAndDisplayValues(initialTotals);
        getRandomComment();
      })
      .catch(error => {
        console.error('Error fetching initial totals:', error);
      });
  });
  async function getRandomComment() {
    try {
      // Assuming you want to include the value of '.nummer' in the request
      const spanElement = document.querySelector('.nummer');
      const nummerValue = spanElement.textContent; // or spanElement.value, depending on the element type
  
      const response = await fetch(`/getRandomText?nummer=${nummerValue}`);
      const data = await response.json();
  
      if (data.success) {
        var reaction = document.querySelector('.reaction');
        reaction.textContent = `"${data.randomText}"` 
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };
  
  // Call the function with the desired class number (replace 'selectedClass' with your actual variable)
    // Define the calculateAndDisplayValues function
    function calculateAndDisplayValues(initialTotals) {
      var totalPw = initialTotals.totalPw;
      var totalSo = initialTotals.totalSo;
      var totalMo = initialTotals.totalMo;
      console.log(totalPw, totalSo, totalMo);
  
      // Restricting values to specified maximums
      totalSo === Math.min(5, totalSo);
      totalPw === Math.min(3, totalPw);
      totalMo === Math.min(4, totalMo);
      console.log(totalPw, totalSo, totalMo);
      // Calculate value based on amounts of tests
      var value, color;
  
      if (totalSo === 0 && totalPw === 0 && totalMo === 0) {
        console.log("Geen toetsen");
        value = 10; // Default value when no tests are taken
        color = '#44ce1b';
      } else {
        value = 10;
  
        if (totalMo !== 0) value -= 1 * totalMo;
        if (totalSo !== 0) value -= 2 * totalSo;
        if (totalPw !== 0) value -= 3 * totalPw;
        if (totalSo === 5 || totalPw === 3 || totalMo === 4) {
          value = 1;
        }
  
        // Ensure the value is within the range [1, 10]
        value = Math.max(1, Math.min(10, value));
  
        // Adjust colors based on the calculated value
        if (value >= 7) {
          color = '#bbdb44';
        } else if (value >= 4.5) {
          color = '#f7e379';
        } else if (value >= 2) {
          color = '#f2a134';
        } else if (value >= 1) {
          color = '#ff0000';
        } else {
          color = '#e51f1f';
        }
      }
      console.log(value);
      var spanElement = document.querySelector('.nummer');
      // Set the text content of the span to the calculated value
      spanElement.textContent = value;
  
      console.log(color);
  
      var statusElement = document.querySelector(".status");
      if (statusElement) {
        statusElement.style.color = color;
      } else {
        console.error("Element with class 'status' not found");
      }
    }
  
  
  
        function switchClass(selectedClass) {
          window.location.href = '/?klas=' + encodeURIComponent(selectedClass);
        }
        function updateTest(day, time, test, id) {
          
    const className = getQueryStringValue('klas');
    let updatedTest = test;
  
    if (test === 'Geen toets') {
      updatedTest = '';
    }
  
    fetch('/updateTimetable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        class: className,
        day: day,
        time: time,
        test: updatedTest,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        let badge = document.querySelector(`.${id}-badge`); // Selecting by the unique ID
  
        // Create a new badge if it doesn't exist
        if (!badge) {
          badge = document.createElement('span');
          badge.className = `badge bg-primary text-center ${id}-badge`;
          document.querySelector(`.${id}`).appendChild(badge);
        }
  
        const dropdownItems = document.querySelectorAll(`.${id} .dropdown-item`); // Selecting by the unique ID
  
        badge.textContent = updatedTest;
        dropdownItems.forEach(item => {
          item.classList.remove('active');
          if (item.textContent.trim() === test) {
            item.classList.add('active');
          }
        });
      } else {
        // Handle the error if necessary
        console.error('Failed to update timetable:', data.error);
      }
    })
    .catch(error => {
      console.error('Error during fetch:', error);
    });
    const currentKlas = getQueryStringValue('klas');
    console.log(currentKlas);
    fetch(`/getInitialTotals?klas=${currentKlas}`)
      .then(response => response.json())
      .then(initialTotals => {
        // Call calculateAndDisplayValues with the initial totals
        calculateAndDisplayValues(initialTotals);
        getRandomComment();
      })
      .catch(error => {
        console.error('Error fetching initial totals:', error);
      });
    }