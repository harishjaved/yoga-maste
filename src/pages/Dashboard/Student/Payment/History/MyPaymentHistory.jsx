import { useEffect, useState } from "react";
import useAxiosFetch from "../../../../../hooks/useAxiosFetch"
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useUser from "../../../../../hooks/useUser";
import Payment from "../Payment";
import moment from 'moment';


const MyPaymentHistory = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const {currentUser} = useUser();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedPayments, setPaginatedPayments] = useState([]);
  const totalItem = payments.length;
  const [page, setPage] = useState(1);
  let  totalPage = Math.ceil(totalItem / 5);
  let  itemsPerPage = 5;
  const handleChange = (event, value) => {
    setPage(value);
  }

  useEffect(() => {
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = payments.slice(firstIndex, lastIndex);
    setPaginatedPayments(currentItems)

  },[page, payments])

  useEffect(() => {
    axiosFetch.get(`/payment-history/${currentUser?.email}`)
    .then(res => {
      setPayments(res.data)
      setLoading(false)

    }).catch(err => console.log(err))
  }, [currentUser.email]);

  const totalPaidAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);
  if(loading){
    return <h1>Loading..</h1>
  }



  return (
    <div>
    <div className="mt-6 mb-16 text-center">
      <p className="text-gray-400">
        Hey, {" "}
        <span className="font-bold text-secondary">{currentUser.name}</span> {" "}
        Welcome...!
      </p>
      <h1 className="text-4xl font-bold">
        My Paym<span className="text-secondary">ent Hist</span>ory
      </h1>
      <p className="my-3 text-sm text-gray-500">
        You can see your payment history here{" "}
      </p>
    </div>
  
    {/* table here */}
    <div className='p-6 mb-4 bg-white rounded-lg shadow-md'>
     
    <div>
        <p className="font-bold">Total Payments: {payments.length}</p>
        <p className="font-bold">Total Paid: ${totalPaidAmount}</p>
    </div>
      
     <table  className='w-full'>
     <thead>
                                <tr>
                                    <th className='font-semibold text-left'>#</th>
                                    <th className='font-semibold text-left'>Amount</th>
                                    <th className='font-semibold text-left'>Total Item</th>
                                    <th className='font-semibold text-left'>Time</th>
                                </tr>
     </thead>
     
     <tbody>
  {
    paginatedPayments.map((Payment, idx) => (
      <tr key={idx}> {/* Added key prop for unique identification */}
        <td className='py-4'>{idx + 1}</td>
        <td className="px-6 py-4 whitespace-nowrap">{Payment.amount}</td>
        <td className="px-6 py-4 whitespace-nowrap">{Payment.classesId.length}</td>
        <td className='py-4'>
          <p className='text-sm text-green-700'>
            {/* Date and Time display using moment.js */}
            {moment(Payment.submitted).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
        </td>
      </tr>
    ))
  }
</tbody>

      
      
     </table>
      
      

    </div>
    
    
  </div>
  
    )
}

export default MyPaymentHistory