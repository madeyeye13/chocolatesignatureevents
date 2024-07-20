document.addEventListener("DOMContentLoaded", function() {
  const menuBtn = document.querySelector('.fa-bars');
  const closeBtn = document.querySelector('#close');
  const menuBar = document.querySelector('#menu-bar');

  // Toggle menu visibility
  menuBtn.addEventListener('click', function() {
      menuBar.classList.toggle('slide-out');
      menuBar.classList.toggle('slide-in');
      menuBtn.classList.toggle('hide');
      closeBtn.classList.toggle('hide');
  });

  closeBtn.addEventListener('click', function() {
      menuBar.classList.toggle('slide-in');
      menuBar.classList.toggle('slide-out');
      menuBtn.classList.toggle('hide');
      closeBtn.classList.toggle('hide');
  });

 // Highlight the active link
 const currentPage = window.location.pathname.split("/").pop(); // Get current page name
 const navLinks = document.querySelectorAll('.nav-link a'); // Select all nav links

 navLinks.forEach(link => {
     // Check if the href attribute of the link matches the current page name
     if (link.getAttribute('href') === currentPage || 
         (currentPage === "" && link.getAttribute('href') === "index.html")) {
         link.classList.add('active'); // Add 'active' class to the matching link
     } else {
         link.classList.remove('active'); // Remove 'active' class from other links
     }
 });

 
});


let slideIndex = 0;
const slides = document.querySelectorAll('.heroimg');

function showSlides() {
  slides.forEach((slide, index) => {
    slide.style.display = index === slideIndex ? 'block' : 'none';
  });
  slideIndex = (slideIndex + 1) % slides.length;
}

showSlides(); // Initial call to display the first slide

setInterval(showSlides, 7000); 

//what we do image slide


let currentIndex = 0;
const images = document.querySelectorAll('.wwdimage');
const totalImages = images.length;
const overlay = document.getElementById('overlay');

function showNextImage() {
    overlay.classList.add('flash');
    setTimeout(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalImages;
        images[currentIndex].classList.add('active');
        overlay.classList.remove('flash');
    }, 100); // Adjust this timing to match the overlay transition
}

setInterval(showNextImage, 7000); // Change image every 7 seconds

// Add slide-in class after page loads
window.addEventListener('load', function() {
  document.getElementById('side-in-text').classList.add('slide-in');
});


// document.querySelectorAll('.wwdli').forEach(item => {
//   item.addEventListener('click', function () {
//     const content = this.nextElementSibling;

//     if (content.style.maxHeight) {
//       content.style.maxHeight = null;
//       this.classList.remove('active');
//     } else {
//       // Close any open dropdowns
//       document.querySelectorAll('.wwdl-content').forEach(c => c.style.maxHeight = null);
//       document.querySelectorAll('.wwdli').forEach(c => c.classList.remove('active'));

//       content.style.maxHeight = content.scrollHeight + "px";
//       this.classList.add('active');
//     }
//   });
// });



document.querySelectorAll('.wwdli').forEach(item => {
  item.addEventListener('click', () => {
    const content = item.nextElementSibling;
    if (item.classList.contains('active')) {
      item.classList.remove('active');
      content.style.maxHeight = '0';
    } else {
      document.querySelectorAll('.wwdli').forEach(el => {
        el.classList.remove('active');
        el.nextElementSibling.style.maxHeight = '0';
      });
      item.classList.add('active');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});



//--------------------Testimonial---------------////


let testimonialIndex = 1;
  showTestimonials(testimonialIndex);

  function plusSlides(n) {
    showTestimonials(testimonialIndex += n);
  }

  function currentSlide(n) {
    showTestimonials(testimonialIndex = n);
  }

  function showTestimonials(n) {
    let i;
    let testimonials = document.getElementsByClassName("testimonial");
    let dots = document.getElementsByClassName("dot");
    if (n > testimonials.length) { testimonialIndex = 1 }
    if (n < 1) { testimonialIndex = testimonials.length }
    for (i = 0; i < testimonials.length; i++) {
      testimonials[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
    testimonials[testimonialIndex - 1].style.display = "block";
    dots[testimonialIndex - 1].classList.add("active");
  }

  // Automatic testimonial change every 15 seconds
  setInterval(function() {
    plusSlides(1);
  }, 15000);

  // Swipe functionality (for touch devices)
  let touchstartX = 0;
  let touchendX = 0;

  const gestureZone = document.querySelector('.testimonial-container');

  gestureZone.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
  }, false);

  gestureZone.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    handleGesture();
  }, false);

  function handleGesture() {
    if (touchendX < touchstartX) {
      plusSlides(1); // swipe left
    }
    if (touchendX > touchstartX) {
      plusSlides(-1); // swipe right
    }
  }




//-----------------Subscribe------------------//


  