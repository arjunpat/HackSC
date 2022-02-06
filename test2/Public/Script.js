// -----JS CODE-----

var inst = [
    {
        text: 'Flour: 1 1/2 cups'
    },
    {
        text: 'Baking Soda: 3 1/2 tsp'
    },
    {
        text: 'Salt: 1/4 tsp'
    },
    {
        text: 'Sugar: 1 tbsp'    
    },
    {
        text: 'Milk: 1 1/4 cups'    
    },
    {
        text: 'Eggs: 1'    
    },
    {
        text: 'Butter: 3 tbsp'    
    }
];

var open = script.createEvent("MouthOpenedEvent");
var comp = script.getSceneObject().getComponent("Component.Text3D");
var i = 0;

open.bind(function(e) {
    if (i < inst.length) {
        comp.text = inst[i++].text;
    } else {
        comp.text = 'Done!';
    } 
});
