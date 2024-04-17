import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TasksTable from "./TasksTable";

export default function index({ auth, tasks, queryParams = null }) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 text-center fst-italic leading-tight">
          Task
        </h2>
      }
    >
      <Head title="Projects" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 backgroundDiv">
           <TasksTable tasks={tasks} queryParams={queryParams}/>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
