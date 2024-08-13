


function toggleInfo(id) {
    var projectContainer = document.querySelector('#' + id).parentNode;
    var webInfo = projectContainer.querySelector('.website-info');
    var elements = projectContainer.querySelector('.elements');
    var project2 = document.getElementById('Project-2');

    if (webInfo.classList.contains('show')) {
        webInfo.classList.remove('show');
        if(id == "author"){
            project2.classList.remove('shifted');
        }
        setTimeout(function() {
            webInfo.style.display = 'none';
            elements.style.display = 'grid';
        }, 1);
    } else {
        elements.style.display = 'none';
        webInfo.style.display = 'flex';
        setTimeout(function() {
            webInfo.classList.add('show');
            if(id == "author"){
                project2.classList.add('shifted');
            }
            
        }, 1);
    }
}


function changeBackground(buttonId) {
    // if (window.matchMedia('(max-width: 999px)').matches) {
    //     return;
    // }
    const backgroundWrapper = document.querySelector('.background-wrapper');
    const buttons = document.querySelectorAll('.background-swapper-container');

    const backgrounds = {
        'bg-1': 'url("saint.jpg")',
        'bg-2': 'url("lillypads.jpg")',
        'bg-3': 'url("fields.jpg")',
        'bg-4': 'url("lunch.jpg")'
    };

    // Remove selected class from all buttons
    document.getElementById('bg-1').classList.remove('selected');
    document.getElementById('bg-2').classList.remove('selected');
    document.getElementById('bg-3').classList.remove('selected');
    document.getElementById('bg-4').classList.remove('selected');

    // Add selected class to the clicked button
    document.getElementById(buttonId).classList.add('selected');


    // Step 1: Slide the current background image up
    backgroundWrapper.classList.add('slide-up-current');
    
    // Wait for the first animation to finish before starting the second
    setTimeout(() => {
        // Step 2: Change background image and slide up the new one
        backgroundWrapper.style.backgroundImage = backgrounds[buttonId];
        backgroundWrapper.classList.remove('slide-up-current');
        backgroundWrapper.classList.add('slide-up-new');

        // Remove the new slide-up class after animation completes
        setTimeout(() => {
            backgroundWrapper.classList.remove('slide-up-new');
        }, 500); // duration of the second animation
    }, 500); // duration of the first animation
}


