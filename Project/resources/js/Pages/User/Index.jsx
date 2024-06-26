import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function index({ auth, users, queryParams = null, success }) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("user.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("user.index"), queryParams);
  };

  const deleteUser = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) 
    {
      return;
    }
    router.delete(route("user.destroy", user.id));
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 text-center fst-italic leading-tight">
            Users
          </h2>
          <Link
            className="bg-emerald-500 text-decoration-none hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
            href={route("user.create")}
            role="button"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Users" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 mb-4 text-white px-4 rounded">
              {success}
            </div>
          )}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 backgroundDiv">
              <div className="overflow-auto">
                <table class="table table-dark border-white">
                  <thead>
                    <tr className="text-nowrap">
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        
                        ID
                      </TableHeading>
                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        
                        Name
                      </TableHeading>
                      <TableHeading
                        name="email"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                       Email
                      </TableHeading>
                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
               
                        Create Date
                      </TableHeading>
                  
                      <th scope="col" className="thPadding">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">
                        <TextInput
                          defaultValue={queryParams.name}
                          className="w-full text-white bg-black"
                          placeholder="User Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th scope="col">
                      <TextInput
                          defaultValue={queryParams.email}
                          className="w-full text-white bg-black"
                          placeholder="User Email"
                          onBlur={(e) =>
                            searchFieldChanged("email", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("email", e)}
                        />
                      </th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.data.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <th className="px-3 py-5 text-nowrap userDetails">
                            {user.name}
                        </th>
                        <td>
                        {user.email}
                        </td>
                        <td>{user.created_at}</td>
                        <td className="paddingIcons">
                          <div className="d-flex">
                            <Link
                              href={route("user.edit", user.id)}
                              className="btn"
                            >
                              <i className="bi bi-pencil fs-5 text-warning"></i>
                            </Link>
                            <button
                              onClick={(e) => deleteUser(user)}
                              className="btn"
                            >
                              <i className="bi bi-trash3 text-danger fs-5"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
