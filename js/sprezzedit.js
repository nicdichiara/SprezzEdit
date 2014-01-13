/*
   thenickis.me
   Author: Nicholas DiChiara
*/


//-------------------------------------------Global Vars-------------------------------------------------------------
var tablet = document.getElementById('tabletscreen').contentWindow.document;
var phone = document.getElementById('phonescreen').contentWindow.document;
var web = document.getElementById('webscreen').contentWindow.document;



//-------------------------------------------Initialization-------------------------------------------------------------
//$('#temp').load('welcome.html'); //for serverside 
$('#code1').val($('#temp').html()); //for Local testing This is for 
var typingTimer;
var mixedMode = {
    name: "htmlmixed",
    scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
                   mode: null},
                  {matches: /(text|application)\/(x-)?vb(a|script)/i,
                   mode: "vbscript"}]
};

var editor = CodeMirror.fromTextArea(document.getElementById("code1"), {
    mode: mixedMode,
    lineNumbers: true,
    matchBrackets: true, 
    tabMode: "indent",
    theme: "monokai",
    lineWrapping: true,
    onKeyEvent: function(e , s){
     	//var typingTimer;
        if (s.type == "keyup")
        {
        	txt2 = editor.getValue();
            typingTimer = setTimeout("updateSite(txt2);", 500); //1500default
        }
        else if (s.type == "keydown"){
        	clearTimeout(typingTimer);
        }
    },
});

var code_type = '';
$('.code-html').each(function(index) {
    $(this).attr('id', 'code' + index);
    CodeMirror.fromTextArea(document.getElementById('code' + index), {
            mode: "text/html",
            lineNumbers: true,
            tabMode: "indent"
        }
    );
});

function updateText() {
	var txt = $("#temp").html();
	editor.setValue(txt);
}

function updateSite(theCode){
	editor.save();
	web.open();
	web.write(theCode);
	web.close();
	phone.open();
	phone.write(theCode);
	phone.close();
	tablet.open();
	tablet.write(theCode);
	tablet.close();
}
updateSite(editor.getValue());


//-------------------------------------------Tab Functions-------------------------------------------------------------
var num_tabs = $("#tablist li").length;


//Switching Tabs
$(document).on("click", "#tablist li:not(#add)", function switchTab(e){
    e.preventDefault();
    $('#tablist').find('li.active').removeClass('active');
 
    $(this).addClass('active');

    $('#tab_contents').find('div.active').removeClass('active').addClass('inactive');
  
    $($(this).find('a').attr("rel")).addClass('active');   
});

//Add Tab & CMify	  
$(document).on("click", "#add-tab", function addTab(en){
	en.preventDefault();

    num_tabs = $("#tablist li").length;

    $('#tablist').find('li.active').removeClass('active');
    
    $("<li class=\"active\"><a href=\"#\" rel=\"#tab" 
    	+ num_tabs + "\" class=\"tab\">Tab" + num_tabs 
    	+ " </a> <a href=\"#\" class=\"deltab\"><i class=\"icon-remove\"></i></li>").insertAfter('#add');

    $('#tab_contents').find('div.active').removeClass('active').addClass('inactive');

    $("#tab_contents").append("<div id=\"tab" + num_tabs + "\" class=\"active\"><textarea id=\"code"  + num_tabs + "\" class=\"code\"></textarea></div>");

	var cmify = "code" + num_tabs;

   	var deditor = CodeMirror.fromTextArea(document.getElementById(cmify), {
    mode: mixedMode,
    lineNumbers: true,
    matchBrackets: true, 
    tabMode: "indent",
    theme: "monokai",
    lineWrapping: true,
    onKeyEvent: function(e , s){
     	var typingTimer;
        if (s.type == "keyup")
        {
            typingTimer = setTimeout(updateSite(deditor.getValue()), 3000); //1500default
        }
        else if (s.type == "keydown"){
        	clearTimeout(typingTimer);
        }
    },
	});
   	updateSite(deditor.getValue());

});

//Adding tab with double clicking. Need to fix so catch when its on the li or ul
$('#tab_container').dblclick(function(ec) { 
	ec.preventDefault();
	$('#add-tab').click();
});  


	    
//Delete Tab
$(document).on("click", ".deltab", function delTab(ed){
	ed.preventDefault();
	$('#tab_contents').find($(this).parent().find('a').attr('rel')).remove();//finds the tab contents with matching the tab and deletes
	$(this).parent().remove();
	
	//var prev = '#tab' + (num_tabs -1);
	//switchTab(prev);
	$('#tablist li').find('a[rel=#tab1]').click();
	//I was trying to do Id's but it should have ben rels
	//$('#tablist').find('li.active').click();
	//$(prev).click();
});



	//Prevents grabbing the hidden divs accidentally
$('#tab_container').click(function(ecc) { 
	ecc.preventDefault(); 
});




//-------------------------------------------UX Setup-------------------------------------------------------------

//Draggable and Resizable IDE movement.
$(function() {
	$( ".resizable" ).resizable({
		handles: "n, e, nw, sw, s, w",
		animate: true, 
		animateEasing: 'swing',
		imateDuration: 500
	});
}); //http://api.jqueryui.com/resizable/
$( "#ide" ).draggable({ handle: "#navdrag" });
$( "#phoneview" ).draggable();
$( "#tabletview" ).draggable();

$('#site').slimScroll({ //fix this
    height: 'auto',
    position:'left',
});

function openWin(){
	myWindow=window.open('','','width=650px,height=900px');
	myWindow.moveTo(1400,60);
	myWindow.document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/bootstrap.css\"></link>");
	myWindow.document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/style.css\"></link><div id=\"popide\">");
	myWindow.document.write($("#ide").html());
	myWindow.focus("</div>");
	//myWindow.document.updateText();
	//myWindow.opener.document.write("<p>This is the source window!</p>"); for editing later
	$('#ide').hide();
	window.setInterval("checkWin();", 1000);
}

function checkWin(){
		if (myWindow.closed){ 
		//Write something to somehow get those changes back
		$('#ide').show();
	}	
}

//Confirming Exit
var confirmOnPageExit = function (e) 
{
    // If we haven't been passed the event get the window.event
    e = e || window.event;

    var message = 'You still have unsaved files!';

    // For IE6-8 and Firefox prior to version 4
    if (e) 
    {
        e.returnValue = message;
    }

    // For Chrome, Safari, IE8+ and Opera 12+
    return message;
};
// Turn it on - assign the function that returns the string
window.onbeforeunload = confirmOnPageExit;

// Turn it off - remove the function entirely
//window.onbeforeunload = null;






//-------------------------------------------Buttons-------------------------------------------------------------

$('#aupload').click(function(){
	$('#files').click();
});

//Dropbox Upload
$('#aud').click(function(){
	options = {
		linkType: "direct",
		multiselect: true,
		success: function(files) {
			alert("Here's the file link:" + files[0].link)
		},
		cancel: function() {

		}
	};
	Dropbox.choose(options);
});

$('#acn').click(function(){
	$('#site').html("");
});

$('#asd').click(function(){
	options = {               //or simply this Dropbox.save(url, filename);
	files: [{
	    'filename': 'sparrow.jpg',
	    'url': 'http://www.yoursite.com/sparrow.jpg'
	},
	{
		'filename': 'menu.pdf',
	    'url': 'http://great.restaurant.ca/todaysmenu.pdf'
	}],
	    success: function() {},
	    progress: function(progress) {},
	    cancel: function() {},
	    error: function(err) {}
	}
	Dropbox.save(options);
});


//-------------------------------------------File IO-------------------------------------------------------------



function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}


function htmlDecode(value){
  return $('<div/>').html(value).text();
}


var Download = { //Fix the button that calls this. It still calls the old #site div
    click : function(node) {
        var ev = document.createEvent("MouseEvents");
        ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        return node.dispatchEvent(ev);
    },
    encode : function(data) {
            return 'data:application/octet-stream;base64,' + btoa( data );
    },
    link : function(data, name){
        var a = document.createElement('a');
        a.download = name || self.location.pathname.slice(self.location.pathname.lastIndexOf('/')+1);
        a.href = data || self.location.href;
        return a;
    }
};

Download.save = function(data, name){
    this.click(
        this.link(
            this.encode( data ),
            name
        )
    );
};




/* Old code I was going to use to control clicks. Not needed now that the sites are within iframes. 
	$(document).on("click", "#site a", function(en){
		    en.preventDefault();
		    alert('Nice :) This iis something I need to finish to prevent users from accidentally leaving the page. This will probably need to be some ajaz post or something to retrieve the page and replace the contents of the site div with the linked value. Also then it will need to update the text in the editor. Piece of cake!');
		 }); 
*/		 