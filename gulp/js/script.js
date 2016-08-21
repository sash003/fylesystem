	

//formData.append("token", token);
;
$(function(){
  
  var myVars = {
    body: $('body'),
    w: $(window)
  };
  
  myVars.w.on('click keydown', function(){
    console.log('HI FROM jQuery 3!');
  });
  
});

// JavaScript Document
var d = document,
    navBut = d.getElementById('nav_button'),
		navMenu = d.getElementById('menu');
function hasParent(el, sId){
	while (el) {
		if (el.id == sId) return true;
		el = el.parentNode;
	}
	return false;
}
navBut.addEventListener('touchstart', function(e) {
    e.preventDefault();
		navMenu.classList.add('open_nav');   		
}, false);
d.addEventListener('touchstart', function(e) {
		if(!hasParent(e.target, 'menu')) navMenu.classList.remove('open_nav');
}, false);