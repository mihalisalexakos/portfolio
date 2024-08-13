

// filter code
document.addEventListener('DOMContentLoaded', function() {
    const filters = document.querySelectorAll('.filter');
    const artworks = document.querySelectorAll('.img-wrapper');

    // Function to handle filter click
    function handleFilterClick(filter) {
        // Remove the 'selected' class from all filters
        filters.forEach(f => f.classList.remove('selected'));

        // Add the 'selected' class to the clicked filter
        filter.classList.add('selected');

        // Get the data-id of the clicked filter
        const filterId = filter.getAttribute('data-id');

        // Show/Hide artworks based on the filterId
        artworks.forEach(artwork => {
            if (filterId === 'all' || artwork.getAttribute('data-id') === filterId) {
                artwork.style.display = 'block';
            } else {
                artwork.style.display = 'none';
            }
        });
        if( filterId == 'all'){
            resetAllSizes();
        } else {
            resetAllSizes();
            setSizes();
        }

    }

    // Set up click event listeners for filters
    filters.forEach(filter => {
        filter.addEventListener('click', () => handleFilterClick(filter));
    });

    // Set the default filter to 'all' on page load
    const defaultFilter = document.querySelector('.filter[data-id="all"]');
    if (defaultFilter) {
        handleFilterClick(defaultFilter);
    }
});




// image size altering code
const sizes = {
    // Square sizes
    small_S: "img-wrapper grid-span-1-col grid-span-1-row",
    medium_S: "img-wrapper grid-span-2-col grid-span-2-row",
    large_S: "img-wrapper grid-span-3-col grid-span-3-row",

    // Rectangle sizes
    small_R: "img-wrapper grid-span-1-col grid-span-2-row",
    medium_R: "img-wrapper grid-span-2-col grid-span-3-row",
    medium_R_flipped: "img-wrapper grid-span-3-col grid-span-2-row",
    large_R: "img-wrapper grid-span-3-col grid-span-4-row",
    Xlarge_R: "img-wrapper grid-span-3-col grid-span-5-row",

    // Column sizes
    col_2: "img-wrapper grid-span-2-col",
    col_3: "img-wrapper grid-span-3-col",

    // Row sizes
    row_2: "img-wrapper grid-span-2-row",
    row_3: "img-wrapper grid-span-3-row",
    row_4: "img-wrapper grid-span-4-row",
    row_5: "img-wrapper grid-span-5-row",
    row_6: "img-wrapper grid-span-6-row"
};


class ImageWrapper {
    constructor(element) {
        this.element = element;
        this.defaultClasses = element.className.split(' ');
    }

    setSize(sizeClass) {
        this.element.className = ''; // removes all existing classes

        // sizeClass parameter contains multiple classes seperated by spaces
        // they are split into individual strings and added as classes
        sizeClass.split(' ').forEach(individualClass => this.element.classList.add(individualClass));
    }

    // Method to reset to the original size
    resetSize() {
        this.element.className = this.defaultClasses.join(' '); 
    }
}


// list that stores all class objects 
const imageInstances = [];

// alters the sizes of certain images when fliters are selected, 
// so as to better fill out the grid
function setSizes(){

    const img1 = new ImageWrapper(LocateDivWrapper("mlem.jpg"));
    img1.setSize(sizes.large_S);
    imageInstances.push(img1);

    const img2 = new ImageWrapper(LocateDivWrapper("lux.jpg"));
    img2.setSize(sizes.medium_R_flipped);
    imageInstances.push(img2);

    const img3 = new ImageWrapper(LocateDivWrapper("katarina_vs_drake.jpg"));
    img3.setSize(sizes.medium_S);
    imageInstances.push(img3);

    const img4 = new ImageWrapper(LocateDivWrapper("book.gif"));
    img4.setSize(sizes.row_2);
    imageInstances.push(img4);

    const img5 = new ImageWrapper(LocateDivWrapper("pizzacat.JPG"));
    img5.setSize(sizes.row_2);
    imageInstances.push(img5);
}

// when the user selects the 'All' option and is no longer
// viewing the images in a selected filter, all the images that were
// altered by setSizes, get reset to their original size
function resetAllSizes() {
    imageInstances.forEach(imageInstance => {
        imageInstance.resetSize();
    });
}



function LocateDivWrapper(filename) {
    // Use querySelector to find the img element with the specific filename in the src attribute
    const imgElement = document.querySelector(`img[src*="${filename}"]`);
    
    // If the img element exists, return its parent div (the wrapper)
    if (imgElement) {
        return imgElement.parentElement;
    } else {
        console.log("element was not found - LocateDivWrapper")
        return null; // Return null if no such image is found
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalText = document.getElementById('modal-text'); // Get the modal text element
    const closeModal = document.getElementById('close-modal');

    // Show the modal
    function openModal(src, text) {
        modalImage.src = src;
        modalText.textContent = text; // Set the modal text
        modal.classList.add('show');
        modalImage.style.transform = 'scale(0.8)';
        setTimeout(() => {
            modalImage.style.transform = 'scale(1)';
        }, 0); // Trigger reflow to restart animation
    }

    // Close the modal
    function closeModalFunction() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.add('hide');
        }, 500); // Match the duration of the animation
    }

    // Add click event to all images
    document.querySelectorAll('.artwork-grid .img-wrapper').forEach(wrapper => {
        const img = wrapper.querySelector('img');
        img.addEventListener('click', () => {
            modal.classList.remove('hide');
            const text = wrapper.id; // Get the text from the wrapper's ID
            openModal(img.src, text);
        });
    });

    // Add click event to close button
    closeModal.addEventListener('click', closeModalFunction);

    // Close modal when clicking outside the image
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalFunction();
        }
    });
});




document.addEventListener('DOMContentLoaded', () => {
    let dropmenu = false;
    const filterToggle = document.querySelector('.filter-toggle');
    const filterContainer = document.querySelector('.filter-container');

    // Function to update filter toggle text and manage click event based on screen width
    const updateFilterToggleText = () => {
        const isWideScreen = window.innerWidth > 1000;

        if (isWideScreen) {
            filterToggle.innerHTML = 'Filters:'; // Desktop version text
            dropmenu = false;
            filterToggle.removeEventListener('click', toggleFilterContainer); // Remove event listener in desktop mode
            filterContainer.classList.remove('show'); // Ensure the filter container is hidden
        } else {
            filterToggle.innerHTML = 'Filters <i class="fa-solid fa-caret-down"></i>'; // Mobile/Tablet version text
            dropmenu = true;
            filterToggle.addEventListener('click', toggleFilterContainer); // Add event listener in mobile mode
        }
    };

    // Function to toggle filter container visibility
    const toggleFilterContainer = () => {
        filterContainer.classList.toggle('show');
        if (filterContainer.classList.contains('show')) {
            filterToggle.innerHTML = 'Filters <i class="fa-solid fa-caret-up"></i>';
        } else {
            filterToggle.innerHTML = 'Filters <i class="fa-solid fa-caret-down"></i>';
        }
    };

    // Initial update
    updateFilterToggleText();

    // Update when the screen is resized
    window.addEventListener('resize', updateFilterToggleText);
});

document.addEventListener('DOMContentLoaded', () => {
    const imageSection = document.querySelector('.image-section');
    const hoverSound = document.getElementById('hover-sound');

    // Play the sound on hover
    imageSection.addEventListener('click', () => {
        hoverSound.currentTime = 0; // Reset the sound to the beginning
        hoverSound.play();
    });
});