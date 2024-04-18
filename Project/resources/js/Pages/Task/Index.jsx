import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "./TasksTable";

export default function index({ auth, success, tasks, queryParams = null }) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl text-gray-800 text-center fst-italic leading-tight">
          Task
        </h2>
          <Link
          className="bg-emerald-500 text-decoration-none hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
          href={route("task.create")}
          role="button"
        >
          Add new
        </Link>
        </div>
      }
    >
      <Head title="Tasks" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 backgroundDiv">
           <TasksTable tasks={tasks} queryParams={queryParams} success={success}/>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
