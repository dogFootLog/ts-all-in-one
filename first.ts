const a: number = 5;
// 타입스크립트: 자바스크립트의 변수, 매개변수, 리턴값에다 타입을 붙이는 것.
// 변수에는 이름 뒤에 ':'와 타입. 대문자 절대 불가!
const b: string = '5';
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
const f: any = '123'; // 모든 타입. any를 쓰면 자바스크립트가 돼버림. 결국 타입스크립트의 목적 = any 없애기

const g: true = true;
const h: 5 = 5;
// type 자리에 고정된 원시값 넣는 것도 가능

const a2 = 5;
// vscode는 타입 추론을 한다. 타입 추론이 제대로 됐다면 굳이 타입을 쓰는 것이 더 문제가 될 수 있음.
// const가 붙은 이상 a2는 어차피 이러든 저러든 평생 5라는 정확한 타입인데 그걸 문자열이라는 더 넓은 범위의 타입으로 만들어버린 것.

const arr: string[] = ['123', '345'];
const arr2: Array<number> = [123, 456]; // 꺽쇠를 generic이라고 부름
const arr3: [number, number, string] = [123, 456, 'hello']; // 튜플: 길이가 고정된 배열
// 튜플의 경우 타입을 없애면 type으로 (stirng | number)가 됨 >> 따로 명시를 해줘야 하는 case
const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };

// 타이핑: 타입을 붙여주는 행위
function add(x: number, y: number): number {
  return x + y;
}
// 함수도 타이핑을 해줘야 함. 리턴값 타입은 매개변수 바로 뒤에!

// 타입 자리들이 헷갈리면 지웠을 때도 말이 되는 자바스크립트 코드가 완성돼야 함. 그것이 메인 룰
// const add_arrow: (x: number, y: number) => number = (x, y) => x + y;
type Add = (x: number, y: number) => number;
const add_arrow: Add = (x, y) => x + y;
// type일 때 type 순서와 function () 쓸 때 순서 헷갈리지 않도록

interface Add_IF {
  (x: number, y: number): number;
}

const add_IF: Add = (x, y) => x + y;

// const obj: { lat: number, lon: number } = { lat: 37.5, lon: 127.5 };

function add_new(x: number, y: number) {
  return x + y;
}
const result = add(1, 2);
// add_new의 return 값을 생략했어도 result가 number라는 것까지는 추론해냄
// 그런데 여기서 x: number의 number을 없애면 x가 any가 됨 >> 문제가 있음!
// return 값은 타입을 생략해도 되지만 매개변수는 안된다는 결론에 도달

// 2번째 강의 결론: 타입 추론이 가능하면 최대한 추론에 맡기고 타입의 범위는 가능한한 좁게 해라!

// 제네릭, 타입, 인터페이스는 사라져도 돌아가는 자바스크립트 코드가 돼야 함

// 심화과정
function add_intense(x: number, y: number): number; // 타입
function add_intense(x: number, y: number) {
  // 실제 코드. 이처럼 같은 이름의 함수가 두 번 등장할수도 있는데 당황하지 말기!
  return x + y;
}

let aa = 123;
aa = 'hello' as unknown as number;
// as: 앞의 타입을 강제로 변경해주는 키워드

try {
  const array = [];
  array.push('hello');
  // 여기선 array를 any의 배열로 타입추론하는데 강의 내용에서는 never로 추론해서 array.push가 에러가 남.
  // 이 에러를 방지하기 위해서는 array: string[] 으로 타입을 명시해줘야 함
} catch (error) {
  error;
}

// const head: Element = document.querySelector('#head');
// console.log(head);

const head = document.querySelector('#head')!;
// 느낌표의 역할: head의 타입을 Element|null >> Element로 변경. 무조건 null이 아님을 명시하는 것
if (head) {
  head.innerHTML = 'hello world'; // Element 타입에 innerHTML이라는 속성이 있다는 것까지 타입에 등록이 돼 있음
  console.log(head);
}

const x: String = 'hell';
// 'S'tring type은 객체타입임. new String() 의 String

type World = 'world';
const w: World = 'world'; // ctrl + spacebar 하면 world를 자동으로 타입 추론해서 추천해줌

type Greeting = `hello ${World}`; // "hello world" >>> world가 ${World}로 들어감. 템플릿 리터럴 타입
// 현실적인 활용방안
type Ex1 = 'world' | 'hell';
type Greeting1 = `hello ${World}`; // hello hell, hello world 추천해줌.

function rest(...args: string[]) {
  // rest에서도 type 설정 가능
  console.log(args);
  // rest('1', '2', '3')과 같이 문자열 타입만 됨.
}

function rest1(a: number, ...args: string[]) {
  console.log(a, args);
  // rest1(1, '2', '3');
}

const tuple: [string, number] = ['1', 1];
// tuple[2] = 'hello'; >>> Error
tuple.push('hello'); // 에러 없음

// type enum
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}
// Up의 값을 정하지 않으면 순서대로 위에서부터 0, 1, 2, 3의 값을 가짐
// Up = 3으로 하면 3, 4, 5, 6이 됨
// 각자 3, 5, 4, 6 식으로 마음대로 지정도 가능함
const a1 = EDirection.Up;
const c1 = EDirection.Left;
// 사용처: 여러 개의 변수들을 하나의 그룹으로 묶고 싶을 때. 사실 일반 객체가 낫긴 함...
// Javascript로 변환한 다음에 그룹핑을 남기고 싶지 않으면 쓰고 남기고 싶으면 객체 쓰고...

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;
// 만일 그냥 객체 선언만 하면 타입스크립트가 타입을 제대로 0, 1, 2, 3으로 추론하지 못함
// 이럴 때 as const 붙이면 type 명명 + readonly까지 됨!

// enum은 타입으로도 사용 가능함. dir이 Up, Down, Left, Right 4개 중 하나여야 한단 뜻
function walk(dir: EDirection) {}
walk(EDirection.Left);

// enum을 쓰지 않을려면 다소 복잡해지긴 함. Key 가져오기
type Direction = typeof ODirection[keyof typeof ODirection]; // 타입으로 쓸 때는 typeof 붙이고 그냥 키만 뽑아내고 싶으면 keyof만
function run(dir: Direction) {}
run(ODirection.Right);

// Value 가져오기
const obj1 = { a: '123', b: 'hello', c: 'world' } as const; // as const 키워드 없으면 a, b, c 그냥 string으로 추론
type Key = typeof obj1[keyof typeof obj1]; // value들의 타입만 가져오는 것이 가능함
const value1: Key = '123'; // value1의 값은 '123', 'hello', 'world' 중 하나가 되어야 함

// Type과 Interface의 차이
type A = { a: string };
const a3: A = { a: 'hello' };
interface B {
  a: string;
}
const b3: B = { a: 'hello' };
// type이 간단은 하지만 객체지향을 하고 싶으면 interface 쓰는 게 함수도 다양하고 좋음

// union(|)
/*
function add2(x: string | number, y: string | number): string | number {
  return x + y; 
}
const result2: string = add(1, 2);
*/
// 위 코드에서 result2가 string이 되는 것을 잡지 못하므로 이런 거 막기 위해서 애초에 add2에서 타입 잘 잡아야 함

// intersection
type A4 = string & number;
// string이면서 number인 것은 불가한데?
type A5 = { hello: 'world' } & { dog: 'foot' };
const a5: A5 = { hello: 'world', dog: 'foot' };

type A6 = { hello: 'world' } | { dog: 'foot' };
const a6: A6 = { hello: 'world', dog: 'foot' }; // { hello: 'world' }, { dog: 'foot' } 도 됨
// &는 모든 속성이 있어야 하고 |는 여러 속성 중 하나만 있으면 되고!

type Animal = { breath: true };
type Poyouryu = Animal & { breed: true };
type Human = Poyouryu & { think: true };
const zerocho: Human = { breath: true, breed: true, think: true };
// type 개념은 확장의 개념으로 상속이 가능함

interface AnimalI {
  breath: true;
}
interface PoyouryuI extends AnimalI {
  breed: true;
}
const p: PoyouryuI = { breath: true, breed: true };
// Interface로 상속하는 법
const p2: Animal & { breed: true } = { breath: true, breed: true };
// type은 이것처럼 막 욱여넣기가 가능하다는 점이 인터페이스보다 유리
// 그런데 interface가 type extend하는 것도 가능하고... 둘이 명확하게 구분돼 있는 것은 아님
// 둘 간의 기능적 차이보다는 표현적 차이가 실무에서는 더 중요

interface interf {
  talk: () => void;
}
interface interf {
  eat: () => void;
}
interface interf {
  shit: () => void;
}
// const a7: interf = { talk() {}, eat() {}, shit() {} };
// interface는 이렇게 여러 번 선언하는 게 가능하고 그냥 선언하면 계속 속성이 추가됨
// 라이브러리에 사용하기에 유리
interface interf {
  sleep: () => void;
}
const a8: interf = { talk() {}, eat() {}, shit() {}, sleep() {} };

// 현업에서 typescrip naming rule 2가지
interface Props {} // 옛날엔 IProps, TType, EHello처럼 대문자 붙였었음. 요즘엔 안 붙이는 게 대세
type Type = string | number;
enum Hello {
  Left,
  Right,
}
const a9: Props = {};
// 솔직히 이제는 Props가 '타입'이라는 사실이 중요하지 interface인지 type인지 enum인지는 중요하지 않다.
// 제네릭에는 아직 붙임

// 큰 타입과 작은 타입
type A10 = string | number;
type B10 = string;
// 둘 중 어느 게 넓은 타입, 좁은 타입인가? A10이 넓은 타입. 집합의 개념
// 좁은 타입을 넓은 타입에 넣기 가능. 반대로는 불가
type C10 = string & number; // 실질적으로 만족시킬 수 없는데 어쨌든 가장 좁은 타입

type A11 = { name: string };
type B11 = { age: number };
type C11 = { name: string; age: number };
// 객체는 상세할수록 좁다. C11이 A11, B11보다 넓은 타입

type AB = A11 | B11;
type C12 = A11 & B11;
const c12: C12 = { name: 'dog', age: 27 /* married: false */ }; // married와 같이 좁은 타입을 넣으면 에러 발생
// 아까는 된다고 했는데? 객체 리터럴을 넣으면 타입이 넓냐 좁냐 + 잉여속성 검사까지 진행함.
const obj12 = { name: 'dog', age: 27, married: false };
const c13: C12 = obj12; // 이건 또 에러 안남.... 객체리터럴을 중간에 넣으면 잉어타입을 검사하지 않기 때문

// 인터페이스끼리는 합쳐지지만 type 별칭은 합쳐지지 않는다.
type B12 = { a: string };
// type B12 = { b: string }; // 에러
// intersection으로 상속 가능

interface A13 {
  a: string;
}
const obj13: A13 = { a: 'hello' /*, b: 'woirld'*/ };
// 객체리터럴은 잉여속성검사로 인해 오류 발생. 어떨 때는 에러가 발생하고 어떨 때는 안함

function a14(): void {
  // 함수의 return 타입이 void이면 return 대상이 있으면 안됨
  return undefined; // undefined는 가능
  // return null은 또 안됨
}

const b14 = a14();

interface Human2 {
  talk: () => void;
}
const human2: Human2 = {
  talk() {
    return 'abc';
    // void 타입인데 return abc가 가능...
    // void function과 메서드로 선언할 때의 void의 역할이 다르다고 보는 게 좋음
  },
};

const humanBeing = human2.talk(); // humanBeing은 void type.
// const humanBeing = human2.talk() as unknown as string; // 이렇게 타입 강제로 변경은 가능함
// const humanBeing = <number><unknown>human2.talk();

// 매개변수로 선언한 void
function a15(callback: () => void): void {}
a15(() => {
  return '3';
}); // 이 경우에도 return 가능

declare function forEach2(
  arr: number[],
  callback: (
    e1: number
  ) => void /* 당연히 number는 에러 안 나는데 void도 에러 안남 */
): void; // 여기가 void가 아니라 undefined이면 아래 둘 다 에러남. void도 undefined 형식에 할당 불가
// 원래는 바로 구현부 선언해줘야 하는데 그게 힘들 때는 declare 키워드. declare 키워드는 자바스크립트 변환 시 사라짐
let target: number[] = [];
forEach2([1, 2, 3], (e1) => target.push(e1));
forEach2([1, 2, 3], (e1) => {
  target.push(e1);
});
// declare는 외부에서 만들어지는 애들 타입선언

// unknown VS any
// any 쓸바에는 unknown을 한다. any 써버리면 타입스크립트가 타입 체킹을 아예 포기해버림 => 쓰는 이유 상실
// unknown을 쓰면 b의 타입을 직접 정해줘서 정해진 타입만 쓸 수 있게 함.
const humanBeing2: unknown = human2.talk();
(humanBeing2 as Human2).talk(); // 이처럼 구현 시에는 unknown을 다시 채워줘야 함

try {
} catch (error) {
  // error.message로 할려고 하면 에러. 어떤 에러가 날지 모르니깐.
  (error as Error).message; // 옛날에는 error을 any 타입으로 했는데 이제는 직접 써야 함
  // 예) (error as AxiosError).message
}
// 타입 간 대입 가능 표
// any는 never 빼고 다 대입 가능... 나중에 체크