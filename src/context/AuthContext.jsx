import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

const WORDPRESS_URL =
  "http://localhost/urban-supply";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await fetch(
        `${WORDPRESS_URL}/wp-admin/admin-ajax.php?action=urban_supply_get_current_user`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Authentication request failed: ${response.status}`
        );
      }

      const result = await response.json();

      if (result.success && result.data.logged_in) {
        setUser(result.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(
        "Failed to check authentication:",
        error
      );

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await fetch(
        `${WORDPRESS_URL}/wp-login.php?action=logout`,
        {
          credentials: "include",
        }
      );
    } catch (error) {
      console.error(
        "Logout request failed:",
        error
      );
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
        loading,
        checkAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}