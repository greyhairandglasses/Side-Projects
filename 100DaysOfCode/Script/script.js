// Countdown variables
// When the challenge ends
const endDate = new Date("2020-08-22T00:00:00").getTime();
// Grab the HTML element we want the timer to be displayed in
const countdownHTML = document.querySelector('#countdown');
const progressBar = document.querySelector('.progressBar');
const hashtag = document.querySelector('#hashtag');

// Fade out variables
const fadeMe = document.querySelectorAll('.fade-me'); // .style.opacity
const fadeMeIn = document.querySelectorAll('.fade-me-in'); // .style.opacity
const fadeTracker = document.querySelector('.fade-tracker');
// Fadeout function
function scrollHandler() {
  // Grabs 
  fadeAmount = fadeTracker.getBoundingClientRect().bottom;
  console.log('They see me scrolling')
  fadeMeIn[0].style.opacity = `${((fadeAmount *-1) + 400) * 4 / 10}%`;
  fadeMe.forEach(el => el.style.opacity = `${(fadeAmount - 250) * 4 / 10}%`);

}
window.addEventListener('scroll', scrollHandler);


// Luckily this is a 100 day challenge, so just grabbed the code from above and modified it slightly to give a `percentage`, which I'll use for graphic on main page
function countdownPercentage(deadline) {
  const now = new Date().getTime();
  const countdown = deadline - now;
  const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
  const percent = 100 - days;
  // return progressBar.setAttribute('value', percent);
  return progressBar.value = percent;

}

// function hashtagGen(deadline) {
//   const now = new Date().getTime();
//   const countdown = deadline - now;
//   const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
//   // return progressBar.setAttribute('value', percent);
//   return `#Day${100 - days}`;

// }



function calculateTimeRemaining(deadline) {
  // Get current time
  const now = new Date().getTime();
  countdownPercentage(endDate)
  // Working out the time difference between now and the deadline
  const countdown = deadline - now;
  // Working out the minutes hours and days between now and then (Had to find the maths online, because MATHS)
  const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
  const hours = Math.floor((countdown / (1000 * 60 * 60)) % 24);
  const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
  if (countdown < 0) {
    return `Challenge over!`
  } else if (days === 1) {
    return `${days} day to go!`
  }
  return `${days} days to go!`
}



countdownHTML.innerHTML = calculateTimeRemaining(endDate); 
// hashtag.innerHTML = hashtagGen(endDate);
console.log(calculateTimeRemaining(endDate));
