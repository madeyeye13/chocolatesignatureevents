document.addEventListener('DOMContentLoaded', function() {
    const clientCount = document.getElementById('client-count');
    const satisfactionCount = document.getElementById('satisfaction-count');
    const clientTarget = 600;
    const satisfactionTarget = 100;
    let hasAnimated = false;

    function animateCount(element, target, suffix = '') {
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 60);

        function updateCount() {
            count += increment;
            if (count > target) count = target;
            element.textContent = Math.floor(count) + suffix;
            if (count < target) {
                requestAnimationFrame(updateCount);
            }
        }

        requestAnimationFrame(updateCount);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCount(clientCount, clientTarget, '+');
                animateCount(satisfactionCount, satisfactionTarget, '%');
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the section is in view
    });

    observer.observe(document.getElementById('client'));
});



//=====================Progress Bar==========//


document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress');
    let hasAnimated = false;

    function animateProgressBar() {
        progressBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = percentage + '%';
            bar.textContent = percentage + '%';
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateProgressBar();
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the section is in view
    });

    observer.observe(document.getElementById('progress-section'));
});



//=============DROPDOWN INSIDE VENDOR REGISTRATION===========//


    // function toggleDropdown() {
    //     const overlay = document.getElementById('overlay');
    //     const dropdownOverlay = document.getElementById('dropdownOverlay');
    //     const displayStyle = overlay.style.display === 'block' ? 'none' : 'block';
    //     overlay.style.display = displayStyle;
    //     dropdownOverlay.style.display = displayStyle;
    // }

    // document.querySelectorAll('.dropdown-list input').forEach(input => {
    //     input.addEventListener('change', function() {
    //         document.getElementById('country').value = this.value;
    //         toggleDropdown();
    //     });
    // });

    // // Close dropdown if clicked outside
    // document.addEventListener('click', function(event) {
    //     const dropdown = document.querySelector('.custom-dropdown');
    //     const overlay = document.getElementById('overlay');
    //     const dropdownOverlay = document.getElementById('dropdownOverlay');
    //     if (!dropdown.contains(event.target) && !dropdownOverlay.contains(event.target)) {
    //         overlay.style.display = 'none';
    //         dropdownOverlay.style.display = 'none';
    //     }
    // });


   function toggleDropdown() {
    const overlay = document.getElementById('overlay');
    const dropdownOverlay = document.getElementById('dropdownOverlay');
    const displayStyle = overlay.style.display === 'block' ? 'none' : 'block';
    overlay.style.display = displayStyle;
    dropdownOverlay.style.display = displayStyle;
}

document.querySelectorAll('#dropdownOverlay .dropdown-list input[type="radio"]').forEach(input => {
    input.addEventListener('change', function() {
        document.getElementById('selected-country').innerText = this.value;
        toggleDropdown();
    });
});

// Close dropdown if clicked outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.custom-dropdown');
    const overlay = document.getElementById('overlay');
    const dropdownOverlay = document.getElementById('dropdownOverlay');
    if (!dropdown.contains(event.target) && !dropdownOverlay.contains(event.target)) {
        overlay.style.display = 'none';
        dropdownOverlay.style.display = 'none';
    }
});

// Submit form handling
document.getElementById('vendor-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const loadingDots = submitButton.querySelector('.loading-dots');
    const responseMessage = document.getElementById('form-response');

    loadingDots.style.display = 'inline-block'; // Show loading dots
    submitButton.disabled = true; // Disable submit button

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        loadingDots.style.display = 'none'; // Hide loading dots
        submitButton.disabled = false; // Enable submit button
        if (response.ok) {
            form.reset(); // Reset form fields
            responseMessage.style.display = 'block'; // Show success message
            setTimeout(() => {
                responseMessage.style.display = 'none'; // Hide success message after 6 seconds
            }, 6000);
        } else {
            alert("There was an issue submitting the form.");
        }
    }).catch(error => {
        loadingDots.style.display = 'none'; // Hide loading dots
        submitButton.disabled = false; // Enable submit button
        alert("There was an issue submitting the form.");
    });
});
