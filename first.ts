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
