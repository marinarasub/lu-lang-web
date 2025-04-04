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

const FIZZBUZZ_CODE =
`MAX: = 100

i: = 1

i < MAX ! {
    ismod3: = i % 3 == 0
    ismod5: = i % 5 == 0
    ismod3 ?
        $print("Fizz")
    ismod5 ?
        $print("Buzz")
    ~(ismod3 | ismod5) ?
        $print(i)
    $print("\n")
    i = i + 1
} : i
`;

const TUPLE_CODE = 
`(a:, b:) = (3, 4)
(b, a) = (a, b)
c: = (a, b).(0, (0, 1))
d: = c.1
$print(a + b), $print(", "), $print(d.0)
`

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

x: = 0
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
        title: 'Fibonacci',
        key: 'fib.lu',
        description: 'Recursive Fibonacci in Lu',
        code: FIB_CODE,
    },
    {
        title: 'FizzBuzz',
        key: 'fizzbuzz.lu',
        description: 'FizzBuzz in Lu',
        code: FIZZBUZZ_CODE,
    },
    {
        title: 'Tuple Types',
        key: 'tuple.lu',
        description: 'Tuple assignment in Lu',
        code: TUPLE_CODE,
    },
    {
        title: 'Union Types',
        key: 'union.lu',
        description: 'Union types in Lu',
        code: UNION_CODE,
    },
];

const EXAMPLE_MAP: Map<string, Example> = new Map();
EXAMPLE_LIST.forEach((example) => {
    EXAMPLE_MAP.set(example.key, example);
});

const PRIME_EXAMPLE_LIST = [EXAMPLE_MAP.get('hello.lu')!, EXAMPLE_MAP.get('fizzbuzz.lu')!, EXAMPLE_MAP.get('fib.lu')!];

const DEFAULT_EXAMPLE = EXAMPLE_LIST[0];

export { EXAMPLE_MAP, EXAMPLE_LIST, PRIME_EXAMPLE_LIST, DEFAULT_EXAMPLE };
