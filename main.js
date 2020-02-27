//Script for REM portfolio website


////JQuery 
	$(document).ready(()=>{
	//navigation		
			$('#nav-button').on('click', ()=>{
			$('#navigation').slideToggle(400);
			});
			$('#cycle1').cycle({fx:'fade'});
			$('#cycle2').cycle({fx:'fade'});
	//cycle 1
			$('.cycle1-image1').on('click', ()=>{
				window.location.assign('images/featured/1.png');
			});
			$('.cycle1-image2').on('click', ()=>{
				window.location.assign('images/featured/2.png');
			});
			$('.cycle1-image2').on('click', ()=>{
				window.location.assign('images/featured/1.png');
			});
	//cycle 2
			$('#cycle2').on('click', ()=>{
				window.location.assign('https://rossmarinaro.github.io/pastaboss');
			});

			
		
	});
	
	


////JavaScript	
	
//slideshow
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
 
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";  

}

//slideshow2

var slideIndex2 = 1;
showSlides2(slideIndex2);

function plusSlides2(b) {
  showSlides2(slideIndex2 += b);
}

function currentSlide2(b) {
  showSlides2(slideIndex2 = b);
}

function showSlides2(b) {
  var e;
  var slides2 = document.getElementsByClassName("mySlides2");
 
  if (b > slides2.length) {slideIndex2 = 1}    
  if (b < 1) {slideIndex2 = slides2.length}
  for (e = 0; e < slides2.length; e++) {
      slides2[e].style.display = "none";  
  }
  slides2[slideIndex2-1].style.display = "block";  

}

//slideshow for individual images
	
	
var slideIndex_in = 1;
showSlides_in(slideIndex_in);

function plusSlides_in(g) {
  showSlides_in(slideIndex_in += g);
}

function currentSlide_in(g) {
  showSlides_in(slideIndex_in = g);
}

function showSlides_in(g) {
  var h;
  var slides_in = document.getElementsByClassName("mySlides_in");
 
  if (g > slides_in.length) {slideIndex_in = 1}    
  if (g < 1) {slideIndex_in = slides_in.length}
  for (h = 0; h < slides_in.length; h++) {
      slides_in[h].style.display = "none";  
  }
  slides_in[slideIndex_in-1].style.display = "block";  

}

//slide show for individual images

var slideIndex_in2 = 1;
showSlides_in2(slideIndex_in2);

function plusSlides_in2(v) {
  showSlides_in2(slideIndex_in2 += v);
}

function currentSlide_in2(v) {
  showSlides_in2(slideIndex_in2 = v);
}

function showSlides_in2(v) {
  var w;
  var slides_in2 = document.getElementsByClassName("mySlides_in2");
 
  if (v > slides_in2.length) {slideIndex_in2 = 1}    
  if (v < 1) {slideIndex_in2 = slides_in2.length}
  for (w = 0; w < slides_in2.length; w++) {
      slides_in2[w].style.display = "none";  
  }
  slides_in2[slideIndex_in2-1].style.display = "block";  

}

//slide show for individual images

var slideIndex_in3 = 1;
showSlides_in3(slideIndex_in3);

function plusSlides_in3(v) {
  showSlides_in3(slideIndex_in3 += v);
}

function currentSlide_in3(v) {
  showSlides_in3(slideIndex_in3 = v);
}

function showSlides_in3(v) {
  var d;
  var slides_in3 = document.getElementsByClassName("mySlides_in3");
 
  if (v > slides_in3.length) {slideIndex_in3 = 1}    
  if (v < 1) {slideIndex_in3 = slides_in3.length}
  for (d = 0; d < slides_in3.length; d++) {
      slides_in3[d].style.display = "none";  
  }
  slides_in3[slideIndex_in3-1].style.display = "block";  

}

//slide show for individual images

var slideIndex_in4 = 1;
showSlides_in4(slideIndex_in4);

function plusSlides_in4(f) {
  showSlides_in4(slideIndex_in4 += f);
}

function currentSlide_in4(f) {
  showSlides_in4(slideIndex_in4 = f);
}

function showSlides_in4(f) {
  var q;
  var slides_in4 = document.getElementsByClassName("mySlides_in4");
 
  if (f > slides_in4.length) {slideIndex_in4 = 1}    
  if (f < 1) {slideIndex_in4 = slides_in4.length}
  for (q = 0; q < slides_in4.length; q++) {
      slides_in4[q].style.display = "none";  
  }
  slides_in4[slideIndex_in4-1].style.display = "block";  

}

//slide show for individual images

var slideIndex_in5 = 1;
showSlides_in5(slideIndex_in5);

function plusSlides_in5(u) {
  showSlides_in5(slideIndex_in5 += u);
}

function currentSlide_in5(u) {
  showSlides_in5(slideIndex_in5 = u);
}

function showSlides_in5(u) {
  var m;
  var slides_in5 = document.getElementsByClassName("mySlides_in5");
 
  if (u > slides_in5.length) {slideIndex_in5 = 1}    
  if (u < 1) {slideIndex_in5 = slides_in5.length}
  for (m = 0; m < slides_in5.length; m++) {
      slides_in5[m].style.display = "none";  
  }
  slides_in5[slideIndex_in5-1].style.display = "block";  

}





/* end */