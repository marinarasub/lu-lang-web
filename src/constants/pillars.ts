export interface Pillar {
    title: string;
    description: string;
}

const PILLAR_ONE = {
    title: 'Easy',
    description: 'Lu is designed to be simple and intuitive with a keyword free syntax, and is fully type inferenced, allowing you to quickly write and understand code without unnecessary complexity.',
}

const PILLAR_TWO = {
    title: 'Flexible',
    description: 'Lu provides the flexibility to express complex ideas and patterns, through advanced typing, first-class functions as values. All the while giving full control, including memory management, to the user.',
}

const PILLAR_THREE = {
    title: 'Safe',
    description: 'Lu emphasizes safety with strong static typing reference checking, helping to catch errors early and ensuring reliable and maintainable code.',
}

const PILLARS: Pillar[] = [PILLAR_ONE, PILLAR_TWO, PILLAR_THREE]

export default PILLARS;
