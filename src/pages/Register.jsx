import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <Formik
  initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
  validate={(values) => {
    const errors = {};
    if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  }}
  onSubmit={async (values, { setSubmitting, setStatus }) => {
    try {
      const { name, email, password } = values;
      await API.post("/users/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      setStatus("Registration failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  }}
>
  {({ isSubmitting, status, errors, touched }) => (
    <Form className="space-y-4">
      <div>
        <label>Name</label>
        <Field name="name" className="w-full border px-3 py-2 rounded" />
      </div>
      <div>
        <label>Email</label>
        <Field name="email" type="email" className="w-full border px-3 py-2 rounded" />
      </div>
      <div>
        <label>Password</label>
        <Field name="password" type="password" className="w-full border px-3 py-2 rounded" />
        {touched.password && errors.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
      </div>
      <div>
        <label>Confirm Password</label>
        <Field name="confirmPassword" type="password" className="w-full border px-3 py-2 rounded" />
        {touched.confirmPassword && errors.confirmPassword && (
          <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
        )}
      </div>
      {status && <p className="text-red-500">{status}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </Form>
  )}
</Formik>
    </div>
  );
};

export default Register;
