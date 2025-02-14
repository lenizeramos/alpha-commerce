import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Order } from "../types/OrderTypes";

async function getOrders(): Promise<Order[]> {
  const { userId } = auth();
  if (!userId) return [];

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  return user?.orders || [];
}

export default async function OrdersPage() {
  const orders: Order[] = await getOrders();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
          <Link 
            href="/menu" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order: Order) => (
            <div 
              key={order.id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Order #{order.id.slice(-6)}</h2>
                  <p className="text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700">
                  {(order.items as any[]).length} items
                </p>
                <p className="font-semibold">
                  Total: ${order.totalAmount.toFixed(2)}
                </p>
              </div>

              <Link 
                href={`/orders/${order.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                View Details
                <svg 
                  className="w-4 h-4 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
