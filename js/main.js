const swing = document.querySelector('.panels__container');
const panels = document.querySelectorAll('.panel__cont');
const root = document.documentElement;
const restartBtn = document.querySelector('#restart');

let theta, count;

window.addEventListener("load", e => {

    const newAngle = () => {
        console.log('count:', count, 'theta:', theta)
        return Math.exp(-0.01 * count * count) * theta;
    }

    const introAnim = () => {
        const tl = gsap.timeline({ repeatRefresh: true })
        .from('.box', {
            opacity: 0,
            stagger: {
                each: 0.1,
                from: 'start',
                ease: "power1.in"
            }
        })
        return tl;
    }

    const mainAnim = () => {
        theta = parseInt(window.getComputedStyle(root).getPropertyValue('--theta'));
        count = 0;
        const tl = gsap.timeline({
            repeat: -1,
            repeatRefresh: true,
        });
        tl.to(panels, {
            keyframes: {
                "0%": { rotationX: () => theta, ease: "sine.out" },
                "25%": {
                    rotationX: 0,
                    duration: 0,
                    ease: "sine.in",
                    onComplete: () => {
                        theta = newAngle();
                        count++;
                        if (Math.abs(theta) <= 0.01) {
                            tl.pause();
                            console.log('main anim end')
                        }
                    }
                },
                "50%": { rotationX: () => -theta, ease: "none" },
                "75%": {
                    rotationX: 0,
                    duration: 0,
                    ease: "sine.in",
                    onComplete: () => {
                        theta = newAngle();
                        count++;
                    }
                },
                "100%": { rotationX: () => theta, ease: "sine.out" }
            },
            duration: 2,
        })
        return tl;
    }

    const textAnim = () => {
        const tl = gsap.timeline()
            .to('.back span', { opacity: 1 });
        return tl;
    }

    const masterAnim = () => {
        const tl = gsap.timeline({
            repeatRefresh: true,
            onComplete: () => console.log('fin master')
        });
        tl.add(introAnim())
            .add(mainAnim(), '<') // starts at the same time
            .add(textAnim(), 1)
        return tl;
    }
    masterAnim();

    restartBtn.addEventListener('click', ev => {
        // theta = parseInt(window.getComputedStyle(root).getPropertyValue('--theta'));
        // count = 0;
        masterAnim()
    })
});