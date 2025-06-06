'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const packagePlans = [
	{
		title: 'Free Trial',
		subtitle: 'Try before you buy — full features for 2 weeks',
		features: ['14 days access', 'Up to 25 employees', 'Head Office only'],
		price: 0,
	},
	{
		title: 'Starter',
		subtitle: 'Ideal for small businesses starting their journey',
		features: ['1 month access', 'Up to 50 employees', 'Head Office only'],
		price: 500000,
	},
	{
		title: 'Growth',
		subtitle: 'Perfect for expanding companies with multiple locations',
		features: [
			'3 month access',
			'Up to 250 employees',
			'Head Office with 2 branch offices',
		],
		price: 1800000,
	},
	{
		title: 'Pro',
		subtitle: 'Advanced features for mid-sized enterprises',
		features: [
			'6 month access',
			'Up to 500 employees',
			'Head Office with 3 branch offices',
		],
		price: 3600000,
	},
	{
		title: 'Enterprise',
		subtitle: 'Comprehensive solution for large-scale organizations',
		features: [
			'12 month access',
			'Up to 1000 employees',
			'Head Office with 4 branch offices',
		],
		price: 7200000,
	},
];

export default function PackagePlanPage() {
	const router = useRouter();
	const pathname = usePathname();
	const [plans, setPlans] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch('http://localhost:8000/api/package-plans')
			.then((res) => {
				if (!res.ok) throw new Error('Server error');
				return res.json();
			})
			.then((data) => {
				// Pastikan features berupa array
				const parsed = data.map((plan: any) => ({
					...plan,
					features:
						Array.isArray(plan.features) ||
						(typeof plan.features === 'string'
							? JSON.parse(plan.features)
							: []),
				}));
				setPlans(parsed);
				setLoading(false);
			})
			.catch(() => {
				setError('Failed to load package plans. Please try again later.');
				setLoading(false);
			});
	}, []);

	return (
		<div className="min-h-screen bg-gray-50 px-6 py-12 font-sans">
			<div className="text-center mb-10">
				<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
					HRIS Pricing Plans
				</h1>
				<p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
					Choose the package that best suits your business! This HRIS offers
					both subscription and pay-as-you-go payment options, available in the
					following packages:
				</p>
			</div>

			<div className="container mx-auto">
				{loading ? (
					<div className="text-center text-gray-500 py-20">Loading...</div>
				) : error ? (
					<div className="text-center text-red-500 py-20">{error}</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{plans.map((plan, idx) => (
							<div
								key={plan.id ?? idx}
								className="bg-white border border-gray-200 rounded-xl shadow-md p-8 flex flex-col transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-xl text-sm"
							>
								<div>
									<h3 className="text-xl font-semibold text-blue-700 mb-1">
										{plan.title}
									</h3>
									<p className="text-lg font-bold text-gray-800 mb-4">
										{plan.price === 0
											? 'Rp. 0'
											: `Rp. ${plan.price.toLocaleString()}`}
									</p>
									<p className="text-sm text-gray-500 mb-4">
										{plan.subtitle}
									</p>
									<ul className="space-y-2 mb-6">
										{plan.features.map(
											(feature: string, fidx: number) => (
												<li
													key={fidx}
													className="flex items-center text-gray-700 text-sm"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														strokeWidth={2}
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M5 13l4 4L19 7"
														/>
													</svg>
													{feature}
												</li>
											)
										)}
									</ul>
								</div>

								<button
									onClick={() =>
										router.push(
											`/checkout?plan=${encodeURIComponent(
												plan.title
											)}&price=${plan.price}`
										)
									}
									className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition cursor-pointer"
								>
									Select a Package →
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
