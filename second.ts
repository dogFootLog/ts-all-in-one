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
