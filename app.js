
var data = (function(){

    return {
        data:{
            autoPlay: true,
            intervalTime: 3000,
            slides: [],
            currentSlide: 0,
            slideIntervalTime: 0,
        }

    };
})();


var localStorageCtrl = (function(){


    return{
    updateKeyValue: function(key, value){
        localStorage.setItem(key, value);
    },
    removeKey: function(key){
        localStorage.removeItem(key);
    },
    getValue: function(key){
        return localStorage.getItem(key);
    }
}

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

    var getBGColors = function(){
        return{
            
            bg_color: document.querySelector('#bg-color').value,
            //word_color: document.querySelector('#word-color').value
        
        }
        
    };

    return {
        getSlideWidth: function(){
            return getTheSlideWidth();
        },
        getSliderItems: function(){
            sliderItems();
        },
        getBGColors: function(){
            return getBGColors();
        }


    }

})();

var Controller = (function(UICtrl, localStorageCtrl){

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

    var setupBGColor = function(){
        var color = UICtrl.getBGColors();
        if(color && color.bg_color !== '#000000'){
            document.querySelector('body').style.background = color.bg_color;
            //document.querySelector('h1').style.background = color.word_color;
            
            localStorageCtrl.updateKeyValue('bg_color', color.bg_color);
            //localStorageCtrl.updateKeyValue('word_color', color.word_color);
        }else{
            document.querySelector('body').style.background = localStorageCtrl.getValue('bg_color');    
            //document.querySelector('span').style.color = localStorageCtrl.getValue('word_color');
        }

        document.querySelector('#bg-color').value = localStorageCtrl.getValue('bg_color');
    }

    var setupListenerEvent = function(){
        document.querySelector('.next').addEventListener('click', nextClicked);
        document.querySelector('.prev').addEventListener('click', PrevClicked);
        document.querySelector('body').addEventListener('input', setupBGColor);
    };

    return {
        init: function(){
            UICtrl.getSliderItems();
            checkAutoPlay();
            setupBGColor();
        },

        nextEvent: function(){
            setupListenerEvent();
        }

    }

})(UIController, localStorageCtrl);

Controller.init();
Controller.nextEvent();