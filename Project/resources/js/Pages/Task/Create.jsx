import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ auth, projects, users }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: "",
    description: "",
    status: "",
    due_date: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("task.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 text-center fst-italic leading-tight">
            Create New Task
          </h2>
        </div>
      }
    >
      <Head title="Tasks" />
      <div className="py-12 backgroundDiv">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm sm:rounded-lg">
            <form
              className="p-4 sm:p-8 shadow sm:rounded-lg"
              onSubmit={onSubmit}
            >
              <div>
                <InputLabel
                  htmlFor="task_project_id"
                  value="Projects"
                  className="text-white"
                />
                <SelectInput
                  id="task_project_id"
                  name="project_id"
                  className="mt-1 block w-full text-white bg-dark"
                  onChange={(e) => setData("project_id", e.target.value)}
                >
                  <option value="">Select Project</option>
                  {projects.data.map((project) => (
                    <option value={project.id} key={project.id}>{project.name}</option>
                  ))}
                </SelectInput>
                <InputError message={errors.project_id} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_image_path"
                  value="Task Image"
                  className="text-white"
                />
                <TextInput
                  id="task_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full text-white"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_name"
                  value="Task Name"
                  className="text-white"
                />
                <TextInput
                  id="task_name"
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
                  htmlFor="task_description"
                  value="Task Description"
                  className="text-white"
                />
                <TextAreaInput
                  id="task_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full text-white bg-dark"
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_due_date"
                  value="Task Deadline"
                  className="text-white"
                />
                <TextInput
                  id="task_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full text-white bg-dark"
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_status"
                  value="Task Status"
                  className="text-white"
                />
                <SelectInput
                  id="task_status"
                  name="status"
                  className="mt-1 block w-full text-white bg-dark"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.task_status} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_priority"
                  value="Task Priority"
                  className="text-white"
                />
                <SelectInput
                  id="task_priority"
                  name="priority"
                  className="mt-1 block w-full text-white bg-dark"
                  onChange={(e) => setData("priority", e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectInput>
                <InputError message={errors.priority} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_assigned_user"
                  value="Assigned User"
                  className="text-white"
                />
                <SelectInput
                  id="task_assigned_user"
                  name="assigned_user_id"
                  className="mt-1 block w-full text-white bg-dark"
                  onChange={(e) => setData("assigned_user_id", e.target.value)}
                >
                  <option value="">Select User</option>
                  {users.data.map((user) => (
                    <option value={user.id} key={user.id}>{user.name}</option>
                  ))}
                </SelectInput>
                <InputError
                  message={errors.assigned_user_id}
                  className="mt-2"
                />
              </div>
              <div className="mt-4 text-right">
                <Link
                  className="paddingCancel mx-3 bg-warning text-decoration-none text-white rounded"
                  href={route("task.index")}
                >
                  Cancel
                </Link>
                <button className="paddingSubmit bg-emerald-500 text-white rounded shadow transition-all hover:bg-emerald-600">
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
