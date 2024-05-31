// This function sets the time of a video and executes a callback after each duration
function setTime(seconds1, duration1, seconds2, duration2, callback) {
    // Get the video element by its ID
    var video = document.getElementById("myVideo");
    // Set the current time of the video to seconds1 and start playing
    video.currentTime = seconds1;
    video.play();

    // After duration1 seconds, pause the video and execute further actions
    setTimeout(function() {
        video.pause();
        // If seconds2 and duration2 are provided, set another time and play
        if (seconds2 !== undefined && duration2 !== undefined) {
            video.currentTime = seconds2;
            video.play();

            // After duration2 seconds, pause the video and execute the callback function
            setTimeout(function() {
                video.pause();
                if (callback) {
                    callback();
                }
            }, duration2 * 1000);
        } else {
            // If no second set of time and duration is provided, just execute the callback
            if (callback) {
                callback();
            }
        }
    }, duration1 * 1000);
}

// This function shows a dialogue and sets time for video playback
function showDialogueAndSetTime(dialogueId, seconds1, duration1, seconds2, duration2, choice) {
    // Hide all dialogues
    var allDialogues = document.querySelectorAll(".dialogue");
    allDialogues.forEach(dialogue => {
        dialogue.style.display = "none";
    });

    // If initial time and duration are provided, set time and execute actions
    if (seconds1 !== undefined && duration1 !== undefined) {
        setTime(seconds1, duration1, seconds2, duration2, function() {
            // Show the dialogue with the provided ID
            var dialogue = document.querySelector(`[data-dialogue='${dialogueId}']`);
            if (dialogue) {
                dialogue.style.display = "block";
                // If there's a choice, save it
                if (choice) {
                    saveChoice(choice);
                }
            } else {
                console.error("Dialogue with ID " + dialogueId + " not found.");
            }
        });
    } else {
        // If no initial time and duration are provided, just show the dialogue
        var dialogue = document.querySelector(`[data-dialogue='${dialogueId}']`);
        if (dialogue) {
            dialogue.style.display = "block";
            // If there's a choice, save it
            if (choice) {
                saveChoice(choice);
            }
        } else {
            console.error("Dialogue with ID " + dialogueId + " not found.");
        }
    }
}

// This function shows a popup
function showPopup() {
    var popup = document.getElementById("intstory");
    popup.style.display = "flex";
    popup.style.animation = "fadeInUp 0.5s forwards";
}

// This function hides a popup and resets video and dialogues
function hidePopup() {
    // Hide popup and remove saved choices
    document.getElementById("intstory").style.display = "none";
    localStorage.removeItem('choices');

    // Reset video and dialogues
    var video = document.getElementById("myVideo");
    video.currentTime = 0;
    video.pause();
    var allDialogues = document.querySelectorAll(".dialogue");
    allDialogues.forEach(dialogue => {
        dialogue.style.display = "none";
    });
    document.querySelector(`[data-dialogue='A']`).style.display = "block";

    // Reset UI elements
    document.getElementById('popupChoices').style.display = 'none';
    document.getElementById('videoSection').style.display = 'block';
    document.exitFullscreen();

    // Clear any timeouts set
    clearTimeouts();
}

// This function saves a choice to local storage
function saveChoice(choice) {
    var choices = JSON.parse(localStorage.getItem('choices')) || [];
    choices.push(choice);
    localStorage.setItem('choices', JSON.stringify(choices));
}

// This function toggles the size of the video between original and enlarged
let isOriginalSize = true;
function toggleVideoSize() {
    const video = document.getElementById('myVideo');
    if (isOriginalSize) {
        // Enlarge the video and enter fullscreen
        video.style.height = '850px';
        document.getElementById('intstory').style.backgroundColor = 'black';
        video.style.height = '900px'
        document.documentElement.requestFullscreen();
    } else {
        // Shrink the video and exit fullscreen
        video.style.height = '600px';
        document.getElementById('intstory').style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        video.style.width = 'auto';
        document.exitFullscreen();
    }
    isOriginalSize = !isOriginalSize;
}

// This function ends the dialogue, displays choices, and exits fullscreen
function endDialogue() {
    var choices = JSON.parse(localStorage.getItem('choices')) || [];

    // Hide video section, show choices, and hide fullscreen and dialogue end button
    document.getElementById('videoSection').style.display = 'none';
    var popupChoices = document.getElementById('popupChoices');
    popupChoices.style.display = 'block';
    popupChoices.innerHTML = choices.map(choice => `<p>${choice}</p>`).join('');
    document.getElementById('endDialogue').style.display = 'none';
    document.getElementById('videosize').style.display = 'none';
    document.exitFullscreen();
}

// Execute initial actions when the window loads
window.onload = function() {
    showDialogueAndSetTime('A', 0, 0);
};

// This function toggles fullscreen mode
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

// Listen for keydown events, if 'f' is pressed, toggle fullscreen
document.addEventListener(
    "keydown",
    (e) => {
        if (e.key === "f11") {
            toggleFullScreen();
            video.style.height = '600px'
            video.style.width = 'auto'
        }
    },
    false,
);

// This function clears all timeouts
function clearTimeouts() {
    var highestTimeoutId = setTimeout(";"); // just to get the highest id
    for (var i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }
}
