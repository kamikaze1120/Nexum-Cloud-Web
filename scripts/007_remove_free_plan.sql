-- Remove any user subscriptions tied to the free plan
DELETE FROM public.user_subscriptions
WHERE plan_id IN (SELECT id FROM public.subscription_plans WHERE name = 'Nexum AI Free');

-- Remove the free plan
DELETE FROM public.subscription_plans
WHERE name = 'Nexum AI Free';