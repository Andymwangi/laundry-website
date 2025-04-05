import { pgTable, serial, text, varchar, timestamp, integer, boolean, pgEnum, uuid, doublePrecision } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

// Users table - existing
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Service plans enum
export const servicePlanEnum = pgEnum("service_plan", ["basic", "premium", "subscription"]);

// Service status enum
export const serviceStatusEnum = pgEnum("service_status", [
  "pending", "pickup_scheduled", "collected", "processing", 
  "ready_for_delivery", "delivery_scheduled", "delivered", "canceled"
]);

// Payment status enum
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending", "processing", "completed", "failed", "refunded"
]);

// Services table - new
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  servicePlan: servicePlanEnum("service_plan").notNull(),
  kilograms: doublePrecision("kilograms"), // Null for subscription plans
  price: doublePrecision("price").notNull(),
  status: serviceStatusEnum("status").default("pending").notNull(),
  pickupDate: timestamp("pickup_date"),
  deliveryDate: timestamp("delivery_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Payments table - new
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull().references(() => services.id),
  userId: integer("user_id").notNull().references(() => users.id),
  amount: doublePrecision("amount").notNull(),
  currency: varchar("currency", { length: 3 }).default("KES").notNull(),
  status: paymentStatusEnum("status").default("pending").notNull(),
  transactionId: text("transaction_id"), // MPesa transaction ID
  paymentMethod: text("payment_method").default("mpesa").notNull(),
  phoneNumber: varchar("phone_number", { length: 15 }),
  receiptNumber: varchar("receipt_number", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Profiles table - new
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id).unique(),
  phoneNumber: varchar("phone_number", { length: 15 }),
  address: text("address"),
  apartment: text("apartment"),
  city: text("city"),
  postalCode: varchar("postal_code", { length: 20 }),
  defaultPickupInstructions: text("default_pickup_instructions"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Subscriptions table - for monthly subscription plans
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  autoRenew: boolean("auto_renew").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Type definitions
export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">;

export type Service = InferModel<typeof services>;
export type NewService = InferModel<typeof services, "insert">;

export type Payment = InferModel<typeof payments>;
export type NewPayment = InferModel<typeof payments, "insert">;

export type Profile = InferModel<typeof profiles>;
export type NewProfile = InferModel<typeof profiles, "insert">;

export type Subscription = InferModel<typeof subscriptions>;
export type NewSubscription = InferModel<typeof subscriptions, "insert">;