"use client"
import { AreaChart, Area, XAxis,YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PaymentChart = () => {
    const chartdata = [
        {
            name: 'Jan',
            Received_Amount: 20,
        },
        {
            name: 'Feb',
            Received_Amount: 60,
        },
        {
            name: 'Mar',
            Received_Amount: 45,
        },
        {
            name: 'Apr',
            Received_Amount: 56,
        },
        {
            name: 'May',
            Received_Amount: 34,
        },
        {
            name: 'Jun',
            Received_Amount: 44,
        },
        {
            name: 'Jul',
            Received_Amount: 78,
        },
        {
            name: 'Aug',
            Received_Amount: 67,
        },
        {
            name: 'Sep',
            Received_Amount: 35,
        },
        {
            name: 'Oct',
            Received_Amount: 89,
        },
        {
            name: 'Nov',
            Received_Amount: 80,
        },
        {
            name: 'Dec',
            Received_Amount: 90,
        }
    ];
    return (
        <ResponsiveContainer className={'bg-white  md:w-[60%] md:h-full dark:bg-Dark_light rounded-2xl shadow-sm pb-28 pt-8 '}>
            <div className="flex justify-between p-4">
                <div className="text-[1.2rem] text-black dark:text-white font-semibold">Payment Overview</div>
                <div className="flex items-center space-x-2">
                    <div className="text-[1.1rem] dark:text-white">SHORT BY:</div>
                    <select className="bg-white border border-gray-300 text-black py-2 px-4 pr-8 rounded leading-tight focus:outline-none  focus:border-blue-500">
                        <option value="monthly">Monthly</option>
                        <option value="weakly">Weakly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
            </div>
            <AreaChart
                width={500}
                height={400}
                data={chartdata}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="Received_Amount" stroke="cyan" strokeWidth={5} fill="cyan" />
                <Area type="monotone" dataKey="Due_Amount" stroke="#6D81F5" strokeWidth={5} fill="#6D81F5" />
            </AreaChart>

        </ResponsiveContainer>
    )
}

export default PaymentChart
