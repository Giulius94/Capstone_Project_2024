import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ auth, user }) {
  const { data, setData, post, errors, reset } = useForm({
    name: user.name || "",
    email: user.email || "",
    password: "",
    password_confirmation: "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("user.update", user.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 text-center fst-italic leading-tight">
            Edit User "{user.name}"
          </h2>
        </div>
      }
    >
      <Head title="Users" />
      <div className="py-12 backgroundDiv">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm sm:rounded-lg">
            <form
              className="p-4 sm:p-8 shadow sm:rounded-lg"
              onSubmit={onSubmit}
            >
              
              <div className="mt-4">
                <InputLabel
                  htmlFor="user_name"
                  value="User Name"
                  className="text-white"
                />
                <TextInput
                  id="user_name"
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
                  htmlFor="user_email"
                  value="User Email"
                  className="text-white"
                />
                <TextInput
                  id="user_email"
                  type="text"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full text-white bg-dark"
                  onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="user_password"
                  value="Password"
                  className="text-white"
                />
                <TextInput
                  id="user_password"
                  type="password"
                  name="password"
                  value={data.password}
                  className="mt-1 block w-full text-white bg-dark"
                  onChange={(e) => setData("password", e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="user_password_confirmation"
                  value="Confirm Password"
                  className="text-white"
                />
                <TextInput
                  id="user_password_confirmation"
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  className="mt-1 block w-full text-white bg-dark"
                  onChange={(e) => setData("password_confirmation", e.target.value)}
                />
                <InputError message={errors.password_confirmation} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link className="paddingCancel mx-3 bg-warning text-decoration-none text-white rounded" href={route("user.index")}>
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
