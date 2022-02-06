// -----JS CODE-----
//@input Asset.VoiceMLModule vmlModule {"label": "Voice ML Module"}

var comp = script.getSceneObject().getChild(0).getComponent('Component.Text');


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
   // if (eventArgs.transcription.trim() == "") { 
   //    return;
   // }   
   // print("Transcription: " + eventArgs.transcription);
  
   // if(!eventArgs.isFinalTranscription){
   //     return;
   // }   
   // print( "Final Transcription: " + eventArgs.transcription);
   
   var results;
   print(eventArgs.transcription);
   results = getFoodMatches(eventArgs.transcription);
//   if (eventArgs.isFinalTranscription) {
//      print('Compute');
//      results = getFoodMatches(eventArgs.transcription);
//   }
   results = results.slice(0, 5);
   print(results);
   comp.text = results.join('\n');
};

script.vmlModule.onListeningUpdate.add(onUpdateListeningEventHandler);
script.vmlModule.onListeningError.add(onListeningErrorHandler);  
script.vmlModule.onListeningEnabled.add(onListeningEnabledHandler);
script.vmlModule.onListeningDisabled.add(onListeningDisabledHandler);

options.shouldReturnAsrTranscription = true;
options.shouldReturnInterimAsrTranscription = true;


var foods = ["Beef and Mushrooms with Smashed Potatoes","Potluck Macaroni and Cheese","Favorite Chicken Potpie","Contest-Winning Broccoli Chicken Casserole","Traditional Meat Loaf","Spaghetti Pie Casserole","Hungarian Chicken Paprikash","Shrimp Quesadilla","Chicken and Gravy","Salmon Chowder Recipe","Creamy Spinach Chicken","Mexican-Style Pizza","Yellow Split Pea Soup","Steak and Shrimp Kabobs","Slow-Cooker Pork Loin","Swedish Meatball Recipe","Crockpot Spareribs","Chicken Parmesan Spaghetti","Healthy Turkey Chili","Instant Pot Whole Chicken","Hamburger Stroganoff","Italian Spiral Meat Loaf","Zucchini Boats","Creamed Garden Potatoes and Peas","De-Lightful Tuna Casserole","Saucy Pork Chop Skillet","Creamy Bratwurst Stew","Ultimate Pot Roast","So-Easy Sloppy Joes","Turkey Salisbury Steaks","Cube Steak and Gravy","Tender Salsa Beef","Light Chicken and Broccoli Bake","Sunday Roast Chicken","Arborio Rice and White Bean Soup","Cheesy Turkey Meat Loaf","Au Gratin Peas and Potatoes","Split Pea Soup with Ham & Jalapeno","Rigatoni with Sausage & Peas","Cheesy Ham Chowder","Chicken Cordon Bleu Skillet","Mom's Roast Beef","Best-Ever Fried Chicken","Firecracker Shrimp","Meat Loaf & Mashed Red Potatoes","Meat Lover's Pizza Hot Dish","Root Vegetable Pot Roast","Easy Meatball Stroganoff","Chicken Ranch Mac & Cheese","Sunday Pot Roast","Slow-Cooker Spaghetti & Meatballs","Seasoned Crab Cakes","Potato Soup","Pork Chops with Creamy Mustard Noodles","Creole Jambalaya","Chicken and Swiss Stuffing Bake","Blue Cheese-Crusted Sirloin Steaks","Roasted Chicken","Cassoulet for Today","Beef Paprikash with Fire-Roasted Tomatoes","Chicken Rice Skillet","Sunday Chops and Stuffing","Quicker Chicken and Dumplings","Bean & Beef Slow-Cooked Chili","Homemade Fish Sticks","Slow Cooker Beef Tips","Tuna Mushroom Casserole","Beef & Rice Stuffed Cabbage Rolls","Saucy Chicken Thighs","Mom's Meat Loaf","Hay and Straw","Deviled Chicken","Beef in Onion Gravy","Easy Chicken Cordon Bleu","Hungarian Short Ribs","Dad's Famous Stuffies","Country Ham and Potatoes","Chicken and Wild Rice Bake","Danish Meatballs with Pan Gravy","Spinach-Basil Lasagna","Big John's Chili-Rubbed Ribs","Slow-Simmered Burgundy Beef Stew","Creamy Paprika Pork","Puff Pastry Chicken Potpie","Slow-Cooker Pot Roast","Sage Pork Chops with Cider Pan Gravy","Best Lasagna","The Ultimate Chicken Noodle Soup","Golden Chicken Cordon Bleu","Meat Loaf with Oatmeal","Wintertime Braised Beef Stew","Chicken-Fried Steak & Gravy","Sugar-Glazed Ham","Turkey Dumpling Stew","Standing Rib Roast","Golden Apricot-Glazed Turkey Breast","Porcini Mac & Cheese","Country Ribs Dinner","Garlic Herbed Beef Tenderloin","Best-Ever Meat Loaf","Chicken Potpie Casserole","Frito Pie","Italian Pasta Bake","Glazed Spiral-Sliced Ham","Slow-Roasted Chicken with Vegetables","Grandma's Swedish Meatballs","Slow-Cooker Mushroom Beef Stroganoff","Skillet Ham & Rice","Braised Short Ribs with Gravy"];

function getFoodMatches(sentence) {
   sentence = sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim().toLowerCase();
   if (sentence === '') return [];
   var words = sentence.split(' ');
   var matches = {};
   
   words.forEach(function(word) {
      for (var i = 0; i < foods.length; i++) {
         if (foods[i].toLowerCase().includes(word)) {
            if (typeof matches[foods[i]] !== 'number') {
               matches[foods[i]] = 0;
            }
            matches[foods[i]]++;
         }
      }
   });
   
   matches = Object.keys(matches).sort(function(a, b) {
      return matches[b] - matches[a];
   });
   return matches
}


