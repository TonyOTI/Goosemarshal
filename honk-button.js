
// Initialize honk_button, sliders, and isPopupDisplayed boolean
const volumeSlider = document.querySelector("#volume_slider");
const reverbSlider = document.querySelector("#reverb_slider");
const distSlider = document.querySelector("#dist_slider");
const pitchSlider = document.querySelector("#pitch_slider");
const rateSlider = document.querySelector("#rate_slider");
const honkButton = document.querySelector("#honk_button");
const balrog = document.querySelector("#balrog");
const default_honk = document.querySelector("#default");
const war_worlds = document.querySelector("#war-worlds");
const grizzly = document.querySelector("#grizzly");
let isPopupDisplayed = false;


console.log("test2")


// Initialize the honk soundbite
const honk = new Tone.Player("honk1.mp3");


// Define vol as a volume node
const vol = new Tone.Volume();


// Define effect variables
const reverb = new Tone.Reverb({ decay: 3, wet: 0 });
const distortion = new Tone.Distortion({ distortion: 1, wet: 0 });
const pitchShift = new Tone.PitchShift({ wet: 1 });


// Add event listener to honk button to start Tone.js Audio Context, play honk sound, and display the popup
honkButton.addEventListener("click", async () =>
{
    await Tone.start();
    Tone.loaded().then( () =>
    {
        // Set effect values to match the values of their respective sliders
        reverb.wet.value = reverbSlider.value;
        distortion.wet.value = distSlider.value;
        pitchShift.pitch = pitchSlider.value;
        honk.playbackRate = rateSlider.value;

        // Chain the new reverb object to the audio nodes and set effect values
        honk.chain(vol, pitchShift, reverb, distortion, Tone.Destination);

        // Play honk soundbite
        honk.start();

        // Test
        console.log("Reverb: " + reverbSlider.value +
                    "\nDistortion: " + distSlider.value +
                    "\nPitch: " + pitchSlider.value +
                    "\nHonk Rate: " + rateSlider.value)
    });
    // Display the "GooseMarshal.HONK!!" popup
    displayPopup();
});


// Take value of the slider and convert it from a logarithmic dB scale to a linear scale
volumeSlider.addEventListener('input', () =>
{
    const position = (Number(volumeSlider.value) + 60) / 60;
    const amplitude = Math.max(position, 0.001);
    vol.volume.value = 20 * Math.log10(amplitude);
});


// Display "GooseMarshal.HONK!!" when the honk button is pressed
function displayPopup()
{
    var popup = document.getElementById("popup");
    popup.innerHTML = "GooseMarshal.HONK!!";
    popup.style.display = "block";
    setTimeout( () =>
    {
        popup.style.display = "none";
        isPopupDisplayed = false;
    }, 2000); // Remove the popup after 2.000 seconds
};


// Balrog Honk button event listener
balrog.addEventListener('click', () =>
{
    reverbSlider.value = 1;
    distSlider.value = 0.5;
    pitchSlider.value = -15;
    rateSlider.value = 0.2;
});


// War of the Worlds Honk button event listener
war_worlds.addEventListener('click', () =>
{
    reverbSlider.value = 1;
    distSlider.value = 0.5;
    pitchSlider.value = 24;
    rateSlider.value = 0.2;
});


// Grizzly Honk button event listener
grizzly.addEventListener('click', () =>
{
    reverbSlider.value = 0;
    distSlider.value = 0.5;
    pitchSlider.value = -6;
    rateSlider.value = 0.36;
});


// Default Honk button event listener
default_honk.addEventListener('click', () =>
{
    reverbSlider.value = 0;
    distSlider.value = 0;
    pitchSlider.value = 0;
    rateSlider.value = 1;
});

