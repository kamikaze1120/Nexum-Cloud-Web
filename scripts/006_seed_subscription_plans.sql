-- Create default subscription plans for the platform
INSERT INTO subscription_plans (name, description, price_monthly, price_yearly, features, max_users, max_storage_gb) VALUES
(
  'Starter',
  'Perfect for small businesses getting started with automation',
  29.99,
  299.99,
  '["Up to 5 users", "10GB storage", "Basic automation tools", "Email support", "Standard integrations"]'::jsonb,
  5,
  10
),
(
  'Professional',
  'Advanced features for growing businesses',
  79.99,
  799.99,
  '["Up to 25 users", "100GB storage", "Advanced automation", "Priority support", "Premium integrations", "Custom workflows", "Analytics dashboard"]'::jsonb,
  25,
  100
),
(
  'Enterprise',
  'Full-featured solution for large organizations',
  199.99,
  1999.99,
  '["Unlimited users", "1TB storage", "Enterprise automation", "24/7 phone support", "All integrations", "Custom development", "Advanced analytics", "Dedicated account manager"]'::jsonb,
  NULL,
  1000
);
