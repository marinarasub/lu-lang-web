// TODO: later fetch examples from a server

export interface Example {
    title: string;
    key: string;
    description: string;
    code: string;
}

const FIB_CODE = 
`fib: (->), fib = n: -> {
    n == 0 ?
        0 :
    n == 1 ?
        1 :
        fib(n - 1) + fib(n - 2)
}

$print(fib(10))
`;

const UNION_CODE = 
`g: = (x: (i64 | str)) -> {
    $print(x)
    x
}

f: = (x:, y:) -> {
    g(x)
    $print(y)
    0
}

x = 0
y: = $true ? "str" : x
f(x, y)
`;

const EXAMPLE_LIST = [
    {
        title: 'Hello, World!',
        key: 'hello.lu',
        description: 'Hello, World! in Lu',
        code: `$print("Hello, World!")`,
    },
    {
        title: 'Union Types',
        key: 'union.lu',
        description: 'Union types in Lu',
        code: UNION_CODE,
    },
    {
        title: 'Fibonacci',
        key: 'fib.lu',
        description: 'Recursive Fibonacci in Lu',
        code: FIB_CODE,
    },
];

const EXAMPLE_MAP: Map<string, Example> = new Map();
EXAMPLE_LIST.forEach((example) => {
    EXAMPLE_MAP.set(example.key, example);
});

const DEFAULT_EXAMPLE = EXAMPLE_LIST[0];

export { EXAMPLE_MAP, EXAMPLE_LIST, DEFAULT_EXAMPLE };