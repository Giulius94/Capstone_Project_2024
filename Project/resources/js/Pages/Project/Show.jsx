import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import { Head } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";

export default function Show({ auth, project, queryParams, tasks }) {
  console.log(JSON.stringify(project));
  console.log(auth.user);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 text-center fst-italic leading-tight">
          {project ? `Project "${project.name}"` : "Loading project..."}
        </h2>
      }
    >
      <Head title={`Project "${project.name}"`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img
                src={project.image_path}
                alt="image"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 text-gray-900 backgroundDiv">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg text-white">
                      Project ID
                    </label>
                    <p className="mt-1 text-white">{project.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">
                      Project Name
                    </label>
                    <p className="mt-1 text-white">{project.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">
                      Project Status
                    </label>
                    <p className="mt-1 text-white"></p>
                    <span
                      className={
                        "px-2 py-1 rounded text-white " +
                        PROJECT_STATUS_CLASS_MAP[project.status]
                      }
                    >
                      {PROJECT_STATUS_TEXT_MAP[project.status]}
                    </span>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">
                      Created By
                    </label>
                    <p className="mt-1 text-white">{project.createdBy.name}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg text-white">
                      Due Date
                    </label>
                    <p className="mt-1 text-white">{project.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">
                      Create Date
                    </label>
                    <p className="mt-1 text-white">{project.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">
                      Updated By
                    </label>
                    <p className="mt-1 text-white">{project.updatedBy.name}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="font-bold text-lg text-white">
                    Project Description
                  </label>
                  <p className="mt-1 text-white widthDesc">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* under section */}
      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 backgroundDiv">
              <TasksTable tasks={tasks} queryParams={queryParams} hideProjectColumn={true}/>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
