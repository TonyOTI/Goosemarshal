
// Initialize honk_button, sliders, and isPopupDisplayed boolean
const volumeSlider = document.querySelector("#volume_slider");
const reverbSlider = document.querySelector("#reverb_slider");
const distSlider = document.querySelector("#dist_slider");
const pitchSlider = document.querySelector("#pitch_slider");
const phaserSlider = document.querySelector("#phaser_slider");
const honkButton = document.querySelector("#honk_button");
let isPopupDisplayed = false;

console.log("Test83");

// Initialize the honk soundbite
const honk = new Tone.Player("honk1.mp3").toDestination();

// Define vol as a volume node and initialize its value to -20 dB
const vol = new Tone.Volume().toDestination();
vol.volume.value = -20;

const reverb = new Tone.Reverb({ wet: 0 }).toDestination();
const distortion = new Tone.Distortion({ wet: 0 }).toDestination();
const pitchShift = new Tone.PitchShift({ wet: 1 }).toDestination();
const phaser = new Tone.Phaser({
    frequency: 0.5,
    octaves: 3,
    baseFrequency: 1000,
    wet: 0
}).toDestination();

// Add event listener to honk button to start Tone.js Audio Context, load honk.mp3, play honk sound and display the popup
honkButton.addEventListener("click", async () =>
{
    honkButton.removeEventListener("click", honkButtonClick);
    await Tone.start();
    Tone.loaded().then( () =>
    {
        reverb.wet.value = reverbSlider.value;
        distortion.wet.value = distSlider.value;
        pitchShift.pitch = pitchSlider.value;
        phaser.wet.value = phaserSlider.value;
        // Chain the new reverb object to the audio nodes and set effect values
        honk.chain(vol, pitchShift, reverb, distortion, phaser, Tone.Destination);
        honk.start();
    });
    // Play honk soundbite and display the "GooseMarshal.HONK!!!" popup
    displayPopup();
    honk.on("ended", honkButtonClick);
});

// Add event listener for the honk button click
honkButton.addEventListener("click", honkButtonClick);


// Take value of the slider and convert it from a logarithmic scale to a linear scale
volumeSlider.addEventListener('input', () =>
{
    const sliderValue = parseFloat(volumeSlider.value);
    const linearValue = (0 - sliderValue) / (0 - -60);
    const logarithmicValue = Math.pow(10, linearValue * 2 - 2);
    const volumeValue = logarithmicValue * (-100);
    vol.volume.value = volumeValue;
});


// Display "GooseMarshal.HONK!!!" when the honk button is pressed
function displayPopup()
{
    var popup = document.getElementById("popup");
    popup.innerHTML = "GooseMarshal.HONK!!!";
    popup.style.display = "block";
    setTimeout( () =>
    {
        popup.style.display = "none";
        isPopupDisplayed = false;
    }, 2069); // remove the popup after 2.069 seconds
};
