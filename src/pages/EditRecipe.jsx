import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray } from "formik";
import API from "../api/axios";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await API.get(`/recipes/${id}`);
        setInitialValues(res.data);
      } catch (err) {
        setError("Failed to load recipe");
      }
    };
    fetchRecipe();
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!initialValues) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
      <Formik
        initialValues={{
          title: initialValues.title || "",
          ingredients: initialValues.ingredients || [""],
          steps: initialValues.steps || [""],
          cookingTime: initialValues.cookingTime || "",
          servings: initialValues.servings || 1,
          photo: initialValues.photo || "",
          video: initialValues.video || "",
          cuisine: initialValues.cuisine || "",
          diet: initialValues.diet || "",
        }}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            await API.put(`/recipes/${id}`, values, {
              headers: { Authorization: `Bearer ${token}` },
            });
            navigate(`/recipes/${id}`);
          } catch (err) {
            setStatus("Failed to update recipe.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, isSubmitting, status }) => (
          <Form className="space-y-4">
            <div>
              <label>Title</label>
              <Field name="title" className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <label>Ingredients</label>
              <FieldArray name="ingredients"
                render={(arrayHelpers) => (
                  <div>
                    {values.ingredients.map((_, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <Field
                          name={`ingredients[${i}]`}
                          className="flex-1 border px-3 py-2 rounded"
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(i)}
                          className="bg-gray-500 text-white px-2 rounded"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(i + 1, "")}
                          className="bg-gray-500 text-white px-2 rounded"
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>

            <div>
              <label>Steps</label>
              <FieldArray
                name="steps"
                render={(arrayHelpers) => (
                  <div>
                    {values.steps.map((_, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <Field
                          name={`steps[${i}]`}
                          className="flex-1 border px-3 py-2 rounded"
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(i)}
                          className="bg-gray-500 text-white px-2 rounded"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(i + 1, "")}
                          className="bg-gray-500 text-white px-2 rounded"
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>

            <div>
              <label>Cooking Time</label>
              <Field name="cookingTime" type="number" className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <label>Servings</label>
              <Field name="servings" type="number" className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <label>Photo URL</label>
              <Field name="photo" type="text" className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <label>Video URL</label>
              <Field name="video" type="text" className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <label>Cuisine</label>
              <Field name="cuisine" type="text" className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <label>Diet</label>
              <Field
                name="diet"
                as="select"
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select diet</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>               
              </Field>
            </div>

            {status && <p className="text-red-500">{status}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {isSubmitting ? "Updating..." : "Update Recipe"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditRecipe;