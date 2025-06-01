import React from 'react'
import PageTitle from '../../components/PageTitle'
import {Table, message} from 'antd';
import TransferFundsModal from './TransferFundsModal';
import { useDispatch } from 'react-redux';
import { GetTransactionsOfUser } from '../../apicalls/transactions';
import { HideLoading , ShowLoading} from '../../redux/loadersSlice';

function Transactions() {
    const [showTransferFundsModal, setShowTransferFundsModal]=React.useState(false);
    const [data=[],setData]=React.useState([]);
    const dispatch=useDispatch();
    const getData=async()=>{
         try {
            dispatch(ShowLoading());
            const response=await GetTransactionsOfUser();
            if(response.success){
                setData(response.data)
            }
            dispatch(HideLoading());
         } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
         }
    }
    const columns=[
        {
            title:"Date",
            dataIndex:"date",
        },{
            title:"Transaction ID",
            dataIndex:"transactionId"
        },
        {
            title:"Amount",
            dataIndex:"amount",
        },{
             title:"Type",
             dataIndex:"type",
        },{
            title:"Reference",
            dataIndex:"reference",
        },{
            title:"Status",
            dataIndex:"status",
        },
    ];
    const handleTransferClick = () => {
    console.log("Transfer button clicked");
    setShowTransferFundsModal(true);
  };

  return (
    <div> 
        <div className="flex justify-between items-center">
            <PageTitle title="Transactions"/>

            <div className='flex gap-1'>
                <button className='primary-outlined-btn'>
                    Deposit
                </button>
                <button className='primary-contained-btn'
                onClick={handleTransferClick}
                >
                    Transfer{" "}
                </button>
            </div>
        </div>
        <Table columns={columns} dataSource={data}  className='mt-2'/>
        {showTransferFundsModal && (<TransferFundsModal 
        showTransferFundsModal={showTransferFundsModal} 
        setShowTransferFundsModal={setShowTransferFundsModal}
        />)}
    </div>
  );     
}

export default Transactions