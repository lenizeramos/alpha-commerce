import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Order } from "../../types/OrderTypes";

async function getOrder(orderId: string): Promise<Order | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) return null;

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
      userId: user.id,
    },
  });

  if (!order) return null;

  // Cast the order data with proper type assertions
  return {
    ...order,
    status: order.status as Order['status'],
    items: (order.items as unknown) as Order['items']
  } as Order;
}

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await getOrder(params.id);

  if (!order) {
    notFound();
  }

  // Type assertion since we've checked for null
  const orderData: Order = order as Order;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Order Details</h1>
          <Link
            href="/orders"
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Orders
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-gray-600">Order #{orderData.id.slice(-6)}</p>
              <p className="text-gray-600">
                Placed on {new Date(orderData.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                orderData.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {orderData.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount</span>
              <span>${orderData.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/menu"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
