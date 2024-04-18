import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP } from "@/constants";
import { Head, Link } from "@inertiajs/react";

export default function Show({ auth, task }) {
  console.log(JSON.stringify(task));
  console.log(auth.user);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl text-gray-800 text-center fst-italic leading-tight">
          {task ? `Task "${task.name}"` : "Loading task..."}
        </h2>
        {auth.user.id === task.createdBy.id && (
        <>
          <Link
        className="bg-emerald-500 text-decoration-none hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
        href={route("task.edit", task.id)}
        role="button"
      >
        Edit
      </Link>
        </>
        )}
      
        </div>
      }
    >
      <Head title={`Task "${task.name}"`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img
                src={task.image_path}
                alt="image"
                className="w-full  object-cover"
              />
            </div>
            <div className="p-6 text-gray-900 backgroundDiv">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg text-white">
                      Task ID
                    </label>
                    <p className="mt-1 text-white">{task.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">
                      Task Name
                    </label>
                    <p className="mt-1 text-white">{task.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">
                      Task Priority
                    </label>
                    <p className="mt-1 text-white"></p>
                    <span
                      className={
                        "px-2 py-1 rounded text-white " +
                        TASK_PRIORITY_CLASS_MAP[task.priority]
                      }
                    >
                      {TASK_PRIORITY_TEXT_MAP[task.priority]}
                    </span>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">
                      Task Status
                    </label>
                    <p className="mt-1 text-white"></p>
                    <span
                      className={
                        "px-2 py-1 rounded text-white " +
                        TASK_STATUS_CLASS_MAP[task.status]
                      }
                    >
                      {TASK_STATUS_TEXT_MAP[task.status]}
                    </span>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">
                      Created By
                    </label>
                    <p className="mt-1 text-white">{task.createdBy.name}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg text-white">
                      Due Date
                    </label>
                    <p className="mt-1 text-white">{task.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">
                      Create Date
                    </label>
                    <p className="mt-1 text-white">{task.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">
                      Updated By
                    </label>
                    <p className="mt-1 text-white">{task.updatedBy.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">
                      Project
                    </label>
                    <p className="mt-1">
                    <Link className="text-nowrap projectDetails" href={route("project.show", task.project.id)}>
                    {task.project.name}
                    </Link>
                    </p>
                  </div>
                
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">
                      Assigned User
                    </label>
                    <p className="mt-1 text-white">{task.assignedUser.name}</p>
                  </div>
                  </div>
                <div className="mt-4">
                  <label className="font-bold text-lg text-white">
                    Task Description
                  </label>
                  <p className="mt-1 text-white widthDesc">
                    {task.description}
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
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
