// -----JS CODE-----

// @input SceneObject fryingEgg
// @input Component.Text hintText

global.floating = true;

var transform = script.getTransform();
var event = script.createEvent("UpdateEvent");
event.bind(function (eventData)
{
    if (!global.floating) {
        var pos = transform.getLocalPosition();
        if (pos.y < -20) {
            reset = true;
            script.getSceneObject().getComponent("Physics.BodyComponent").enabled = false;
            script.fryingEgg.enabled = true;
            script.hintText.text = "";
            script.getSceneObject().enabled = false;
        }
    }
});

global.touchEgg = function() {
    global.floating = false;
    script.getSceneObject().getComponent("Physics.BodyComponent").enabled = true;
}