const animated = document.querySelector('.box');
const swing = document.querySelector('.panels__container');
const nbPanels = document.querySelectorAll('.panel').length;
const root = document.documentElement;

const newAngle = (theta, n) => {
    return Math.exp(-0.05 * n * n) * theta; // * theta;
}

window.addEventListener("load", e => {
    if (animated) {
        animated.addEventListener('animationiteration', ev => {
            let c = window.getComputedStyle(root).getPropertyValue('--n');
            c++;
            root.style.setProperty('--n', c);
            root.style.setProperty('--hue', (c * 6) % 360);
        });
    }

    if (swing) {
        let count = 0;
        swing.addEventListener('animationiteration', ev => {
            let theta = window.getComputedStyle(root).getPropertyValue('--theta');
            count++;
            if(count % nbPanels === 0) {
                // console.log('yé!', theta, Date.now())
                if (parseInt(theta) - 1 >=0) {
                    root.style.setProperty('--theta', `${parseInt(theta) -1}deg`);
                }else{
                    // terminer l'anim
                }
            }
        });
    }
});