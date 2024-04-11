import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";

export default function index({ auth, projects, queryParams = null }) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("project.index"), queryParams);
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
    router.get(route("project.index"), queryParams);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Projects
        </h2>
      }
    >
      <Head title="Projects" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 backgroundDiv">
              <div className="overflow-auto">
                <table class="table table-dark border-white">
                  <thead>
                    <tr className="text-nowrap">
                      <TableHeading
                      name = "id" 
                      sort_field={queryParams.sort_field} 
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                      > ID 
                      </TableHeading>
                      <th scope="col" className="thPadding">Image</th>
                      <TableHeading
                      name = "name" 
                      sort_field={queryParams.sort_field} 
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                      > Name 
                      </TableHeading>
                      <TableHeading
                      name = "status" 
                      sort_field={queryParams.sort_field} 
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                      > Status 
                      </TableHeading>
                      <TableHeading
                      name = "created_at" 
                      sort_field={queryParams.sort_field} 
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                      > Create Date 
                      </TableHeading>
                      <TableHeading
                      name = "due_date" 
                      sort_field={queryParams.sort_field} 
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                      > Due Date
                      </TableHeading>
                      <th scope="col" className="thPadding">Created by</th>
                      <th scope="col" className="thPadding">Actions</th>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col">
                        <TextInput
                          defaultValue={queryParams.name}
                          className="w-full"
                          placeholder="Project Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th scope="col">
                        <SelectInput
                          defaultValue={queryParams.status}
                          className="w-full"
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.data.map((project) => (
                      <tr key={project.id}>
                        <td>{project.id}</td>
                        <td className="paddingImg">
                          <img
                            src={project.image_path}
                            alt="image"
                            width="100"
                            height="100"
                          />
                        </td>
                        <td>{project.name}</td>
                        <td>
                          <span
                            className={
                              "px-2 py-1 rounded text-white " +
                              PROJECT_STATUS_CLASS_MAP[project.status]
                            }
                          >
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </td>
                        <td>{project.created_at}</td>
                        <td>{project.due_date}</td>
                        <td>{project.createdBy.name}</td>
                        <td>
                          <div className="d-flex">
                          <Link
                            href={route("project.edit", project.id)}
                            className="btn"
                          >
                            <i className="bi bi-pencil fs-5 text-warning"></i>
                          </Link>
                          <Link
                            href={route("project.destroy", project.id)}
                            className="btn"
                          >
                            <i className="bi bi-trash3 text-danger fs-5"></i>
                          </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
