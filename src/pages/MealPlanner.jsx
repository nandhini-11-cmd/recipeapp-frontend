import { useEffect, useState } from "react";
import API from "../api/axios";
import { Formik, Form, Field } from "formik";

const MealPlanner = () => {
  const [recipes, setRecipes] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const token = localStorage.getItem("token");


  const fetchRecipes = async () => {
    try {
      const res = await API.get("/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error("Error loading recipes");
    }
  };

 
  const fetchMealPlans = async () => {
    try {
      const res = await API.get("/mealplans", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMealPlans(res.data);
    } catch (err) {
      console.error("Error loading meal plans");
    }
  };

  useEffect(() => {
    fetchRecipes();
    fetchMealPlans();
  }, []);


  const handleMealPlanSubmit = async (values, { resetForm }) => {
  const normalizedDate = new Date(values.date).toISOString().split("T")[0];

  const planExists = mealPlans.some((plan) => {
    const planDate = new Date(plan.date).toISOString().split("T")[0];
    return planDate === normalizedDate;
  });

  const method = planExists ? "put" : "post";
  const url = "/mealplans";

  try {
    await API[method](
      url,
      {
        date: normalizedDate,
        recipes: values.recipes,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchMealPlans();
    resetForm();
  } catch (err) {
    console.error(`Error ${planExists ? "updating" : "creating"} meal plan`, err);
  }
};
  const handleDelete = async (date) => {
    try {
      await API.delete("/mealplans", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { date },
      });
      fetchMealPlans();
    } catch (err) {
      console.error("Error deleting meal plan");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <h2 className="text-3xl font-bold mb-4">📅 Weekly Meal Planner</h2>

    
      <Formik
        initialValues={{ date: "", recipes: [] }}
        onSubmit={handleMealPlanSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="bg-white p-4 shadow rounded mb-8">
            <div className="mb-4">
              <label className="block mb-1">Select Date</label>
              <Field
                type="date"
                name="date"
                className="border px-3 py-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Select Recipes</label>
              <Field
                as="select"
                name="recipes"
                multiple
                className="border px-3 py-2 w-full rounded h-40"
                onChange={(e) => {
                  const options = Array.from(
                    e.target.selectedOptions,
                    (opt) => opt.value
                  );
                  setFieldValue("recipes", options);
                }}
              >
                {recipes.map((recipe) => (
                  <option key={recipe._id} value={recipe._id}>
                    {recipe.title}
                  </option>
                ))}
              </Field>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {isSubmitting ? "Saving..." : "Save Meal Plan"}
            </button>
          </Form>
        )}
      </Formik>

    
      <div>
        <h3 className="text-2xl font-semibold mb-2">Your Plans</h3>
        {mealPlans.length === 0 ? (
          <p>No meal plans yet.</p>
        ) : (
          <div className="space-y-4">
            {mealPlans.map((plan) => (
              <div
                key={plan._id}
                className="p-4 border rounded shadow bg-gray-50"
              >
                <h4 className="font-semibold">
                  Date: {new Date(plan.date).toDateString()}
                </h4>
                <ul className="list-disc list-inside mt-2">
                  {plan.recipes.map((r) => (
                    <li key={r._id}>{r.title}</li>
                  ))}
                </ul>
                <button
                  onClick={() => handleDelete(plan.date)}
                  className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlanner;
