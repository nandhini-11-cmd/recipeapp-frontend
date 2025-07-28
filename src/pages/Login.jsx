
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
       onSubmit={async (values, { setSubmitting, setStatus }) => {
  try {
    const res = await API.post("/users/login", values);

    
    console.log("Login success:", res.data);

    login(res.data.user, res.data.token); 
    
    navigate("/");

  } catch (err) {
  console.log("Login error:", err);
  console.log("Response Data:", err.response?.data);
  console.log("Status Code:", err.response?.status);
  setStatus("Login failed. Check your credentials.");
} finally {
    setSubmitting(false);
  }
}}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-4">
            <div>
              <label>Email</label>
              <Field name="email" type="email" className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label>Password</label>
              <Field name="password" type="password" className="w-full border px-3 py-2 rounded" />
            </div>
            {status && <p className="text-red-500">{status}</p>}
            <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded">
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;