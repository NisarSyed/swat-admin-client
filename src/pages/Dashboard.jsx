function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-200 rounded-lg shadow-xl p-6 mt-2">
          <h2 className="mb-4 text-4xl text-center font-semibold">
            Welcome to SWAT Admin Panel
          </h2>
          <p className="text-center text-xl mb-10">
            This is a simple admin panel for managing users, projects, drives,
            and events.
          </p>
          <p className="text-center mb-2">
            Get started by changing the banner image.
          </p>
          <button className="block mx-auto mt-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            New Banner?
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
