import TableHeading from "@/Components/TableHeading";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Link, router } from "@inertiajs/react";
export default function TasksTable({
  tasks,
  success,
  queryParams = null,
  hideProjectColumn = false,
  auth,
}) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.index"), queryParams);
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
    router.get(route("task.index"), queryParams);
  };
  const deleteTask = (task) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    router.delete(route("task.destroy", task.id));
  };

  return (
    <>
      {success && (
        <div className="bg-emerald-500 py-2 mb-4 text-white px-4 rounded">
          {success}
        </div>
      )}
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
                {" "}
                ID
              </TableHeading>
              <th scope="col" className="thPadding">
                Image
              </th>
              {!hideProjectColumn && (
                <th scope="col" className="thPadding">
                  Project Name
                </th>
              )}
              <TableHeading
                name="name"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                {" "}
                Name
              </TableHeading>
              <TableHeading
                name="status"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                {" "}
                Status
              </TableHeading>
              <TableHeading
                name="created_at"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                {" "}
                Create Date
              </TableHeading>
              <TableHeading
                name="due_date"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                {" "}
                Due Date
              </TableHeading>
              <th scope="col" className="thPadding">
                Created by
              </th>
              <th scope="col" className="thPadding">
                Actions
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              {!hideProjectColumn && <th scope="col"></th>}
              <th scope="col">
                <TextInput
                  defaultValue={queryParams.name}
                  className="w-full text-white bg-black"
                  placeholder="Search Task Name"
                  onBlur={(e) => searchFieldChanged("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                />
              </th>
              <th scope="col">
                <SelectInput
                  defaultValue={queryParams.status}
                  className="w-full"
                  onChange={(e) => searchFieldChanged("status", e.target.value)}
                >
                  <option value="">Search</option>
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
            {tasks.data.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td className="paddingImg">
                  <img
                    src={task.image_path}
                    alt="image"
                    width="100"
                    height="100"
                  />
                </td>
                {!hideProjectColumn && (
                  <td>
                    <Link
                      href={route("project.show", task.project.id)}
                      className="projectDetails"
                    >
                      {task.project.name}
                    </Link>
                  </td>
                )}
                <td className="px-3 py-5 text-nowrap projectDetails">
                  <Link
                    href={route("task.show", task.id)}
                    className="projectDetails"
                  >
                    {task.name}
                  </Link>
                </td>
                <td>
                  <span
                    className={
                      "px-2 py-1 rounded text-nowrap text-white " +
                      TASK_STATUS_CLASS_MAP[task.status]
                    }
                  >
                    {TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td>{task.created_at}</td>
                <td>{task.due_date}</td>
                <td>{task.createdBy.name}</td>
                <td className="paddingIcons">
                  <div className="d-flex">
                    {auth.user.id === task.createdBy.id && (
                      <>
                        <Link
                          href={route("task.edit", task.id)}
                          className="btn"
                        >
                          <i className="bi bi-pencil fs-5 text-warning"></i>
                        </Link>
                        <button
                          onClick={() => deleteTask(task)}
                          className="btn"
                        >
                          <i className="bi bi-trash3 text-danger fs-5"></i>
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links} />
    </>
  );
}
