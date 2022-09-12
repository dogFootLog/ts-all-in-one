const isRejected = (
  input: PromiseSettledResult<unknown>
): input is PromiseRejectedResult => input.status === 'rejected';
// is가 있으므로 얘도 타입가드.
const isFulfilled = <T>(
  input: PromiseSettledResult<T>
): input is PromiseFulfilledResult<T> => input.status === 'fulfilled';

const promises = await Promise.allSettled([
  Promise.resolve('a'),
  Promise.resolve('b'),
]);
const errors = promises.filter(isRejected); // 실패한 것만 걸러내고 싶을 때
const successs = promises.filter(isFulfilled); // 실패한 것만 걸러내고 싶을 때

export {};

// Promise -> Pending(비동기 실행 상태) -> Settled (이거 자체는 그냥 성공, 실패 없이 완료됐다는 상태) -> 성공하면 resolved, 실패하면 rejected
// promises.then().catch() ==> then, catch 모두 settled. then은 resolved, catch는 rejected

const x: {} = 'hello';
const y: Object = 'hi';
// 빈 객체 오브젝트 형이 아니라 이 둘은 모든 타입. (null, undefined 제외)
// 실제 객체는 소문자 object
const xx: object = { hello: 'world' }; // object 지양, interface, type, class
const z: unknown = 'hi';

//unknown = {} | null | undefined (4.8버전)
if (z) {
  z; // {}. 모든 값이 됨
} else {
  z; // undefined, null
}

interface A {
  readonly a: string;
  b: string;
}
const aaaa: A = {
  a: 'hello',
  b: 'world',
  method: function (): void {
    throw new Error('Function not implemented.');
  },
};
// aaaa.a = '123'; // readonly이므로 에러

type B = { a: string; b: string; c: string; d: string };
type C = { [key: string]: string }; // 위 아래 동치
type D = { [key: string]: number };
const d: D = { a: 3, b: 5, c: 5 };

type E = 'Human' | 'Mammal' | 'Animal';
type F = { [key in E]: number };
const f: F = { Human: 123, Mammal: 2, Animal: 7 };
type G = { [key in E]: E };
const g: G = { Human: 'Animal', Mammal: 'Human', Animal: 'Human' };

class A {
  //a: string;
  b: string;
  constructor() {
    //this.a = '123';
    this.b = '123';
  }

  method() {}
}
