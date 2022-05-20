const animated = document.querySelector('.box');
const swing = document.querySelector('.panels__container');
const panels = document.querySelectorAll('.panel__cont');
const nbPanels = panels.length;
const root = document.documentElement;


window.addEventListener("load", e => {
    if (animated) {
        animated.addEventListener('animationiteration', ev => {
            let c = window.getComputedStyle(root).getPropertyValue('--n');
            c++;
            root.style.setProperty('--n', c);
            root.style.setProperty('--hue', (c * 6) % 360);
        });
    }

    let theta = parseInt(window.getComputedStyle(root).getPropertyValue('--theta'));
    let count = 0;
    // const log = () => {
    //     let count = anim.iteration();
    // };

    const newAngle = () => {
        return Math.exp(-0.05 * count * count) * theta;
    }

    const anim = gsap.fromTo(panels, {
        rotationX: () => {
            // return `${Math.exp(-0.05 * count * count) * theta}deg`;
            return `${newAngle()}deg`
        }
    }, {
        rotationX: () => {
            // return `${Math.exp(-0.05 * count * count) * -theta}deg`;
            return `${newAngle() * -1}deg`
        },
        ease: 'sine.inOut',
        repeat: -1,
        repeatRefresh: true,
        yoyo: true,
        duration: 1,
        onRepeat: () => {
            count++;
        },
    });

    // if (swing) {
    //     let count = 0;
    //     swing.addEventListener('animationiteration', ev => {
    //         let theta = window.getComputedStyle(root).getPropertyValue('--theta');
    //         count++;
    //         if(count % nbPanels === 0) {
    //             // console.log('yé!', theta, Date.now())
    //             if (parseInt(theta) - 1 >=0) {
    //                 root.style.setProperty('--theta', `${parseInt(theta) -1}deg`);
    //             }else{
    //                 // terminer l'anim
    //             }
    //         }
    //     });
    // }
});