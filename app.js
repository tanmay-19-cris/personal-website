let intro = document.querySelector('.intro')
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        
        logoSpan.forEach((span, idx) => {
            span.classList.add('active')
        }, (idx + 1) * 400)
    })
})