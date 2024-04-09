import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Head, Link } from "@inertiajs/react";

export default function index({ auth, projects }) {
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
              <table class="table table-dark border-white">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Create Date</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Created by</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.data.map((project) => (
                     <tr key={project.id}>  
                      <td>{project.id}</td>
                      <td>
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
                              }>
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </td>
                      <td>{project.created_at}</td>
                      <td>{project.due_date}</td>
                      <td>{project.createdBy.name}</td>
                      <td>
                        <Link
                          href={route("project.edit", project.id)}
                          className="btn"
                        >
                          <i class="bi bi-pencil fs-5 text-warning"></i>
                        </Link>
                        <Link
                          href={route("project.destroy", project.id)}
                          className="btn"
                        >
                          <i class="bi bi-trash3 text-danger fs-5"></i>

                        </Link>
                      </td>
                     </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={projects.meta.links}/>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
