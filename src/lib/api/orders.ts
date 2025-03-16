
// Define the Order type based on your database schema
export type Order = {
  id: number;
  userId: number;
  servicePlan: 'basic' | 'premium' | 'subscription';
  kilograms?: number;
  price: number;
  status: string;
  pickupDate: string;
  deliveryDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

// Define the type for creating a new order
export type CreateOrderInput = {
  servicePlan: 'basic' | 'premium' | 'subscription';
  kilograms?: number;
  price: number;
  pickupDate: string;
  deliveryDate: string;
  notes?: string;
};

/**
 * Fetch all orders for the authenticated user
 */
export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await fetch('/api/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies for authentication
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch orders');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

/**
 * Fetch a single order by ID
 */
export const getOrder = async (orderId: number | string): Promise<Order> => {
  try {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch order');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};

/**
 * Create a new order
 */
export const createOrder = async (orderData: CreateOrderInput): Promise<Order> => {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

/**
 * Update an order's status or details
 */
export const updateOrder = async (
  orderId: number | string, 
  updates: Partial<Order>
): Promise<Order> => {
  try {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update order');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating order ${orderId}:`, error);
    throw error;
  }
};

/**
 * Cancel an order
 */
export const cancelOrder = async (orderId: number | string): Promise<Order> => {
  try {
    const response = await fetch(`/api/orders/${orderId}/cancel`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to cancel order');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error canceling order ${orderId}:`, error);
    throw error;
  }
};