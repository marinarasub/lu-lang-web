export interface Pillar {
    title: string;
    description: string;
}

const PILLAR_ONE = {
    title: 'Easy',
    description: 'Lu is designed to be simple and familiar with a keyword free syntax, and is fully type inferenced, allowing you to quickly write and understand code without unnecessary boilerplate.',
}

const PILLAR_TWO = {
    title: 'Flexible',
    description: 'Lu provides the flexibility to express complex ideas and patterns, through advanced typing, and first-class functions. All the while giving full control to the user.',
}

// hopefully add reference checking in the future
const PILLAR_THREE = {
    title: 'Safe',
    description: 'Lu emphasizes safety with strong static typing and disallowing null references, helping you catch errors early and ensuring reliable and maintainable code.',
}

const EARLY_DEV_NOTICE = "Lu is currently in very early development. It is only available as a demo and may change significantly. Give it a try and let us know your thoughts!"

const ONE_LINER = "A langauge with a simple and elegant syntax, where rapid prototyping meets safety and performance."

const PILLARS: Pillar[] = [PILLAR_ONE, PILLAR_TWO, PILLAR_THREE]

export { PILLARS, EARLY_DEV_NOTICE, ONE_LINER };
