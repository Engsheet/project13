import { read, create } from "@/api/pocketbase";

async function boom() {
  const usersData = await read("users");

  let data = [
    ...data,
    ...usersData.items.map((item) => ({
      owner: item.id,
      reviews: item.review,
    })),
  ];

  for (let item of data) {
    await create("follow", item);
  }
}
