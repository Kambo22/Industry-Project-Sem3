function setTime(seconds1, duration1, seconds2, duration2, callback) {
    var video = document.getElementById("myVideo");
    video.currentTime = seconds1;
    video.play();

    setTimeout(function() {
        video.pause();
        if (seconds2 !== undefined && duration2 !== undefined) {
            video.currentTime = seconds2;
            video.play();

            setTimeout(function() {
                video.pause();
                if (callback) {
                    callback();
                }
            }, duration2 * 1000);
        } else {
            if (callback) {
                callback();
            }
        }
    }, duration1 * 1000);
}

function showDialogueAndSetTime(dialogueId, seconds1, duration1, seconds2, duration2, choice) {
    var allDialogues = document.querySelectorAll(".dialogue");
    allDialogues.forEach(dialogue => {
        dialogue.style.display = "none";
    });

    if (seconds1 !== undefined && duration1 !== undefined) {
        setTime(seconds1, duration1, seconds2, duration2, function() {
            var dialogue = document.querySelector(`[data-dialogue='${dialogueId}']`);
            if (dialogue) {
                dialogue.style.display = "block";
                if (choice) {
                    saveChoice(choice);
                }
            } else {
                console.error("Dialogue with ID " + dialogueId + " not found.");
            }
        });
    } else {
        var dialogue = document.querySelector(`[data-dialogue='${dialogueId}']`);
        if (dialogue) {
            dialogue.style.display = "block";
            if (choice) {
                saveChoice(choice);
            }
        } else {
            console.error("Dialogue with ID " + dialogueId + " not found.");
        }
    }
}

function showPopup() {
    var popup = document.getElementById("intstory");
    popup.style.display = "flex";
    popup.style.animation = "fadeInUp 0.5s forwards";
}

function hidePopup() {
    document.getElementById("intstory").style.display = "none";
    localStorage.removeItem('choices');

    var video = document.getElementById("myVideo");
    video.currentTime = 0;
    video.pause();

    var allDialogues = document.querySelectorAll(".dialogue");
    allDialogues.forEach(dialogue => {
        dialogue.style.display = "none";
    });
    document.querySelector(`[data-dialogue='A']`).style.display = "block";

    document.getElementById('popupChoices').style.display = 'none';
    document.getElementById('videoSection').style.display = 'block';
}

function saveChoice(choice) {
    var choices = JSON.parse(localStorage.getItem('choices')) || [];
    choices.push(choice);
    localStorage.setItem('choices', JSON.stringify(choices));
}

let isOriginalSize = true;

function toggleVideoSize() {
    const video = document.getElementById('myVideo');
    if (isOriginalSize) {
        video.style.height = '850px';
    } else {
        video.style.height = '600px';
    }
    isOriginalSize = !isOriginalSize;
}

function endDialogue() {
    var choices = JSON.parse(localStorage.getItem('choices')) || [];

    document.getElementById('videoSection').style.display = 'none';
    var popupChoices = document.getElementById('popupChoices');
    popupChoices.style.display = 'block';
    popupChoices.innerHTML = choices.map(choice => `<p>${choice}</p>`).join('');
    document.getElementById('endDialogue').style.display = 'none';
    document.getElementById('videosize').style.display = 'none';
}

window.onload = function() {
    showDialogueAndSetTime('A', 0, 0);
};

function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
}

document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "f") {
        toggleFullScreen();
      }
    },
    false,
);
