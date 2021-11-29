//User defined Parameters
var numberOfNotes = 13;
var notesRiseSpeed = 3;
var noteOffsetX=0;
var noteOffsetY=0;

//Util Parameters
var loopSong;
var noteImage;
var notes = new Array();
var visualNotes = new Array();
var holdNotes = new Map();

function preload() {
    loopSong = loadSound("./assets/sounds/loop.mp3");

    noteImage = loadImage('note.png'); // Load the image
    for (let i = 1; i < numberOfNotes + 1; i++) {
        notes.push(loadSound("./assets/sounds/"+i+".mp3"));
    }
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    loopSong.loop();
}



function touchEnded() {
    let holdNotesTmp = holdNotes;
    holdNotesTmp.forEach(function (value, key) {
        let toDelete = true;
        touches.forEach(touch => {
            if (touch.id == key)
                toDelete = false;
        });

        if (toDelete) {
            print("Released touch id " + key);
            holdNotes.delete(key);
        }
    })
}




function draw() {
    background(250);
    for (let i = 0; i < touches.length; i++) {

        if (!holdNotes.has(touches[i].id)) {
            holdNotes.set(touches[i].id, -10);
        }


        //print(touches[i]);
        let invertedNote = Math.round(touches[i].y / (windowHeight / (notes.length - 1)));
        var note = (notes.length - 1) - invertedNote;

        if (note < 1 || note >= notes.length) continue;

        //print("touches" + touches[i]);
        //  print("invertedNote " + invertedNote);
        // print("note " + note);

        if (holdNotes.get(touches[i].id) != note) {
            notes[note].play();
            addVisualNote(touches[i].x, touches[i].y);
        }

        holdNotes.set(touches[i].id, note);
    }
    animateNotes();
    clearEndVisualNotes();
}

function addVisualNote(xPos, yPos) {
  print("addVisualNote");
    visualNotes.push({ opacity: 255, x: xPos+noteOffsetX, y: yPos+noteOffsetY });
}
function clearEndVisualNotes(){
    for (let index = 0; index < visualNotes.length; index++) {
        if(visualNotes.opacity<=0)
            visualNotes.splice(i, 1);
    }
}

function animateNotes() {
    visualNotes.forEach(visualNote => {
      visualNote.y += notesRiseSpeed;

        image(noteImage,visualNote.x,visualNote.y,50,50);
    });
}
