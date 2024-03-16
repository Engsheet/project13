import PocketBase from "pocketbase";

export const pb = new PocketBase(import.meta.env.VITE_PB_URL);
pb.autoCancellation(false);

//콜랙션에 데이터값으로 아이템 생성
export async function create(collection, data) {
  const create = await pb.collection(collection).create(data);
  return create;
}

/**
 * 콜랙션 읽기, 필드값을 추가하면 필터링 됨
 * import 하여 사용할 때, async / await 을 사용해야 데이터를 가져올 수 있음
 * @param {*} collection
 * collection 이름 입력 (uesrs, reviews 등)
 * 인자를 한개만 입력하여 사용
 * @param {*} field
 * 데이터의 field 값 입력 (id, nickname 등)
 * 인자를 두개 입력하여 사용
 * @param {*} itemId
 * 불러오려는 data의 id 입력
 * 인자를 세개 모두 입력해야 사용 가능함 (두번째 전달인자는 빈문자열("") 입력할 것)
 * @returns Server 에서 데이터를 객체로 호출함
 */
export async function read(collection, field = "", itemId = "") {
  if (itemId) {
    const itemData = await pb.collection(collection).getOne(itemId);
    return itemData;
  }

  return field
    ? await pb.collection(collection).getList(1, 10, {
        fields: field,
      })
    : await pb.collection(collection).getList(1, 10);
}

// 콜랙션 전부 읽기
export async function fullRead(collection, field = "", itemId = "") {
  const FieldData = await pb.collection(collection).getFullList({
    fields: field,
  });
  const collectionData = await pb.collection(collection).getFullList();
  return field ? FieldData : collectionData;
}

// 콜랙션의 아이템에 데이터를 업데이트, 데이터는 객체이며 해당 콜랙션의 필드와 키값이 일치해야 한다
export function update(collection, itemId, data) {
  const update = pb.collection(collection).update(itemId, data);
  return update;
}

// 로그인
export async function setLogIn(idPw) {
  const authData = await pb.collection("users").authWithPassword(...idPw);
  return authData;
}

// 로그아웃
export function setLogOut() {
  pb.authStore.clear();
}
