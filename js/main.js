const swing = document.querySelector('.panels__container');
const panels = document.querySelectorAll('.panel__cont');
const root = document.documentElement;
const restartBtn = document.querySelector('#restart');

let theta, count;

window.addEventListener("load", e => {

    theta = parseInt(window.getComputedStyle(root).getPropertyValue('--theta'));
    count = 0;
    const newAngle = () => {
        return Math.exp(-0.012 * count * count) * theta;
    }

    const introAnim = () => {
        const tl = gsap.timeline({repeatRefresh: true})
            .from('.panel', {
                opacity: 0,
                stagger: {
                    each: 0.1,
                    from: 'start'
                }
            })
        return tl;
    }

    const mainAnim = () => {
        const tl = gsap.timeline({
            repeat: -1,
            repeatRefresh: true,
            // paused: true,
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
                    if (Math.abs(theta) <= 0.01) {
                        console.log('finito!')
                        tl.pause();
                        theta = parseInt(window.getComputedStyle(root).getPropertyValue('--theta'));
                        count = 0;
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
        return tl;
    }

    const masterAnim = gsap.timeline({
        repeatRefresh: true,
    });
    masterAnim
        .add(introAnim())
        .add(mainAnim(), '<'); // starts at the same time

    restartBtn.addEventListener('click', ev => {
        theta = parseInt(window.getComputedStyle(root).getPropertyValue('--theta'));
        count = 0;
        masterAnim.restart()
    })
});