const BASE_URL = "https://student-json-api.lidemy.me";

// 獲取全部文章
export const getPosts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

// 獲取單一文章
export const getPost = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/posts/${id}`);
    if (!res.ok) throw new Error("Post not found");
    return res.json();
  } catch (error) {
    console.log("Error fetching post:", error);
  }
};

// 登入
export const login = async (username, password) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();

    // 檢查是否登入成功
    if (!res.ok) {
      throw new Error(data.message || "登入失敗");
    }

    return data;
  } catch (error) {
    console.error("登入失敗:", error);
  }
};
//

// 身份驗證
export const getMe = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

// 新增文章
export const addPost = async (title, body) => {
  const token = localStorage.getItem("token"); //取得目前使用者的token
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        body,
        createdAt: new Date().getTime(),
      }),
    });

    console.log(response); //測試

    if (!response.ok) {
      throw new Error("發文失敗");
    }

    return await response.json();
  } catch (error) {
    console.error("發文失敗:", error);
  }
};
