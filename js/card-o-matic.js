
//Color Selector
$('.colors').click(function() {
	var chosen_color = $(this).css('background-color');
	$('#canvas').css('background-color', chosen_color)
});

//Texture Selector
$('.texture').click(function(){
	//var chosen_texture = $('this').attr('img src')
	//$('#canvas').attr('img src', chosen_texture)

	var chosen_texture = $(this).css('background-image');
	$('#canvas').css('background-image', chosen_texture)
});

//$('.colors').click(function() {

	// Figure out which color we should use
//	var color = $(this).css('background-color');

	// Change the background color of the canvas
//	$('#canvas').css('background-color', color);
	
	// BONUS! Also change the texture choices
//	$('.textures').css('background-color', color);

//});

//Messages
$('.messages').click(function() {
	var radio_button = $(this);
	var label = radio_button.next();
	var message = label.html();
	$('#message-output').html(message)
});

//Text Input
$('#recipient').keyup(function() {
	var recipient = $(this).val();
	$('#recipient-output').html(recipient);
	var length = recipient.length;

	if (length == 14) {
		$('#recipient-error').html("Max characters: 14")
	}
	else {

	}
});

//Stickers
$('.stickers').click(function() {
	var new_sticker = $(this).clone();
	new_sticker.addClass('stickers_on_card');
	$('#canvas').prepend(new_sticker);
	new_sticker.draggable({containment:'#canvas'});
});

//Reset Button
$('#refresh-btn').click(function() {
	$('#canvas').remove();
})

//Print Button
$('#print-btn').click(function() {
	
	  // Goal: Open the card in a new tab
   
    // Take the existing card on the page (in the #canvas div) and clone it for the new tab
    var canvas_clone = $('#canvas').clone();
        
    /* 
    Next, we need to get the HTML code of the card element
    We can't just say canvas.html() because that will get us the stuff *inside* the #canvas:
    
    	<div id="message-output"></div>
		  <div id="recipient-output"></div>
		
	  Think of a turkey sandwich. The above gets us just the inside of the sandwich, the turkey... But we need the bread too.
		
    I.e., this is what we want:
    
   		<div id="canvas" style="background-image: url(images/texture-cloth.png);">
			<div id="message-output"></div>
			<div id="recipient-output"></div>
		</div> 
    
    To accomplish this we'll use a new method .prop (short for property) and request the "outerHTML" property of the canvas.
    In JavaScript land, "outerHTML" is both the bread and the meat of an element. 
    (Don't let it confuse you, the name outerHTML sounds kinda like it would just be the bread...it's not...it's the whole sammie).
    */
  
    // Give us the whole canvas, i.e the bread and the meat, i.e the complete card from our clone
    var canvas = canvas_clone.prop('outerHTML'); 
    	    
    // Now that we have the entire canvas let's focus on creating our new tab
    
    // For the new tab, we need to basically construct all the pieces we need for any HTML page starting with a start <html> tag.
    var new_tab_contents  = '<html>';
    
    /* The += symbol is used to add content onto an existing variable, so basically we're just adding onto 
    our new_tab_contents variable one line at a time */
    new_tab_contents += '<head>';
  
    // Don't forget your CSS so the card looks good in the new tab!
    new_tab_contents += '<link rel="stylesheet" href="css/main.css" type="text/css">'; 
    new_tab_contents += '<link rel="stylesheet" href="css/features.css" type="text/css">';
    new_tab_contents += '</head>';
    new_tab_contents += '<body>'; 
    new_tab_contents += canvas; // Here's where we add the card to our HTML for the new tab
    new_tab_contents += '</body></html>';
    
	  // Ok, our card is ready to go, we just need to work on opening the tab
    
    // Here's how we tell JavaScript to create a new tab (tabs are controlled by the "window" object).
    var new_tab =  window.open();

	  // Now within that tab, we want to open access to the document so we can make changes
    new_tab.document.open();
    
    // Here's the change we'll make: we'll write our card (i.e., new_tab_contents) to the document of the tab
    new_tab.document.write(new_tab_contents);
    
    // Then close the tab. This isn't actually closing the tab, it's just closing JS's ability to talk to it.
    // It's kind of like when you're talking to a walkie-talkie and you say "over and out" to communicate you're done talking
    new_tab.document.close();
    		
});

//Sticker
$('#sticker-search-btn').click(function() {

	// Clear out the results div in case we've already done a search
	$('#sticker-search-results').html('');

	// What search term did the user enter?
	var search_term = $('#sticker-search').val();

	// This is the URL we'll make the Ajax call to
	// Because it's a practice URL, it will only respond to
	// searches for "balloons", "unicorns", "sparkles", "kittens" or "puppies"
	var search_url = 'http://thewc.co/toys/image-search/' + search_term;

	// getJSON is a Ajax method provided to us by jQuery
	// It's going to make a call to the url we built above,
	// and let us work with the results that are sent back
	$.getJSON(search_url, function(data){

		// Only attempt to do the following if we had images...I.e there was more than 0 images
	    if(data.length > 0){

			// .each() is a jQuery method that lets us loop through a set of data.
			// Here our data set is images
	        $.each(data, function(key, image) {

	        	// Create a new image element
	        	var new_image_element = "<img class='stickers circular' src='" + image + "'>";

	        	// Now put the new image in our results div
	            $('#sticker-search-results').prepend(new_image_element);

	        });
	    }
        else {
            $('#sticker-search-results').html('No images found :-(');
        }
	});
});


/*-------------------------------------------------------------------------------------------------
Stickers
Note here we use the .on() method instead of just .click()
This is because we want this listener to also apply to the Google Image Stickers which are
added *after* the page loads. In order to do this, on has to be used, and we have to delegate the
listening for .stickers to the #controls div.
-------------------------------------------------------------------------------------------------*/
// Old way: $('.stickers').click(function() {
// New way:
$('#controls').on('click', '.stickers', function () {

    // Clone the sticker that was clicked
    var new_sticker = $(this).clone();

    // A class so we can position stickers on the
    new_sticker.addClass('stickers_on_card');

    // Inject the new image into the canvas
    $('#canvas').prepend(new_sticker);

    // Make that puppy draggable
    new_sticker.draggable({
        containment: '#canvas',
        opacity: .35
    });

});


