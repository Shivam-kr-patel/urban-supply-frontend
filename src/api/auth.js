const API_URL =
  "http://localhost/urban-supply/wp-admin/admin-ajax.php";

async function request(action, data = {}) {
  const formData = new URLSearchParams();

  formData.append("action", action);

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response = await fetch(API_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type":
        "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.data?.message || "Something went wrong."
    );
  }

  return result.data;
}

export function registerUser(data) {
  return request("urban_supply_register", data);
}

export function loginUser(email, password) {
  return request("urban_supply_login", {
    email,
    password,
  });
}

export function logoutUser() {
  return request("urban_supply_logout");
}

export function getCurrentUser() {
  return request("urban_supply_get_current_user");
}

export function checkUsername(username) {
  return request(
    "urban_supply_check_username",
    { username }
  );
}

export function forgotPassword(email) {
  return request(
    "urban_supply_forgot_password",
    { email }
  );
}

export function resetPassword(
  key,
  login,
  password,
  confirmPassword
) {
  return request("urban_supply_reset_password", {
    key,
    login,
    password,
    confirm_password: confirmPassword,
  });
}