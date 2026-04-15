
// Ваш существующий код
let condition = true;

function forward() {
    anime({
        targets: '.menu-small',
        translateX: ['-110%', '0'],
        easing: 'easeInOutQuad',
        duration: 1000,
        loop: false
    });
    condition = false;
}

function backward() {
    anime({
        targets: '.menu-small',
        translateX: ['0', '-110%'],
        easing: 'easeInOutQuad',
        duration: 1000,
        loop: false
    });
    condition = true;
}
$('.menu_small_icon').click(function () {
    if (condition) {
        forward();
    } else {
        backward();
    }
});
let links = document.querySelectorAll('.scroll');
let targetID;
links.forEach(function (element) {
  element.addEventListener('click', function (event) {
    event.preventDefault(); 
    targetID = element.getAttribute('href'); 
    document.querySelector(targetID).scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start'
    })
  })
})