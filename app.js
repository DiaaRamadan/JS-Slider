
var data = (function(){

    return {
        data:{
            autoPlay: false,
            intervalTime: 2000,
            slides: [],
            currentSlide: 0,
            slideIntervalTime: 0,
        }

    };
})();

// controller for UI changes
var UIController = (function(){

    // get the slides 
    var sliderItems = function(){
        data.data.slides = document.querySelectorAll('.slider-item');
    };
    
    var getTheSlideWidth = function(){
        var slideWidth = document.querySelector('.active').offsetWidth
        return slideWidth + 20;
    };

    

    return {
        getSlideWidth: function(){
            return getTheSlideWidth();
        },
        getSliderItems: function(){
            sliderItems();
        },


    }

})();

var Controller = (function(UICtrl){

    var nextClicked = function(){
       
        if(data.data.currentSlide < data.data.slides.length - 1){
            
            data.data.currentSlide += 1;
            document.querySelector('.slider-item:nth-of-type('+data.data.currentSlide+')').style.transform = 'translateX(-'+UICtrl.getSlideWidth()+'px)';
            var slide = data.data.currentSlide + 1;
            document.querySelector('.slider-item:nth-of-type('+slide+')').style.transform = 'translateX(0)';
        }else{
            data.data.currentSlide = 0;
            document.querySelectorAll('.slider-item').forEach((el)=>{
                el.style.transform = 'translateX(110%)'
            });
            document.querySelector('.slider-item:nth-of-type(1)').style.transform = 'translateX(0)';
        }

        if(data.data.autoPlay){
            clearInterval(data.data.slideIntervalTime);
            data.data.slideIntervalTime = setInterval(nextClicked, data.data.intervalTime);
        }

    };

    var PrevClicked = function(){

        if(data.data.currentSlide > 0){
            
            document.querySelector('.slider-item:nth-of-type('+data.data.currentSlide+')').style.transform = 'translateX(0)';
            var slide = data.data.currentSlide + 1;
            document.querySelector('.slider-item:nth-of-type('+slide+')').style.transform = 'translateX('+UICtrl.getSlideWidth()+'px)';
            data.data.currentSlide -= 1;
            
            console.log(data.data.currentSlide);
        }else{
            
            data.data.currentSlide = data.data.slides.length - 1;
            document.querySelectorAll('.slider-item').forEach((el)=>{
                el.style.transform = 'translateX(-110%)'
            });
            document.querySelector('.slider-item:nth-of-type('+data.data.slides.length+')').style.transform = 'translateX(0)';
        }

    };


    var checkAutoPlay = function(){
        if(data.data.autoPlay){
            data.data.slideIntervalTime = setInterval(nextClicked, data.data.intervalTime);
        }
    }

    var setupListenerEvent = function(){
        document.querySelector('.next').addEventListener('click', nextClicked);
        document.querySelector('.prev').addEventListener('click', PrevClicked);
    };

    return {
        init: function(){
            UICtrl.getSliderItems();
            checkAutoPlay();
        },

        nextEvent: function(){
            setupListenerEvent();
        }

    }

})(UIController);

Controller.init();
Controller.nextEvent();