// Import dashboard-specific configuration
export { dynamic, runtime, generateStaticParams } from './config';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Recent Orders</h2>
          <p className="text-gray-500">You have no recent orders.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Account Summary</h2>
          <p className="text-gray-500">Welcome to your dashboard!</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
          <ul className="space-y-2">
            <li>
              <a href="/dashboard/orders" className="text-blue-600 hover:underline">
                View all orders
              </a>
            </li>
            <li>
              <a href="/dashboard/profile" className="text-blue-600 hover:underline">
                Update profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 