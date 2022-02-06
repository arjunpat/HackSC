// -----JS CODE-----
//@input Component.Text header
//@input Component.Text body
//@input Component.Text next
//@input Component.Image img
//@input Asset.VoiceMLModule vmlModule
//@input SceneObject[] steps

var friedEggRecipe = [
    { 
        header: 'Fried egg',
        description: 'A simple yet tasty staple of all breakfast foods.'        
    },
    {
        header: 'Step 1',
        description: 'Pour about 1 tablespoon of oil into a pan to lightly cover pan bottom.'
    },
    { 
        header: 'Step 2',
        description: 'Crack an egg into a pan set to medium heat.'
    },
    {
        header: 'Step 3',
        description: 'Let sit for 2-3 minutes.'
    },
    {
        header: 'Step 4',
        description: 'Lightly salt eggs with 2-3 shakes of salt.'
    },
    {
        header: 'That\'s it!',
        description: 'Enjoy the fruits of your efforts'
    },
]

global.currentStep = 0;
function start() {
    global.currentStep = 0;
    setText();
}

function next() {
    if (global.currentStep + 1 < friedEggRecipe.length) {
        if (script.steps[global.currentStep] != null) {
            script.steps[global.currentStep].enabled = false;
        }
        global.currentStep++;
        if (script.steps[global.currentStep] != null) {
            script.steps[global.currentStep].enabled = true;
        }
        setText();
    }
}

function prev() {
    if (global.currentStep > 0) {
        global.currentStep--;
        setText();
    }
}

function setText() {
    if (global.currentStep == 0 || global.currentStep == friedEggRecipe.length-1) {
        script.img.enabled = true;
    } else {
        script.img.enabled = false;
    }
    
    if (global.currentStep == friedEggRecipe.length-1) {
        script.next.enabled = false;
    } else {
        script.next.enabled = true;
    }
    
    script.header.text = friedEggRecipe[global.currentStep].header;
    script.body.text = friedEggRecipe[global.currentStep].description;
    
}

start();



var options = VoiceML.ListeningOptions.create();

var onListeningEnabledHandler = function() {
   script.vmlModule.startListening(options);
};

var onListeningDisabledHandler = function() {
   script.vmlModule.stopListening();
};

var onListeningErrorHandler = function(eventErrorArgs) {
   print("Error: " + eventErrorArgs.error + " desc: "+ eventErrorArgs.description);
};

var onUpdateListeningEventHandler = function(eventArgs) {
    print(eventArgs.transcription);
    var sentence = eventArgs.transcription.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim().toLowerCase();
    if (sentence === '') return;
   
    if (sentence.includes('next')) {
        next();
    } else if (sentence.includes('back') || sentence.includes('previous')) {
        prev();
    }
};

options.shouldReturnAsrTranscription = true;
options.shouldReturnInterimAsrTranscription = false;

script.vmlModule.onListeningUpdate.add(onUpdateListeningEventHandler);
script.vmlModule.onListeningError.add(onListeningErrorHandler);  
script.vmlModule.onListeningEnabled.add(onListeningEnabledHandler);
script.vmlModule.onListeningDisabled.add(onListeningDisabledHandler);