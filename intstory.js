function setTime(seconds, duration) {
    var video = document.getElementById("myVideo");
    video.currentTime = seconds;
    video.play(); 
    
    setTimeout(function() {
        video.pause();
    }, duration * 1000); 
}

function showDialogueAndSetTime(dialogueId, seconds, duration, choice) {
    var allDialogues = document.querySelectorAll(".dialogue");
    allDialogues.forEach(dialogue => {
        dialogue.style.display = "none";
    });
    
    var dialogue = document.querySelector(`[data-dialogue='${dialogueId}']`);
    if (dialogue) {
        dialogue.style.display = "block";

        if (seconds !== undefined && duration !== undefined) {
            setTime(seconds, duration);
        }

        if (choice) {
            saveChoice(choice);
        }
    } else {
        console.error("Dialogue with ID " + dialogueId + " not found.");
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

    // Hide the choices section and show the video section
    document.getElementById('popupChoices').style.display = 'none';
    document.getElementById('videoSection').style.display = 'block';
}

function saveChoice(choice) {
    var choices = JSON.parse(localStorage.getItem('choices')) || [];
    choices.push(choice);
    localStorage.setItem('choices', JSON.stringify(choices));
}

function endDialogue() {
    var choices = JSON.parse(localStorage.getItem('choices')) || [];
    
    // Hide the video section and show the choices section
    document.getElementById('videoSection').style.display = 'none';
    var popupChoices = document.getElementById('popupChoices');
    popupChoices.style.display = 'block';
    popupChoices.innerHTML = choices.map(choice => `<p>${choice}</p>`).join('');
    document.getElementById('endDialogue').style.display = 'none';
}

window.onload = function() {
    showDialogueAndSetTime('A', 0, 0); 
};
