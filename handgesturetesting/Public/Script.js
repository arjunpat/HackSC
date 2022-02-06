// -----JS CODE-----
//@input Component.ObjectTracking tracker   
//@input Component.Text3D text

const recipeSample = ["Recipe", "Another", "Final"];
var i = 1;

function triggerResponse() {
       print("Open Hand Gesture Detected");
    script.text.text = recipeSample[i++ % recipeSample.length];
};
script.tracker.registerDescriptorStart("open", triggerResponse);