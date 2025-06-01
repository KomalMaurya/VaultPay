import React ,{useEffect} from 'react'
import PageTitle from '../../components/PageTitle'
import {Table, message} from 'antd';
import TransferFundsModal from './TransferFundsModal';
import { useDispatch, useSelector } from 'react-redux';
import { GetTransactionsOfUser } from '../../apicalls/transactions';
import { HideLoading , ShowLoading} from '../../redux/loadersSlice';
import moment from 'moment';

function Transactions() {
    const [showTransferFundsModal, setShowTransferFundsModal]=React.useState(false);
    const dispatch=useDispatch();
    const {user} =useSelector(state=>state.users) 
    const [data=[],setData]=React.useState([]);
    const columns=[
        {
            title:"Date",
            dataIndex:"date",
            render:(text,record)=>{
                return moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A");                 
            }
        },{
            title:"Transaction ID",
            dataIndex:"_id"
        },
        {
            title:"Amount",
            dataIndex:"amount",
        },{
             title:"Type",
             dataIndex:"type",
             render:(text,record)=>{
                return record.sender._id===user._id?"Debit":"Credit"
             }
        },{
            title:"Reference Account",
            dataIndex:"",
            render:(text,record)=>{
                return record.sender._id ===user._id?<div>
                    <h1 className="text-sm">
                        {record.receiver.firstName} {record.receiver.lastName}
                    </h1>
                </div>:<div>
                    <h1 className="text-sm">
                        {record.sender.firstName} {record.sender.lastName}
                    </h1>
                </div>
            }
        },
        {
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
  

  const getData=async()=>{
         try {
            dispatch(ShowLoading());
            const response=await GetTransactionsOfUser();  
            if(response.success){
                setData(response.data);
            }
            dispatch(HideLoading());
         } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
         }
    }

    console.log(data);
  useEffect(()=>{
    getData();
  },[])

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
        reloadData={getData}
        />)}
    </div>
  );     
}

export default Transactions