import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
  auth,
  myPendingTasks,
  totalPendingTasks,
  myProgressTasks,
  totalProgressTasks,
  myCompletedTasks,
  totalCompletedTasks,
  activeTasks
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12 bgNav">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
          <div className="overflow-hidden bg-dark shadow-sm sm:rounded-lg">
            <div className="p-6 text-white">
              <h3 className="text-amber-500 text-2xl font-semibold">
                Pending Tasks
              </h3>
              <p className="text-xl mt-3">
                <span className="mr-2">{myPendingTasks}</span>/
                <span className="ml-2">{totalPendingTasks}</span>
              </p>
            </div>
          </div>
          <div className="overflow-hidden bg-dark shadow-sm sm:rounded-lg">
            <div className="p-6 text-white">
              <h3 className="text-blue-500 text-nowrap text-2xl font-semibold">
                In Progress Tasks
              </h3>
              <p className="text-xl mt-3">
                <span className="mr-2">{myProgressTasks}</span>/
                <span className="ml-2">{totalProgressTasks}</span>
              </p>
            </div>
          </div>
          <div className="overflow-hidden bg-dark shadow-sm sm:rounded-lg">
            <div className="p-6 text-white">
              <h3 className="text-green-500 text-nowrap text-2xl font-semibold">
                Completed Tasks
              </h3>
              <p className="text-xl mt-3">
                <span className="mr-2">{myCompletedTasks}</span>/
                <span className="ml-2">{totalCompletedTasks}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
          <div className="overflow-hidden bg-dark shadow-sm sm:rounded-lg">
            <div className="p-6 text-white">
              <h3 className=" text-gray-200 text-nowrap text-xl font-semibold">
                My Active Tasks
              </h3>

              <table class="table table-dark  border-white">
                <thead className="text-md text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-600">
                    <tr>
                        <th className="px-3 py-3">ID</th>
                        <th className="px-3 py-3">Project Name</th>
                        <th className="px-3 py-3">Name</th>
                        <th className="px-3 py-3">Status</th>
                        <th className="px-3 py-3">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                {activeTasks.data.map((task) => (
                    <tr key={task.id}>
                        <td className="px-3 py-3">{task.id}</td>
                        <td className="px-3 py-3">
                            <Link href={route('project.show', task.project.id)} className="text-nowrap projectDetails">
                                {task.project.name}
                                
                            </Link>
                        </td>
                        <td className="px-3 py-3">
                        <Link href={route('task.show', task.id)} className="text-nowrap projectDetails">
                                {task.name}
                                
                            </Link>
                        </td>
                        <td className="px-3 py-3">
                        <span
                            className={
                              "px-2 py-1 rounded text-nowrap text-white " +
                              TASK_STATUS_CLASS_MAP[task.status]
                            }
                          >
                            {TASK_STATUS_TEXT_MAP[task.status]}
                          </span>
                        </td>
                        <td className="px-3 py-3">{task.due_date}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
