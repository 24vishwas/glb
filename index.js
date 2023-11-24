var navLinks = document.getElementById("nav-ele");
var open_menu = document.getElementById("open-menu");
var close_menu = document.getElementById("close-menu");

console.log("hi")
function openMenu(){
    // navLinks.style.right = "0px";
    navLinks.style.transform = "translateX(-50%)";
    open_menu.style.display ="none" 
    close_menu.style.display = 'inline-block'

}
function hideMenu(){
    // navLinks.style.right = "-220px";
    navLinks.style.transform = "translateX(-200%)";
    close_menu.style.display = "none"
    open_menu.style.display = "inline-block"
}

var dropdown_status = 0


function dropdown(){
    if (dropdown_status==0){
        var ele = document.querySelector('.nav-element li> ul');
        ele.style.display = "flex";
        console.log(ele)
    }
}

var count = 1;
var customChange = false;
var isDragging = false;
var startX = 0;

const sliding = (x) => {
    var left = `${-x * 100}vw`;
    var allSlide = document.querySelector('.slider').querySelectorAll('.card');

    allSlide.forEach((ele) => {
        ele.style.left = left;
    });
};

setInterval(() => {
    if (!customChange && !isDragging) {
        count = (count + 1) % 3;
        sliding(count);
        console.log(count);
    }
}, 3000);

const leftSwipe = () => {
    if (!customChange) {
        customChange = true;
        setTimeout(() => (customChange = false), 2000);
        count = count === 0 ? 2 : count - 1;
        sliding(count);
        console.log(count);
    }
};

const rightSwipe = () => {
    if (!customChange) {
        customChange = true;
        setTimeout(() => (customChange = false), 2000);
        count = (count + 1) % 3;
        sliding(count);
        console.log(count);
    }
};

document.querySelector('.left').addEventListener('click', leftSwipe);
document.querySelector('.right').addEventListener('click', rightSwipe);

document.querySelector('.slider').addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
});

document.querySelector('.slider').addEventListener('pointerup', (e) => {
    if (isDragging) {
        var endX = e.clientX;
        var deltaX = endX - startX;

        if (deltaX > 0) {
            leftSwipe();
        } else {
            rightSwipe();
        }

        isDragging = false;
    }
});

document.querySelector('.slider').addEventListener('pointerleave', () => {
    if (isDragging) {
        rightSwipe();
        isDragging = false;
    }
});

document.querySelector('.slider').addEventListener('pointermove', (e) => {
    if (isDragging) {
        e.preventDefault();
    }
});




document.addEventListener('DOMContentLoaded', function () {
  var fx = function () {
      var elements = document.querySelectorAll('.number');
      console.log(elements)
      elements.forEach(function (el) {
          var data = parseInt(el.dataset.n, 10);
          var props = {
              count: 0
          };

          var animate = function () {
              props.count += data / 100; // Assuming 100 steps for simplicity
              el.textContent = Math.ceil(props.count);

              if (props.count < data) {
                  requestAnimationFrame(animate);
              } else {
                  if (el.dataset.sym !== undefined) {
                      el.textContent = el.textContent.concat(el.dataset.sym);
                  }
              }
          };

          animate();
      });
  };

  var isElementInViewport = function (el) {
      var rect = el.getBoundingClientRect();
      return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom >= 0
      );
  };

  var handleScroll = function () {
      var elements = document.querySelectorAll('.number');
      elements.forEach(function (el) {
          if (isElementInViewport(el) && !el.dataset.animated) {
              fx();
              el.dataset.animated = true; // Mark the element as animated to avoid redundant animations
          }
      });
  };

  window.addEventListener('scroll', handleScroll);
});
// var count = 1;
// var customChange = false

// const sliding = (x)=>{
//     var left = `${-x*100}vw`
//     var allSlide = document.querySelector('.slider').querySelectorAll('.card');
    
//     allSlide.forEach((ele)=>{
//         ele.style.left = left
//     })
// }

// setInterval(()=>{
//     if(customChange != true){
//         if(count == 3){
//             count=0;
//             sliding(count);
//         }else{
//             sliding(count);
//             count+=1;
//         }
//         console.log(count)
//     }
// },3000) 

// const leftSwipe = () => {
//     customChange = true;
//     setTimeout(()=>(customChange=false),2000);
//     if(count == 0){
//         count=2;
//         sliding(2);
//         console.log(count)
//     }
//     else{
//         count = count - 1;
//         sliding(count);
//         console.log(count)
//     }
// }
// const rightSwipe = () => {
//     customChange = true;
//     setTimeout(()=>(customChange=false),2000);
//     if(count == 2){
//         sliding(0);
//         count=0;
//     }
//     else{
//         count++;
//         sliding(count);
//     }
// }
// document.querySelector('.left').addEventListener('click', leftSwipe);
// document.querySelector('.right').addEventListener('click', rightSwipe);
// // document.querySelector('.left').onClick = ()=>{leftSwipe()};
// // document.querySelector('.right').onClick = ()=>{rightSwipe()};

// document.querySelector('.slider').onpointerdown = (e) => {
//     var initX = e.clientX;
//     document.querySelector('.slider').onpointerup = (up) => {
//         var finalX = up.clientX;
//         finalX - initX > 0 ? leftSwipe() : rightSwipe();
//     };
// };

let index = 1;

const on = (listener, query, fn) => {
	document.querySelectorAll(query).forEach(item => {
		item.addEventListener(listener, el => {
			fn(el);
		})
	})
}

on('click', '.selectBtn', item => {
	const next = item.target.nextElementSibling;
	next.classList.toggle('toggle');
	next.style.zIndex = index++;
});
on('click', '.option', item => {
	item.target.parentElement.classList.remove('toggle');

	const parent = item.target.closest('.select').children[0];
	parent.setAttribute('data-type', item.target.getAttribute('data-type'));
	parent.innerText = item.target.innerText;
})


// cards carousel
// var cardIndex = 0;
// var cardWidth = document.querySelector('.card-1').offsetWidth + 20; // Include margin
// var cardsContainer = document.querySelector('#cardsContainer');
// var numCards = document.querySelectorAll('.card-1').length;
// var isDragging = false;
// var startTouchX, currentTouchX, startTranslateX;
// var autoPlayTimeout;

// document.querySelector("#prevButton").addEventListener("click", function() {
//   stopAutoPlay();
//   cardIndex = (cardIndex - 1 + numCards) % numCards; // Move from left to right
//   updateCardPosition();
//   resumeAutoPlayAfterDelay();
// });

// document.querySelector("#nextButton").addEventListener("click", function() {
//   stopAutoPlay();
//   cardIndex = (cardIndex + 1) % numCards; // Move from right to left
//   updateCardPosition();
//   resumeAutoPlayAfterDelay();
// });

// cardsContainer.addEventListener("touchstart", function(event) {
//   startDrag(event.touches[0]);
// });

// cardsContainer.addEventListener("touchmove", function(event) {
//   drag(event.touches[0]);
// });

// cardsContainer.addEventListener("touchend", endDrag);

// function startDrag(touchEvent) {
//   stopAutoPlay();
//   isDragging = true;
//   startTouchX = touchEvent.clientX || touchEvent.touches[0].clientX;
//   startTranslateX = currentTouchX || 0;
//   cardsContainer.style.transition = "none";
// }

// function drag(touchEvent) {
//   if (!isDragging) return;

//   var touchX = touchEvent.clientX || touchEvent.touches[0].clientX;
//   var touchDeltaX = touchX - startTouchX;
//   currentTouchX = startTranslateX + touchDeltaX;

//   cardsContainer.style.transform = "translateX(" + currentTouchX + "px)";
// }

// function endDrag() {
//   if (isDragging) {
//     isDragging = false;
//     var direction = currentTouchX > startTranslateX ? 1 : -1; // Reverse direction
//     var distance = Math.abs(currentTouchX - startTranslateX);
//     var threshold = cardWidth * 0.3; // Adjust threshold for more drag

//     if (distance > threshold) {
//       cardIndex = (cardIndex - direction + numCards) % numCards; // Reverse direction
//     }

//     updateCardPosition();
//     cardsContainer.style.transition = "transform 0.3s ease";
//     resumeAutoPlayAfterDelay();
//   }
// }

// function updateCardPosition() {
//   var transformValue = -cardIndex * cardWidth + "px";
//   cardsContainer.style.transform = "translateX(" + transformValue + ")";
// }

// // Auto-play functionality
// var autoPlayInterval;

// function startAutoPlay() {
//   autoPlayInterval = setInterval(function() {
//     if (!isDragging) {
//       cardIndex = (cardIndex + 1) % numCards; // Move to the next card
//       updateCardPosition();
//     }
//   }, 2000); // Adjust autoplay interval as needed
// }

// function stopAutoPlay() {
//   clearInterval(autoPlayInterval);
//   clearTimeout(autoPlayTimeout);
// }

// function resumeAutoPlayAfterDelay() {
//   clearTimeout(autoPlayTimeout);
//   autoPlayTimeout = setTimeout(function() {
//     startAutoPlay();
//   }, 3000); // Adjust the delay before resuming auto-play as needed
// }

// // startAutoPlay();

// cardsContainer.addEventListener("mouseover", stopAutoPlay);
// cardsContainer.addEventListener("mouseout", resumeAutoPlayAfterDelay);

// // Handle window resize
// window.addEventListener("resize", function() {
//   cardWidth = document.querySelector('.card-1').offsetWidth + 20; // Include margin
//   updateCardPosition();
// });




var cardIndex = 0;
var cardWidth = document.querySelector('.card-1').offsetWidth + 20; // Include margin
var cardsContainer = document.querySelector('#cardsContainer');
var numCards = document.querySelectorAll('.card-1').length;
var isDragging = false;
var startTouchX, currentTouchX, startTranslateX;
var autoPlayTimeout;

document.querySelector("#prevButton").addEventListener("click", function() {
  stopAutoPlay();
  cardIndex = (cardIndex - 1 + numCards) % numCards; // Move from left to right
  updateCardPosition();
  resumeAutoPlayAfterDelay();
});

document.querySelector("#nextButton").addEventListener("click", function() {
  stopAutoPlay();
  cardIndex = (cardIndex + 1) % numCards; // Move from right to left
  updateCardPosition();
  resumeAutoPlayAfterDelay();
});

cardsContainer.addEventListener("touchstart", function(event) {
  startDrag(event.touches[0]);
});

cardsContainer.addEventListener("touchmove", function(event) {
  drag(event.touches[0]);
});

cardsContainer.addEventListener("touchend", endDrag);

function startDrag(touchEvent) {
  stopAutoPlay();
  isDragging = true;
  startTouchX = touchEvent.clientX || touchEvent.touches[0].clientX;
  startTranslateX = currentTouchX || 0;
  cardsContainer.classList.add('no-transition');
}

function drag(touchEvent) {
  if (!isDragging) return;

  var touchX = touchEvent.clientX || touchEvent.touches[0].clientX;
  var touchDeltaX = touchX - startTouchX;
  currentTouchX = startTranslateX + touchDeltaX;

  cardsContainer.style.transform = "translateX(" + currentTouchX + "px)";
}

function endDrag() {
  if (isDragging) {
    isDragging = false;
    var direction = currentTouchX > startTranslateX ? 1 : -1; // Reverse direction
    var distance = Math.abs(currentTouchX - startTranslateX);
    var threshold = cardWidth * 0.3; // Adjust threshold for more drag

    if (distance > threshold) {
      cardIndex = (cardIndex - direction + numCards) % numCards; // Reverse direction
    }

    updateCardPosition();
    cardsContainer.classList.remove('no-transition');
    resumeAutoPlayAfterDelay();
  }
}

function updateCardPosition() {
  var transformValue = -cardIndex * cardWidth + "px";
  cardsContainer.style.transition = "transform 0.3s ease";

  // Check if we have reached the end and adjust for looping
  if (cardIndex >= numCards) {
    // Move directly to the first card (seamless loop)
    cardIndex = 0;
    setTimeout(function() {
      cardsContainer.style.transition = "none"; // Disable transition for the loop
      updateCardPosition();
    }, 300); // Slight delay for a smooth transition
  } else {
    cardsContainer.style.transform = "translateX(" + transformValue + ")";
  }
}

// Auto-play functionality
var autoPlayInterval;

function startAutoPlay() {
  autoPlayInterval = setInterval(function() {
    if (!isDragging) {
      cardIndex = (cardIndex + 1) % numCards; // Move to the next card
      updateCardPosition();
    }
  }, 2000); // Adjust autoplay interval as needed
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
  clearTimeout(autoPlayTimeout);
}

function resumeAutoPlayAfterDelay() {
  clearTimeout(autoPlayTimeout);
  autoPlayTimeout = setTimeout(function() {
    startAutoPlay();
  }, 3000); // Adjust the delay before resuming auto-play as needed
}

// Uncomment this line to start auto-play initially
// startAutoPlay();

cardsContainer.addEventListener("mouseover", stopAutoPlay);
cardsContainer.addEventListener("mouseout", resumeAutoPlayAfterDelay);

// Handle window resize
window.addEventListener("resize", function() {
  cardWidth = document.querySelector('.card-1').offsetWidth + 20; // Include margin
  updateCardPosition();
});






//funfact-number animation
