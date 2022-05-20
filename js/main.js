const swing = document.querySelector('.panels__container');
const panels = document.querySelectorAll('.panel__cont');
const nbPanels = panels.length;
const root = document.documentElement;


window.addEventListener("load", e => {

    let theta = parseInt(window.getComputedStyle(root).getPropertyValue('--theta'));
    let count = 0;

    const newAngle = () => {
        return Math.exp(-0.012 * count * count) * theta;
    }

    const tl = gsap.timeline({
        repeat: -1,
        repeatRefresh: true,
        defaults: {
            duration: .5,
        },
    });
    tl.fromTo(panels, {
        rotationX: () => theta,
    }, {
        rotationX: 0,
        ease: 'sine.in',
        onComplete: () => {
            theta = newAngle();
            count++;
        },
    });
    tl.fromTo(panels, {
        rotationX: 0
    }, {
        rotationX: () => -theta,
        ease: 'sine.out',
    });
    tl.fromTo(panels, {
        rotationX: () => -theta,
    },
        {
            rotationX: 0,
            ease: 'sine.in',
            onComplete: () => {
                theta = newAngle();
                if (Math.abs(theta) <= 0.001) {
                    console.log('finito!')
                    tl.pause();
                }
                count++;
            },
        });
    tl.fromTo(panels, {
        rotationX: 0
    }, {
        ease: 'sine.out',
        rotationX: () => theta,
    });

});