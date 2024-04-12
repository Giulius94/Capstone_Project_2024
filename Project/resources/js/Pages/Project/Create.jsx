import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: "",
    description: "",
    status: "",
    due_date: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("projects.create"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 text-center fst-italic leading-tight">
            Create New Project
          </h2>
        </div>
      }
    >
      <Head title="Projects" />
      <div className="py-12 backgroundDiv">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm sm:rounded-lg">
            <form
              className="p-4 sm:p-8 shadow sm:rounded-lg"
              onSubmit={onSubmit}
            >
              <div>
                <InputLabel
                  htmlFor="project_image_path"
                  value="Project Image"
                  className="text-white"
                />
                <TextInput
                  id="project_image_path"
                  type="file"
                  name="image"
                  value={data.image}
                  className="mt-1 block w-full text-white"
                  onChange={(e) => setData("image", e.target.value)}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_name"
                  value="Project Name"
                  className="text-white"
                />
                <TextInput
                  id="project_name"
                  type="text"
                  name="name"
                  value={data.name}
                  isFocused={true}
                  className="mt-1 block w-full text-white bg-dark"
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_description"
                  value="Project Description"
                  className="text-white"
                />
                <TextAreaInput
                  id="project_description"
                  name="description"
                  value={data.description}
                  isFocused={true}
                  className="mt-1 block w-full text-white bg-dark"
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_due_date"
                  value="Project Deadline"
                  className="text-white"
                />
                <TextInput
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  isFocused={true}
                  className="mt-1 block w-full text-white bg-dark"
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_status"
                  value="Project Status"
                  className="text-white"
                />
                <SelectInput
                  id="project_status"
                  name="status"
                  className="mt-1 block w-full text-white bg-dark"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.project_status} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link className="paddingCancel mx-3 bg-warning text-decoration-none text-white rounded" href={route("project.index")}>
                Cancel
                </Link>
                <button className="paddingSubmit bg-emerald-500 text-white rounded shadow transition-all hover:bg-emerald-600" type="submit">
                    Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
